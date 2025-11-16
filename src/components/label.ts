import { cn } from '../lib/utils';

export interface LabelProps {
  htmlFor?: string;
  className?: string;
  required?: boolean;
  children?: string | HTMLElement | HTMLElement[];
}

export class Label {
  private element: HTMLLabelElement;
  private props: LabelProps;

  constructor(props: LabelProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLLabelElement {
    const label = document.createElement('label');
    
    const baseClasses = 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70';
    
    label.className = cn(baseClasses, this.props.className);
    
    if (this.props.htmlFor) {
      label.htmlFor = this.props.htmlFor;
    }
    
    if (this.props.children) {
      if (typeof this.props.children === 'string') {
        label.appendChild(document.createTextNode(this.props.children));
      } else if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => label.appendChild(child));
      } else {
        label.appendChild(this.props.children);
      }
    }
    
    if (this.props.required) {
      const asterisk = document.createElement('span');
      asterisk.className = 'text-[var(--destructive)] ml-1';
      asterisk.textContent = '*';
      label.appendChild(asterisk);
    }
    
    return label;
  }

  getElement(): HTMLLabelElement {
    return this.element;
  }

  update(props: Partial<LabelProps>): void {
    this.props = { ...this.props, ...props };
    const newElement = this.render();
    this.element.replaceWith(newElement);
    this.element = newElement;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createLabel(props: LabelProps = {}): Label {
  return new Label(props);
}
