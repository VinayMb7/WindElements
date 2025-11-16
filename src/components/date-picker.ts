import { cn, Portal, positionElement } from '../lib/utils';
import { Calendar } from './calendar';

export interface DatePickerProps {
  className?: string;
  placeholder?: string;
  selected?: Date;
  onSelect?: (date: Date) => void;
  disabledDates?: (date: Date) => boolean;
}

export class DatePicker {
  private element: HTMLDivElement;
  private button: HTMLButtonElement;
  private calendar: Calendar;
  private calendarWrapper: HTMLDivElement;
  private props: DatePickerProps;
  private portal: Portal;
  private isOpen: boolean = false;
  private selectedDate?: Date;

  constructor(props: DatePickerProps = {}) {
    this.props = props;
    this.selectedDate = props.selected;
    this.element = this.render();
    this.button = this.element.querySelector('[data-datepicker-trigger]') as HTMLButtonElement;
    this.calendar = new Calendar({
      selected: props.selected,
      onSelect: (date) => this.selectDate(date),
      disabledDates: props.disabledDates
    });
    this.calendarWrapper = this.createCalendarWrapper();
    this.portal = new Portal();
    this.setupEventListeners();
  }

  private render(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = cn('relative w-full', this.props.className);

    const button = document.createElement('button');
    button.className = 'flex h-10 w-full items-center justify-between rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm ring-offset-[var(--background)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
    button.setAttribute('data-datepicker-trigger', '');

    const text = document.createElement('span');
    text.className = 'text-left flex-1';
    text.setAttribute('data-datepicker-text', '');
    text.textContent = this.selectedDate 
      ? this.formatDate(this.selectedDate) 
      : (this.props.placeholder || 'Pick a date');

    const icon = document.createElement('span');
    icon.className = 'ml-2 h-4 w-4 shrink-0 opacity-50';
    icon.textContent = '📅';

    button.appendChild(text);
    button.appendChild(icon);
    wrapper.appendChild(button);

    return wrapper;
  }

  private createCalendarWrapper(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'z-50 rounded-md border border-[var(--border)] bg-[var(--popover)] text-[var(--popover-foreground)] shadow-md';
    wrapper.style.display = 'none';
    wrapper.appendChild(this.calendar.getElement());
    return wrapper;
  }

  private setupEventListeners(): void {
    this.button.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });

    document.addEventListener('click', (e) => {
      if (this.isOpen && 
          !this.element.contains(e.target as Node) && 
          !this.calendarWrapper.contains(e.target as Node)) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
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
    this.portal.append(this.calendarWrapper);
    this.calendarWrapper.style.display = 'block';
    positionElement(this.calendarWrapper, this.element, 'bottom', 4);
  }

  close(): void {
    this.isOpen = false;
    this.calendarWrapper.style.display = 'none';
    this.portal.remove(this.calendarWrapper);
  }

  private selectDate(date: Date): void {
    this.selectedDate = date;
    this.updateButtonText();
    
    if (this.props.onSelect) {
      this.props.onSelect(date);
    }
    
    this.close();
  }

  private updateButtonText(): void {
    const text = this.button.querySelector('[data-datepicker-text]') as HTMLSpanElement;
    if (text) {
      text.textContent = this.selectedDate 
        ? this.formatDate(this.selectedDate) 
        : (this.props.placeholder || 'Pick a date');
    }
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getSelectedDate(): Date | undefined {
    return this.selectedDate;
  }

  setSelectedDate(date: Date): void {
    this.selectedDate = date;
    this.calendar.setSelectedDate(date);
    this.updateButtonText();
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.close();
    this.element.remove();
  }
}

export function createDatePicker(props: DatePickerProps = {}): DatePicker {
  return new DatePicker(props);
}
