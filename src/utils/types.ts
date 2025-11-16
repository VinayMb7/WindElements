/**
 * Common type definitions for WindElements components
 */

export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'default' | 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';
export type Color = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

export interface BaseComponentProps {
  className?: string;
  id?: string;
  style?: Partial<CSSStyleDeclaration>;
}

export interface ComponentWithChildren extends BaseComponentProps {
  children?: HTMLElement | HTMLElement[] | string;
}

export interface DisableableComponent {
  disabled?: boolean;
}

export interface LoadingComponent {
  loading?: boolean;
}

export type EventCallback<T = Event> = (event: T) => void;

export interface ComponentEventMap {
  change: Event;
  click: MouseEvent;
  focus: FocusEvent;
  blur: FocusEvent;
  input: InputEvent;
  keydown: KeyboardEvent;
  keyup: KeyboardEvent;
  submit: SubmitEvent;
}

/**
 * Lifecycle methods for components
 */
export interface ComponentLifecycle {
  mount?(): void;
  unmount?(): void;
  update?(props: any): void;
}

/**
 * Base class for all WindElements components
 */
export abstract class BaseComponent<T extends BaseComponentProps = BaseComponentProps> implements ComponentLifecycle {
  protected element: HTMLElement;
  protected props: T;
  protected isMounted: boolean = false;
  
  constructor(props: T) {
    this.props = props;
    this.element = this.render();
  }
  
  protected abstract render(): HTMLElement;
  
  mount(): void {
    if (this.isMounted) return;
    this.isMounted = true;
    this.onMount();
  }
  
  unmount(): void {
    if (!this.isMounted) return;
    this.isMounted = false;
    this.onUnmount();
  }
  
  update(props: Partial<T>): void {
    this.props = { ...this.props, ...props };
    this.onUpdate();
  }
  
  getElement(): HTMLElement {
    return this.element;
  }
  
  protected onMount(): void {
    // Override in subclasses
  }
  
  protected onUnmount(): void {
    // Override in subclasses
  }
  
  protected onUpdate(): void {
    // Override in subclasses
  }
  
  protected applyBaseProps(element: HTMLElement): void {
    if (this.props.className) {
      element.className = this.props.className;
    }
    if (this.props.id) {
      element.id = this.props.id;
    }
    if (this.props.style) {
      Object.assign(element.style, this.props.style);
    }
  }
}
