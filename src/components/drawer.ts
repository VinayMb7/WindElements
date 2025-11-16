import { cn, FocusTrap, Portal } from '../lib/utils';

export interface DrawerProps {
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  onOpenChange?: (open: boolean) => void;
}

export class Drawer {
  private overlay: HTMLDivElement;
  private container: HTMLDivElement;
  private content: HTMLDivElement;
  private props: DrawerProps;
  private focusTrap: FocusTrap;
  private portal: Portal;
  private isOpen: boolean = false;

  constructor(props: DrawerProps = {}) {
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
    container.className = 'fixed z-50';
    container.setAttribute('data-state', 'closed');
    container.style.display = 'none';
    
    const side = this.props.side || 'right';
    
    switch (side) {
      case 'top':
        container.style.inset = '0 0 auto 0';
        break;
      case 'bottom':
        container.style.inset = 'auto 0 0 0';
        break;
      case 'left':
        container.style.inset = '0 auto 0 0';
        break;
      case 'right':
        container.style.inset = '0 0 0 auto';
        break;
    }
    
    return container;
  }

  private createContent(): HTMLDivElement {
    const content = document.createElement('div');
    const side = this.props.side || 'right';
    
    const baseClasses = 'h-full border-[var(--border)] bg-[var(--background)] p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500';
    
    const sideClasses = {
      top: 'border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
      bottom: 'border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
      left: 'border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left w-3/4 sm:max-w-sm',
      right: 'border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right w-3/4 sm:max-w-sm'
    };
    
    content.className = cn(baseClasses, sideClasses[side], this.props.className);
    content.setAttribute('role', 'dialog');
    content.setAttribute('aria-modal', 'true');
    
    return content;
  }

  private setupEventListeners(): void {
    this.overlay.addEventListener('click', () => this.close());
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  show(): void {
    this.isOpen = true;
    this.portal.append(this.overlay);
    this.portal.append(this.container);
    
    this.overlay.style.display = 'block';
    this.container.style.display = 'block';
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
    }, 300);
    
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

export class DrawerHeader {
  private element: HTMLDivElement;

  constructor(className?: string) {
    this.element = this.render(className);
  }

  private render(className?: string): HTMLDivElement {
    const header = document.createElement('div');
    header.className = cn('grid gap-1.5 p-4 text-center sm:text-left', className);
    return header;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export class DrawerTitle {
  private element: HTMLHeadingElement;
  private text: string;

  constructor(text: string, className?: string) {
    this.text = text;
    this.element = this.render(className);
  }

  private render(className?: string): HTMLHeadingElement {
    const title = document.createElement('h2');
    title.className = cn('text-lg font-semibold leading-none tracking-tight', className);
    title.textContent = this.text;
    return title;
  }

  getElement(): HTMLHeadingElement {
    return this.element;
  }
}

export class DrawerDescription {
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

export class DrawerFooter {
  private element: HTMLDivElement;

  constructor(className?: string) {
    this.element = this.render(className);
  }

  private render(className?: string): HTMLDivElement {
    const footer = document.createElement('div');
    footer.className = cn('mt-auto flex flex-col gap-2 p-4', className);
    return footer;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createDrawer(props: DrawerProps = {}): Drawer {
  return new Drawer(props);
}

export function createDrawerHeader(className?: string): DrawerHeader {
  return new DrawerHeader(className);
}

export function createDrawerTitle(text: string, className?: string): DrawerTitle {
  return new DrawerTitle(text, className);
}

export function createDrawerDescription(text: string, className?: string): DrawerDescription {
  return new DrawerDescription(text, className);
}

export function createDrawerFooter(className?: string): DrawerFooter {
  return new DrawerFooter(className);
}
