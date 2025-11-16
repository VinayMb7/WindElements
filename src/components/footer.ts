import { cn } from '../lib/utils';

export interface FooterProps {
  className?: string;
}

export class Footer {
  private element: HTMLElement;
  private props: FooterProps;

  constructor(props: FooterProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLElement {
    const footer = document.createElement('footer');
    footer.className = cn(
      'border-t border-[var(--border)] bg-[var(--background)]',
      this.props.className
    );
    footer.setAttribute('role', 'contentinfo');
    return footer;
  }

  setContent(content: HTMLElement | string): void {
    if (typeof content === 'string') {
      this.element.innerHTML = content;
    } else {
      this.element.innerHTML = '';
      this.element.appendChild(content);
    }
  }

  getElement(): HTMLElement {
    return this.element;
  }
}

export class FooterSection {
  private element: HTMLDivElement;

  constructor(className?: string) {
    this.element = this.render(className);
  }

  private render(className?: string): HTMLDivElement {
    const section = document.createElement('div');
    section.className = cn('space-y-4', className);
    return section;
  }

  setContent(content: HTMLElement | string): void {
    if (typeof content === 'string') {
      this.element.innerHTML = content;
    } else {
      this.element.innerHTML = '';
      this.element.appendChild(content);
    }
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export class FooterLink {
  private element: HTMLAnchorElement;

  constructor(text: string, href: string, className?: string) {
    this.element = this.render(text, href, className);
  }

  private render(text: string, href: string, className?: string): HTMLAnchorElement {
    const link = document.createElement('a');
    link.href = href;
    link.className = cn(
      'text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors',
      className
    );
    link.textContent = text;
    return link;
  }

  getElement(): HTMLAnchorElement {
    return this.element;
  }
}

export class FooterTitle {
  private element: HTMLHeadingElement;

  constructor(text: string, className?: string) {
    this.element = this.render(text, className);
  }

  private render(text: string, className?: string): HTMLHeadingElement {
    const title = document.createElement('h3');
    title.className = cn('font-semibold text-[var(--foreground)]', className);
    title.textContent = text;
    return title;
  }

  getElement(): HTMLHeadingElement {
    return this.element;
  }
}

export class FooterCopyright {
  private element: HTMLParagraphElement;

  constructor(text: string, className?: string) {
    this.element = this.render(text, className);
  }

  private render(text: string, className?: string): HTMLParagraphElement {
    const copyright = document.createElement('p');
    copyright.className = cn('text-sm text-[var(--muted-foreground)]', className);
    copyright.textContent = text;
    return copyright;
  }

  getElement(): HTMLParagraphElement {
    return this.element;
  }
}

export function createFooter(props: FooterProps = {}): Footer {
  return new Footer(props);
}

export function createFooterSection(className?: string): FooterSection {
  return new FooterSection(className);
}

export function createFooterLink(text: string, href: string, className?: string): FooterLink {
  return new FooterLink(text, href, className);
}

export function createFooterTitle(text: string, className?: string): FooterTitle {
  return new FooterTitle(text, className);
}

export function createFooterCopyright(text: string, className?: string): FooterCopyright {
  return new FooterCopyright(text, className);
}
