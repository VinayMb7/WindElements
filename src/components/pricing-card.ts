import { cn } from '../lib/utils';

export interface PricingCardProps {
  className?: string;
  title: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  buttonText?: string;
  onButtonClick?: () => void;
  featured?: boolean;
  badge?: string;
}

export class PricingCard {
  private element: HTMLDivElement;
  private props: PricingCardProps;

  constructor(props: PricingCardProps) {
    this.props = {
      period: 'month',
      buttonText: 'Get Started',
      featured: false,
      ...props
    };
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = cn(
      'relative rounded-lg border bg-[var(--card)] p-8 shadow-sm transition-all hover:shadow-lg',
      this.props.featured 
        ? 'border-[var(--primary)] ring-2 ring-[var(--primary)] scale-105' 
        : 'border-[var(--border)]',
      this.props.className
    );

    // Featured badge
    if (this.props.badge) {
      const badge = document.createElement('div');
      badge.className = 'absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary)] px-4 py-1 text-xs font-semibold text-[var(--primary-foreground)]';
      badge.textContent = this.props.badge;
      wrapper.appendChild(badge);
    }

    // Title
    const title = document.createElement('h3');
    title.className = 'text-2xl font-bold text-[var(--card-foreground)]';
    title.textContent = this.props.title;
    wrapper.appendChild(title);

    // Description
    if (this.props.description) {
      const description = document.createElement('p');
      description.className = 'mt-2 text-sm text-[var(--muted-foreground)]';
      description.textContent = this.props.description;
      wrapper.appendChild(description);
    }

    // Price
    const priceSection = document.createElement('div');
    priceSection.className = 'mt-6 flex items-baseline gap-2';

    const price = document.createElement('span');
    price.className = 'text-4xl font-bold text-[var(--card-foreground)]';
    price.textContent = this.props.price;
    priceSection.appendChild(price);

    if (this.props.period) {
      const period = document.createElement('span');
      period.className = 'text-[var(--muted-foreground)]';
      period.textContent = `/ ${this.props.period}`;
      priceSection.appendChild(period);
    }

    wrapper.appendChild(priceSection);

    // Features
    const featuresList = document.createElement('ul');
    featuresList.className = 'mt-8 space-y-3';

    this.props.features.forEach(feature => {
      const item = document.createElement('li');
      item.className = 'flex items-center gap-3 text-sm';

      const checkmark = document.createElement('span');
      checkmark.className = 'text-[var(--primary)]';
      checkmark.textContent = '✓';

      const text = document.createElement('span');
      text.textContent = feature;

      item.appendChild(checkmark);
      item.appendChild(text);
      featuresList.appendChild(item);
    });

    wrapper.appendChild(featuresList);

    // Button
    const button = document.createElement('button');
    button.className = cn(
      'mt-8 w-full rounded-md px-4 py-2 font-semibold transition-colors',
      this.props.featured
        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90'
        : 'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)]/80'
    );
    button.textContent = this.props.buttonText!;
    
    if (this.props.onButtonClick) {
      button.addEventListener('click', this.props.onButtonClick);
    }

    wrapper.appendChild(button);

    return wrapper;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createPricingCard(props: PricingCardProps): PricingCard {
  return new PricingCard(props);
}
