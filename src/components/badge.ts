import { cn } from '../lib/utils';

export interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  children?: string | HTMLElement | HTMLElement[];
}

export class Badge {
  private element: HTMLDivElement;
  private props: BadgeProps;

  constructor(props: BadgeProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const badge = document.createElement('div');
    
    const baseClasses = 'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2';
    
    const variantClasses = {
      default: 'border-transparent bg-[var(--primary)] text-[var(--primary-foreground)] shadow hover:bg-[var(--primary)]/80',
      secondary: 'border-transparent bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)]/80',
      destructive: 'border-transparent bg-[var(--destructive)] text-[var(--primary-foreground)] shadow hover:bg-[var(--destructive)]/80',
      outline: 'text-[var(--foreground)]'
    };
    
    const variant = this.props.variant || 'default';
    
    badge.className = cn(
      baseClasses,
      variantClasses[variant],
      this.props.className
    );
    
    if (this.props.children) {
      if (typeof this.props.children === 'string') {
        badge.appendChild(document.createTextNode(this.props.children));
      } else if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => badge.appendChild(child));
      } else {
        badge.appendChild(this.props.children);
      }
    }
    
    return badge;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createBadge(props: BadgeProps = {}): Badge {
  return new Badge(props);
}
