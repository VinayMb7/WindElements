import { cn } from '../lib/utils';

export interface AvatarGroupProps {
  className?: string;
  max?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCount?: boolean;
}

export class AvatarGroup {
  private element: HTMLDivElement;
  private props: AvatarGroupProps;
  private avatars: string[] = [];

  constructor(props: AvatarGroupProps = {}) {
    this.props = {
      max: 5,
      size: 'md',
      showCount: true,
      ...props
    };
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const group = document.createElement('div');
    group.className = cn('flex -space-x-2', this.props.className);
    group.setAttribute('data-avatar-group', '');
    return group;
  }

  addAvatar(src: string): void {
    this.avatars.push(src);
    this.updateAvatars();
  }

  setAvatars(avatars: string[]): void {
    this.avatars = avatars;
    this.updateAvatars();
  }

  private updateAvatars(): void {
    this.element.innerHTML = '';

    const displayAvatars = this.avatars.slice(0, this.props.max);
    const remaining = this.avatars.length - displayAvatars.length;

    displayAvatars.forEach((src, index) => {
      const avatar = this.createAvatar(src, index);
      this.element.appendChild(avatar);
    });

    if (remaining > 0 && this.props.showCount) {
      const counter = this.createCounter(remaining);
      this.element.appendChild(counter);
    }
  }

  private createAvatar(src: string, index: number): HTMLDivElement {
    const sizeClasses = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16'
    };

    const wrapper = document.createElement('div');
    wrapper.className = cn(
      'inline-block rounded-full ring-2 ring-[var(--background)]',
      sizeClasses[this.props.size!]
    );
    wrapper.style.zIndex = (100 - index).toString();

    const img = document.createElement('img');
    img.src = src;
    img.className = 'h-full w-full rounded-full object-cover';
    img.alt = `Avatar ${index + 1}`;

    wrapper.appendChild(img);
    return wrapper;
  }

  private createCounter(count: number): HTMLDivElement {
    const sizeClasses = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg'
    };

    const counter = document.createElement('div');
    counter.className = cn(
      'inline-flex items-center justify-center rounded-full bg-[var(--muted)] text-[var(--muted-foreground)] font-medium ring-2 ring-[var(--background)]',
      sizeClasses[this.props.size!]
    );
    counter.textContent = `+${count}`;
    counter.style.zIndex = '0';

    return counter;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createAvatarGroup(props: AvatarGroupProps = {}): AvatarGroup {
  return new AvatarGroup(props);
}
