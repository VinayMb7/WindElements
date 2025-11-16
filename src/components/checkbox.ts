import { cn } from '../lib/utils';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  value?: string;
  className?: string;
  onChange?: (checked: boolean, event: Event) => void;
}

export class Checkbox {
  private element: HTMLButtonElement;
  private input: HTMLInputElement;
  private props: CheckboxProps;
  private isChecked: boolean;

  constructor(props: CheckboxProps = {}) {
    this.props = props;
    this.isChecked = props.checked ?? props.defaultChecked ?? false;
    this.element = this.render();
    this.input = this.createHiddenInput();
  }

  private render(): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('role', 'checkbox');
    button.setAttribute('aria-checked', String(this.isChecked));
    
    const baseClasses = 'peer h-4 w-4 shrink-0 rounded-sm border border-[var(--primary)] shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[var(--primary)] data-[state=checked]:text-[var(--primary-foreground)]';
    
    button.className = cn(baseClasses, this.props.className);
    
    if (this.props.disabled) {
      button.disabled = true;
    }
    
    if (this.props.id) {
      button.id = this.props.id;
    }
    
    button.dataset.state = this.isChecked ? 'checked' : 'unchecked';
    
    // Add checkmark icon
    if (this.isChecked) {
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
    }
    
    button.addEventListener('click', this.handleClick);
    
    return button;
  }

  private createHiddenInput(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = this.isChecked;
    input.style.position = 'absolute';
    input.style.opacity = '0';
    input.style.pointerEvents = 'none';
    
    if (this.props.name) input.name = this.props.name;
    if (this.props.value) input.value = this.props.value;
    if (this.props.required) input.required = true;
    
    return input;
  }

  private handleClick = (event: Event): void => {
    if (this.props.disabled) return;
    
    this.isChecked = !this.isChecked;
    this.element.setAttribute('aria-checked', String(this.isChecked));
    this.element.dataset.state = this.isChecked ? 'checked' : 'unchecked';
    this.input.checked = this.isChecked;
    
    if (this.isChecked) {
      this.element.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="h-3.5 w-3.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
    } else {
      this.element.innerHTML = '';
    }
    
    if (this.props.onChange) {
      this.props.onChange(this.isChecked, event);
    }
  };

  getElement(): HTMLButtonElement {
    return this.element;
  }

  getHiddenInput(): HTMLInputElement {
    return this.input;
  }

  isCheckedState(): boolean {
    return this.isChecked;
  }

  setChecked(checked: boolean): void {
    if (this.isChecked === checked) return;
    this.handleClick(new Event('click'));
  }

  destroy(): void {
    this.element.removeEventListener('click', this.handleClick);
    this.element.remove();
    this.input.remove();
  }
}

export function createCheckbox(props: CheckboxProps = {}): Checkbox {
  return new Checkbox(props);
}
