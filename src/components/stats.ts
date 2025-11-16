import { cn } from '../lib/utils';

export interface StatProps {
  className?: string;
  value: string;
  label: string;
  description?: string;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
}

export class Stat {
  private element: HTMLDivElement;
  private props: StatProps;

  constructor(props: StatProps) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = cn(
      'rounded-lg border border-[var(--border)] bg-[var(--card)] p-6',
      this.props.className
    );

    // Value
    const value = document.createElement('div');
    value.className = 'text-3xl font-bold text-[var(--card-foreground)]';
    value.textContent = this.props.value;
    wrapper.appendChild(value);

    // Label and trend
    const labelRow = document.createElement('div');
    labelRow.className = 'mt-2 flex items-center gap-2';

    const label = document.createElement('div');
    label.className = 'text-sm text-[var(--muted-foreground)]';
    label.textContent = this.props.label;
    labelRow.appendChild(label);

    if (this.props.trend) {
      const trend = document.createElement('span');
      trend.className = cn(
        'text-xs font-medium',
        this.props.trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
      );
      trend.textContent = `${this.props.trend.direction === 'up' ? '↑' : '↓'} ${this.props.trend.value}`;
      labelRow.appendChild(trend);
    }

    wrapper.appendChild(labelRow);

    // Description
    if (this.props.description) {
      const description = document.createElement('p');
      description.className = 'mt-2 text-xs text-[var(--muted-foreground)]';
      description.textContent = this.props.description;
      wrapper.appendChild(description);
    }

    return wrapper;
  }

  updateValue(value: string): void {
    const valueEl = this.element.querySelector('div.text-3xl');
    if (valueEl) {
      valueEl.textContent = value;
    }
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export class StatsGroup {
  private element: HTMLDivElement;
  private stats: Stat[] = [];

  constructor(className?: string) {
    this.element = this.render(className);
  }

  private render(className?: string): HTMLDivElement {
    const grid = document.createElement('div');
    grid.className = cn(
      'grid gap-4 md:grid-cols-2 lg:grid-cols-4',
      className
    );
    return grid;
  }

  addStat(stat: Stat): void {
    this.stats.push(stat);
    this.element.appendChild(stat.getElement());
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createStat(props: StatProps): Stat {
  return new Stat(props);
}

export function createStatsGroup(className?: string): StatsGroup {
  return new StatsGroup(className);
}
