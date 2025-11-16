import { cn } from '../lib/utils';

export interface CalendarProps {
  className?: string;
  selected?: Date;
  onSelect?: (date: Date) => void;
  disabledDates?: (date: Date) => boolean;
}

export class Calendar {
  private element: HTMLDivElement;
  private props: CalendarProps;
  private currentMonth: Date;
  private selectedDate?: Date;

  constructor(props: CalendarProps = {}) {
    this.props = props;
    this.currentMonth = props.selected || new Date();
    this.selectedDate = props.selected;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = cn('p-3', this.props.className);

    // Header with month/year and navigation
    const header = this.createHeader();
    wrapper.appendChild(header);

    // Days of week
    const weekdays = this.createWeekdays();
    wrapper.appendChild(weekdays);

    // Calendar grid
    const grid = this.createGrid();
    wrapper.appendChild(grid);

    return wrapper;
  }

  private createHeader(): HTMLDivElement {
    const header = document.createElement('div');
    header.className = 'flex items-center justify-between mb-4';

    const prevButton = document.createElement('button');
    prevButton.className = 'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-[var(--background)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] h-7 w-7 p-0';
    prevButton.innerHTML = '←';
    prevButton.addEventListener('click', () => this.previousMonth());

    const monthYear = document.createElement('div');
    monthYear.className = 'text-sm font-medium';
    monthYear.textContent = this.currentMonth.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
    monthYear.setAttribute('data-calendar-month', '');

    const nextButton = document.createElement('button');
    nextButton.className = 'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-[var(--background)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] h-7 w-7 p-0';
    nextButton.innerHTML = '→';
    nextButton.addEventListener('click', () => this.nextMonth());

    header.appendChild(prevButton);
    header.appendChild(monthYear);
    header.appendChild(nextButton);

    return header;
  }

  private createWeekdays(): HTMLDivElement {
    const weekdays = document.createElement('div');
    weekdays.className = 'grid grid-cols-7 gap-1 mb-2';

    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    days.forEach(day => {
      const cell = document.createElement('div');
      cell.className = 'text-center text-xs font-medium text-[var(--muted-foreground)] h-7 w-7 flex items-center justify-center';
      cell.textContent = day;
      weekdays.appendChild(cell);
    });

    return weekdays;
  }

  private createGrid(): HTMLDivElement {
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-7 gap-1';
    grid.setAttribute('data-calendar-grid', '');

    const firstDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const lastDay = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      const empty = document.createElement('div');
      empty.className = 'h-9 w-9';
      grid.appendChild(empty);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), day);
      const cell = this.createDayCell(date, day);
      grid.appendChild(cell);
    }

    return grid;
  }

  private createDayCell(date: Date, day: number): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = 'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-[var(--background)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] h-9 w-9 p-0';
    button.textContent = day.toString();

    const isSelected = this.selectedDate && 
      date.getDate() === this.selectedDate.getDate() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getFullYear() === this.selectedDate.getFullYear();

    const isToday = 
      date.getDate() === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear();

    if (isSelected) {
      button.className += ' bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]';
    } else if (isToday) {
      button.className += ' bg-[var(--accent)] text-[var(--accent-foreground)]';
    }

    const isDisabled = this.props.disabledDates && this.props.disabledDates(date);
    if (isDisabled) {
      button.disabled = true;
    }

    button.addEventListener('click', () => {
      this.selectDate(date);
    });

    return button;
  }

  private selectDate(date: Date): void {
    this.selectedDate = date;
    
    if (this.props.onSelect) {
      this.props.onSelect(date);
    }
    
    this.refresh();
  }

  private previousMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.refresh();
  }

  private nextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.refresh();
  }

  private refresh(): void {
    // Update month/year text
    const monthEl = this.element.querySelector('[data-calendar-month]') as HTMLDivElement;
    if (monthEl) {
      monthEl.textContent = this.currentMonth.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
    }

    // Recreate grid
    const grid = this.element.querySelector('[data-calendar-grid]') as HTMLDivElement;
    if (grid) {
      const newGrid = this.createGrid();
      grid.replaceWith(newGrid);
    }
  }

  getSelectedDate(): Date | undefined {
    return this.selectedDate;
  }

  setSelectedDate(date: Date): void {
    this.selectedDate = date;
    this.currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    this.refresh();
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createCalendar(props: CalendarProps = {}): Calendar {
  return new Calendar(props);
}
