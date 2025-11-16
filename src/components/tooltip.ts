import { cn, Portal } from '../lib/utils';

export interface TooltipProps {
  content: string | HTMLElement;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  children: HTMLElement;
}

export class Tooltip {
  private trigger: HTMLElement;
  private tooltip: HTMLDivElement;
  private props: TooltipProps;
  private portal: Portal;
  private isVisible: boolean = false;

  constructor(props: TooltipProps) {
    this.props = props;
    this.trigger = props.children;
    this.tooltip = this.createTooltip();
    this.portal = new Portal();
    this.setupEventListeners();
  }

  private createTooltip(): HTMLDivElement {
    const tooltip = document.createElement('div');
    tooltip.className = cn(
      'z-50 overflow-hidden rounded-md bg-[var(--primary)] px-3 py-1.5 text-xs text-[var(--primary-foreground)] animate-in fade-in-0 zoom-in-95',
      this.props.className
    );
    tooltip.style.position = 'absolute';
    tooltip.style.display = 'none';
    tooltip.setAttribute('role', 'tooltip');
    
    if (typeof this.props.content === 'string') {
      tooltip.textContent = this.props.content;
    } else {
      tooltip.appendChild(this.props.content);
    }
    
    return tooltip;
  }

  private setupEventListeners(): void {
    this.trigger.addEventListener('mouseenter', () => this.show());
    this.trigger.addEventListener('mouseleave', () => this.hide());
    this.trigger.addEventListener('focus', () => this.show());
    this.trigger.addEventListener('blur', () => this.hide());
  }

  private show(): void {
    this.isVisible = true;
    this.portal.append(this.tooltip);
    this.tooltip.style.display = 'block';
    this.position();
  }

  private hide(): void {
    this.isVisible = false;
    this.tooltip.style.display = 'none';
    setTimeout(() => {
      if (!this.isVisible) {
        this.portal.remove(this.tooltip);
      }
    }, 150);
  }

  private position(): void {
    const triggerRect = this.trigger.getBoundingClientRect();
    const tooltipRect = this.tooltip.getBoundingClientRect();
    const side = this.props.side || 'top';
    const gap = 8;
    
    let top = 0;
    let left = 0;
    
    switch (side) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - gap;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + gap;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - gap;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + gap;
        break;
    }
    
    this.tooltip.style.top = `${top + window.scrollY}px`;
    this.tooltip.style.left = `${left + window.scrollX}px`;
  }

  getTrigger(): HTMLElement {
    return this.trigger;
  }

  destroy(): void {
    this.hide();
    this.tooltip.remove();
  }
}

export function createTooltip(props: TooltipProps): Tooltip {
  return new Tooltip(props);
}
