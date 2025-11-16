import { cn } from '../lib/utils';

export interface CollapsibleProps {
  defaultOpen?: boolean;
  className?: string;
  onOpenChange?: (open: boolean) => void;
}

export interface CollapsibleTriggerProps {
  className?: string;
  children?: string | HTMLElement | HTMLElement[];
}

export interface CollapsibleContentProps {
  className?: string;
  children?: HTMLElement | HTMLElement[];
}

export class Collapsible {
  private element: HTMLDivElement;
  private props: CollapsibleProps;
  private isOpen: boolean;
  private content: CollapsibleContent | null = null;

  constructor(props: CollapsibleProps = {}) {
    this.props = props;
    this.isOpen = props.defaultOpen || false;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const collapsible = document.createElement('div');
    collapsible.className = cn(this.props.className);
    collapsible.setAttribute('data-state', this.isOpen ? 'open' : 'closed');
    return collapsible;
  }

  setTrigger(trigger: CollapsibleTrigger): void {
    this.element.appendChild(trigger.getElement());
    
    trigger.onClick(() => this.toggle());
  }

  setContent(content: CollapsibleContent): void {
    this.content = content;
    this.element.appendChild(content.getElement());
    content.setOpen(this.isOpen);
  }

  toggle(): void {
    this.setOpen(!this.isOpen);
  }

  setOpen(open: boolean): void {
    this.isOpen = open;
    this.element.setAttribute('data-state', open ? 'open' : 'closed');
    
    if (this.content) {
      this.content.setOpen(open);
    }
    
    if (this.props.onOpenChange) {
      this.props.onOpenChange(open);
    }
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export class CollapsibleTrigger {
  private element: HTMLButtonElement;
  private props: CollapsibleTriggerProps;
  private clickCallback?: () => void;

  constructor(props: CollapsibleTriggerProps = {}) {
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

export class CollapsibleContent {
  private element: HTMLDivElement;
  private props: CollapsibleContentProps;

  constructor(props: CollapsibleContentProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const content = document.createElement('div');
    content.className = cn(
      'overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
      this.props.className
    );
    content.setAttribute('data-state', 'closed');
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

  setOpen(open: boolean): void {
    this.element.setAttribute('data-state', open ? 'open' : 'closed');
    this.element.style.display = open ? 'block' : 'none';
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createCollapsible(props: CollapsibleProps = {}): Collapsible {
  return new Collapsible(props);
}

export function createCollapsibleTrigger(props: CollapsibleTriggerProps = {}): CollapsibleTrigger {
  return new CollapsibleTrigger(props);
}

export function createCollapsibleContent(props: CollapsibleContentProps = {}): CollapsibleContent {
  return new CollapsibleContent(props);
}
