import { cn } from '../lib/utils';

export interface ScrollAreaProps {
  className?: string;
  orientation?: 'vertical' | 'horizontal' | 'both';
  children?: HTMLElement | HTMLElement[];
}

export class ScrollArea {
  private element: HTMLDivElement;
  private viewport: HTMLDivElement;
  private props: ScrollAreaProps;

  constructor(props: ScrollAreaProps = {}) {
    this.props = props;
    this.viewport = this.createViewport();
    this.element = this.render();
  }

  private createViewport(): HTMLDivElement {
    const viewport = document.createElement('div');
    viewport.className = 'h-full w-full rounded-[inherit]';
    
    const orientation = this.props.orientation || 'vertical';
    
    if (orientation === 'vertical' || orientation === 'both') {
      viewport.style.overflowY = 'auto';
    }
    if (orientation === 'horizontal' || orientation === 'both') {
      viewport.style.overflowX = 'auto';
    }
    
    if (this.props.children) {
      if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => viewport.appendChild(child));
      } else {
        viewport.appendChild(this.props.children);
      }
    }
    
    return viewport;
  }

  private render(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = cn('relative overflow-hidden', this.props.className);
    container.appendChild(this.viewport);
    return container;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  scrollTo(options: ScrollToOptions): void {
    this.viewport.scrollTo(options);
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createScrollArea(props: ScrollAreaProps = {}): ScrollArea {
  return new ScrollArea(props);
}
