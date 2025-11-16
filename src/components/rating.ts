import { cn } from '../lib/utils';

export interface RatingProps {
  className?: string;
  max?: number;
  value?: number;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: number) => void;
}

export class Rating {
  private element: HTMLDivElement;
  private props: RatingProps;
  private value: number;

  constructor(props: RatingProps = {}) {
    this.props = {
      max: 5,
      value: 0,
      readonly: false,
      size: 'md',
      ...props
    };
    this.value = this.props.value!;
    this.element = this.render();
    if (!this.props.readonly) {
      this.setupEventListeners();
    }
  }

  private render(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = cn(
      'flex items-center gap-1',
      !this.props.readonly && 'cursor-pointer',
      this.props.className
    );
    wrapper.setAttribute('role', 'slider');
    wrapper.setAttribute('aria-valuemin', '0');
    wrapper.setAttribute('aria-valuemax', this.props.max!.toString());
    wrapper.setAttribute('aria-valuenow', this.value.toString());

    for (let i = 1; i <= this.props.max!; i++) {
      const star = this.createStar(i);
      wrapper.appendChild(star);
    }

    return wrapper;
  }

  private createStar(index: number): HTMLSpanElement {
    const sizeClasses = {
      sm: 'text-base',
      md: 'text-xl',
      lg: 'text-3xl'
    };

    const star = document.createElement('span');
    star.className = cn(
      'transition-colors',
      sizeClasses[this.props.size!],
      index <= this.value ? 'text-yellow-500' : 'text-[var(--muted)]',
      !this.props.readonly && 'hover:text-yellow-400'
    );
    star.textContent = '★';
    star.setAttribute('data-star-index', index.toString());

    return star;
  }

  private setupEventListeners(): void {
    this.element.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const index = target.getAttribute('data-star-index');
      if (index) {
        this.setValue(parseInt(index));
      }
    });

    this.element.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      const index = target.getAttribute('data-star-index');
      if (index) {
        this.highlightStars(parseInt(index));
      }
    });

    this.element.addEventListener('mouseleave', () => {
      this.highlightStars(this.value);
    });
  }

  private highlightStars(count: number): void {
    const stars = this.element.querySelectorAll('[data-star-index]');
    stars.forEach((star, index) => {
      const htmlStar = star as HTMLSpanElement;
      if (index < count) {
        htmlStar.className = htmlStar.className.replace('text-[var(--muted)]', 'text-yellow-500');
      } else {
        htmlStar.className = htmlStar.className.replace('text-yellow-500', 'text-[var(--muted)]');
      }
    });
  }

  setValue(value: number): void {
    this.value = Math.max(0, Math.min(value, this.props.max!));
    this.element.setAttribute('aria-valuenow', this.value.toString());
    this.highlightStars(this.value);

    if (this.props.onChange) {
      this.props.onChange(this.value);
    }
  }

  getValue(): number {
    return this.value;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createRating(props: RatingProps = {}): Rating {
  return new Rating(props);
}
