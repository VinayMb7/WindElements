import { cn } from '../lib/utils';

export interface InputOTPProps {
  className?: string;
  length?: number;
  onComplete?: (value: string) => void;
  onChange?: (value: string) => void;
}

export class InputOTP {
  private element: HTMLDivElement;
  private inputs: HTMLInputElement[] = [];
  private props: InputOTPProps;
  private length: number;

  constructor(props: InputOTPProps = {}) {
    this.props = props;
    this.length = props.length ?? 6;
    this.element = this.render();
    this.inputs = Array.from(this.element.querySelectorAll('[data-otp-input]'));
    this.setupEventListeners();
  }

  private render(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = cn('flex gap-2', this.props.className);
    wrapper.setAttribute('data-input-otp', '');

    for (let i = 0; i < this.length; i++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.inputMode = 'numeric';
      input.maxLength = 1;
      input.className = 'flex h-10 w-10 rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm text-center ring-offset-[var(--background)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
      input.setAttribute('data-otp-input', '');
      input.setAttribute('data-index', i.toString());
      wrapper.appendChild(input);

      // Add separator after middle (for 6-digit, add after 3rd)
      if (i === Math.floor(this.length / 2) - 1) {
        const separator = document.createElement('div');
        separator.className = 'flex items-center justify-center';
        separator.innerHTML = '-';
        wrapper.appendChild(separator);
      }
    }

    return wrapper;
  }

  private setupEventListeners(): void {
    this.inputs.forEach((input, index) => {
      // Handle input
      input.addEventListener('input', (e) => {
        const value = (e.target as HTMLInputElement).value;
        
        // Only allow digits
        if (!/^\d*$/.test(value)) {
          (e.target as HTMLInputElement).value = '';
          return;
        }

        if (value.length === 1) {
          // Move to next input
          if (index < this.inputs.length - 1) {
            this.inputs[index + 1].focus();
          } else {
            // All inputs filled
            const otp = this.getValue();
            if (otp.length === this.length && this.props.onComplete) {
              this.props.onComplete(otp);
            }
          }
        }

        if (this.props.onChange) {
          this.props.onChange(this.getValue());
        }
      });

      // Handle backspace
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !input.value && index > 0) {
          this.inputs[index - 1].focus();
          this.inputs[index - 1].value = '';
        }
      });

      // Handle paste
      input.addEventListener('paste', (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData?.getData('text') || '';
        const digits = pastedData.replace(/\D/g, '').slice(0, this.length);
        
        digits.split('').forEach((digit, i) => {
          if (index + i < this.inputs.length) {
            this.inputs[index + i].value = digit;
          }
        });

        // Focus last filled input or next empty
        const nextIndex = Math.min(index + digits.length, this.inputs.length - 1);
        this.inputs[nextIndex].focus();

        if (this.props.onChange) {
          this.props.onChange(this.getValue());
        }

        if (this.getValue().length === this.length && this.props.onComplete) {
          this.props.onComplete(this.getValue());
        }
      });

      // Auto-select on focus
      input.addEventListener('focus', () => {
        input.select();
      });
    });
  }

  getValue(): string {
    return this.inputs.map(input => input.value).join('');
  }

  setValue(value: string): void {
    const digits = value.replace(/\D/g, '').slice(0, this.length);
    digits.split('').forEach((digit, i) => {
      if (i < this.inputs.length) {
        this.inputs[i].value = digit;
      }
    });
  }

  clear(): void {
    this.inputs.forEach(input => {
      input.value = '';
    });
    this.inputs[0].focus();
  }

  focus(): void {
    this.inputs[0].focus();
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createInputOTP(props: InputOTPProps = {}): InputOTP {
  return new InputOTP(props);
}
