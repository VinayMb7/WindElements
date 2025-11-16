import { cn } from '../lib/utils';

export interface AspectRatioProps {
  ratio?: number;
  className?: string;
  children?: HTMLElement | HTMLElement[];
}

export class AspectRatio {
  private element: HTMLDivElement;
  private props: AspectRatioProps;

  constructor(props: AspectRatioProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = cn('relative w-full', this.props.className);
    
    const ratio = this.props.ratio || 16 / 9;
    const paddingBottom = `${(1 / ratio) * 100}%`;
    
    container.style.paddingBottom = paddingBottom;
    
    const content = document.createElement('div');
    content.className = 'absolute inset-0';
    
    if (this.props.children) {
      if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => content.appendChild(child));
      } else {
        content.appendChild(this.props.children);
      }
    }
    
    container.appendChild(content);
    return container;
  }

  setRatio(ratio: number): void {
    this.props.ratio = ratio;
    const paddingBottom = `${(1 / ratio) * 100}%`;
    this.element.style.paddingBottom = paddingBottom;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createAspectRatio(props: AspectRatioProps = {}): AspectRatio {
  return new AspectRatio(props);
}
