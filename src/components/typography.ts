import { cn } from '../lib/utils';

export interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'blockquote' | 'code' | 'lead' | 'large' | 'small' | 'muted';
  className?: string;
  children?: string | HTMLElement | HTMLElement[];
}

export class Typography {
  private element: HTMLElement;
  private props: TypographyProps;

  constructor(props: TypographyProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLElement {
    const variant = this.props.variant || 'p';
    let element: HTMLElement;
    
    const variantConfig: Record<string, { tag: string; classes: string }> = {
      h1: {
        tag: 'h1',
        classes: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'
      },
      h2: {
        tag: 'h2',
        classes: 'scroll-m-20 border-b border-[var(--border)] pb-2 text-3xl font-semibold tracking-tight first:mt-0'
      },
      h3: {
        tag: 'h3',
        classes: 'scroll-m-20 text-2xl font-semibold tracking-tight'
      },
      h4: {
        tag: 'h4',
        classes: 'scroll-m-20 text-xl font-semibold tracking-tight'
      },
      p: {
        tag: 'p',
        classes: 'leading-7 [&:not(:first-child)]:mt-6'
      },
      blockquote: {
        tag: 'blockquote',
        classes: 'mt-6 border-l-2 border-[var(--border)] pl-6 italic'
      },
      code: {
        tag: 'code',
        classes: 'relative rounded bg-[var(--muted)] px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'
      },
      lead: {
        tag: 'p',
        classes: 'text-xl text-[var(--muted-foreground)]'
      },
      large: {
        tag: 'div',
        classes: 'text-lg font-semibold'
      },
      small: {
        tag: 'small',
        classes: 'text-sm font-medium leading-none'
      },
      muted: {
        tag: 'p',
        classes: 'text-sm text-[var(--muted-foreground)]'
      }
    };
    
    const config = variantConfig[variant] || variantConfig.p;
    element = document.createElement(config.tag);
    element.className = cn(config.classes, this.props.className);
    
    if (this.props.children) {
      if (typeof this.props.children === 'string') {
        element.textContent = this.props.children;
      } else if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => element.appendChild(child));
      } else {
        element.appendChild(this.props.children);
      }
    }
    
    return element;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createTypography(props: TypographyProps = {}): Typography {
  return new Typography(props);
}
