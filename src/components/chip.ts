import { cn } from '../lib/utils';

export interface ChipProps {
  className?: string;
  label: string;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
}

export class Chip {
  private element: HTMLDivElement;
  private props: ChipProps;

  constructor(props: ChipProps) {
    this.props = {
      variant: 'default',
      size: 'md',
      removable: false,
      ...props
    };
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const chip = document.createElement('div');
    chip.className = cn(
      'inline-flex items-center gap-1 rounded-full font-medium transition-colors',
      this.getSizeClasses(),
      this.getVariantClasses(),
      this.props.onClick && 'cursor-pointer hover:opacity-80',
      this.props.className
    );

    const label = document.createElement('span');
    label.textContent = this.props.label;
    chip.appendChild(label);

    if (this.props.removable) {
      const removeButton = document.createElement('button');
      removeButton.className = 'rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors';
      removeButton.innerHTML = '×';
      removeButton.style.fontSize = this.props.size === 'sm' ? '14px' : this.props.size === 'lg' ? '20px' : '16px';
      removeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.props.onRemove) {
          this.props.onRemove();
        }
      });
      chip.appendChild(removeButton);
    }

    if (this.props.onClick) {
      chip.addEventListener('click', this.props.onClick);
    }

    return chip;
  }

  private getSizeClasses(): string {
    const sizes = {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-3 py-1',
      lg: 'text-base px-4 py-1.5'
    };
    return sizes[this.props.size!];
  }

  private getVariantClasses(): string {
    const variants = {
      default: 'bg-[var(--muted)] text-[var(--muted-foreground)]',
      primary: 'bg-[var(--primary)] text-[var(--primary-foreground)]',
      secondary: 'bg-[var(--secondary)] text-[var(--secondary-foreground)]',
      success: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-100',
      error: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-100',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-100'
    };
    return variants[this.props.variant!];
  }

  remove(): void {
    this.element.remove();
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createChip(props: ChipProps): Chip {
  return new Chip(props);
}
