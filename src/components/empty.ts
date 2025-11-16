import { cn } from '../lib/utils';

export interface EmptyProps {
  icon?: HTMLElement | string;
  title?: string;
  description?: string;
  action?: HTMLElement;
  className?: string;
}

export class Empty {
  private element: HTMLDivElement;
  private props: EmptyProps;

  constructor(props: EmptyProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = cn(
      'flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed border-[var(--border)] p-8 text-center animate-in fade-in-50',
      this.props.className
    );
    
    // Icon
    if (this.props.icon) {
      const iconWrapper = document.createElement('div');
      iconWrapper.className = 'mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--muted)]';
      
      if (typeof this.props.icon === 'string') {
        iconWrapper.textContent = this.props.icon;
        iconWrapper.style.fontSize = '24px';
      } else {
        iconWrapper.appendChild(this.props.icon);
      }
      
      container.appendChild(iconWrapper);
    }
    
    // Title
    if (this.props.title) {
      const title = document.createElement('h3');
      title.className = 'mt-4 text-lg font-semibold';
      title.textContent = this.props.title;
      container.appendChild(title);
    }
    
    // Description
    if (this.props.description) {
      const description = document.createElement('p');
      description.className = 'mb-4 mt-2 text-sm text-[var(--muted-foreground)]';
      description.textContent = this.props.description;
      container.appendChild(description);
    }
    
    // Action
    if (this.props.action) {
      container.appendChild(this.props.action);
    }
    
    return container;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createEmpty(props: EmptyProps = {}): Empty {
  return new Empty(props);
}
