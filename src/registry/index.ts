export interface ComponentRegistry {
  name: string;
  files: string[];
  dependencies: string[];
  devDependencies?: string[];
}

export const REGISTRY: Record<string, ComponentRegistry> = {
  'accordion': {
    name: 'Accordion',
    files: ['accordion.ts'],
    dependencies: ['utils']
  },
  'alert': {
    name: 'Alert',
    files: ['alert.ts'],
    dependencies: ['utils']
  },
  'alert-dialog': {
    name: 'AlertDialog',
    files: ['alert-dialog.ts'],
    dependencies: ['utils', 'button', 'dialog']
  },
  'aspect-ratio': {
    name: 'AspectRatio',
    files: ['aspect-ratio.ts'],
    dependencies: ['utils']
  },
  'avatar': {
    name: 'Avatar',
    files: ['avatar.ts'],
    dependencies: ['utils']
  },
  'badge': {
    name: 'Badge',
    files: ['badge.ts'],
    dependencies: ['utils']
  },
  'breadcrumb': {
    name: 'Breadcrumb',
    files: ['breadcrumb.ts'],
    dependencies: ['utils']
  },
  'button': {
    name: 'Button',
    files: ['button.ts'],
    dependencies: ['utils']
  },
  'button-group': {
    name: 'ButtonGroup',
    files: ['button-group.ts'],
    dependencies: ['utils', 'button']
  },
  'calendar': {
    name: 'Calendar',
    files: ['calendar.ts'],
    dependencies: ['utils', 'button']
  },
  'card': {
    name: 'Card',
    files: ['card.ts'],
    dependencies: ['utils']
  },
  'carousel': {
    name: 'Carousel',
    files: ['carousel.ts'],
    dependencies: ['utils', 'button']
  },
  'chart': {
    name: 'Chart',
    files: ['chart.ts'],
    dependencies: ['utils'],
    devDependencies: ['chart.js']
  },
  'checkbox': {
    name: 'Checkbox',
    files: ['checkbox.ts'],
    dependencies: ['utils']
  },
  'collapsible': {
    name: 'Collapsible',
    files: ['collapsible.ts'],
    dependencies: ['utils']
  },
  'combobox': {
    name: 'Combobox',
    files: ['combobox.ts'],
    dependencies: ['utils', 'input', 'popover']
  },
  'command': {
    name: 'Command',
    files: ['command.ts'],
    dependencies: ['utils', 'dialog', 'input']
  },
  'context-menu': {
    name: 'ContextMenu',
    files: ['context-menu.ts'],
    dependencies: ['utils']
  },
  'data-table': {
    name: 'DataTable',
    files: ['data-table.ts'],
    dependencies: ['utils', 'table', 'button', 'input', 'select']
  },
  'date-picker': {
    name: 'DatePicker',
    files: ['date-picker.ts'],
    dependencies: ['utils', 'calendar', 'popover', 'input', 'button']
  },
  'dialog': {
    name: 'Dialog',
    files: ['dialog.ts'],
    dependencies: ['utils']
  },
  'drawer': {
    name: 'Drawer',
    files: ['drawer.ts'],
    dependencies: ['utils']
  },
  'dropdown-menu': {
    name: 'DropdownMenu',
    files: ['dropdown-menu.ts'],
    dependencies: ['utils']
  },
  'empty': {
    name: 'Empty',
    files: ['empty.ts'],
    dependencies: ['utils']
  },
  'field': {
    name: 'Field',
    files: ['field.ts'],
    dependencies: ['utils', 'label']
  },
  'form': {
    name: 'Form',
    files: ['form.ts'],
    dependencies: ['utils', 'field', 'button']
  },
  'hover-card': {
    name: 'HoverCard',
    files: ['hover-card.ts'],
    dependencies: ['utils', 'popover']
  },
  'input': {
    name: 'Input',
    files: ['input.ts'],
    dependencies: ['utils']
  },
  'input-group': {
    name: 'InputGroup',
    files: ['input-group.ts'],
    dependencies: ['utils', 'input']
  },
  'input-otp': {
    name: 'InputOTP',
    files: ['input-otp.ts'],
    dependencies: ['utils', 'input']
  },
  'item': {
    name: 'Item',
    files: ['item.ts'],
    dependencies: ['utils']
  },
  'kbd': {
    name: 'Kbd',
    files: ['kbd.ts'],
    dependencies: ['utils']
  },
  'label': {
    name: 'Label',
    files: ['label.ts'],
    dependencies: ['utils']
  },
  'menubar': {
    name: 'Menubar',
    files: ['menubar.ts'],
    dependencies: ['utils']
  },
  'native-select': {
    name: 'NativeSelect',
    files: ['native-select.ts'],
    dependencies: ['utils']
  },
  'navigation-menu': {
    name: 'NavigationMenu',
    files: ['navigation-menu.ts'],
    dependencies: ['utils']
  },
  'pagination': {
    name: 'Pagination',
    files: ['pagination.ts'],
    dependencies: ['utils', 'button']
  },
  'popover': {
    name: 'Popover',
    files: ['popover.ts'],
    dependencies: ['utils']
  },
  'progress': {
    name: 'Progress',
    files: ['progress.ts'],
    dependencies: ['utils']
  },
  'radio-group': {
    name: 'RadioGroup',
    files: ['radio-group.ts'],
    dependencies: ['utils']
  },
  'resizable': {
    name: 'Resizable',
    files: ['resizable.ts'],
    dependencies: ['utils']
  },
  'scroll-area': {
    name: 'ScrollArea',
    files: ['scroll-area.ts'],
    dependencies: ['utils']
  },
  'select': {
    name: 'Select',
    files: ['select.ts'],
    dependencies: ['utils', 'popover']
  },
  'separator': {
    name: 'Separator',
    files: ['separator.ts'],
    dependencies: ['utils']
  },
  'sheet': {
    name: 'Sheet',
    files: ['sheet.ts'],
    dependencies: ['utils', 'dialog']
  },
  'sidebar': {
    name: 'Sidebar',
    files: ['sidebar.ts'],
    dependencies: ['utils', 'button', 'sheet']
  },
  'skeleton': {
    name: 'Skeleton',
    files: ['skeleton.ts'],
    dependencies: ['utils']
  },
  'slider': {
    name: 'Slider',
    files: ['slider.ts'],
    dependencies: ['utils']
  },
  'sonner': {
    name: 'Sonner',
    files: ['sonner.ts'],
    dependencies: ['utils'],
    devDependencies: ['sonner']
  },
  'spinner': {
    name: 'Spinner',
    files: ['spinner.ts'],
    dependencies: ['utils']
  },
  'switch': {
    name: 'Switch',
    files: ['switch.ts'],
    dependencies: ['utils']
  },
  'table': {
    name: 'Table',
    files: ['table.ts'],
    dependencies: ['utils']
  },
  'tabs': {
    name: 'Tabs',
    files: ['tabs.ts'],
    dependencies: ['utils']
  },
  'textarea': {
    name: 'Textarea',
    files: ['textarea.ts'],
    dependencies: ['utils']
  },
  'toast': {
    name: 'Toast',
    files: ['toast.ts'],
    dependencies: ['utils']
  },
  'toggle': {
    name: 'Toggle',
    files: ['toggle.ts'],
    dependencies: ['utils']
  },
  'toggle-group': {
    name: 'ToggleGroup',
    files: ['toggle-group.ts'],
    dependencies: ['utils', 'toggle']
  },
  'tooltip': {
    name: 'Tooltip',
    files: ['tooltip.ts'],
    dependencies: ['utils', 'popover']
  },
  'typography': {
    name: 'Typography',
    files: ['typography.ts'],
    dependencies: ['utils']
  },
  'navbar': {
    name: 'Navbar',
    files: ['navbar.ts'],
    dependencies: ['utils']
  },
  'footer': {
    name: 'Footer',
    files: ['footer.ts'],
    dependencies: ['utils']
  },
  'testimonial': {
    name: 'Testimonial',
    files: ['testimonial.ts'],
    dependencies: ['utils']
  },
  'pricing-card': {
    name: 'PricingCard',
    files: ['pricing-card.ts'],
    dependencies: ['utils']
  },
  'feature-card': {
    name: 'FeatureCard',
    files: ['feature-card.ts'],
    dependencies: ['utils']
  },
  'hero': {
    name: 'Hero',
    files: ['hero.ts'],
    dependencies: ['utils']
  },
  'stats': {
    name: 'Stats',
    files: ['stats.ts'],
    dependencies: ['utils']
  },
  'modal': {
    name: 'Modal',
    files: ['modal.ts'],
    dependencies: ['utils']
  },
  'hint': {
    name: 'Hint',
    files: ['hint.ts'],
    dependencies: ['utils']
  },
  'notification': {
    name: 'Notification',
    files: ['notification.ts'],
    dependencies: ['utils']
  },
  'chip': {
    name: 'Chip',
    files: ['chip.ts'],
    dependencies: ['utils']
  },
  'divider': {
    name: 'Divider',
    files: ['divider.ts'],
    dependencies: ['utils']
  },
  'timeline': {
    name: 'Timeline',
    files: ['timeline.ts'],
    dependencies: ['utils']
  },
  'stepper': {
    name: 'Stepper',
    files: ['stepper.ts'],
    dependencies: ['utils']
  },
  'file-upload': {
    name: 'FileUpload',
    files: ['file-upload.ts'],
    dependencies: ['utils']
  },
  'avatar-group': {
    name: 'AvatarGroup',
    files: ['avatar-group.ts'],
    dependencies: ['utils']
  },
  'rating': {
    name: 'Rating',
    files: ['rating.ts'],
    dependencies: ['utils']
  },
  'counter': {
    name: 'Counter',
    files: ['counter.ts'],
    dependencies: ['utils']
  }
};

export function getAllComponentNames(): string[] {
  return Object.keys(REGISTRY);
}

export function getComponent(name: string): ComponentRegistry | undefined {
  return REGISTRY[name.toLowerCase()];
}

export function getDependencies(name: string, resolved = new Set<string>()): string[] {
  const component = getComponent(name);
  if (!component || resolved.has(name)) {
    return [];
  }
  
  resolved.add(name);
  const deps: string[] = [];
  
  for (const dep of component.dependencies) {
    if (dep !== 'utils' && !resolved.has(dep)) {
      deps.push(...getDependencies(dep, resolved));
      deps.push(dep);
    }
  }
  
  return deps;
}
