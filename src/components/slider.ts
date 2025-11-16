import { cn } from '../lib/utils';

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  disabled?: boolean;
  className?: string;
  onChange?: (value: number) => void;
}

export class Slider {
  private element: HTMLDivElement;
  private input: HTMLInputElement;
  private track: HTMLDivElement;
  private range: HTMLDivElement;
  private thumb: HTMLDivElement;
  private props: SliderProps;

  constructor(props: SliderProps = {}) {
    this.props = props;
    this.input = this.createInput();
    this.track = this.createTrack();
    this.range = this.createRange();
    this.thumb = this.createThumb();
    this.element = this.render();
    this.updateVisual();
  }

  private createInput(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'range';
    input.className = 'sr-only';
    input.min = String(this.props.min || 0);
    input.max = String(this.props.max || 100);
    input.step = String(this.props.step || 1);
    input.value = String(this.props.defaultValue || this.props.min || 0);
    
    if (this.props.disabled) {
      input.disabled = true;
    }
    
    input.addEventListener('input', () => {
      this.updateVisual();
      if (this.props.onChange) {
        this.props.onChange(Number(input.value));
      }
    });
    
    return input;
  }

  private createTrack(): HTMLDivElement {
    const track = document.createElement('div');
    track.className = 'relative w-full h-1.5 bg-[var(--secondary)] rounded-full';
    return track;
  }

  private createRange(): HTMLDivElement {
    const range = document.createElement('div');
    range.className = 'absolute h-full bg-[var(--primary)] rounded-full';
    return range;
  }

  private createThumb(): HTMLDivElement {
    const thumb = document.createElement('div');
    thumb.className = 'absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-[var(--primary)] bg-[var(--background)] shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50';
    
    let isDragging = false;
    
    const handleMove = (clientX: number) => {
      const rect = this.track.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const min = this.props.min || 0;
      const max = this.props.max || 100;
      const step = this.props.step || 1;
      
      const value = min + percentage * (max - min);
      const steppedValue = Math.round(value / step) * step;
      
      this.setValue(steppedValue);
    };
    
    thumb.addEventListener('mousedown', (e) => {
      if (!this.props.disabled) {
        isDragging = true;
        e.preventDefault();
      }
    });
    
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    this.track.addEventListener('click', (e) => {
      if (!this.props.disabled) {
        handleMove(e.clientX);
      }
    });
    
    return thumb;
  }

  private render(): HTMLDivElement {
    const container = document.createElement('div');
    container.className = cn('relative flex w-full touch-none select-none items-center', this.props.className);
    
    this.track.appendChild(this.range);
    this.track.appendChild(this.thumb);
    
    container.appendChild(this.input);
    container.appendChild(this.track);
    
    return container;
  }

  private updateVisual(): void {
    const min = this.props.min || 0;
    const max = this.props.max || 100;
    const value = Number(this.input.value);
    const percentage = ((value - min) / (max - min)) * 100;
    
    this.range.style.width = `${percentage}%`;
    this.thumb.style.left = `${percentage}%`;
  }

  getValue(): number {
    return Number(this.input.value);
  }

  setValue(value: number): void {
    this.input.value = String(value);
    this.updateVisual();
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createSlider(props: SliderProps = {}): Slider {
  return new Slider(props);
}
