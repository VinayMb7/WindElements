import { cn, Portal, generateId } from '../lib/utils';

export interface ContextMenuProps {
  className?: string;
  onOpenChange?: (open: boolean) => void;
}

export class ContextMenu {
  private target: HTMLElement | null = null;
  private content: HTMLDivElement;
  private props: ContextMenuProps;
  private portal: Portal;
  private isOpen: boolean = false;
  private id: string;

  constructor(props: ContextMenuProps = {}) {
    this.props = props;
    this.id = generateId('context-menu');
    this.content = this.createContent();
    this.portal = new Portal();
    this.setupEventListeners();
  }

  private createContent(): HTMLDivElement {
    const content = document.createElement('div');
    content.className = cn(
      'z-50 min-w-[8rem] overflow-hidden rounded-md border border-[var(--border)] bg-[var(--popover)] p-1 text-[var(--popover-foreground)] shadow-md',
      'animate-in fade-in-0 zoom-in-95',
      this.props.className
    );
    content.setAttribute('role', 'menu');
    content.style.display = 'none';
    content.id = this.id;
    return content;
  }

  private setupEventListeners(): void {
    document.addEventListener('click', () => {
      if (this.isOpen) {
        this.close();
      }
    });

    document.addEventListener('contextmenu', () => {
      if (this.isOpen) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  attachTo(target: HTMLElement): void {
    this.target = target;
    
    this.target.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.open(e.clientX, e.clientY);
    });
  }

  open(x: number, y: number): void {
    this.isOpen = true;
    this.portal.append(this.content);
    this.content.style.display = 'block';
    
    // Position at mouse coordinates
    this.content.style.position = 'fixed';
    this.content.style.top = `${y}px`;
    this.content.style.left = `${x}px`;
    this.content.style.zIndex = '9999';
    
    // Adjust if menu goes off-screen
    setTimeout(() => {
      const rect = this.content.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        this.content.style.left = `${x - rect.width}px`;
      }
      if (rect.bottom > window.innerHeight) {
        this.content.style.top = `${y - rect.height}px`;
      }
    }, 0);
    
    if (this.props.onOpenChange) {
      this.props.onOpenChange(true);
    }
  }

  close(): void {
    this.isOpen = false;
    this.content.style.display = 'none';
    this.portal.remove(this.content);
    
    if (this.props.onOpenChange) {
      this.props.onOpenChange(false);
    }
  }

  addItem(item: ContextMenuItem): void {
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

export class ContextMenuItem {
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
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        onClick();
      });
    }
    
    return item;
  }

  setShortcut(shortcut: string): void {
    const shortcutEl = document.createElement('span');
    shortcutEl.className = 'ml-auto text-xs tracking-widest text-[var(--muted-foreground)]';
    shortcutEl.textContent = shortcut;
    this.element.appendChild(shortcutEl);
  }

  getElement(): HTMLButtonElement {
    return this.element;
  }
}

export function createContextMenu(props: ContextMenuProps = {}): ContextMenu {
  return new ContextMenu(props);
}

export function createContextMenuItem(text: string, onClick?: () => void, className?: string): ContextMenuItem {
  return new ContextMenuItem(text, onClick, className);
}
