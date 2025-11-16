import { cn } from '../lib/utils';

export interface ToggleProps {
  pressed?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: string | HTMLElement | HTMLElement[];
  onPressedChange?: (pressed: boolean) => void;
}

export class Toggle {
  private element: HTMLButtonElement;
  private props: ToggleProps;
  private isPressed: boolean;

  constructor(props: ToggleProps = {}) {
    this.props = props;
    this.isPressed = props.pressed || false;
    this.element = this.render();
  }

  private render(): HTMLButtonElement {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    
    const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-[var(--muted)] hover:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[var(--accent)] data-[state=on]:text-[var(--accent-foreground)]';
    
    const variantClasses = {
      default: 'bg-transparent',
      outline: 'border border-[var(--input)] bg-transparent shadow-sm hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]'
    };
    
    const sizeClasses = {
      sm: 'h-8 px-2',
      md: 'h-9 px-3',
      lg: 'h-10 px-4'
    };
    
    const variant = this.props.variant || 'default';
    const size = this.props.size || 'md';
    
    toggle.className = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      this.props.className
    );
    
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('aria-pressed', String(this.isPressed));
    toggle.setAttribute('data-state', this.isPressed ? 'on' : 'off');
    
    if (this.props.disabled) {
      toggle.disabled = true;
    }
    
    if (this.props.children) {
      if (typeof this.props.children === 'string') {
        toggle.textContent = this.props.children;
      } else if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => toggle.appendChild(child));
      } else {
        toggle.appendChild(this.props.children);
      }
    }
    
    toggle.addEventListener('click', () => this.toggle());
    
    return toggle;
  }

  toggle(): void {
    this.setPressed(!this.isPressed);
  }

  setPressed(pressed: boolean): void {
    this.isPressed = pressed;
    this.element.setAttribute('aria-pressed', String(pressed));
    this.element.setAttribute('data-state', pressed ? 'on' : 'off');
    
    if (this.props.onPressedChange) {
      this.props.onPressedChange(pressed);
    }
  }

  isTogglePressed(): boolean {
    return this.isPressed;
  }

  getElement(): HTMLButtonElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createToggle(props: ToggleProps = {}): Toggle {
  return new Toggle(props);
}
