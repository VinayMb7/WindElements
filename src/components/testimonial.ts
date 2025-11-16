import { cn } from '../lib/utils';

export interface TestimonialProps {
  className?: string;
  quote: string;
  author: string;
  role?: string;
  avatarUrl?: string;
  rating?: number;
}

export class Testimonial {
  private element: HTMLDivElement;
  private props: TestimonialProps;

  constructor(props: TestimonialProps) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = cn(
      'rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition-shadow hover:shadow-md',
      this.props.className
    );

    // Rating stars
    if (this.props.rating !== undefined) {
      const rating = this.createRating(this.props.rating);
      wrapper.appendChild(rating);
    }

    // Quote
    const quote = document.createElement('blockquote');
    quote.className = 'mt-4 text-[var(--card-foreground)] leading-relaxed';
    quote.textContent = `"${this.props.quote}"`;
    wrapper.appendChild(quote);

    // Author section
    const authorSection = document.createElement('div');
    authorSection.className = 'mt-6 flex items-center gap-4';

    if (this.props.avatarUrl) {
      const avatar = document.createElement('img');
      avatar.src = this.props.avatarUrl;
      avatar.alt = this.props.author;
      avatar.className = 'h-12 w-12 rounded-full object-cover';
      authorSection.appendChild(avatar);
    }

    const authorInfo = document.createElement('div');
    
    const authorName = document.createElement('div');
    authorName.className = 'font-semibold text-[var(--card-foreground)]';
    authorName.textContent = this.props.author;
    authorInfo.appendChild(authorName);

    if (this.props.role) {
      const role = document.createElement('div');
      role.className = 'text-sm text-[var(--muted-foreground)]';
      role.textContent = this.props.role;
      authorInfo.appendChild(role);
    }

    authorSection.appendChild(authorInfo);
    wrapper.appendChild(authorSection);

    return wrapper;
  }

  private createRating(rating: number): HTMLDivElement {
    const container = document.createElement('div');
    container.className = 'flex gap-1';

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.className = i <= rating ? 'text-yellow-500' : 'text-[var(--muted)]';
      star.textContent = '★';
      container.appendChild(star);
    }

    return container;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createTestimonial(props: TestimonialProps): Testimonial {
  return new Testimonial(props);
}
