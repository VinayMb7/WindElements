import { cn } from '../lib/utils';

export interface TimelineProps {
  className?: string;
}

export interface TimelineItemProps {
  className?: string;
  title: string;
  description?: string;
  timestamp?: string;
  variant?: 'default' | 'primary' | 'success' | 'error' | 'warning';
  icon?: string;
}

export class Timeline {
  private element: HTMLDivElement;
  private props: TimelineProps;
  private items: TimelineItem[] = [];

  constructor(props: TimelineProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const timeline = document.createElement('div');
    timeline.className = cn('relative space-y-6', this.props.className);
    return timeline;
  }

  addItem(item: TimelineItem): void {
    this.items.push(item);
    this.element.appendChild(item.getElement());
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export class TimelineItem {
  private element: HTMLDivElement;
  private props: TimelineItemProps;

  constructor(props: TimelineItemProps) {
    this.props = {
      variant: 'default',
      ...props
    };
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const item = document.createElement('div');
    item.className = cn('relative flex gap-4', this.props.className);

    // Dot and line
    const dotContainer = document.createElement('div');
    dotContainer.className = 'relative flex flex-col items-center';

    const dot = document.createElement('div');
    dot.className = cn(
      'flex h-8 w-8 items-center justify-center rounded-full border-2',
      this.getVariantClasses()
    );

    if (this.props.icon) {
      dot.textContent = this.props.icon;
      dot.style.fontSize = '14px';
    } else {
      const innerDot = document.createElement('div');
      innerDot.className = cn('h-3 w-3 rounded-full', this.getInnerDotClasses());
      dot.appendChild(innerDot);
    }

    dotContainer.appendChild(dot);

    // Vertical line
    const line = document.createElement('div');
    line.className = 'w-px flex-1 bg-[var(--border)] mt-1';
    dotContainer.appendChild(line);

    item.appendChild(dotContainer);

    // Content
    const content = document.createElement('div');
    content.className = 'flex-1 pb-8';

    const header = document.createElement('div');
    header.className = 'flex items-start justify-between gap-4';

    const title = document.createElement('h4');
    title.className = 'font-semibold text-[var(--foreground)]';
    title.textContent = this.props.title;
    header.appendChild(title);

    if (this.props.timestamp) {
      const timestamp = document.createElement('span');
      timestamp.className = 'text-sm text-[var(--muted-foreground)]';
      timestamp.textContent = this.props.timestamp;
      header.appendChild(timestamp);
    }

    content.appendChild(header);

    if (this.props.description) {
      const description = document.createElement('p');
      description.className = 'mt-2 text-sm text-[var(--muted-foreground)]';
      description.textContent = this.props.description;
      content.appendChild(description);
    }

    item.appendChild(content);

    return item;
  }

  private getVariantClasses(): string {
    const variants = {
      default: 'border-[var(--border)] bg-[var(--background)]',
      primary: 'border-[var(--primary)] bg-[var(--primary)]/10',
      success: 'border-green-500 bg-green-50 dark:bg-green-900/20',
      error: 'border-red-500 bg-red-50 dark:bg-red-900/20',
      warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
    };
    return variants[this.props.variant!];
  }

  private getInnerDotClasses(): string {
    const variants = {
      default: 'bg-[var(--border)]',
      primary: 'bg-[var(--primary)]',
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500'
    };
    return variants[this.props.variant!];
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createTimeline(props: TimelineProps = {}): Timeline {
  return new Timeline(props);
}

export function createTimelineItem(props: TimelineItemProps): TimelineItem {
  return new TimelineItem(props);
}
