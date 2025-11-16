import { cn, Portal } from '../lib/utils';

export interface NotificationProps {
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  action?: {
    label: string;
    onClick: () => void;
  };
}

class NotificationItem {
  private element: HTMLDivElement;
  private props: NotificationProps;
  private timeout?: number;

  constructor(props: NotificationProps, onClose: () => void) {
    this.props = {
      variant: 'default',
      duration: 5000,
      position: 'top-right',
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
    const notification = document.createElement('div');
    notification.className = cn(
      'group pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-lg transition-all',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-80 data-[state=open]:fade-in-0',
      'data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full',
      this.getVariantClasses()
    );
    notification.setAttribute('role', 'alert');
    notification.setAttribute('data-state', 'open');

    const content = document.createElement('div');
    content.className = 'p-4';

    const header = document.createElement('div');
    header.className = 'flex items-start gap-3';

    // Icon
    const icon = this.createIcon();
    if (icon) {
      header.appendChild(icon);
    }

    const textContent = document.createElement('div');
    textContent.className = 'flex-1 space-y-1';

    const title = document.createElement('div');
    title.className = 'font-semibold';
    title.textContent = this.props.title;
    textContent.appendChild(title);

    if (this.props.description) {
      const description = document.createElement('div');
      description.className = 'text-sm opacity-90';
      description.textContent = this.props.description;
      textContent.appendChild(description);
    }

    header.appendChild(textContent);

    // Close button
    const closeButton = document.createElement('button');
    closeButton.className = 'rounded-md p-1 opacity-70 transition-opacity hover:opacity-100';
    closeButton.innerHTML = '×';
    closeButton.style.fontSize = '18px';
    closeButton.addEventListener('click', onClose);
    header.appendChild(closeButton);

    content.appendChild(header);

    // Action button
    if (this.props.action) {
      const actionButton = document.createElement('button');
      actionButton.className = 'mt-2 text-sm font-medium underline hover:no-underline';
      actionButton.textContent = this.props.action.label;
      actionButton.addEventListener('click', () => {
        this.props.action!.onClick();
        onClose();
      });
      content.appendChild(actionButton);
    }

    notification.appendChild(content);
    return notification;
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
    icon.className = 'text-xl';
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

class NotificationManager {
  private containers: Map<string, HTMLDivElement> = new Map();
  private portal: Portal;
  private notifications: Map<number, NotificationItem> = new Map();
  private nextId: number = 1;

  constructor() {
    this.portal = new Portal();
  }

  private getContainer(position: string): HTMLDivElement {
    if (!this.containers.has(position)) {
      const container = this.createContainer(position);
      this.portal.append(container);
      this.containers.set(position, container);
    }
    return this.containers.get(position)!;
  }

  private createContainer(position: string): HTMLDivElement {
    const container = document.createElement('div');
    container.className = cn(
      'fixed z-[100] flex max-h-screen w-full flex-col gap-2 p-4 md:max-w-[420px]',
      {
        'top-0 left-0': position === 'top-left',
        'top-0 right-0': position === 'top-right',
        'bottom-0 left-0': position === 'bottom-left',
        'bottom-0 right-0': position === 'bottom-right',
        'top-0 left-1/2 -translate-x-1/2': position === 'top-center',
        'bottom-0 left-1/2 -translate-x-1/2': position === 'bottom-center',
      }
    );
    return container;
  }

  notify(props: NotificationProps): number {
    const id = this.nextId++;
    const position = props.position || 'top-right';
    
    const notification = new NotificationItem(props, () => {
      this.dismiss(id);
    });

    this.notifications.set(id, notification);
    const container = this.getContainer(position);
    container.appendChild(notification.getElement());

    return id;
  }

  dismiss(id: number): void {
    const notification = this.notifications.get(id);
    if (!notification) return;

    notification.close();
    
    setTimeout(() => {
      notification.getElement().remove();
      this.notifications.delete(id);
    }, 300);
  }

  dismissAll(): void {
    this.notifications.forEach((_, id) => this.dismiss(id));
  }
}

// Singleton instance
let notificationInstance: NotificationManager | null = null;

function getNotificationManager(): NotificationManager {
  if (!notificationInstance) {
    notificationInstance = new NotificationManager();
  }
  return notificationInstance;
}

export const notification = {
  show: (props: NotificationProps): number => getNotificationManager().notify(props),
  success: (title: string, description?: string): number => 
    getNotificationManager().notify({ title, description, variant: 'success' }),
  error: (title: string, description?: string): number => 
    getNotificationManager().notify({ title, description, variant: 'error' }),
  warning: (title: string, description?: string): number => 
    getNotificationManager().notify({ title, description, variant: 'warning' }),
  info: (title: string, description?: string): number => 
    getNotificationManager().notify({ title, description, variant: 'info' }),
  dismiss: (id: number): void => getNotificationManager().dismiss(id),
  dismissAll: (): void => getNotificationManager().dismissAll()
};
