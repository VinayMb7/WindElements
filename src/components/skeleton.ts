import { cn } from '../lib/utils';

export interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  circle?: boolean;
}

export class Skeleton {
  private element: HTMLDivElement;
  private props: SkeletonProps;

  constructor(props: SkeletonProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const skeleton = document.createElement('div');
    
    const baseClasses = 'animate-pulse rounded-[var(--radius)] bg-[var(--primary)]/10';
    
    skeleton.className = cn(
      baseClasses,
      this.props.circle && 'rounded-full',
      this.props.className
    );
    
    if (this.props.width) {
      skeleton.style.width = this.props.width;
    }
    
    if (this.props.height) {
      skeleton.style.height = this.props.height;
    }
    
    // Default dimensions if not specified
    if (!this.props.width && !this.props.className?.includes('w-')) {
      skeleton.style.width = '100%';
    }
    
    if (!this.props.height && !this.props.className?.includes('h-')) {
      skeleton.style.height = this.props.circle ? '40px' : '20px';
    }
    
    return skeleton;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createSkeleton(props: SkeletonProps = {}): Skeleton {
  return new Skeleton(props);
}
