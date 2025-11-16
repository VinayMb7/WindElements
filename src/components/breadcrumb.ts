import { cn } from '../lib/utils';

export interface BreadcrumbProps {
  separator?: string | HTMLElement;
  className?: string;
}

export interface BreadcrumbItemProps {
  href?: string;
  active?: boolean;
  className?: string;
  children?: string | HTMLElement | HTMLElement[];
}

export class Breadcrumb {
  private element: HTMLElement;
  private list: HTMLOListElement;
  private props: BreadcrumbProps;

  constructor(props: BreadcrumbProps = {}) {
    this.props = props;
    this.list = document.createElement('ol');
    this.element = this.render();
  }

  private render(): HTMLElement {
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'breadcrumb');
    nav.className = cn(this.props.className);
    
    this.list.className = 'flex flex-wrap items-center gap-1.5 break-words text-sm text-[var(--muted-foreground)] sm:gap-2.5';
    nav.appendChild(this.list);
    
    return nav;
  }

  addItem(item: BreadcrumbItem): void {
    const li = item.getElement();
    
    // Add separator before item (except for first item)
    if (this.list.children.length > 0) {
      const separator = this.createSeparator();
      this.list.appendChild(separator);
    }
    
    this.list.appendChild(li);
  }

  private createSeparator(): HTMLLIElement {
    const li = document.createElement('li');
    li.className = 'inline-flex items-center gap-1.5';
    li.setAttribute('role', 'presentation');
    li.setAttribute('aria-hidden', 'true');
    
    if (typeof this.props.separator === 'string') {
      li.textContent = this.props.separator;
    } else if (this.props.separator) {
      li.appendChild(this.props.separator.cloneNode(true) as HTMLElement);
    } else {
      // Default separator
      li.textContent = '/';
    }
    
    return li;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export class BreadcrumbItem {
  private element: HTMLLIElement;
  private props: BreadcrumbItemProps;

  constructor(props: BreadcrumbItemProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLLIElement {
    const li = document.createElement('li');
    li.className = 'inline-flex items-center gap-1.5';
    
    if (this.props.href && !this.props.active) {
      const link = document.createElement('a');
      link.href = this.props.href;
      link.className = cn(
        'transition-colors hover:text-[var(--foreground)]',
        this.props.className
      );
      
      if (this.props.children) {
        if (typeof this.props.children === 'string') {
          link.textContent = this.props.children;
        } else if (Array.isArray(this.props.children)) {
          this.props.children.forEach(child => link.appendChild(child));
        } else {
          link.appendChild(this.props.children);
        }
      }
      
      li.appendChild(link);
    } else {
      const span = document.createElement('span');
      span.className = cn(
        this.props.active ? 'font-normal text-[var(--foreground)]' : '',
        this.props.className
      );
      
      if (this.props.active) {
        span.setAttribute('aria-current', 'page');
      }
      
      if (this.props.children) {
        if (typeof this.props.children === 'string') {
          span.textContent = this.props.children;
        } else if (Array.isArray(this.props.children)) {
          this.props.children.forEach(child => span.appendChild(child));
        } else {
          span.appendChild(this.props.children);
        }
      }
      
      li.appendChild(span);
    }
    
    return li;
  }

  getElement(): HTMLLIElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createBreadcrumb(props: BreadcrumbProps = {}): Breadcrumb {
  return new Breadcrumb(props);
}

export function createBreadcrumbItem(props: BreadcrumbItemProps = {}): BreadcrumbItem {
  return new BreadcrumbItem(props);
}
