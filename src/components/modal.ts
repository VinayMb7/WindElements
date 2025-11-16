import { cn, FocusTrap } from '../lib/utils';

export interface ModalProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export class Modal {
  private overlay: HTMLDivElement;
  private content: HTMLDivElement;
  private props: ModalProps;
  private isOpen: boolean = false;
  private focusTrap?: FocusTrap;

  constructor(props: ModalProps = {}) {
    this.props = {
      size: 'md',
      closeOnOverlayClick: true,
      closeOnEscape: true,
      showCloseButton: true,
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
    
    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-full mx-4'
    };

    content.className = cn(
      'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full gap-4 rounded-lg border border-[var(--border)] bg-[var(--background)] p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
      sizeClasses[this.props.size!],
      this.props.className
    );
    content.setAttribute('role', 'dialog');
    content.setAttribute('aria-modal', 'true');
    content.setAttribute('data-state', 'closed');
    content.style.display = 'none';

    if (this.props.showCloseButton) {
      const closeButton = document.createElement('button');
      closeButton.className = 'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[var(--background)] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 disabled:pointer-events-none';
      closeButton.innerHTML = '×';
      closeButton.style.fontSize = '24px';
      closeButton.addEventListener('click', () => this.close());
      content.appendChild(closeButton);
    }

    return content;
  }

  private setupEventListeners(): void {
    if (this.props.closeOnOverlayClick) {
      this.overlay.addEventListener('click', () => {
        this.close();
      });
    }

    if (this.props.closeOnEscape) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
    }
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

    this.focusTrap = new FocusTrap(this.content);
    this.focusTrap.activate();

    if (this.props.onOpenChange) {
      this.props.onOpenChange(true);
    }
  }

  close(): void {
    if (!this.isOpen) return;
    
    this.isOpen = false;
    this.overlay.setAttribute('data-state', 'closed');
    this.content.setAttribute('data-state', 'closed');

    if (this.focusTrap) {
      this.focusTrap.deactivate();
    }
    
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
    }, 200);

    if (this.props.onOpenChange) {
      this.props.onOpenChange(false);
    }
  }

  setContent(content: HTMLElement | string): void {
    const closeButton = this.content.querySelector('button');
    this.content.innerHTML = '';
    
    if (closeButton && this.props.showCloseButton) {
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

export class ModalHeader {
  private element: HTMLDivElement;

  constructor(className?: string) {
    this.element = this.render(className);
  }

  private render(className?: string): HTMLDivElement {
    const header = document.createElement('div');
    header.className = cn('flex flex-col space-y-1.5 text-center sm:text-left', className);
    return header;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export class ModalTitle {
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

export class ModalDescription {
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

export class ModalFooter {
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

export function createModal(props: ModalProps = {}): Modal {
  return new Modal(props);
}

export function createModalHeader(className?: string): ModalHeader {
  return new ModalHeader(className);
}

export function createModalTitle(text: string, className?: string): ModalTitle {
  return new ModalTitle(text, className);
}

export function createModalDescription(text: string, className?: string): ModalDescription {
  return new ModalDescription(text, className);
}

export function createModalFooter(className?: string): ModalFooter {
  return new ModalFooter(className);
}
