import { cn } from '../lib/utils';

export interface ProgressProps {
  value?: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
}

export class Progress {
  private element: HTMLDivElement;
  private indicator: HTMLDivElement;
  private props: ProgressProps;

  constructor(props: ProgressProps = {}) {
    this.props = props;
    this.element = this.render();
    this.indicator = this.element.querySelector('[role="progressbar"]') as HTMLDivElement;
  }

  private render(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = cn(
      'relative h-2 w-full overflow-hidden rounded-full bg-[var(--primary)]/20',
      this.props.className
    );
    
    const indicator = document.createElement('div');
    indicator.setAttribute('role', 'progressbar');
    
    const value = this.props.value ?? 0;
    const max = this.props.max ?? 100;
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    
    indicator.setAttribute('aria-valuemin', '0');
    indicator.setAttribute('aria-valuemax', String(max));
    indicator.setAttribute('aria-valuenow', String(value));
    
    indicator.className = cn(
      'h-full w-full flex-1 bg-[var(--primary)] transition-all',
      this.props.indicatorClassName
    );
    indicator.style.transform = `translateX(-${100 - percentage}%)`;
    
    container.appendChild(indicator);
    
    return container;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  setValue(value: number): void {
    const max = this.props.max ?? 100;
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    
    this.indicator.setAttribute('aria-valuenow', String(value));
    this.indicator.style.transform = `translateX(-${100 - percentage}%)`;
    this.props.value = value;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createProgress(props: ProgressProps = {}): Progress {
  return new Progress(props);
}
