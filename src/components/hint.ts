import { cn, Portal, positionElement } from '../lib/utils';

export interface HintProps {
  className?: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export class Hint {
  private trigger: HTMLElement | null = null;
  private content: HTMLDivElement;
  private props: HintProps;
  private portal: Portal;
  private isOpen: boolean = false;
  private timeout?: number;

  constructor(props: HintProps) {
    this.props = {
      placement: 'top',
      delay: 300,
      ...props
    };
    this.content = this.createContent();
    this.portal = new Portal();
  }

  private createContent(): HTMLDivElement {
    const hint = document.createElement('div');
    hint.className = cn(
      'z-50 rounded-md bg-[var(--popover)] px-3 py-1.5 text-xs text-[var(--popover-foreground)] shadow-md border border-[var(--border)]',
      'animate-in fade-in-0 zoom-in-95',
      this.props.className
    );
    hint.textContent = this.props.content;
    hint.style.display = 'none';
    hint.setAttribute('role', 'tooltip');
    return hint;
  }

  setTrigger(trigger: HTMLElement): void {
    this.trigger = trigger;
    
    this.trigger.addEventListener('mouseenter', () => {
      this.timeout = window.setTimeout(() => {
        this.show();
      }, this.props.delay);
    });

    this.trigger.addEventListener('mouseleave', () => {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.hide();
    });

    this.trigger.addEventListener('focus', () => {
      this.show();
    });

    this.trigger.addEventListener('blur', () => {
      this.hide();
    });
  }

  private show(): void {
    if (!this.trigger || this.isOpen) return;
    
    this.isOpen = true;
    this.portal.append(this.content);
    this.content.style.display = 'block';
    
    positionElement(this.content, this.trigger, this.props.placement!, 8);
  }

  private hide(): void {
    if (!this.isOpen) return;
    
    this.isOpen = false;
    this.content.style.display = 'none';
    this.portal.remove(this.content);
  }

  updateContent(content: string): void {
    this.content.textContent = content;
  }

  destroy(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.hide();
    this.content.remove();
  }
}

export function createHint(props: HintProps): Hint {
  return new Hint(props);
}
