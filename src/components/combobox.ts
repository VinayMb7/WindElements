import { cn, Portal, positionElement } from '../lib/utils';

export interface ComboboxProps {
  className?: string;
  placeholder?: string;
  emptyText?: string;
  options: ComboboxOption[];
  onSelect?: (value: string) => void;
}

export interface ComboboxOption {
  value: string;
  label: string;
}

export class Combobox {
  private element: HTMLDivElement;
  private button: HTMLButtonElement;
  private input: HTMLInputElement;
  private dropdown: HTMLDivElement;
  private props: ComboboxProps;
  private portal: Portal;
  private isOpen: boolean = false;
  private selectedValue: string = '';

  constructor(props: ComboboxProps) {
    this.props = props;
    this.element = this.render();
    this.button = this.element.querySelector('[data-combobox-trigger]') as HTMLButtonElement;
    this.input = this.element.querySelector('[data-combobox-input]') as HTMLInputElement;
    this.dropdown = this.createDropdown();
    this.portal = new Portal();
    this.setupEventListeners();
  }

  private render(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = cn('relative w-full', this.props.className);

    const button = document.createElement('button');
    button.className = 'flex h-10 w-full items-center justify-between rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm ring-offset-[var(--background)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
    button.setAttribute('role', 'combobox');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('data-combobox-trigger', '');

    const input = document.createElement('input');
    input.className = 'bg-transparent border-none outline-none flex-1';
    input.placeholder = this.props.placeholder || 'Select option...';
    input.setAttribute('data-combobox-input', '');

    const icon = document.createElement('span');
    icon.className = 'ml-2 h-4 w-4 shrink-0 opacity-50';
    icon.textContent = '▼';

    button.appendChild(input);
    button.appendChild(icon);
    wrapper.appendChild(button);

    return wrapper;
  }

  private createDropdown(): HTMLDivElement {
    const dropdown = document.createElement('div');
    dropdown.className = 'z-50 w-full min-w-[8rem] overflow-hidden rounded-md border border-[var(--border)] bg-[var(--popover)] text-[var(--popover-foreground)] shadow-md';
    dropdown.style.display = 'none';

    const list = document.createElement('div');
    list.className = 'max-h-[300px] overflow-y-auto p-1';
    list.setAttribute('role', 'listbox');

    // Render options
    if (this.props.options.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'py-6 text-center text-sm text-[var(--muted-foreground)]';
      empty.textContent = this.props.emptyText || 'No results found.';
      list.appendChild(empty);
    } else {
      this.props.options.forEach(option => {
        const item = this.createOption(option);
        list.appendChild(item);
      });
    }

    dropdown.appendChild(list);
    return dropdown;
  }

  private createOption(option: ComboboxOption): HTMLDivElement {
    const item = document.createElement('div');
    item.className = 'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] data-[selected=true]:bg-[var(--accent)]';
    item.setAttribute('role', 'option');
    item.setAttribute('data-value', option.value);
    item.textContent = option.label;

    item.addEventListener('click', () => {
      this.selectOption(option);
    });

    return item;
  }

  private setupEventListeners(): void {
    this.button.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });

    this.input.addEventListener('input', () => {
      this.filterOptions();
    });

    this.input.addEventListener('focus', () => {
      if (!this.isOpen) this.open();
    });

    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.element.contains(e.target as Node) && !this.dropdown.contains(e.target as Node)) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  private filterOptions(): void {
    const value = this.input.value.toLowerCase();
    const list = this.dropdown.querySelector('[role="listbox"]') as HTMLDivElement;
    const options = list.querySelectorAll('[role="option"]');

    let visibleCount = 0;
    options.forEach((option) => {
      const label = option.textContent?.toLowerCase() || '';
      const matches = label.includes(value);
      (option as HTMLElement).style.display = matches ? 'flex' : 'none';
      if (matches) visibleCount++;
    });

    // Show empty state if no matches
    const empty = list.querySelector('.text-center');
    if (empty) {
      empty.remove();
    }
    if (visibleCount === 0) {
      const emptyEl = document.createElement('div');
      emptyEl.className = 'py-6 text-center text-sm text-[var(--muted-foreground)]';
      emptyEl.textContent = this.props.emptyText || 'No results found.';
      list.appendChild(emptyEl);
    }
  }

  private toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    this.isOpen = true;
    this.button.setAttribute('aria-expanded', 'true');
    this.portal.append(this.dropdown);
    this.dropdown.style.display = 'block';
    positionElement(this.dropdown, this.element, 'bottom', 4);
    this.input.focus();
  }

  close(): void {
    this.isOpen = false;
    this.button.setAttribute('aria-expanded', 'false');
    this.dropdown.style.display = 'none';
    this.portal.remove(this.dropdown);
  }

  private selectOption(option: ComboboxOption): void {
    this.selectedValue = option.value;
    this.input.value = option.label;
    
    if (this.props.onSelect) {
      this.props.onSelect(option.value);
    }
    
    this.close();
  }

  getValue(): string {
    return this.selectedValue;
  }

  setValue(value: string): void {
    const option = this.props.options.find(opt => opt.value === value);
    if (option) {
      this.selectOption(option);
    }
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.close();
    this.element.remove();
  }
}

export function createCombobox(props: ComboboxProps): Combobox {
  return new Combobox(props);
}
