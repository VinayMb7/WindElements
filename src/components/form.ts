import { cn } from '../lib/utils';

export interface FormProps {
  className?: string;
  onSubmit?: (data: FormData) => void | Promise<void>;
}

export class Form {
  private element: HTMLFormElement;
  private props: FormProps;
  private fields: Map<string, FormField> = new Map();

  constructor(props: FormProps = {}) {
    this.props = props;
    this.element = this.render();
    this.setupEventListeners();
  }

  private render(): HTMLFormElement {
    const form = document.createElement('form');
    form.className = cn('space-y-6', this.props.className);
    form.noValidate = true;
    return form;
  }

  private setupEventListeners(): void {
    this.element.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Validate all fields
      let isValid = true;
      this.fields.forEach(field => {
        if (!field.validate()) {
          isValid = false;
        }
      });

      if (!isValid) return;

      const formData = new FormData(this.element);
      
      if (this.props.onSubmit) {
        await this.props.onSubmit(formData);
      }
    });
  }

  addField(field: FormField): void {
    const name = field.getName();
    if (name) {
      this.fields.set(name, field);
    }
    this.element.appendChild(field.getElement());
  }

  reset(): void {
    this.element.reset();
    this.fields.forEach(field => field.clearError());
  }

  getElement(): HTMLFormElement {
    return this.element;
  }

  getData(): FormData {
    return new FormData(this.element);
  }
}

export class FormField {
  private element: HTMLDivElement;
  private input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  private errorMessage?: HTMLDivElement;
  private name: string;
  private validators: ((value: string) => string | null)[] = [];

  constructor(
    name: string,
    type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' = 'text',
    label?: string,
    className?: string
  ) {
    this.name = name;
    this.element = this.render(type, label, className);
    this.input = this.element.querySelector('[data-field-input]') as any;
    this.errorMessage = this.element.querySelector('[data-field-error]') as HTMLDivElement | undefined;
    this.setupEventListeners();
  }

  private render(
    type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select',
    label?: string,
    className?: string
  ): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = cn('space-y-2', className);

    if (label) {
      const labelEl = document.createElement('label');
      labelEl.className = 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70';
      labelEl.textContent = label;
      labelEl.htmlFor = this.name;
      wrapper.appendChild(labelEl);
    }

    let input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    if (type === 'textarea') {
      input = document.createElement('textarea');
      input.className = 'flex min-h-[80px] w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm ring-offset-[var(--background)] placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
    } else if (type === 'select') {
      input = document.createElement('select');
      input.className = 'flex h-10 w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm ring-offset-[var(--background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
    } else {
      input = document.createElement('input');
      input.type = type;
      input.className = 'flex h-10 w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm ring-offset-[var(--background)] placeholder:text-[var(--muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
    }

    input.name = this.name;
    input.id = this.name;
    input.setAttribute('data-field-input', '');
    wrapper.appendChild(input);

    const error = document.createElement('div');
    error.className = 'text-sm font-medium text-[var(--destructive)] hidden';
    error.setAttribute('data-field-error', '');
    wrapper.appendChild(error);

    return wrapper;
  }

  private setupEventListeners(): void {
    this.input.addEventListener('blur', () => {
      this.validate();
    });

    this.input.addEventListener('input', () => {
      if (this.errorMessage && !this.errorMessage.classList.contains('hidden')) {
        this.validate();
      }
    });
  }

  addValidator(validator: (value: string) => string | null): void {
    this.validators.push(validator);
  }

  validate(): boolean {
    const value = this.input.value;
    
    for (const validator of this.validators) {
      const error = validator(value);
      if (error) {
        this.setError(error);
        return false;
      }
    }
    
    this.clearError();
    return true;
  }

  setError(message: string): void {
    if (this.errorMessage) {
      this.errorMessage.textContent = message;
      this.errorMessage.classList.remove('hidden');
    }
    this.input.setAttribute('aria-invalid', 'true');
  }

  clearError(): void {
    if (this.errorMessage) {
      this.errorMessage.classList.add('hidden');
    }
    this.input.removeAttribute('aria-invalid');
  }

  setValue(value: string): void {
    this.input.value = value;
  }

  getValue(): string {
    return this.input.value;
  }

  getName(): string {
    return this.name;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  getInput(): HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement {
    return this.input;
  }
}

// Common validators
export const validators = {
  required: (message: string = 'This field is required') => (value: string) => {
    return value.trim() === '' ? message : null;
  },
  
  email: (message: string = 'Please enter a valid email address') => (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return value && !emailRegex.test(value) ? message : null;
  },
  
  minLength: (min: number, message?: string) => (value: string) => {
    return value.length < min ? (message || `Must be at least ${min} characters`) : null;
  },
  
  maxLength: (max: number, message?: string) => (value: string) => {
    return value.length > max ? (message || `Must be at most ${max} characters`) : null;
  },
  
  pattern: (pattern: RegExp, message: string = 'Invalid format') => (value: string) => {
    return value && !pattern.test(value) ? message : null;
  }
};

export function createForm(props: FormProps = {}): Form {
  return new Form(props);
}

export function createFormField(
  name: string,
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' = 'text',
  label?: string,
  className?: string
): FormField {
  return new FormField(name, type, label, className);
}
