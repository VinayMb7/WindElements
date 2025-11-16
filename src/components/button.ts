import { cn } from '../lib/utils';

export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: MouseEvent) => void;
  children?: string | HTMLElement | HTMLElement[];
}

export class Button {
  private element: HTMLButtonElement;
  private props: ButtonProps;

  constructor(props: ButtonProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = this.props.type || 'button';
    
    const baseClasses = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0';
    
    const variantClasses = {
      default: 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow hover:bg-[var(--primary)]/90',
      destructive: 'bg-[var(--destructive)] text-[var(--primary-foreground)] shadow-sm hover:bg-[var(--destructive)]/90',
      outline: 'border border-[var(--border)] bg-[var(--background)] shadow-sm hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]',
      secondary: 'bg-[var(--secondary)] text-[var(--secondary-foreground)] shadow-sm hover:bg-[var(--secondary)]/80',
      ghost: 'hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]',
      link: 'text-[var(--primary)] underline-offset-4 hover:underline'
    };
    
    const sizeClasses = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-[calc(var(--radius)-2px)] px-3 text-xs',
      lg: 'h-10 rounded-[calc(var(--radius)-2px)] px-8',
      icon: 'h-9 w-9'
    };
    
    const variant = this.props.variant || 'default';
    const size = this.props.size || 'default';
    
    button.className = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      this.props.className
    );
    
    if (this.props.disabled) {
      button.disabled = true;
    }
    
    if (this.props.loading) {
      button.disabled = true;
      const spinner = this.createSpinner();
      button.appendChild(spinner);
    }
    
    if (this.props.children) {
      if (typeof this.props.children === 'string') {
        button.appendChild(document.createTextNode(this.props.children));
      } else if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => button.appendChild(child));
      } else {
        button.appendChild(this.props.children);
      }
    }
    
    if (this.props.onClick) {
      button.addEventListener('click', this.props.onClick);
    }
    
    return button;
  }

  private createSpinner(): HTMLElement {
    const spinner = document.createElement('span');
    spinner.className = 'inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent';
    spinner.setAttribute('role', 'status');
    spinner.innerHTML = '<span class="sr-only">Loading...</span>';
    return spinner;
  }

  getElement(): HTMLButtonElement {
    return this.element;
  }

  update(props: Partial<ButtonProps>): void {
    this.props = { ...this.props, ...props };
    const newElement = this.render();
    this.element.replaceWith(newElement);
    this.element = newElement;
  }

  destroy(): void {
    if (this.props.onClick) {
      this.element.removeEventListener('click', this.props.onClick);
    }
    this.element.remove();
  }
}

// Factory function for easier usage
export function createButton(props: ButtonProps = {}): Button {
  return new Button(props);
}
