import { cn } from '../lib/utils';

export interface DividerProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  variant?: 'solid' | 'dashed' | 'dotted';
}

export class Divider {
  private element: HTMLDivElement;
  private props: DividerProps;

  constructor(props: DividerProps = {}) {
    this.props = {
      orientation: 'horizontal',
      variant: 'solid',
      ...props
    };
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    if (this.props.label && this.props.orientation === 'horizontal') {
      return this.renderWithLabel();
    }
    return this.renderSimple();
  }

  private renderSimple(): HTMLDivElement {
    const divider = document.createElement('div');
    divider.className = cn(
      'bg-[var(--border)]',
      this.props.orientation === 'horizontal' 
        ? 'h-px w-full' 
        : 'w-px h-full',
      this.getVariantClasses(),
      this.props.className
    );
    divider.setAttribute('role', 'separator');
    divider.setAttribute('aria-orientation', this.props.orientation!);
    return divider;
  }

  private renderWithLabel(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = cn('flex items-center gap-4', this.props.className);
    wrapper.setAttribute('role', 'separator');

    const line1 = document.createElement('div');
    line1.className = cn('flex-1 h-px bg-[var(--border)]', this.getVariantClasses());
    
    const label = document.createElement('span');
    label.className = 'text-sm text-[var(--muted-foreground)]';
    label.textContent = this.props.label!;

    const line2 = document.createElement('div');
    line2.className = cn('flex-1 h-px bg-[var(--border)]', this.getVariantClasses());

    wrapper.appendChild(line1);
    wrapper.appendChild(label);
    wrapper.appendChild(line2);

    return wrapper;
  }

  private getVariantClasses(): string {
    if (this.props.variant === 'dashed') {
      return 'border-dashed border-t';
    }
    if (this.props.variant === 'dotted') {
      return 'border-dotted border-t';
    }
    return '';
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createDivider(props: DividerProps = {}): Divider {
  return new Divider(props);
}
