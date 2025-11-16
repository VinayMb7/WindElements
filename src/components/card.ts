import { cn } from '../lib/utils';

export interface CardProps {
  className?: string;
  children?: HTMLElement | HTMLElement[];
}

export class Card {
  private element: HTMLDivElement;
  private props: CardProps;

  constructor(props: CardProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const card = document.createElement('div');
    
    const baseClasses = 'rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] shadow';
    
    card.className = cn(baseClasses, this.props.className);
    
    if (this.props.children) {
      if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => card.appendChild(child));
      } else {
        card.appendChild(this.props.children);
      }
    }
    
    return card;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export class CardHeader {
  private element: HTMLDivElement;
  private props: CardProps;

  constructor(props: CardProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const header = document.createElement('div');
    header.className = cn('flex flex-col space-y-1.5 p-6', this.props.className);
    
    if (this.props.children) {
      if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => header.appendChild(child));
      } else {
        header.appendChild(this.props.children);
      }
    }
    
    return header;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export class CardTitle {
  private element: HTMLHeadingElement;
  private props: CardProps & { level?: 1 | 2 | 3 | 4 | 5 | 6 };

  constructor(props: CardProps & { level?: 1 | 2 | 3 | 4 | 5 | 6 } = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLHeadingElement {
    const level = this.props.level || 3;
    const title = document.createElement(`h${level}`) as HTMLHeadingElement;
    title.className = cn('font-semibold leading-none tracking-tight', this.props.className);
    
    if (this.props.children) {
      if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => title.appendChild(child));
      } else {
        title.appendChild(this.props.children);
      }
    }
    
    return title;
  }

  getElement(): HTMLHeadingElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export class CardDescription {
  private element: HTMLParagraphElement;
  private props: CardProps;

  constructor(props: CardProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLParagraphElement {
    const desc = document.createElement('p');
    desc.className = cn('text-sm text-[var(--muted-foreground)]', this.props.className);
    
    if (this.props.children) {
      if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => desc.appendChild(child));
      } else {
        desc.appendChild(this.props.children);
      }
    }
    
    return desc;
  }

  getElement(): HTMLParagraphElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export class CardContent {
  private element: HTMLDivElement;
  private props: CardProps;

  constructor(props: CardProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const content = document.createElement('div');
    content.className = cn('p-6 pt-0', this.props.className);
    
    if (this.props.children) {
      if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => content.appendChild(child));
      } else {
        content.appendChild(this.props.children);
      }
    }
    
    return content;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export class CardFooter {
  private element: HTMLDivElement;
  private props: CardProps;

  constructor(props: CardProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const footer = document.createElement('div');
    footer.className = cn('flex items-center p-6 pt-0', this.props.className);
    
    if (this.props.children) {
      if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => footer.appendChild(child));
      } else {
        footer.appendChild(this.props.children);
      }
    }
    
    return footer;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createCard(props: CardProps = {}): Card {
  return new Card(props);
}

export function createCardHeader(props: CardProps = {}): CardHeader {
  return new CardHeader(props);
}

export function createCardTitle(props: CardProps & { level?: 1 | 2 | 3 | 4 | 5 | 6 } = {}): CardTitle {
  return new CardTitle(props);
}

export function createCardDescription(props: CardProps = {}): CardDescription {
  return new CardDescription(props);
}

export function createCardContent(props: CardProps = {}): CardContent {
  return new CardContent(props);
}

export function createCardFooter(props: CardProps = {}): CardFooter {
  return new CardFooter(props);
}
