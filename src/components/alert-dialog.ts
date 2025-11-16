import { cn, FocusTrap, Portal } from '../lib/utils';

export interface AlertDialogProps {
  className?: string;
  onOpenChange?: (open: boolean) => void;
}

export class AlertDialog {
  private overlay: HTMLDivElement;
  private container: HTMLDivElement;
  private content: HTMLDivElement;
  private props: AlertDialogProps;
  private focusTrap: FocusTrap;
  private portal: Portal;
  private isOpen: boolean = false;

  constructor(props: AlertDialogProps = {}) {
    this.props = props;
    this.overlay = this.createOverlay();
    this.container = this.createContainer();
    this.content = this.createContent();
    this.container.appendChild(this.content);
    this.focusTrap = new FocusTrap(this.content);
    this.portal = new Portal();
    
    this.setupEventListeners();
  }

  private createOverlay(): HTMLDivElement {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-50 bg-[var(--background)]/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0';
    overlay.setAttribute('data-state', 'closed');
    overlay.style.display = 'none';
    return overlay;
  }

  private createContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
    container.setAttribute('data-state', 'closed');
    container.style.display = 'none';
    return container;
  }

  private createContent(): HTMLDivElement {
    const content = document.createElement('div');
    content.className = cn(
      'relative grid w-full max-w-lg gap-4 border border-[var(--border)] bg-[var(--background)] p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg',
      this.props.className
    );
    content.setAttribute('role', 'alertdialog');
    content.setAttribute('aria-modal', 'true');
    return content;
  }

  private setupEventListeners(): void {
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        // Alert dialogs don't close on overlay click
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        // Alert dialogs don't close on Escape
      }
    });
  }

  show(): void {
    this.isOpen = true;
    this.portal.append(this.overlay);
    this.portal.append(this.container);
    
    this.overlay.style.display = 'block';
    this.container.style.display = 'flex';
    this.overlay.setAttribute('data-state', 'open');
    this.container.setAttribute('data-state', 'open');
    this.content.setAttribute('data-state', 'open');
    
    this.focusTrap.activate();
    document.body.style.overflow = 'hidden';
    
    if (this.props.onOpenChange) {
      this.props.onOpenChange(true);
    }
  }

  close(): void {
    this.isOpen = false;
    this.overlay.setAttribute('data-state', 'closed');
    this.container.setAttribute('data-state', 'closed');
    this.content.setAttribute('data-state', 'closed');
    
    setTimeout(() => {
      this.overlay.style.display = 'none';
      this.container.style.display = 'none';
      this.focusTrap.deactivate();
      this.portal.remove(this.overlay);
      this.portal.remove(this.container);
      document.body.style.overflow = '';
    }, 200);
    
    if (this.props.onOpenChange) {
      this.props.onOpenChange(false);
    }
  }

  appendContent(element: HTMLElement): void {
    this.content.appendChild(element);
  }

  getElement(): HTMLDivElement {
    return this.content;
  }

  destroy(): void {
    this.close();
    this.overlay.remove();
    this.container.remove();
  }
}

export class AlertDialogHeader {
  private element: HTMLDivElement;

  constructor(className?: string) {
    this.element = this.render(className);
  }

  private render(className?: string): HTMLDivElement {
    const header = document.createElement('div');
    header.className = cn('flex flex-col space-y-2 text-center sm:text-left', className);
    return header;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export class AlertDialogTitle {
  private element: HTMLHeadingElement;
  private text: string;

  constructor(text: string, className?: string) {
    this.text = text;
    this.element = this.render(className);
  }

  private render(className?: string): HTMLHeadingElement {
    const title = document.createElement('h2');
    title.className = cn('text-lg font-semibold', className);
    title.textContent = this.text;
    return title;
  }

  getElement(): HTMLHeadingElement {
    return this.element;
  }
}

export class AlertDialogDescription {
  private element: HTMLParagraphElement;
  private text: string;

  constructor(text: string, className?: string) {
    this.text = text;
    this.element = this.render(className);
  }

  private render(className?: string): HTMLParagraphElement {
    const description = document.createElement('p');
    description.className = cn('text-sm text-[var(--muted-foreground)]', className);
    description.textContent = this.text;
    return description;
  }

  getElement(): HTMLParagraphElement {
    return this.element;
  }
}

export class AlertDialogFooter {
  private element: HTMLDivElement;

  constructor(className?: string) {
    this.element = this.render(className);
  }

  private render(className?: string): HTMLDivElement {
    const footer = document.createElement('div');
    footer.className = cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className);
    return footer;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createAlertDialog(props: AlertDialogProps = {}): AlertDialog {
  return new AlertDialog(props);
}

export function createAlertDialogHeader(className?: string): AlertDialogHeader {
  return new AlertDialogHeader(className);
}

export function createAlertDialogTitle(text: string, className?: string): AlertDialogTitle {
  return new AlertDialogTitle(text, className);
}

export function createAlertDialogDescription(text: string, className?: string): AlertDialogDescription {
  return new AlertDialogDescription(text, className);
}

export function createAlertDialogFooter(className?: string): AlertDialogFooter {
  return new AlertDialogFooter(className);
}
