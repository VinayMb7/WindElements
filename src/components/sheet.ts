import { cn } from '../lib/utils';

export interface SheetProps {
  className?: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
  onOpenChange?: (open: boolean) => void;
}

export class Sheet {
  private overlay: HTMLDivElement;
  private content: HTMLDivElement;
  private props: SheetProps;
  private isOpen: boolean = false;

  constructor(props: SheetProps = {}) {
    this.props = {
      side: props.side || 'right',
      ...props
    };
    this.overlay = this.createOverlay();
    this.content = this.createContent();
    this.setupEventListeners();
  }

  private createOverlay(): HTMLDivElement {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-50 bg-[var(--background)]/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0';
    overlay.setAttribute('data-state', 'closed');
    overlay.style.display = 'none';
    return overlay;
  }

  private createContent(): HTMLDivElement {
    const content = document.createElement('div');
    
    const baseClasses = 'fixed z-50 gap-4 bg-[var(--background)] p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500';
    
    const sideClasses: Record<string, string> = {
      left: 'inset-y-0 left-0 h-full w-3/4 border-r border-[var(--border)] data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
      right: 'inset-y-0 right-0 h-full w-3/4 border-l border-[var(--border)] data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      top: 'inset-x-0 top-0 border-b border-[var(--border)] data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
      bottom: 'inset-x-0 bottom-0 border-t border-[var(--border)] data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom'
    };

    content.className = cn(
      baseClasses,
      sideClasses[this.props.side || 'right'],
      this.props.className
    );
    content.setAttribute('role', 'dialog');
    content.setAttribute('data-state', 'closed');
    content.style.display = 'none';

    // Close button
    const closeButton = document.createElement('button');
    closeButton.className = 'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[var(--background)] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 disabled:pointer-events-none';
    closeButton.innerHTML = '×';
    closeButton.style.fontSize = '24px';
    closeButton.addEventListener('click', () => this.close());
    content.appendChild(closeButton);

    return content;
  }

  private setupEventListeners(): void {
    this.overlay.addEventListener('click', () => {
      this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  open(): void {
    if (this.isOpen) return;
    
    this.isOpen = true;
    document.body.appendChild(this.overlay);
    document.body.appendChild(this.content);
    
    this.overlay.style.display = 'block';
    this.content.style.display = 'block';
    
    this.overlay.setAttribute('data-state', 'open');
    this.content.setAttribute('data-state', 'open');
    
    document.body.style.overflow = 'hidden';

    if (this.props.onOpenChange) {
      this.props.onOpenChange(true);
    }
  }

  close(): void {
    if (!this.isOpen) return;
    
    this.isOpen = false;
    this.overlay.setAttribute('data-state', 'closed');
    this.content.setAttribute('data-state', 'closed');
    
    setTimeout(() => {
      this.overlay.style.display = 'none';
      this.content.style.display = 'none';
      
      if (this.overlay.parentNode) {
        this.overlay.parentNode.removeChild(this.overlay);
      }
      if (this.content.parentNode) {
        this.content.parentNode.removeChild(this.content);
      }
      
      document.body.style.overflow = '';
    }, 300);

    if (this.props.onOpenChange) {
      this.props.onOpenChange(false);
    }
  }

  setContent(content: HTMLElement | string): void {
    // Keep the close button, remove everything else
    const closeButton = this.content.querySelector('button');
    this.content.innerHTML = '';
    if (closeButton) {
      this.content.appendChild(closeButton);
    }
    
    if (typeof content === 'string') {
      const div = document.createElement('div');
      div.innerHTML = content;
      this.content.appendChild(div);
    } else {
      this.content.appendChild(content);
    }
  }

  getElement(): HTMLDivElement {
    return this.content;
  }

  destroy(): void {
    this.close();
    this.overlay.remove();
    this.content.remove();
  }
}

export class SheetHeader {
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

export class SheetTitle {
  private element: HTMLHeadingElement;

  constructor(text: string, className?: string) {
    this.element = this.render(text, className);
  }

  private render(text: string, className?: string): HTMLHeadingElement {
    const title = document.createElement('h2');
    title.className = cn('text-lg font-semibold text-[var(--foreground)]', className);
    title.textContent = text;
    return title;
  }

  getElement(): HTMLHeadingElement {
    return this.element;
  }
}

export class SheetDescription {
  private element: HTMLParagraphElement;

  constructor(text: string, className?: string) {
    this.element = this.render(text, className);
  }

  private render(text: string, className?: string): HTMLParagraphElement {
    const description = document.createElement('p');
    description.className = cn('text-sm text-[var(--muted-foreground)]', className);
    description.textContent = text;
    return description;
  }

  getElement(): HTMLParagraphElement {
    return this.element;
  }
}

export function createSheet(props: SheetProps = {}): Sheet {
  return new Sheet(props);
}

export function createSheetHeader(className?: string): SheetHeader {
  return new SheetHeader(className);
}

export function createSheetTitle(text: string, className?: string): SheetTitle {
  return new SheetTitle(text, className);
}

export function createSheetDescription(text: string, className?: string): SheetDescription {
  return new SheetDescription(text, className);
}
