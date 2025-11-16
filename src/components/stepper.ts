import { cn } from '../lib/utils';

export interface StepperProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export interface StepProps {
  className?: string;
  title: string;
  description?: string;
  status?: 'pending' | 'active' | 'completed' | 'error';
  icon?: string;
}

export class Stepper {
  private element: HTMLDivElement;
  private props: StepperProps;
  private steps: Step[] = [];

  constructor(props: StepperProps = {}) {
    this.props = {
      orientation: 'horizontal',
      ...props
    };
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const stepper = document.createElement('div');
    stepper.className = cn(
      'flex',
      this.props.orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',
      this.props.className
    );
    return stepper;
  }

  addStep(step: Step): void {
    this.steps.push(step);
    this.element.appendChild(step.getElement());

    // Add connector between steps
    if (this.steps.length > 1) {
      const connector = this.createConnector();
      this.element.insertBefore(connector, step.getElement());
    }
  }

  private createConnector(): HTMLDivElement {
    const connector = document.createElement('div');
    connector.className = cn(
      'bg-[var(--border)]',
      this.props.orientation === 'horizontal' 
        ? 'h-px flex-1 mx-2' 
        : 'w-px h-8 ml-4'
    );
    return connector;
  }

  setActiveStep(index: number): void {
    this.steps.forEach((step, i) => {
      if (i < index) {
        step.setStatus('completed');
      } else if (i === index) {
        step.setStatus('active');
      } else {
        step.setStatus('pending');
      }
    });
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export class Step {
  private element: HTMLDivElement;
  private props: StepProps;
  private indicator: HTMLDivElement;

  constructor(props: StepProps) {
    this.props = {
      status: 'pending',
      ...props
    };
    this.element = this.render();
    this.indicator = this.element.querySelector('[data-step-indicator]') as HTMLDivElement;
  }

  private render(): HTMLDivElement {
    const step = document.createElement('div');
    step.className = cn('flex items-start gap-3', this.props.className);

    // Indicator
    const indicator = document.createElement('div');
    indicator.className = cn(
      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
      this.getIndicatorClasses()
    );
    indicator.setAttribute('data-step-indicator', '');

    if (this.props.icon) {
      indicator.textContent = this.props.icon;
      indicator.style.fontSize = '14px';
    } else if (this.props.status === 'completed') {
      indicator.textContent = '✓';
    } else if (this.props.status === 'error') {
      indicator.textContent = '✕';
    }

    step.appendChild(indicator);

    // Content
    const content = document.createElement('div');
    content.className = 'flex-1 pt-0.5';

    const title = document.createElement('div');
    title.className = cn(
      'font-medium transition-colors',
      this.props.status === 'active' ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'
    );
    title.textContent = this.props.title;
    content.appendChild(title);

    if (this.props.description) {
      const description = document.createElement('p');
      description.className = 'mt-1 text-sm text-[var(--muted-foreground)]';
      description.textContent = this.props.description;
      content.appendChild(description);
    }

    step.appendChild(content);

    return step;
  }

  private getIndicatorClasses(): string {
    const statusClasses = {
      pending: 'border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)]',
      active: 'border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]',
      completed: 'border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]',
      error: 'border-red-500 bg-red-500 text-white'
    };
    return statusClasses[this.props.status!];
  }

  setStatus(status: 'pending' | 'active' | 'completed' | 'error'): void {
    this.props.status = status;
    this.indicator.className = cn(
      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
      this.getIndicatorClasses()
    );

    // Update icon
    if (!this.props.icon) {
      if (status === 'completed') {
        this.indicator.textContent = '✓';
      } else if (status === 'error') {
        this.indicator.textContent = '✕';
      } else {
        this.indicator.textContent = '';
      }
    }

    // Update title color
    const title = this.element.querySelector('div.font-medium') as HTMLDivElement;
    if (title) {
      title.className = cn(
        'font-medium transition-colors',
        status === 'active' ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'
      );
    }
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createStepper(props: StepperProps = {}): Stepper {
  return new Stepper(props);
}

export function createStep(props: StepProps): Step {
  return new Step(props);
}
