import { cn } from '../lib/utils';

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export class Avatar {
  private element: HTMLDivElement;
  private props: AvatarProps;
  private image: HTMLImageElement | null = null;
  private fallbackElement: HTMLDivElement | null = null;

  constructor(props: AvatarProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const avatar = document.createElement('div');
    
    const sizeClasses = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16'
    };
    
    const size = this.props.size || 'md';
    
    avatar.className = cn(
      'relative flex shrink-0 overflow-hidden rounded-full',
      sizeClasses[size],
      this.props.className
    );
    
    if (this.props.src) {
      this.image = document.createElement('img');
      this.image.src = this.props.src;
      this.image.alt = this.props.alt || '';
      this.image.className = 'aspect-square h-full w-full object-cover';
      
      this.image.addEventListener('error', () => {
        this.showFallback();
      });
      
      this.image.addEventListener('load', () => {
        if (this.fallbackElement) {
          this.fallbackElement.style.display = 'none';
        }
      });
      
      avatar.appendChild(this.image);
    }
    
    this.fallbackElement = this.createFallback();
    avatar.appendChild(this.fallbackElement);
    
    if (this.image) {
      this.fallbackElement.style.display = 'none';
    }
    
    return avatar;
  }

  private createFallback(): HTMLDivElement {
    const fallback = document.createElement('div');
    fallback.className = 'flex h-full w-full items-center justify-center rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]';
    
    const text = this.props.fallback || this.getInitials();
    fallback.textContent = text;
    
    return fallback;
  }

  private getInitials(): string {
    if (this.props.alt) {
      return this.props.alt
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return '?';
  }

  private showFallback(): void {
    if (this.image) {
      this.image.style.display = 'none';
    }
    if (this.fallbackElement) {
      this.fallbackElement.style.display = 'flex';
    }
  }

  setSrc(src: string): void {
    this.props.src = src;
    if (this.image) {
      this.image.src = src;
      this.image.style.display = 'block';
      if (this.fallbackElement) {
        this.fallbackElement.style.display = 'none';
      }
    }
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createAvatar(props: AvatarProps = {}): Avatar {
  return new Avatar(props);
}
