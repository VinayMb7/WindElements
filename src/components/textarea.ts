import { cn } from '../lib/utils';

export interface TextareaProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  className?: string;
  id?: string;
  name?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  minLength?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  onInput?: (event: Event) => void;
  onChange?: (event: Event) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

export class Textarea {
  private element: HTMLTextAreaElement;
  private props: TextareaProps;

  constructor(props: TextareaProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLTextAreaElement {
    const textarea = document.createElement('textarea');
    
    const baseClasses = 'flex min-h-[60px] w-full rounded-[var(--radius)] border border-[var(--input)] bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';
    
    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize'
    };
    
    const resize = this.props.resize || 'vertical';
    
    textarea.className = cn(
      baseClasses,
      resizeClasses[resize],
      this.props.className
    );
    
    if (this.props.placeholder) textarea.placeholder = this.props.placeholder;
    if (this.props.value !== undefined) textarea.value = this.props.value;
    if (this.props.defaultValue) textarea.defaultValue = this.props.defaultValue;
    if (this.props.disabled) textarea.disabled = true;
    if (this.props.readOnly) textarea.readOnly = true;
    if (this.props.required) textarea.required = true;
    if (this.props.id) textarea.id = this.props.id;
    if (this.props.name) textarea.name = this.props.name;
    if (this.props.rows) textarea.rows = this.props.rows;
    if (this.props.cols) textarea.cols = this.props.cols;
    if (this.props.maxLength) textarea.maxLength = this.props.maxLength;
    if (this.props.minLength) textarea.minLength = this.props.minLength;
    
    if (this.props.onInput) textarea.addEventListener('input', this.props.onInput);
    if (this.props.onChange) textarea.addEventListener('change', this.props.onChange);
    if (this.props.onFocus) textarea.addEventListener('focus', this.props.onFocus);
    if (this.props.onBlur) textarea.addEventListener('blur', this.props.onBlur);
    
    return textarea;
  }

  getElement(): HTMLTextAreaElement {
    return this.element;
  }

  getValue(): string {
    return this.element.value;
  }

  setValue(value: string): void {
    this.element.value = value;
  }

  focus(): void {
    this.element.focus();
  }

  blur(): void {
    this.element.blur();
  }

  update(props: Partial<TextareaProps>): void {
    this.props = { ...this.props, ...props };
    const newElement = this.render();
    this.element.replaceWith(newElement);
    this.element = newElement;
  }

  destroy(): void {
    if (this.props.onInput) this.element.removeEventListener('input', this.props.onInput);
    if (this.props.onChange) this.element.removeEventListener('change', this.props.onChange);
    if (this.props.onFocus) this.element.removeEventListener('focus', this.props.onFocus);
    if (this.props.onBlur) this.element.removeEventListener('blur', this.props.onBlur);
    this.element.remove();
  }
}

export function createTextarea(props: TextareaProps = {}): Textarea {
  return new Textarea(props);
}
