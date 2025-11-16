import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { getAllComponentNames, getComponent, getDependencies } from '../../registry/index';

interface Config {
  typescript: boolean;
  componentDir: string;
  utilsDir: string;
  cssFile: string;
}

export async function add(components: string[], options: { all?: boolean; overwrite?: boolean }) {
  const cwd = process.cwd();
  const configPath = path.join(cwd, 'components.json');
  
  // Check if initialized
  if (!await fs.pathExists(configPath)) {
    console.log(chalk.red('\n❌ components.json not found. Please run init first:\n'));
    console.log(chalk.yellow('  bunx --bun windelements init\n'));
    process.exit(1);
  }
  
  const config: Config = await fs.readJson(configPath);
  const ext = config.typescript ? 'ts' : 'js';
  
  let selectedComponents: string[] = [];
  
  if (options.all) {
    selectedComponents = getAllComponentNames();
  } else if (components && components.length > 0) {
    selectedComponents = components.map(c => c.toLowerCase());
  } else {
    // Interactive selection
    const allComponents = getAllComponentNames();
    const { selected } = await prompts({
      type: 'multiselect',
      name: 'selected',
      message: 'Select components to add:',
      choices: allComponents.map(name => ({
        title: name,
        value: name
      })),
      hint: '- Space to select. Return to submit'
    });
    
    if (!selected || selected.length === 0) {
      console.log(chalk.yellow('\n❌ No components selected\n'));
      return;
    }
    
    selectedComponents = selected;
  }
  
  // Validate components
  const invalidComponents = selectedComponents.filter(name => !getComponent(name));
  if (invalidComponents.length > 0) {
    console.log(chalk.red(`\n❌ Invalid components: ${invalidComponents.join(', ')}\n`));
    process.exit(1);
  }
  
  // Resolve all dependencies
  const allComponentsToInstall = new Set<string>();
  for (const name of selectedComponents) {
    const deps = getDependencies(name);
    deps.forEach(dep => allComponentsToInstall.add(dep));
    allComponentsToInstall.add(name);
  }
  
  const spinner = ora('Installing components...').start();
  
  try {
    const installed: string[] = [];
    const skipped: string[] = [];
    
    for (const componentName of allComponentsToInstall) {
      const component = getComponent(componentName)!;
      const componentDir = path.join(cwd, config.componentDir);
      
      for (const file of component.files) {
        const sourceFile = file.replace('.ts', `.${ext}`);
        const destPath = path.join(componentDir, sourceFile);
        
        // Check if file exists
        if (await fs.pathExists(destPath) && !options.overwrite) {
          skipped.push(componentName);
          continue;
        }
        
        // Get component template from registry
        const template = await getComponentTemplate(componentName, ext, config);
        
        // Write file
        await fs.ensureDir(path.dirname(destPath));
        await fs.writeFile(destPath, template);
        
        installed.push(componentName);
      }
    }
    
    spinner.succeed('Components installed successfully!');
    
    if (installed.length > 0) {
      console.log(chalk.green(`\n✅ Installed ${installed.length} component(s):\n`));
      installed.forEach(name => console.log(chalk.white(`  • ${name}`)));
    }
    
    if (skipped.length > 0) {
      console.log(chalk.yellow(`\n⚠️  Skipped ${skipped.length} existing component(s):\n`));
      skipped.forEach(name => console.log(chalk.white(`  • ${name}`)));
      console.log(chalk.cyan('\nUse --overwrite to replace existing components'));
    }
    
    console.log('');
    
  } catch (error) {
    spinner.fail('Failed to install components');
    console.error(chalk.red('\n❌ Error:'), error);
    process.exit(1);
  }
}

async function getComponentTemplate(name: string, ext: string, _config: Config): Promise<string> {
  // Copy from actual source files in src/components/
  const packageRoot = path.join(__dirname, '../..');
  const sourceComponentPath = path.join(packageRoot, 'components', `${name}.ts`);
  
  try {
    // Read the actual source file
    if (await fs.pathExists(sourceComponentPath)) {
      let content = await fs.readFile(sourceComponentPath, 'utf-8');
      
      // If user wants JS, we'd need to transpile (for now just copy as-is)
      // In production, you'd use TypeScript API to transpile
      if (ext === 'js') {
        // For now, just change imports from .ts to .js in the content
        content = content.replace(/from ['"](.+)\.ts['"]/g, "from '$1.js'");
      }
      
      return content;
    }
  } catch (error) {
    console.warn(`Warning: Could not read source file for ${name}`);
  }
  
  // Fallback: return placeholder
  return `// Component ${name} not found\n// Please check the component name and try again\n`;
}
