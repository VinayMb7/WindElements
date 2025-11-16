import { cn, Portal } from '../lib/utils';

export interface SonnerToastProps {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
}

class SonnerToast {
  private element: HTMLDivElement;
  private props: SonnerToastProps;
  private timeout?: number;

  constructor(props: SonnerToastProps, onClose: () => void) {
    this.props = {
      duration: props.duration ?? 4000,
      variant: props.variant ?? 'default',
      ...props
    };
    this.element = this.render(onClose);
    
    if (this.props.duration && this.props.duration > 0) {
      this.timeout = window.setTimeout(() => {
        onClose();
      }, this.props.duration);
    }
  }

  private render(onClose: () => void): HTMLDivElement {
    const toast = document.createElement('div');
    toast.className = cn(
      'group pointer-events-auto relative flex w-full items-center justify-between gap-3 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-80 data-[state=open]:fade-in-0',
      'data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full',
      this.getVariantClasses()
    );
    toast.setAttribute('role', 'alert');
    toast.setAttribute('data-state', 'open');

    // Icon
    const icon = this.createIcon();
    if (icon) {
      toast.appendChild(icon);
    }

    // Content
    const content = document.createElement('div');
    content.className = 'flex-1 grid gap-1';

    if (this.props.title) {
      const title = document.createElement('div');
      title.className = 'text-sm font-semibold';
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

    // Action button
    if (this.props.action) {
      const button = document.createElement('button');
      button.className = 'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-[var(--secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50';
      button.textContent = this.props.action.label;
      button.addEventListener('click', () => {
        this.props.action!.onClick();
        onClose();
      });
      toast.appendChild(button);
    }

    // Close button
    const closeButton = document.createElement('button');
    closeButton.className = 'absolute right-2 top-2 rounded-md p-1 opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2';
    closeButton.innerHTML = '×';
    closeButton.style.fontSize = '18px';
    closeButton.addEventListener('click', onClose);
    toast.appendChild(closeButton);

    return toast;
  }

  private createIcon(): HTMLSpanElement | null {
    const icons: Record<string, string> = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    if (this.props.variant === 'default') return null;

    const icon = document.createElement('span');
    icon.className = 'text-lg';
    icon.textContent = icons[this.props.variant!] || '';
    return icon;
  }

  private getVariantClasses(): string {
    const variants: Record<string, string> = {
      default: 'border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]',
      success: 'border-green-500 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-100',
      error: 'border-red-500 bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-100',
      warning: 'border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-900/20 dark:text-yellow-100',
      info: 'border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100'
    };
    return variants[this.props.variant!] || variants.default;
  }

  close(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.element.setAttribute('data-state', 'closed');
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

class SonnerManager {
  private container: HTMLDivElement;
  private portal: Portal;
  private toasts: Map<number, SonnerToast> = new Map();
  private nextId: number = 1;

  constructor() {
    this.portal = new Portal();
    this.container = this.createContainer();
    this.portal.append(this.container);
  }

  private createContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'fixed top-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]';
    container.setAttribute('data-sonner-container', '');
    return container;
  }

  toast(props: SonnerToastProps): number {
    const id = this.nextId++;
    
    const toast = new SonnerToast(props, () => {
      this.dismiss(id);
    });

    this.toasts.set(id, toast);
    this.container.appendChild(toast.getElement());

    return id;
  }

  dismiss(id: number): void {
    const toast = this.toasts.get(id);
    if (!toast) return;

    toast.close();
    
    setTimeout(() => {
      toast.getElement().remove();
      this.toasts.delete(id);
    }, 300);
  }

  dismissAll(): void {
    this.toasts.forEach((_, id) => this.dismiss(id));
  }
}

// Singleton instance
let sonnerInstance: SonnerManager | null = null;

function getSonner(): SonnerManager {
  if (!sonnerInstance) {
    sonnerInstance = new SonnerManager();
  }
  return sonnerInstance;
}

export const sonner = {
  toast: (props: SonnerToastProps): number => getSonner().toast(props),
  success: (title: string, description?: string): number => 
    getSonner().toast({ title, description, variant: 'success' }),
  error: (title: string, description?: string): number => 
    getSonner().toast({ title, description, variant: 'error' }),
  warning: (title: string, description?: string): number => 
    getSonner().toast({ title, description, variant: 'warning' }),
  info: (title: string, description?: string): number => 
    getSonner().toast({ title, description, variant: 'info' }),
  dismiss: (id: number): void => getSonner().dismiss(id),
  dismissAll: (): void => getSonner().dismissAll()
};
