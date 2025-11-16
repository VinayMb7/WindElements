import { cn } from '../lib/utils';

export interface AccordionProps {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  className?: string;
  defaultValue?: string | string[];
}

export interface AccordionItemProps {
  value: string;
  className?: string;
  disabled?: boolean;
}

export interface AccordionTriggerProps {
  className?: string;
  children?: string | HTMLElement | HTMLElement[];
}

export interface AccordionContentProps {
  className?: string;
  children?: HTMLElement | HTMLElement[];
}

export class Accordion {
  private element: HTMLDivElement;
  private props: AccordionProps;
  private items: Map<string, AccordionItem> = new Map();
  private openItems: Set<string> = new Set();

  constructor(props: AccordionProps = {}) {
    this.props = props;
    
    // Set initial open items
    if (props.defaultValue) {
      if (Array.isArray(props.defaultValue)) {
        props.defaultValue.forEach(v => this.openItems.add(v));
      } else {
        this.openItems.add(props.defaultValue);
      }
    }
    
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const accordion = document.createElement('div');
    accordion.className = cn('divide-y divide-[var(--border)]', this.props.className);
    accordion.setAttribute('data-accordion-type', this.props.type || 'single');
    accordion.setAttribute('data-collapsible', String(this.props.collapsible !== false));
    return accordion;
  }

  addItem(item: AccordionItem): void {
    this.items.set(item.getValue(), item);
    this.element.appendChild(item.getElement());
    
    // Set initial state
    if (this.openItems.has(item.getValue())) {
      item.setOpen(true);
    }
    
    // Handle item toggle
    item.onToggle((isOpen) => this.handleItemToggle(item.getValue(), isOpen));
  }

  private handleItemToggle(value: string, isOpen: boolean): void {
    if (isOpen) {
      if (this.props.type === 'single') {
        // Close all other items
        this.items.forEach((item, itemValue) => {
          if (itemValue !== value && this.openItems.has(itemValue)) {
            item.setOpen(false);
            this.openItems.delete(itemValue);
          }
        });
      }
      this.openItems.add(value);
    } else {
      this.openItems.delete(value);
    }
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.items.forEach(item => item.destroy());
    this.element.remove();
  }
}

export class AccordionItem {
  private element: HTMLDivElement;
  private props: AccordionItemProps;
  private trigger: AccordionTrigger | null = null;
  private content: AccordionContent | null = null;
  private isOpen: boolean = false;
  private toggleCallback?: (isOpen: boolean) => void;

  constructor(props: AccordionItemProps) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const item = document.createElement('div');
    item.className = cn('border-b border-[var(--border)]', this.props.className);
    item.setAttribute('data-value', this.props.value);
    if (this.props.disabled) {
      item.setAttribute('data-disabled', 'true');
    }
    return item;
  }

  setTrigger(trigger: AccordionTrigger): void {
    this.trigger = trigger;
    this.element.appendChild(trigger.getElement());
    
    trigger.onClick(() => {
      if (!this.props.disabled) {
        this.toggle();
      }
    });
  }

  setContent(content: AccordionContent): void {
    this.content = content;
    this.element.appendChild(content.getElement());
  }

  toggle(): void {
    this.setOpen(!this.isOpen);
  }

  setOpen(open: boolean): void {
    this.isOpen = open;
    
    if (this.trigger) {
      this.trigger.setOpen(open);
    }
    
    if (this.content) {
      this.content.setOpen(open);
    }
    
    if (this.toggleCallback) {
      this.toggleCallback(open);
    }
  }

  onToggle(callback: (isOpen: boolean) => void): void {
    this.toggleCallback = callback;
  }

  getValue(): string {
    return this.props.value;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.trigger?.destroy();
    this.content?.destroy();
    this.element.remove();
  }
}

export class AccordionTrigger {
  private element: HTMLButtonElement;
  private props: AccordionTriggerProps;
  private icon: HTMLElement;
  private clickCallback?: () => void;

  constructor(props: AccordionTriggerProps = {}) {
    this.props = props;
    this.icon = this.createIcon();
    this.element = this.render();
  }

  private createIcon(): HTMLElement {
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    icon.setAttribute('width', '16');
    icon.setAttribute('height', '16');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke', 'currentColor');
    icon.setAttribute('stroke-width', '2');
    icon.setAttribute('stroke-linecap', 'round');
    icon.setAttribute('stroke-linejoin', 'round');
    icon.className.baseVal = 'transition-transform duration-200';
    icon.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
    return icon as unknown as HTMLElement;
  }

  private render(): HTMLButtonElement {
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = cn(
      'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
      this.props.className
    );
    
    const contentWrapper = document.createElement('span');
    if (this.props.children) {
      if (typeof this.props.children === 'string') {
        contentWrapper.textContent = this.props.children;
      } else if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => contentWrapper.appendChild(child));
      } else {
        contentWrapper.appendChild(this.props.children);
      }
    }
    
    trigger.appendChild(contentWrapper);
    trigger.appendChild(this.icon);
    
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

  setOpen(open: boolean): void {
    this.element.setAttribute('data-state', open ? 'open' : 'closed');
  }

  getElement(): HTMLButtonElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export class AccordionContent {
  private element: HTMLDivElement;
  private props: AccordionContentProps;
  private contentWrapper: HTMLDivElement;

  constructor(props: AccordionContentProps = {}) {
    this.props = props;
    this.contentWrapper = document.createElement('div');
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const content = document.createElement('div');
    content.className = 'overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down';
    content.setAttribute('data-state', 'closed');
    content.style.display = 'none';
    
    this.contentWrapper.className = cn('pb-4 pt-0', this.props.className);
    
    if (this.props.children) {
      if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => this.contentWrapper.appendChild(child));
      } else {
        this.contentWrapper.appendChild(this.props.children);
      }
    }
    
    content.appendChild(this.contentWrapper);
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

export function createAccordion(props: AccordionProps = {}): Accordion {
  return new Accordion(props);
}

export function createAccordionItem(props: AccordionItemProps): AccordionItem {
  return new AccordionItem(props);
}

export function createAccordionTrigger(props: AccordionTriggerProps = {}): AccordionTrigger {
  return new AccordionTrigger(props);
}

export function createAccordionContent(props: AccordionContentProps = {}): AccordionContent {
  return new AccordionContent(props);
}
