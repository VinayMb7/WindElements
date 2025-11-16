import { cn, Portal, positionElement } from '../lib/utils';

export interface HoverCardProps {
  className?: string;
  openDelay?: number;
  closeDelay?: number;
}

export class HoverCard {
  private trigger: HTMLElement | null = null;
  private content: HTMLDivElement;
  private props: HoverCardProps;
  private portal: Portal;
  private isOpen: boolean = false;
  private openTimeout?: number;
  private closeTimeout?: number;

  constructor(props: HoverCardProps = {}) {
    this.props = {
      openDelay: props.openDelay ?? 200,
      closeDelay: props.closeDelay ?? 300,
      ...props
    };
    this.content = this.createContent();
    this.portal = new Portal();
  }

  private createContent(): HTMLDivElement {
    const content = document.createElement('div');
    content.className = cn(
      'z-50 w-64 rounded-md border border-[var(--border)] bg-[var(--popover)] p-4 text-[var(--popover-foreground)] shadow-md outline-none',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      this.props.className
    );
    content.setAttribute('role', 'tooltip');
    content.setAttribute('data-state', 'closed');
    content.style.display = 'none';
    return content;
  }

  setTrigger(trigger: HTMLElement): void {
    this.trigger = trigger;
    
    this.trigger.addEventListener('mouseenter', () => {
      this.clearCloseTimeout();
      this.openTimeout = window.setTimeout(() => {
        this.open();
      }, this.props.openDelay);
    });

    this.trigger.addEventListener('mouseleave', () => {
      this.clearOpenTimeout();
      this.closeTimeout = window.setTimeout(() => {
        this.close();
      }, this.props.closeDelay);
    });

    this.trigger.addEventListener('focus', () => {
      this.clearCloseTimeout();
      this.open();
    });

    this.trigger.addEventListener('blur', () => {
      this.clearOpenTimeout();
      this.close();
    });
  }

  private clearOpenTimeout(): void {
    if (this.openTimeout) {
      clearTimeout(this.openTimeout);
      this.openTimeout = undefined;
    }
  }

  private clearCloseTimeout(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = undefined;
    }
  }

  open(): void {
    if (!this.trigger || this.isOpen) return;
    
    this.isOpen = true;
    this.portal.append(this.content);
    this.content.style.display = 'block';
    this.content.setAttribute('data-state', 'open');
    
    positionElement(this.content, this.trigger, 'top', 8);

    // Keep open on hover over content
    this.content.addEventListener('mouseenter', () => {
      this.clearCloseTimeout();
    });

    this.content.addEventListener('mouseleave', () => {
      this.closeTimeout = window.setTimeout(() => {
        this.close();
      }, this.props.closeDelay);
    });
  }

  close(): void {
    if (!this.isOpen) return;
    
    this.isOpen = false;
    this.content.setAttribute('data-state', 'closed');
    
    setTimeout(() => {
      this.content.style.display = 'none';
      this.portal.remove(this.content);
    }, 150);
  }

  setContent(content: HTMLElement | string): void {
    if (typeof content === 'string') {
      this.content.innerHTML = content;
    } else {
      this.content.innerHTML = '';
      this.content.appendChild(content);
    }
  }

  getElement(): HTMLDivElement {
    return this.content;
  }

  destroy(): void {
    this.clearOpenTimeout();
    this.clearCloseTimeout();
    this.close();
    this.content.remove();
  }
}

export function createHoverCard(props: HoverCardProps = {}): HoverCard {
  return new HoverCard(props);
}
