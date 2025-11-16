import { cn } from '../lib/utils';

export interface NavbarProps {
  className?: string;
  sticky?: boolean;
  transparent?: boolean;
}

export class Navbar {
  private element: HTMLElement;
  private props: NavbarProps;

  constructor(props: NavbarProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLElement {
    const nav = document.createElement('nav');
    nav.className = cn(
      'flex items-center justify-between w-full px-4 py-3 border-b border-[var(--border)]',
      this.props.sticky && 'sticky top-0 z-50',
      this.props.transparent ? 'bg-transparent' : 'bg-[var(--background)]',
      this.props.className
    );
    return nav;
  }

  appendChild(child: HTMLElement): void {
    this.element.appendChild(child);
  }

  getElement(): HTMLElement {
    return this.element;
  }
}

export class NavbarBrand {
  private element: HTMLDivElement;

  constructor(className?: string) {
    this.element = this.render(className);
  }

  private render(className?: string): HTMLDivElement {
    const brand = document.createElement('div');
    brand.className = cn('flex items-center gap-2 font-semibold text-lg', className);
    return brand;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export class NavbarContent {
  private element: HTMLDivElement;

  constructor(position: 'start' | 'center' | 'end' = 'end', className?: string) {
    this.element = this.render(position, className);
  }

  private render(position: 'start' | 'center' | 'end', className?: string): HTMLDivElement {
    const content = document.createElement('div');
    const positionClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end'
    };
    content.className = cn('flex items-center gap-4', positionClasses[position], className);
    return content;
  }

  appendChild(child: HTMLElement): void {
    this.element.appendChild(child);
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export class NavbarItem {
  private element: HTMLAnchorElement | HTMLDivElement;

  constructor(href?: string, className?: string) {
    this.element = this.render(href, className);
  }

  private render(href?: string, className?: string): HTMLAnchorElement | HTMLDivElement {
    if (href) {
      const link = document.createElement('a');
      link.href = href;
      link.className = cn(
        'text-[var(--foreground)] hover:text-[var(--primary)] transition-colors px-3 py-2 rounded-md hover:bg-[var(--accent)]',
        className
      );
      return link;
    } else {
      const div = document.createElement('div');
      div.className = cn('flex items-center', className);
      return div;
    }
  }

  setText(text: string): void {
    this.element.textContent = text;
  }

  appendChild(child: HTMLElement): void {
    this.element.appendChild(child);
  }

  getElement(): HTMLAnchorElement | HTMLDivElement {
    return this.element;
  }
}

export function createNavbar(props: NavbarProps = {}): Navbar {
  return new Navbar(props);
}

export function createNavbarBrand(className?: string): NavbarBrand {
  return new NavbarBrand(className);
}

export function createNavbarContent(position: 'start' | 'center' | 'end' = 'end', className?: string): NavbarContent {
  return new NavbarContent(position, className);
}

export function createNavbarItem(href?: string, className?: string): NavbarItem {
  return new NavbarItem(href, className);
}
