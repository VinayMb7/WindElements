import { cn } from '../lib/utils';

export interface ToggleGroupProps {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  className?: string;
  onValueChange?: (value: string | string[]) => void;
}

export interface ToggleGroupItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children?: string | HTMLElement | HTMLElement[];
}

export class ToggleGroup {
  private element: HTMLDivElement;
  private props: ToggleGroupProps;
  private items: Map<string, ToggleGroupItem> = new Map();
  private selectedValues: Set<string> = new Set();

  constructor(props: ToggleGroupProps = {}) {
    this.props = props;
    
    if (props.defaultValue) {
      if (Array.isArray(props.defaultValue)) {
        props.defaultValue.forEach(v => this.selectedValues.add(v));
      } else {
        this.selectedValues.add(props.defaultValue);
      }
    }
    
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const group = document.createElement('div');
    group.className = cn('inline-flex rounded-md shadow-sm', this.props.className);
    group.setAttribute('role', 'group');
    group.setAttribute('data-type', this.props.type || 'single');
    return group;
  }

  addItem(item: ToggleGroupItem): void {
    this.items.set(item.getValue(), item);
    this.element.appendChild(item.getElement());
    
    if (this.selectedValues.has(item.getValue())) {
      item.setPressed(true);
    }
    
    item.onClick(() => this.handleItemClick(item.getValue()));
  }

  private handleItemClick(value: string): void {
    const type = this.props.type || 'single';
    
    if (type === 'single') {
      // Single selection - deselect all others
      this.items.forEach((item, itemValue) => {
        if (itemValue !== value) {
          item.setPressed(false);
          this.selectedValues.delete(itemValue);
        } else {
          const isPressed = !item.isItemPressed();
          item.setPressed(isPressed);
          if (isPressed) {
            this.selectedValues.add(value);
          } else {
            this.selectedValues.delete(value);
          }
        }
      });
      
      if (this.props.onValueChange) {
        const selectedValue = this.selectedValues.size > 0 ? Array.from(this.selectedValues)[0] : '';
        this.props.onValueChange(selectedValue);
      }
    } else {
      // Multiple selection
      const item = this.items.get(value);
      if (item) {
        const isPressed = !item.isItemPressed();
        item.setPressed(isPressed);
        
        if (isPressed) {
          this.selectedValues.add(value);
        } else {
          this.selectedValues.delete(value);
        }
        
        if (this.props.onValueChange) {
          this.props.onValueChange(Array.from(this.selectedValues));
        }
      }
    }
  }

  getValue(): string | string[] {
    const values = Array.from(this.selectedValues);
    return this.props.type === 'single' ? (values[0] || '') : values;
  }

  setValue(value: string | string[]): void {
    this.selectedValues.clear();
    
    if (Array.isArray(value)) {
      value.forEach(v => this.selectedValues.add(v));
    } else if (value) {
      this.selectedValues.add(value);
    }
    
    this.items.forEach((item, itemValue) => {
      item.setPressed(this.selectedValues.has(itemValue));
    });
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.items.forEach(item => item.destroy());
    this.element.remove();
  }
}

export class ToggleGroupItem {
  private element: HTMLButtonElement;
  private props: ToggleGroupItemProps;
  private isPressed: boolean = false;
  private clickCallback?: () => void;

  constructor(props: ToggleGroupItemProps) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLButtonElement {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = cn(
      'inline-flex items-center justify-center text-sm font-medium transition-colors hover:bg-[var(--muted)] hover:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[var(--accent)] data-[state=on]:text-[var(--accent-foreground)] px-3 py-2',
      this.props.className
    );
    item.setAttribute('data-state', 'off');
    item.setAttribute('data-value', this.props.value);
    
    if (this.props.disabled) {
      item.disabled = true;
    }
    
    if (this.props.children) {
      if (typeof this.props.children === 'string') {
        item.textContent = this.props.children;
      } else if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => item.appendChild(child));
      } else {
        item.appendChild(this.props.children);
      }
    }
    
    item.addEventListener('click', () => {
      if (this.clickCallback) {
        this.clickCallback();
      }
    });
    
    return item;
  }

  onClick(callback: () => void): void {
    this.clickCallback = callback;
  }

  setPressed(pressed: boolean): void {
    this.isPressed = pressed;
    this.element.setAttribute('data-state', pressed ? 'on' : 'off');
  }

  isItemPressed(): boolean {
    return this.isPressed;
  }

  getValue(): string {
    return this.props.value;
  }

  getElement(): HTMLButtonElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createToggleGroup(props: ToggleGroupProps = {}): ToggleGroup {
  return new ToggleGroup(props);
}

export function createToggleGroupItem(props: ToggleGroupItemProps): ToggleGroupItem {
  return new ToggleGroupItem(props);
}
