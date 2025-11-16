import { cn } from '../lib/utils';

export interface ButtonGroupProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  children?: HTMLElement[];
}

export class ButtonGroup {
  private element: HTMLDivElement;
  private props: ButtonGroupProps;

  constructor(props: ButtonGroupProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const group = document.createElement('div');
    
    const orientation = this.props.orientation || 'horizontal';
    
    group.className = cn(
      'inline-flex',
      orientation === 'horizontal' ? 'flex-row -space-x-px' : 'flex-col -space-y-px',
      '[&>button:first-child]:rounded-r-none [&>button:last-child]:rounded-l-none [&>button:not(:first-child):not(:last-child)]:rounded-none',
      orientation === 'vertical' && '[&>button:first-child]:rounded-b-none [&>button:last-child]:rounded-t-none',
      this.props.className
    );
    
    group.setAttribute('role', 'group');
    
    if (this.props.children) {
      this.props.children.forEach(child => group.appendChild(child));
    }
    
    return group;
  }

  addButton(button: HTMLElement): void {
    this.element.appendChild(button);
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createButtonGroup(props: ButtonGroupProps = {}): ButtonGroup {
  return new ButtonGroup(props);
}
