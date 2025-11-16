import { cn } from '../lib/utils';

export interface CommandProps {
  className?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export class Command {
  private element: HTMLDivElement;
  private input: HTMLInputElement;
  private list: HTMLDivElement;
  private props: CommandProps;
  private items: CommandItem[] = [];

  constructor(props: CommandProps = {}) {
    this.props = props;
    this.element = this.render();
    this.input = this.element.querySelector('[data-command-input]') as HTMLInputElement;
    this.list = this.element.querySelector('[data-command-list]') as HTMLDivElement;
    this.setupEventListeners();
  }

  private render(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-[var(--popover)] text-[var(--popover-foreground)]',
      this.props.className
    );

    // Search input
    const inputWrapper = document.createElement('div');
    inputWrapper.className = 'flex items-center border-b border-[var(--border)] px-3';
    
    const searchIcon = document.createElement('span');
    searchIcon.className = 'mr-2 h-4 w-4 shrink-0 opacity-50';
    searchIcon.innerHTML = '🔍';
    
    const input = document.createElement('input');
    input.className = 'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-[var(--muted-foreground)] disabled:cursor-not-allowed disabled:opacity-50';
    input.placeholder = this.props.placeholder || 'Type a command or search...';
    input.setAttribute('data-command-input', '');
    
    inputWrapper.appendChild(searchIcon);
    inputWrapper.appendChild(input);

    // Results list
    const list = document.createElement('div');
    list.className = 'max-h-[300px] overflow-y-auto overflow-x-hidden p-1';
    list.setAttribute('role', 'listbox');
    list.setAttribute('data-command-list', '');

    wrapper.appendChild(inputWrapper);
    wrapper.appendChild(list);

    return wrapper;
  }

  private setupEventListeners(): void {
    this.input.addEventListener('input', () => {
      const value = this.input.value.toLowerCase();
      
      if (this.props.onSearch) {
        this.props.onSearch(value);
      }
      
      // Filter items
      this.items.forEach(item => {
        const text = item.getText().toLowerCase();
        const matches = text.includes(value);
        item.getElement().style.display = matches ? 'flex' : 'none';
      });
    });

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        this.navigateItems(e.key === 'ArrowDown' ? 1 : -1);
      } else if (e.key === 'Enter') {
        this.selectCurrentItem();
      }
    });
  }

  private navigateItems(direction: number): void {
    const visibleItems = this.items.filter(item => item.getElement().style.display !== 'none');
    if (visibleItems.length === 0) return;

    const currentIndex = visibleItems.findIndex(item => item.getElement().hasAttribute('data-selected'));
    let newIndex = currentIndex + direction;

    if (newIndex < 0) newIndex = visibleItems.length - 1;
    if (newIndex >= visibleItems.length) newIndex = 0;

    visibleItems.forEach((item, index) => {
      if (index === newIndex) {
        item.getElement().setAttribute('data-selected', 'true');
        item.getElement().scrollIntoView({ block: 'nearest' });
      } else {
        item.getElement().removeAttribute('data-selected');
      }
    });
  }

  private selectCurrentItem(): void {
    const selected = this.items.find(item => item.getElement().hasAttribute('data-selected'));
    if (selected) {
      selected.getElement().click();
    }
  }

  addItem(item: CommandItem): void {
    this.items.push(item);
    this.list.appendChild(item.getElement());
  }

  addGroup(group: CommandGroup): void {
    this.list.appendChild(group.getElement());
    this.items.push(...group.getItems());
  }

  addSeparator(): void {
    const separator = document.createElement('div');
    separator.className = 'h-px my-1 bg-[var(--border)]';
    separator.setAttribute('role', 'separator');
    this.list.appendChild(separator);
  }

  clear(): void {
    this.list.innerHTML = '';
    this.items = [];
  }

  focus(): void {
    this.input.focus();
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export class CommandItem {
  private element: HTMLDivElement;
  private text: string;

  constructor(text: string, onClick?: () => void, className?: string) {
    this.text = text;
    this.element = this.render(text, onClick, className);
  }

  private render(text: string, onClick?: () => void, className?: string): HTMLDivElement {
    const item = document.createElement('div');
    item.className = cn(
      'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] data-[selected=true]:bg-[var(--accent)] data-[selected=true]:text-[var(--accent-foreground)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    );
    item.setAttribute('role', 'option');
    item.textContent = text;
    
    if (onClick) {
      item.addEventListener('click', onClick);
    }
    
    return item;
  }

  getText(): string {
    return this.text;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export class CommandGroup {
  private element: HTMLDivElement;
  private items: CommandItem[] = [];

  constructor(heading?: string, className?: string) {
    this.element = this.render(heading, className);
  }

  private render(heading?: string, className?: string): HTMLDivElement {
    const group = document.createElement('div');
    group.className = cn('overflow-hidden p-1', className);
    group.setAttribute('role', 'group');

    if (heading) {
      const headingEl = document.createElement('div');
      headingEl.className = 'px-2 py-1.5 text-xs font-medium text-[var(--muted-foreground)]';
      headingEl.textContent = heading;
      group.appendChild(headingEl);
    }

    return group;
  }

  addItem(item: CommandItem): void {
    this.items.push(item);
    this.element.appendChild(item.getElement());
  }

  getItems(): CommandItem[] {
    return this.items;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createCommand(props: CommandProps = {}): Command {
  return new Command(props);
}

export function createCommandItem(text: string, onClick?: () => void, className?: string): CommandItem {
  return new CommandItem(text, onClick, className);
}

export function createCommandGroup(heading?: string, className?: string): CommandGroup {
  return new CommandGroup(heading, className);
}
