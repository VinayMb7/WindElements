import { cn } from '../lib/utils';

export interface SidebarProps {
  className?: string;
  defaultOpen?: boolean;
  position?: 'left' | 'right';
  collapsible?: boolean;
}

export class Sidebar {
  private element: HTMLDivElement;
  private props: SidebarProps;
  private isOpen: boolean;
  private content: HTMLDivElement;

  constructor(props: SidebarProps = {}) {
    this.props = props;
    this.isOpen = props.defaultOpen ?? true;
    this.element = this.render();
    this.content = this.element.querySelector('[data-sidebar-content]') as HTMLDivElement;
  }

  private render(): HTMLDivElement {
    const sidebar = document.createElement('div');
    const position = this.props.position || 'left';
    
    sidebar.className = cn(
      'flex flex-col h-full bg-[var(--sidebar)] text-[var(--sidebar-foreground)] border-[var(--sidebar-border)] transition-all duration-300',
      position === 'left' ? 'border-r' : 'border-l',
      this.isOpen ? 'w-64' : 'w-16',
      this.props.className
    );
    sidebar.setAttribute('data-state', this.isOpen ? 'open' : 'closed');

    const content = document.createElement('div');
    content.className = 'flex-1 overflow-y-auto p-4';
    content.setAttribute('data-sidebar-content', '');

    sidebar.appendChild(content);
    return sidebar;
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    this.element.setAttribute('data-state', this.isOpen ? 'open' : 'closed');
    this.element.className = cn(
      'flex flex-col h-full bg-[var(--sidebar)] text-[var(--sidebar-foreground)] border-[var(--sidebar-border)] transition-all duration-300',
      this.props.position === 'right' ? 'border-l' : 'border-r',
      this.isOpen ? 'w-64' : 'w-16',
      this.props.className
    );
  }

  open(): void {
    if (!this.isOpen) this.toggle();
  }

  close(): void {
    if (this.isOpen) this.toggle();
  }

  appendChild(child: HTMLElement): void {
    this.content.appendChild(child);
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export class SidebarHeader {
  private element: HTMLDivElement;

  constructor(className?: string) {
    this.element = this.render(className);
  }

  private render(className?: string): HTMLDivElement {
    const header = document.createElement('div');
    header.className = cn('px-4 py-3 border-b border-[var(--sidebar-border)]', className);
    return header;
  }

  appendChild(child: HTMLElement): void {
    this.element.appendChild(child);
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export class SidebarContent {
  private element: HTMLDivElement;

  constructor(className?: string) {
    this.element = this.render(className);
  }

  private render(className?: string): HTMLDivElement {
    const content = document.createElement('div');
    content.className = cn('flex-1 py-2', className);
    return content;
  }

  appendChild(child: HTMLElement): void {
    this.element.appendChild(child);
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export class SidebarItem {
  private element: HTMLAnchorElement | HTMLButtonElement;

  constructor(href?: string, className?: string) {
    this.element = this.render(href, className);
  }

  private render(href?: string, className?: string): HTMLAnchorElement | HTMLButtonElement {
    const el = href ? document.createElement('a') : document.createElement('button');
    if (href && el instanceof HTMLAnchorElement) {
      el.href = href;
    }
    el.className = cn(
      'flex items-center gap-3 px-4 py-2 text-sm hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)] rounded-md transition-colors w-full text-left',
      className
    );
    return el;
  }

  setText(text: string): void {
    this.element.textContent = text;
  }

  appendChild(child: HTMLElement): void {
    this.element.appendChild(child);
  }

  onClick(handler: () => void): void {
    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      handler();
    });
  }

  getElement(): HTMLAnchorElement | HTMLButtonElement {
    return this.element;
  }
}

export class SidebarGroup {
  private element: HTMLDivElement;
  private content: HTMLDivElement;

  constructor(title?: string, className?: string) {
    this.element = this.render(title, className);
    this.content = this.element.querySelector('[data-group-content]') as HTMLDivElement;
  }

  private render(title?: string, className?: string): HTMLDivElement {
    const group = document.createElement('div');
    group.className = cn('py-2', className);

    if (title) {
      const titleEl = document.createElement('h4');
      titleEl.className = 'px-4 py-2 text-xs font-semibold text-[var(--muted-foreground)] uppercase';
      titleEl.textContent = title;
      group.appendChild(titleEl);
    }

    const content = document.createElement('div');
    content.className = 'space-y-1';
    content.setAttribute('data-group-content', '');
    group.appendChild(content);

    return group;
  }

  addItem(item: SidebarItem): void {
    this.content.appendChild(item.getElement());
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createSidebar(props: SidebarProps = {}): Sidebar {
  return new Sidebar(props);
}

export function createSidebarHeader(className?: string): SidebarHeader {
  return new SidebarHeader(className);
}

export function createSidebarContent(className?: string): SidebarContent {
  return new SidebarContent(className);
}

export function createSidebarItem(href?: string, className?: string): SidebarItem {
  return new SidebarItem(href, className);
}

export function createSidebarGroup(title?: string, className?: string): SidebarGroup {
  return new SidebarGroup(title, className);
}
