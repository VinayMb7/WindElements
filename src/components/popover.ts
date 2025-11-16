import { cn, Portal, positionElement } from '../lib/utils';

export interface PopoverProps {
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  className?: string;
  onOpenChange?: (open: boolean) => void;
}

export interface PopoverTriggerProps {
  className?: string;
  children?: string | HTMLElement | HTMLElement[];
}

export interface PopoverContentProps {
  className?: string;
  children?: HTMLElement | HTMLElement[];
}

export class Popover {
  private trigger: PopoverTrigger | null = null;
  private content: PopoverContent | null = null;
  private props: PopoverProps;
  private isOpen: boolean = false;
  private portal: Portal;
  private backdrop?: HTMLDivElement;

  constructor(props: PopoverProps = {}) {
    this.props = props;
    this.portal = new Portal();
  }

  setTrigger(trigger: PopoverTrigger): void {
    this.trigger = trigger;
    trigger.onClick(() => this.toggle());
  }

  setContent(content: PopoverContent): void {
    this.content = content;
  }

  toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    if (!this.content || !this.trigger) return;
    
    this.isOpen = true;
    
    // Create backdrop
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'fixed inset-0 z-40';
    this.backdrop.addEventListener('click', () => this.close());
    this.portal.append(this.backdrop);
    
    // Show content
    this.portal.append(this.content.getElement());
    this.content.show();
    
    // Position content
    this.position();
    
    if (this.props.onOpenChange) {
      this.props.onOpenChange(true);
    }
    
    // Reposition on scroll/resize
    window.addEventListener('scroll', this.position);
    window.addEventListener('resize', this.position);
  }

  close(): void {
    if (!this.content) return;
    
    this.isOpen = false;
    this.content.hide();
    
    setTimeout(() => {
      if (this.content) {
        this.portal.remove(this.content.getElement());
      }
      if (this.backdrop) {
        this.portal.remove(this.backdrop);
      }
    }, 150);
    
    window.removeEventListener('scroll', this.position);
    window.removeEventListener('resize', this.position);
    
    if (this.props.onOpenChange) {
      this.props.onOpenChange(false);
    }
  }

  private position = (): void => {
    if (!this.content || !this.trigger) return;
    
    const placement = `${this.props.side || 'bottom'}${this.props.align ? '-' + this.props.align : ''}`;
    positionElement(
      this.content.getElement(),
      this.trigger.getElement(),
      placement as any
    );
  };

  destroy(): void {
    this.close();
  }
}

export class PopoverTrigger {
  private element: HTMLButtonElement;
  private props: PopoverTriggerProps;
  private clickCallback?: () => void;

  constructor(props: PopoverTriggerProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLButtonElement {
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = cn(this.props.className);
    
    if (this.props.children) {
      if (typeof this.props.children === 'string') {
        trigger.textContent = this.props.children;
      } else if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => trigger.appendChild(child));
      } else {
        trigger.appendChild(this.props.children);
      }
    }
    
    trigger.addEventListener('click', () => {
      if (this.clickCallback) {
        this.clickCallback();
      }
    });
    
    return trigger;
  }

  onClick(callback: () => void): void {
    this.clickCallback = callback;
  }

  getElement(): HTMLButtonElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export class PopoverContent {
  private element: HTMLDivElement;
  private props: PopoverContentProps;

  constructor(props: PopoverContentProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const content = document.createElement('div');
    content.className = cn(
      'z-50 w-72 rounded-md border border-[var(--border)] bg-[var(--popover)] p-4 text-[var(--popover-foreground)] shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      this.props.className
    );
    content.setAttribute('data-state', 'closed');
    content.setAttribute('role', 'dialog');
    content.style.position = 'absolute';
    content.style.display = 'none';
    
    if (this.props.children) {
      if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => content.appendChild(child));
      } else {
        content.appendChild(this.props.children);
      }
    }
    
    return content;
  }

  show(): void {
    this.element.style.display = 'block';
    this.element.setAttribute('data-state', 'open');
  }

  hide(): void {
    this.element.setAttribute('data-state', 'closed');
    setTimeout(() => {
      this.element.style.display = 'none';
    }, 150);
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createPopover(props: PopoverProps = {}): Popover {
  return new Popover(props);
}

export function createPopoverTrigger(props: PopoverTriggerProps = {}): PopoverTrigger {
  return new PopoverTrigger(props);
}

export function createPopoverContent(props: PopoverContentProps = {}): PopoverContent {
  return new PopoverContent(props);
}
