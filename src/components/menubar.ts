import { cn, Portal, positionElement, generateId } from '../lib/utils';

export interface MenubarProps {
  className?: string;
}

export class Menubar {
  private element: HTMLDivElement;
  private props: MenubarProps;
  private menus: MenubarMenu[] = [];

  constructor(props: MenubarProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const menubar = document.createElement('div');
    menubar.className = cn(
      'flex h-10 items-center space-x-1 rounded-md border border-[var(--border)] bg-[var(--background)] p-1',
      this.props.className
    );
    menubar.setAttribute('role', 'menubar');
    return menubar;
  }

  addMenu(menu: MenubarMenu): void {
    this.menus.push(menu);
    this.element.appendChild(menu.getTrigger());
    
    // Close other menus when one opens
    menu.onOpenChange((isOpen) => {
      if (isOpen) {
        this.menus.forEach(m => {
          if (m !== menu) m.close();
        });
      }
    });
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export class MenubarMenu {
  private trigger: HTMLButtonElement;
  private content: HTMLDivElement;
  private portal: Portal;
  private isOpen: boolean = false;
  private id: string;
  private openChangeCallback?: (open: boolean) => void;

  constructor(label: string, className?: string) {
    this.id = generateId('menubar-menu');
    this.trigger = this.createTrigger(label, className);
    this.content = this.createContent();
    this.portal = new Portal();
    this.setupEventListeners();
  }

  private createTrigger(label: string, className?: string): HTMLButtonElement {
    const trigger = document.createElement('button');
    trigger.className = cn(
      'flex cursor-pointer select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] focus:bg-[var(--accent)] focus:text-[var(--accent-foreground)] data-[state=open]:bg-[var(--accent)] data-[state=open]:text-[var(--accent-foreground)]',
      className
    );
    trigger.textContent = label;
    trigger.setAttribute('role', 'menuitem');
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-controls', this.id);
    trigger.setAttribute('data-state', 'closed');
    
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggle();
    });
    
    return trigger;
  }

  private createContent(): HTMLDivElement {
    const content = document.createElement('div');
    content.className = cn(
      'z-50 min-w-[12rem] overflow-hidden rounded-md border border-[var(--border)] bg-[var(--popover)] p-1 text-[var(--popover-foreground)] shadow-md',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
    );
    content.setAttribute('role', 'menu');
    content.setAttribute('data-state', 'closed');
    content.style.display = 'none';
    content.id = this.id;
    return content;
  }

  private setupEventListeners(): void {
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.trigger.contains(e.target as Node) && !this.content.contains(e.target as Node)) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
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
    this.isOpen = true;
    this.trigger.setAttribute('data-state', 'open');
    this.content.setAttribute('data-state', 'open');
    this.portal.append(this.content);
    this.content.style.display = 'block';
    
    positionElement(this.content, this.trigger, 'bottom-start', 4);
    
    if (this.openChangeCallback) {
      this.openChangeCallback(true);
    }
  }

  close(): void {
    this.isOpen = false;
    this.trigger.setAttribute('data-state', 'closed');
    this.content.setAttribute('data-state', 'closed');
    
    setTimeout(() => {
      this.content.style.display = 'none';
      this.portal.remove(this.content);
    }, 150);
    
    if (this.openChangeCallback) {
      this.openChangeCallback(false);
    }
  }

  onOpenChange(callback: (open: boolean) => void): void {
    this.openChangeCallback = callback;
  }

  addItem(item: MenubarItem): void {
    this.content.appendChild(item.getElement());
  }

  addSeparator(): void {
    const separator = document.createElement('div');
    separator.className = 'h-px my-1 bg-[var(--border)]';
    separator.setAttribute('role', 'separator');
    this.content.appendChild(separator);
  }

  getTrigger(): HTMLButtonElement {
    return this.trigger;
  }

  getContent(): HTMLDivElement {
    return this.content;
  }
}

export class MenubarItem {
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

export function createMenubar(props: MenubarProps = {}): Menubar {
  return new Menubar(props);
}

export function createMenubarMenu(label: string, className?: string): MenubarMenu {
  return new MenubarMenu(label, className);
}

export function createMenubarItem(text: string, onClick?: () => void, className?: string): MenubarItem {
  return new MenubarItem(text, onClick, className);
}
