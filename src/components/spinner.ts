import { cn } from '../lib/utils';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export class Spinner {
  private element: HTMLDivElement;
  private props: SpinnerProps;

  constructor(props: SpinnerProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const spinner = document.createElement('div');
    spinner.setAttribute('role', 'status');
    spinner.setAttribute('aria-label', 'Loading');
    
    const sizeClasses = {
      sm: 'h-4 w-4 border-2',
      md: 'h-8 w-8 border-2',
      lg: 'h-12 w-12 border-3'
    };
    
    const size = this.props.size || 'md';
    
    const baseClasses = 'inline-block animate-spin rounded-full border-solid border-[var(--primary)] border-r-transparent';
    
    spinner.className = cn(
      baseClasses,
      sizeClasses[size],
      this.props.className
    );
    
    const srOnly = document.createElement('span');
    srOnly.className = 'sr-only';
    srOnly.textContent = 'Loading...';
    spinner.appendChild(srOnly);
    
    return spinner;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createSpinner(props: SpinnerProps = {}): Spinner {
  return new Spinner(props);
}
