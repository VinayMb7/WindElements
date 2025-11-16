import { cn } from '../lib/utils';

export interface SelectProps {
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
}

export interface SelectOptionProps {
  value: string;
  label: string;
  disabled?: boolean;
}

export class Select {
  private element: HTMLSelectElement;
  private props: SelectProps;

  constructor(props: SelectProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLSelectElement {
    const select = document.createElement('select');
    
    select.className = cn(
      'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-[var(--input)] bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-[var(--background)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50',
      this.props.className
    );
    
    if (this.props.name) {
      select.name = this.props.name;
    }
    
    if (this.props.disabled) {
      select.disabled = true;
    }
    
    if (this.props.placeholder) {
      const placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = this.props.placeholder;
      placeholder.disabled = true;
      placeholder.selected = true;
      select.appendChild(placeholder);
    }
    
    select.addEventListener('change', () => {
      if (this.props.onChange) {
        this.props.onChange(select.value);
      }
    });
    
    if (this.props.defaultValue) {
      select.value = this.props.defaultValue;
    }
    
    return select;
  }

  addOption(option: SelectOptionProps): void {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    
    if (option.disabled) {
      optionElement.disabled = true;
    }
    
    this.element.appendChild(optionElement);
  }

  addOptions(options: SelectOptionProps[]): void {
    options.forEach(option => this.addOption(option));
  }

  getValue(): string {
    return this.element.value;
  }

  setValue(value: string): void {
    this.element.value = value;
  }

  getElement(): HTMLSelectElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createSelect(props: SelectProps = {}): Select {
  return new Select(props);
}
