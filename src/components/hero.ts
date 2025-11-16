import { cn } from '../lib/utils';

export interface HeroProps {
  className?: string;
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  gradient?: boolean;
}

export class Hero {
  private element: HTMLElement;
  private props: HeroProps;

  constructor(props: HeroProps) {
    this.props = {
      gradient: true,
      ...props
    };
    this.element = this.render();
  }

  private render(): HTMLElement {
    const hero = document.createElement('section');
    hero.className = cn(
      'relative flex min-h-[60vh] items-center justify-center overflow-hidden',
      this.props.className
    );

    // Background
    if (this.props.backgroundImage) {
      const bgImage = document.createElement('div');
      bgImage.className = 'absolute inset-0 z-0';
      bgImage.style.backgroundImage = `url(${this.props.backgroundImage})`;
      bgImage.style.backgroundSize = 'cover';
      bgImage.style.backgroundPosition = 'center';
      
      const overlay = document.createElement('div');
      overlay.className = 'absolute inset-0 bg-[var(--background)]/80';
      bgImage.appendChild(overlay);
      
      hero.appendChild(bgImage);
    } else if (this.props.gradient) {
      const gradient = document.createElement('div');
      gradient.className = 'absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--secondary)]/10';
      hero.appendChild(gradient);
    }

    // Content
    const content = document.createElement('div');
    content.className = 'relative z-10 mx-auto max-w-4xl px-6 text-center';

    if (this.props.subtitle) {
      const subtitle = document.createElement('p');
      subtitle.className = 'mb-4 text-sm font-medium uppercase tracking-wide text-[var(--primary)]';
      subtitle.textContent = this.props.subtitle;
      content.appendChild(subtitle);
    }

    const title = document.createElement('h1');
    title.className = 'text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl lg:text-7xl';
    title.textContent = this.props.title;
    content.appendChild(title);

    if (this.props.description) {
      const description = document.createElement('p');
      description.className = 'mt-6 text-lg text-[var(--muted-foreground)] sm:text-xl';
      description.textContent = this.props.description;
      content.appendChild(description);
    }

    hero.appendChild(content);
    return hero;
  }

  setActions(actions: HTMLElement): void {
    const content = this.element.querySelector('div.relative');
    if (content) {
      const actionsWrapper = document.createElement('div');
      actionsWrapper.className = 'mt-8 flex flex-wrap items-center justify-center gap-4';
      actionsWrapper.appendChild(actions);
      content.appendChild(actionsWrapper);
    }
  }

  getElement(): HTMLElement {
    return this.element;
  }
}

export function createHero(props: HeroProps): Hero {
  return new Hero(props);
}
