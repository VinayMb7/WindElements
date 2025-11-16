import { cn } from '../lib/utils';

export interface CarouselProps {
  className?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  showIndicators?: boolean;
  showControls?: boolean;
}

export class Carousel {
  private element: HTMLDivElement;
  private track: HTMLDivElement;
  private props: CarouselProps;
  private slides: HTMLDivElement[] = [];
  private currentIndex: number = 0;
  private autoplayTimer?: number;

  constructor(props: CarouselProps = {}) {
    this.props = {
      autoplay: props.autoplay ?? false,
      autoplayInterval: props.autoplayInterval ?? 3000,
      showIndicators: props.showIndicators ?? true,
      showControls: props.showControls ?? true,
      ...props
    };
    this.element = this.render();
    this.track = this.element.querySelector('[data-carousel-track]') as HTMLDivElement;
    
    if (this.props.autoplay) {
      this.startAutoplay();
    }
  }

  private render(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = cn('relative w-full overflow-hidden', this.props.className);
    wrapper.setAttribute('data-carousel', '');

    // Track
    const track = document.createElement('div');
    track.className = 'flex transition-transform duration-300 ease-in-out';
    track.setAttribute('data-carousel-track', '');
    wrapper.appendChild(track);

    // Controls
    if (this.props.showControls) {
      const prevButton = this.createControlButton('prev', '←');
      const nextButton = this.createControlButton('next', '→');
      wrapper.appendChild(prevButton);
      wrapper.appendChild(nextButton);
    }

    // Indicators
    if (this.props.showIndicators) {
      const indicators = document.createElement('div');
      indicators.className = 'absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2';
      indicators.setAttribute('data-carousel-indicators', '');
      wrapper.appendChild(indicators);
    }

    return wrapper;
  }

  private createControlButton(type: 'prev' | 'next', icon: string): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = cn(
      'absolute top-1/2 -translate-y-1/2 z-10 rounded-full bg-[var(--background)]/80 p-2 text-[var(--foreground)] shadow-md hover:bg-[var(--background)] transition-colors',
      type === 'prev' ? 'left-4' : 'right-4'
    );
    button.innerHTML = icon;
    button.addEventListener('click', () => {
      if (type === 'prev') {
        this.previous();
      } else {
        this.next();
      }
    });
    return button;
  }

  addSlide(content: HTMLElement | string): void {
    const slide = document.createElement('div');
    slide.className = 'min-w-full flex-shrink-0';
    
    if (typeof content === 'string') {
      slide.innerHTML = content;
    } else {
      slide.appendChild(content);
    }
    
    this.slides.push(slide);
    this.track.appendChild(slide);
    
    this.updateIndicators();
  }

  private updateIndicators(): void {
    if (!this.props.showIndicators) return;
    
    const indicatorsEl = this.element.querySelector('[data-carousel-indicators]') as HTMLDivElement;
    if (!indicatorsEl) return;
    
    indicatorsEl.innerHTML = '';
    
    this.slides.forEach((_, index) => {
      const indicator = document.createElement('button');
      indicator.className = cn(
        'w-2 h-2 rounded-full transition-colors',
        index === this.currentIndex 
          ? 'bg-[var(--primary)]' 
          : 'bg-[var(--muted)]'
      );
      indicator.addEventListener('click', () => this.goTo(index));
      indicatorsEl.appendChild(indicator);
    });
  }

  next(): void {
    this.goTo((this.currentIndex + 1) % this.slides.length);
  }

  previous(): void {
    this.goTo((this.currentIndex - 1 + this.slides.length) % this.slides.length);
  }

  goTo(index: number): void {
    if (index < 0 || index >= this.slides.length) return;
    
    this.currentIndex = index;
    const offset = -index * 100;
    this.track.style.transform = `translateX(${offset}%)`;
    
    this.updateIndicators();
    this.resetAutoplay();
  }

  private startAutoplay(): void {
    this.autoplayTimer = window.setInterval(() => {
      this.next();
    }, this.props.autoplayInterval);
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = undefined;
    }
  }

  private resetAutoplay(): void {
    if (this.props.autoplay) {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.stopAutoplay();
    this.element.remove();
  }
}

export function createCarousel(props: CarouselProps = {}): Carousel {
  return new Carousel(props);
}
