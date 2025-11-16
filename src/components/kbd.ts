import { cn } from '../lib/utils';

export interface KbdProps {
  className?: string;
  children?: string | HTMLElement | HTMLElement[];
}

export class Kbd {
  private element: HTMLElement;
  private props: KbdProps;

  constructor(props: KbdProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLElement {
    const kbd = document.createElement('kbd');
    kbd.className = cn(
      'pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-[var(--border)] bg-[var(--muted)] px-1.5 font-mono text-[10px] font-medium text-[var(--muted-foreground)] opacity-100',
      this.props.className
    );
    
    if (this.props.children) {
      if (typeof this.props.children === 'string') {
        kbd.textContent = this.props.children;
      } else if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => kbd.appendChild(child));
      } else {
        kbd.appendChild(this.props.children);
      }
    }
    
    return kbd;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createKbd(props: KbdProps = {}): Kbd {
  return new Kbd(props);
}
