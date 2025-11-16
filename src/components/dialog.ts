import { cn, FocusTrap, Portal } from '../lib/utils';

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  className?: string;
}

export class Dialog {
  private overlay: HTMLDivElement;
  private content: HTMLDivElement;
  private portal: Portal;
  private focusTrap: FocusTrap | null = null;
  private props: DialogProps;
  private isOpen: boolean;

  constructor(props: DialogProps = {}) {
    this.props = props;
    this.isOpen = props.open ?? false;
    this.portal = new Portal('windelements-dialog-portal');
    this.overlay = this.createOverlay();
    this.content = this.createContent();
    
    if (this.isOpen) {
      this.show();
    }
  }

  private createOverlay(): HTMLDivElement {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-50 bg-[var(--background)]/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0';
    overlay.dataset.state = this.isOpen ? 'open' : 'closed';
    overlay.style.display = this.isOpen ? 'block' : 'none';
    
    overlay.addEventListener('click', () => {
      if (this.props.modal !== false) {
        this.close();
      }
    });
    
    return overlay;
  }

  private createContent(): HTMLDivElement {
    const content = document.createElement('div');
    content.className = cn(
      'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-[var(--border)] bg-[var(--background)] p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-[var(--radius)]',
      this.props.className
    );
    content.dataset.state = this.isOpen ? 'open' : 'closed';
    content.style.display = this.isOpen ? 'grid' : 'none';
    content.setAttribute('role', 'dialog');
    content.setAttribute('aria-modal', 'true');
    
    content.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    return content;
  }

  show(): void {
    if (this.isOpen) return;
    
    this.isOpen = true;
    this.overlay.dataset.state = 'open';
    this.content.dataset.state = 'open';
    this.overlay.style.display = 'block';
    this.content.style.display = 'grid';
    
    this.portal.append(this.overlay);
    this.portal.append(this.content);
    
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
    this.overlay.dataset.state = 'closed';
    this.content.dataset.state = 'closed';
    
    setTimeout(() => {
      this.overlay.style.display = 'none';
      this.content.style.display = 'none';
      this.portal.remove(this.overlay);
      this.portal.remove(this.content);
      document.body.style.overflow = '';
    }, 200);
    
    if (this.focusTrap) {
      this.focusTrap.deactivate();
      this.focusTrap = null;
    }
    
    if (this.props.onOpenChange) {
      this.props.onOpenChange(false);
    }
  }

  toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.show();
    }
  }

  getContent(): HTMLDivElement {
    return this.content;
  }

  setContent(element: HTMLElement): void {
    this.content.innerHTML = '';
    this.content.appendChild(element);
  }

  appendContent(element: HTMLElement): void {
    this.content.appendChild(element);
  }

  isOpenState(): boolean {
    return this.isOpen;
  }

  destroy(): void {
    this.close();
    this.overlay.remove();
    this.content.remove();
  }
}

export class DialogHeader {
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
  
  appendChild(child: HTMLElement): void {
    this.element.appendChild(child);
  }
}

export class DialogTitle {
  private element: HTMLHeadingElement;
  
  constructor(text: string, className?: string) {
    this.element = this.render(text, className);
  }
  
  private render(text: string, className?: string): HTMLHeadingElement {
    const title = document.createElement('h2');
    title.className = cn('text-lg font-semibold leading-none tracking-tight', className);
    title.textContent = text;
    return title;
  }
  
  getElement(): HTMLHeadingElement {
    return this.element;
  }
}

export class DialogDescription {
  private element: HTMLParagraphElement;
  
  constructor(text: string, className?: string) {
    this.element = this.render(text, className);
  }
  
  private render(text: string, className?: string): HTMLParagraphElement {
    const desc = document.createElement('p');
    desc.className = cn('text-sm text-[var(--muted-foreground)]', className);
    desc.textContent = text;
    return desc;
  }
  
  getElement(): HTMLParagraphElement {
    return this.element;
  }
}

export class DialogFooter {
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
  
  appendChild(child: HTMLElement): void {
    this.element.appendChild(child);
  }
}

export function createDialog(props: DialogProps = {}): Dialog {
  return new Dialog(props);
}

export function createDialogHeader(className?: string): DialogHeader {
  return new DialogHeader(className);
}

export function createDialogTitle(text: string, className?: string): DialogTitle {
  return new DialogTitle(text, className);
}

export function createDialogDescription(text: string, className?: string): DialogDescription {
  return new DialogDescription(text, className);
}

export function createDialogFooter(className?: string): DialogFooter {
  return new DialogFooter(className);
}
