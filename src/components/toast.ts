import { cn, Portal } from '../lib/utils';

export interface ToastProps {
  variant?: 'default' | 'destructive';
  title?: string;
  description?: string;
  duration?: number;
  className?: string;
  onClose?: () => void;
}

export class Toast {
  private element: HTMLDivElement;
  private props: ToastProps;
  private portal: Portal;
  private timeout?: number;

  constructor(props: ToastProps = {}) {
    this.props = props;
    this.element = this.render();
    this.portal = new Portal();
  }

  private render(): HTMLDivElement {
    const toast = document.createElement('div');
    
    const baseClasses = 'group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border border-[var(--border)] p-4 pr-6 shadow-lg transition-all data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full';
    
    const variantClasses = {
      default: 'bg-[var(--background)] text-[var(--foreground)]',
      destructive: 'destructive group border-[var(--destructive)] bg-[var(--destructive)] text-[var(--destructive-foreground)]'
    };
    
    const variant = this.props.variant || 'default';
    
    toast.className = cn(baseClasses, variantClasses[variant], this.props.className);
    toast.setAttribute('data-state', 'closed');
    toast.style.display = 'none';
    
    const content = document.createElement('div');
    content.className = 'grid gap-1';
    
    if (this.props.title) {
      const title = document.createElement('div');
      title.className = 'text-sm font-semibold [&+div]:text-xs';
      title.textContent = this.props.title;
      content.appendChild(title);
    }
    
    if (this.props.description) {
      const description = document.createElement('div');
      description.className = 'text-sm opacity-90';
      description.textContent = this.props.description;
      content.appendChild(description);
    }
    
    toast.appendChild(content);
    
    // Close button
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'absolute right-1 top-1 rounded-md p-1 text-[var(--foreground)]/50 opacity-0 transition-opacity hover:text-[var(--foreground)] focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100';
    closeButton.innerHTML = '×';
    closeButton.style.fontSize = '20px';
    closeButton.addEventListener('click', () => this.close());
    
    toast.appendChild(closeButton);
    
    return toast;
  }

  show(): void {
    this.portal.append(this.element);
    this.element.style.display = 'flex';
    this.element.setAttribute('data-state', 'open');
    
    const duration = this.props.duration !== undefined ? this.props.duration : 5000;
    
    if (duration > 0) {
      this.timeout = window.setTimeout(() => this.close(), duration);
    }
  }

  close(): void {
    this.element.setAttribute('data-state', 'closed');
    
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    
    setTimeout(() => {
      this.element.style.display = 'none';
      this.portal.remove(this.element);
      if (this.props.onClose) {
        this.props.onClose();
      }
    }, 150);
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.close();
    this.element.remove();
  }
}

export class Toaster {
  private container: HTMLDivElement;
  private toasts: Toast[] = [];
  private portal: Portal;

  constructor() {
    this.container = this.createContainer();
    this.portal = new Portal();
    this.portal.append(this.container);
  }

  private createContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]';
    return container;
  }

  toast(props: ToastProps): Toast {
    const toast = new Toast({
      ...props,
      onClose: () => {
        this.removeToast(toast);
        if (props.onClose) {
          props.onClose();
        }
      }
    });
    
    this.toasts.push(toast);
    this.container.appendChild(toast.getElement());
    toast.show();
    
    return toast;
  }

  private removeToast(toast: Toast): void {
    const index = this.toasts.indexOf(toast);
    if (index > -1) {
      this.toasts.splice(index, 1);
    }
  }

  destroy(): void {
    this.toasts.forEach(toast => toast.destroy());
    this.portal.remove(this.container);
    this.container.remove();
  }
}

export function createToast(props: ToastProps = {}): Toast {
  return new Toast(props);
}

export function createToaster(): Toaster {
  return new Toaster();
}
