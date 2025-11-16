import { cn } from '../lib/utils';

export interface CounterProps {
  className?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: number) => void;
}

export class Counter {
  private element: HTMLDivElement;
  private display: HTMLSpanElement;
  private decrementButton: HTMLButtonElement;
  private incrementButton: HTMLButtonElement;
  private props: CounterProps;
  private value: number;

  constructor(props: CounterProps = {}) {
    this.props = {
      value: 0,
      step: 1,
      size: 'md',
      ...props
    };
    this.value = this.props.value!;
    this.element = this.render();
    this.display = this.element.querySelector('[data-counter-display]') as HTMLSpanElement;
    this.decrementButton = this.element.querySelector('[data-counter-decrement]') as HTMLButtonElement;
    this.incrementButton = this.element.querySelector('[data-counter-increment]') as HTMLButtonElement;
    this.setupEventListeners();
    this.updateButtons();
  }

  private render(): HTMLDivElement {
    const sizeClasses = {
      sm: { wrapper: 'h-8', button: 'w-8 text-sm', display: 'min-w-[2rem] text-sm' },
      md: { wrapper: 'h-10', button: 'w-10 text-base', display: 'min-w-[3rem] text-base' },
      lg: { wrapper: 'h-12', button: 'w-12 text-lg', display: 'min-w-[4rem] text-lg' }
    };

    const sizes = sizeClasses[this.props.size!];

    const wrapper = document.createElement('div');
    wrapper.className = cn(
      'inline-flex items-center rounded-md border border-[var(--border)]',
      sizes.wrapper,
      this.props.className
    );

    const decrementButton = document.createElement('button');
    decrementButton.className = cn(
      'inline-flex items-center justify-center border-r border-[var(--border)] bg-[var(--background)] hover:bg-[var(--accent)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
      sizes.button
    );
    decrementButton.textContent = '-';
    decrementButton.setAttribute('data-counter-decrement', '');
    wrapper.appendChild(decrementButton);

    const display = document.createElement('span');
    display.className = cn(
      'inline-flex items-center justify-center bg-[var(--background)] font-medium tabular-nums',
      sizes.display
    );
    display.textContent = this.value.toString();
    display.setAttribute('data-counter-display', '');
    wrapper.appendChild(display);

    const incrementButton = document.createElement('button');
    incrementButton.className = cn(
      'inline-flex items-center justify-center border-l border-[var(--border)] bg-[var(--background)] hover:bg-[var(--accent)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
      sizes.button
    );
    incrementButton.textContent = '+';
    incrementButton.setAttribute('data-counter-increment', '');
    wrapper.appendChild(incrementButton);

    return wrapper;
  }

  private setupEventListeners(): void {
    this.decrementButton.addEventListener('click', () => {
      this.decrement();
    });

    this.incrementButton.addEventListener('click', () => {
      this.increment();
    });
  }

  private updateButtons(): void {
    if (this.props.min !== undefined && this.value <= this.props.min) {
      this.decrementButton.disabled = true;
    } else {
      this.decrementButton.disabled = false;
    }

    if (this.props.max !== undefined && this.value >= this.props.max) {
      this.incrementButton.disabled = true;
    } else {
      this.incrementButton.disabled = false;
    }
  }

  increment(): void {
    const newValue = this.value + this.props.step!;
    if (this.props.max === undefined || newValue <= this.props.max) {
      this.setValue(newValue);
    }
  }

  decrement(): void {
    const newValue = this.value - this.props.step!;
    if (this.props.min === undefined || newValue >= this.props.min) {
      this.setValue(newValue);
    }
  }

  setValue(value: number): void {
    this.value = value;
    this.display.textContent = this.value.toString();
    this.updateButtons();

    if (this.props.onChange) {
      this.props.onChange(this.value);
    }
  }

  getValue(): number {
    return this.value;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createCounter(props: CounterProps = {}): Counter {
  return new Counter(props);
}
