import { cn } from '../lib/utils';

export interface FeatureCardProps {
  className?: string;
  icon?: string;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
}

export class FeatureCard {
  private element: HTMLDivElement;
  private props: FeatureCardProps;

  constructor(props: FeatureCardProps) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = cn(
      'group rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 transition-all hover:shadow-lg hover:border-[var(--primary)]',
      this.props.className
    );

    // Icon
    if (this.props.icon) {
      const iconWrapper = document.createElement('div');
      iconWrapper.className = 'mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-2xl text-[var(--primary)]';
      iconWrapper.textContent = this.props.icon;
      wrapper.appendChild(iconWrapper);
    }

    // Title
    const title = document.createElement('h3');
    title.className = 'text-xl font-semibold text-[var(--card-foreground)] group-hover:text-[var(--primary)] transition-colors';
    title.textContent = this.props.title;
    wrapper.appendChild(title);

    // Description
    const description = document.createElement('p');
    description.className = 'mt-2 text-sm text-[var(--muted-foreground)] leading-relaxed';
    description.textContent = this.props.description;
    wrapper.appendChild(description);

    // Link
    if (this.props.link) {
      const link = document.createElement('a');
      link.href = this.props.link.href;
      link.className = 'mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline';
      link.textContent = this.props.link.text;
      
      const arrow = document.createElement('span');
      arrow.textContent = '→';
      link.appendChild(arrow);

      if (this.props.link.onClick) {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          this.props.link!.onClick!();
        });
      }

      wrapper.appendChild(link);
    }

    return wrapper;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createFeatureCard(props: FeatureCardProps): FeatureCard {
  return new FeatureCard(props);
}
