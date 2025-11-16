import { cn, Portal, positionElement, generateId } from '../lib/utils';

export interface DropdownMenuProps {
  className?: string;
  onOpenChange?: (open: boolean) => void;
}

export class DropdownMenu {
  private trigger: HTMLElement | null = null;
  private content: HTMLDivElement;
  private props: DropdownMenuProps;
  private portal: Portal;
  private isOpen: boolean = false;
  private id: string;

  constructor(props: DropdownMenuProps = {}) {
    this.props = props;
    this.id = generateId('dropdown');
    this.content = this.createContent();
    this.portal = new Portal();
    this.setupEventListeners();
  }

  private createContent(): HTMLDivElement {
    const content = document.createElement('div');
    content.className = cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border border-[var(--border)] bg-[var(--popover)] p-1 text-[var(--popover-foreground)] shadow-md',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      this.props.className
    );
    content.setAttribute('role', 'menu');
    content.setAttribute('data-state', 'closed');
    content.style.display = 'none';
    content.id = this.id;
    return content;
  }

  private setupEventListeners(): void {
    document.addEventListener('click', (e) => {
      if (this.isOpen && this.trigger && !this.trigger.contains(e.target as Node) && !this.content.contains(e.target as Node)) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  setTrigger(trigger: HTMLElement): void {
    this.trigger = trigger;
    this.trigger.setAttribute('aria-haspopup', 'true');
    this.trigger.setAttribute('aria-controls', this.id);
    
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });
  }

  private toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    if (!this.trigger) return;
    
    this.isOpen = true;
    this.portal.append(this.content);
    this.content.style.display = 'block';
    this.content.setAttribute('data-state', 'open');
    
    positionElement(this.content, this.trigger, 'bottom-start', 4);
    
    if (this.props.onOpenChange) {
      this.props.onOpenChange(true);
    }
  }

  close(): void {
    this.isOpen = false;
    this.content.setAttribute('data-state', 'closed');
    
    setTimeout(() => {
      this.content.style.display = 'none';
      this.portal.remove(this.content);
    }, 150);
    
    if (this.props.onOpenChange) {
      this.props.onOpenChange(false);
    }
  }

  addItem(item: DropdownMenuItem): void {
    this.content.appendChild(item.getElement());
  }

  addSeparator(): void {
    const separator = document.createElement('div');
    separator.className = 'h-px my-1 bg-[var(--border)]';
    separator.setAttribute('role', 'separator');
    this.content.appendChild(separator);
  }

  getElement(): HTMLDivElement {
    return this.content;
  }

  destroy(): void {
    this.close();
    this.content.remove();
  }
}

export class DropdownMenuItem {
  private element: HTMLButtonElement;

  constructor(text: string, onClick?: () => void, className?: string) {
    this.element = this.render(text, onClick, className);
  }

  private render(text: string, onClick?: () => void, className?: string): HTMLButtonElement {
    const item = document.createElement('button');
    item.className = cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] focus:bg-[var(--accent)] focus:text-[var(--accent-foreground)] disabled:pointer-events-none disabled:opacity-50',
      className
    );
    item.setAttribute('role', 'menuitem');
    item.textContent = text;
    
    if (onClick) {
      item.addEventListener('click', () => {
        onClick();
      });
    }
    
    return item;
  }

  getElement(): HTMLButtonElement {
    return this.element;
  }
}

export class DropdownMenuLabel {
  private element: HTMLDivElement;

  constructor(text: string, className?: string) {
    this.element = this.render(text, className);
  }

  private render(text: string, className?: string): HTMLDivElement {
    const label = document.createElement('div');
    label.className = cn('px-2 py-1.5 text-sm font-semibold', className);
    label.textContent = text;
    return label;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createDropdownMenu(props: DropdownMenuProps = {}): DropdownMenu {
  return new DropdownMenu(props);
}

export function createDropdownMenuItem(text: string, onClick?: () => void, className?: string): DropdownMenuItem {
  return new DropdownMenuItem(text, onClick, className);
}

export function createDropdownMenuLabel(text: string, className?: string): DropdownMenuLabel {
  return new DropdownMenuLabel(text, className);
}
