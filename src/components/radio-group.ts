import { cn } from '../lib/utils';

export interface RadioGroupProps {
  name: string;
  defaultValue?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export interface RadioItemProps {
  value: string;
  id?: string;
  disabled?: boolean;
  className?: string;
}

export class RadioGroup {
  private element: HTMLDivElement;
  private props: RadioGroupProps;
  private items: Map<string, RadioItem> = new Map();
  private selectedValue: string | null = null;

  constructor(props: RadioGroupProps) {
    this.props = props;
    this.selectedValue = props.defaultValue || null;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const group = document.createElement('div');
    group.className = cn('grid gap-2', this.props.className);
    group.setAttribute('role', 'radiogroup');
    return group;
  }

  addItem(item: RadioItem): void {
    this.items.set(item.getValue(), item);
    this.element.appendChild(item.getElement());
    
    item.onSelect(() => this.handleItemSelect(item.getValue()));
    
    if (this.selectedValue === item.getValue()) {
      item.setChecked(true);
    }
  }

  private handleItemSelect(value: string): void {
    // Uncheck all other items
    this.items.forEach((item, itemValue) => {
      if (itemValue !== value) {
        item.setChecked(false);
      }
    });
    
    this.selectedValue = value;
    
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  getValue(): string | null {
    return this.selectedValue;
  }

  setValue(value: string): void {
    const item = this.items.get(value);
    if (item) {
      this.handleItemSelect(value);
      item.setChecked(true);
    }
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.items.forEach(item => item.destroy());
    this.element.remove();
  }
}

export class RadioItem {
  private element: HTMLDivElement;
  private input: HTMLInputElement;
  private visual: HTMLDivElement;
  private props: RadioItemProps;
  private selectCallback?: () => void;

  constructor(groupName: string, props: RadioItemProps) {
    this.props = props;
    this.input = this.createInput(groupName);
    this.visual = this.createVisual();
    this.element = this.render();
  }

  private createInput(groupName: string): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = groupName;
    input.value = this.props.value;
    input.id = this.props.id || `radio-${this.props.value}`;
    input.className = 'sr-only';
    
    if (this.props.disabled) {
      input.disabled = true;
    }
    
    input.addEventListener('change', () => {
      if (this.selectCallback) {
        this.selectCallback();
      }
    });
    
    return input;
  }

  private createVisual(): HTMLDivElement {
    const visual = document.createElement('div');
    visual.className = cn(
      'aspect-square h-4 w-4 rounded-full border border-[var(--primary)] text-[var(--primary)] shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50',
      this.props.className
    );
    
    const indicator = document.createElement('div');
    indicator.className = 'flex items-center justify-center';
    
    const dot = document.createElement('div');
    dot.className = 'h-2.5 w-2.5 rounded-full bg-[var(--primary)] hidden';
    dot.setAttribute('data-indicator', 'true');
    
    indicator.appendChild(dot);
    visual.appendChild(indicator);
    
    visual.addEventListener('click', () => {
      if (!this.props.disabled) {
        this.input.click();
      }
    });
    
    return visual;
  }

  private render(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'flex items-center space-x-2';
    
    container.appendChild(this.input);
    container.appendChild(this.visual);
    
    return container;
  }

  onSelect(callback: () => void): void {
    this.selectCallback = callback;
  }

  setChecked(checked: boolean): void {
    this.input.checked = checked;
    const indicator = this.visual.querySelector('[data-indicator]') as HTMLDivElement;
    if (indicator) {
      indicator.style.display = checked ? 'block' : 'none';
    }
  }

  getValue(): string {
    return this.props.value;
  }

  getInput(): HTMLInputElement {
    return this.input;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createRadioGroup(props: RadioGroupProps): RadioGroup {
  return new RadioGroup(props);
}

export function createRadioItem(groupName: string, props: RadioItemProps): RadioItem {
  return new RadioItem(groupName, props);
}
