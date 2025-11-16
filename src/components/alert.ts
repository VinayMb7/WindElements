import { cn } from '../lib/utils';

export interface AlertProps {
  variant?: 'default' | 'destructive';
  className?: string;
  children?: HTMLElement | HTMLElement[];
}

export class Alert {
  private element: HTMLDivElement;
  private props: AlertProps;

  constructor(props: AlertProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const alert = document.createElement('div');
    
    const baseClasses = 'relative w-full rounded-[var(--radius)] border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-[var(--foreground)] [&>svg~*]:pl-7';
    
    const variantClasses = {
      default: 'bg-[var(--background)] text-[var(--foreground)]',
      destructive: 'border-[var(--destructive)]/50 text-[var(--destructive)] dark:border-[var(--destructive)] [&>svg]:text-[var(--destructive)]'
    };
    
    const variant = this.props.variant || 'default';
    
    alert.className = cn(
      baseClasses,
      variantClasses[variant],
      this.props.className
    );
    
    alert.setAttribute('role', 'alert');
    
    if (this.props.children) {
      if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => alert.appendChild(child));
      } else {
        alert.appendChild(this.props.children);
      }
    }
    
    return alert;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export class AlertTitle {
  private element: HTMLHeadingElement;
  private props: { className?: string; children?: string | HTMLElement };

  constructor(props: { className?: string; children?: string | HTMLElement } = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLHeadingElement {
    const title = document.createElement('h5');
    title.className = cn('mb-1 font-medium leading-none tracking-tight', this.props.className);
    
    if (this.props.children) {
      if (typeof this.props.children === 'string') {
        title.appendChild(document.createTextNode(this.props.children));
      } else {
        title.appendChild(this.props.children);
      }
    }
    
    return title;
  }

  getElement(): HTMLHeadingElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export class AlertDescription {
  private element: HTMLDivElement;
  private props: { className?: string; children?: string | HTMLElement };

  constructor(props: { className?: string; children?: string | HTMLElement } = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const desc = document.createElement('div');
    desc.className = cn('text-sm [&_p]:leading-relaxed', this.props.className);
    
    if (this.props.children) {
      if (typeof this.props.children === 'string') {
        desc.appendChild(document.createTextNode(this.props.children));
      } else {
        desc.appendChild(this.props.children);
      }
    }
    
    return desc;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createAlert(props: AlertProps = {}): Alert {
  return new Alert(props);
}

export function createAlertTitle(props: { className?: string; children?: string | HTMLElement } = {}): AlertTitle {
  return new AlertTitle(props);
}

export function createAlertDescription(props: { className?: string; children?: string | HTMLElement } = {}): AlertDescription {
  return new AlertDescription(props);
}
