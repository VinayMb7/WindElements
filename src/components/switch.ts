import { cn } from '../lib/utils';

export interface SwitchProps {
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

export class Switch {
  private element: HTMLButtonElement;
  private input: HTMLInputElement;
  private props: SwitchProps;
  private isChecked: boolean;

  constructor(props: SwitchProps = {}) {
    this.props = props;
    this.isChecked = props.checked ?? props.defaultChecked ?? false;
    this.element = this.render();
    this.input = this.createHiddenInput();
  }

  private render(): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('role', 'switch');
    button.setAttribute('aria-checked', String(this.isChecked));
    
    const baseClasses = 'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[var(--primary)] data-[state=unchecked]:bg-[var(--input)]';
    
    button.className = cn(baseClasses, this.props.className);
    
    if (this.props.disabled) {
      button.disabled = true;
    }
    
    if (this.props.id) {
      button.id = this.props.id;
    }
    
    button.dataset.state = this.isChecked ? 'checked' : 'unchecked';
    
    // Add thumb
    const thumb = document.createElement('span');
    thumb.className = cn(
      'pointer-events-none block h-4 w-4 rounded-full bg-[var(--background)] shadow-lg ring-0 transition-transform',
      this.isChecked ? 'translate-x-4' : 'translate-x-0'
    );
    thumb.dataset.state = this.isChecked ? 'checked' : 'unchecked';
    
    button.appendChild(thumb);
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
    
    const thumb = this.element.querySelector('span');
    if (thumb) {
      thumb.dataset.state = this.isChecked ? 'checked' : 'unchecked';
      thumb.className = cn(
        'pointer-events-none block h-4 w-4 rounded-full bg-[var(--background)] shadow-lg ring-0 transition-transform',
        this.isChecked ? 'translate-x-4' : 'translate-x-0'
      );
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

export function createSwitch(props: SwitchProps = {}): Switch {
  return new Switch(props);
}
