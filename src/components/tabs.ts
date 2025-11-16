import { cn } from '../lib/utils';

export interface TabsProps {
  defaultValue?: string;
  className?: string;
  onValueChange?: (value: string) => void;
}

export interface TabsListProps {
  className?: string;
}

export interface TabsTriggerProps {
  value: string;
  className?: string;
  children?: string | HTMLElement | HTMLElement[];
}

export interface TabsContentProps {
  value: string;
  className?: string;
  children?: HTMLElement | HTMLElement[];
}

export class Tabs {
  private element: HTMLDivElement;
  private props: TabsProps;
  private list: TabsList | null = null;
  private triggers: Map<string, TabsTrigger> = new Map();
  private contents: Map<string, TabsContent> = new Map();
  private activeValue: string | null = null;

  constructor(props: TabsProps = {}) {
    this.props = props;
    this.activeValue = props.defaultValue || null;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const tabs = document.createElement('div');
    tabs.className = cn(this.props.className);
    return tabs;
  }

  setList(list: TabsList): void {
    this.list = list;
    this.element.appendChild(list.getElement());
  }

  addTrigger(trigger: TabsTrigger): void {
    if (!this.list) {
      throw new Error('TabsList must be set before adding triggers');
    }
    
    this.triggers.set(trigger.getValue(), trigger);
    this.list.addTrigger(trigger);
    
    trigger.onClick(() => this.setActiveTab(trigger.getValue()));
    
    if (this.activeValue === trigger.getValue()) {
      trigger.setActive(true);
    }
  }

  addContent(content: TabsContent): void {
    this.contents.set(content.getValue(), content);
    this.element.appendChild(content.getElement());
    
    if (this.activeValue === content.getValue()) {
      content.setActive(true);
    }
  }

  private setActiveTab(value: string): void {
    // Deactivate all triggers and contents
    this.triggers.forEach((trigger, triggerValue) => {
      trigger.setActive(triggerValue === value);
    });
    
    this.contents.forEach((content, contentValue) => {
      content.setActive(contentValue === value);
    });
    
    this.activeValue = value;
    
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  }

  getValue(): string | null {
    return this.activeValue;
  }

  setValue(value: string): void {
    this.setActiveTab(value);
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.triggers.forEach(trigger => trigger.destroy());
    this.contents.forEach(content => content.destroy());
    this.element.remove();
  }
}

export class TabsList {
  private element: HTMLDivElement;
  private props: TabsListProps;

  constructor(props: TabsListProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const list = document.createElement('div');
    list.className = cn(
      'inline-flex h-9 items-center justify-center rounded-lg bg-[var(--muted)] p-1 text-[var(--muted-foreground)]',
      this.props.className
    );
    list.setAttribute('role', 'tablist');
    return list;
  }

  addTrigger(trigger: TabsTrigger): void {
    this.element.appendChild(trigger.getElement());
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export class TabsTrigger {
  private element: HTMLButtonElement;
  private props: TabsTriggerProps;
  private clickCallback?: () => void;

  constructor(props: TabsTriggerProps) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLButtonElement {
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-[var(--background)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[var(--background)] data-[state=active]:text-[var(--foreground)] data-[state=active]:shadow',
      this.props.className
    );
    trigger.setAttribute('role', 'tab');
    trigger.setAttribute('data-state', 'inactive');
    trigger.setAttribute('data-value', this.props.value);
    
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

  setActive(active: boolean): void {
    this.element.setAttribute('data-state', active ? 'active' : 'inactive');
    this.element.setAttribute('aria-selected', String(active));
  }

  getValue(): string {
    return this.props.value;
  }

  getElement(): HTMLButtonElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export class TabsContent {
  private element: HTMLDivElement;
  private props: TabsContentProps;

  constructor(props: TabsContentProps) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const content = document.createElement('div');
    content.className = cn(
      'mt-2 ring-offset-[var(--background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
      this.props.className
    );
    content.setAttribute('role', 'tabpanel');
    content.setAttribute('data-state', 'inactive');
    content.setAttribute('data-value', this.props.value);
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

  setActive(active: boolean): void {
    this.element.setAttribute('data-state', active ? 'active' : 'inactive');
    this.element.style.display = active ? 'block' : 'none';
  }

  getValue(): string {
    return this.props.value;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createTabs(props: TabsProps = {}): Tabs {
  return new Tabs(props);
}

export function createTabsList(props: TabsListProps = {}): TabsList {
  return new TabsList(props);
}

export function createTabsTrigger(props: TabsTriggerProps): TabsTrigger {
  return new TabsTrigger(props);
}

export function createTabsContent(props: TabsContentProps): TabsContent {
  return new TabsContent(props);
}
