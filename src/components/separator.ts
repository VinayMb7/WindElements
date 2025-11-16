import { cn } from '../lib/utils';

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  className?: string;
}

export class Separator {
  private element: HTMLDivElement;
  private props: SeparatorProps;

  constructor(props: SeparatorProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const separator = document.createElement('div');
    
    const orientation = this.props.orientation || 'horizontal';
    const decorative = this.props.decorative !== false;
    
    const baseClasses = 'shrink-0 bg-[var(--border)]';
    const orientationClasses = orientation === 'horizontal' 
      ? 'h-[1px] w-full'  
      : 'h-full w-[1px]';
    
    separator.className = cn(baseClasses, orientationClasses, this.props.className);
    
    if (!decorative) {
      separator.setAttribute('role', 'separator');
      separator.setAttribute('aria-orientation', orientation);
    } else {
      separator.setAttribute('aria-hidden', 'true');
    }
    
    return separator;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createSeparator(props: SeparatorProps = {}): Separator {
  return new Separator(props);
}
