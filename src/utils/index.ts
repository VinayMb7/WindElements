/**
 * Utility function to merge class names
 * Similar to clsx/classnames but lightweight
 */
export function cn(...inputs: (string | undefined | null | false | Record<string, boolean>)[]): string {
  const classes: string[] = [];
  
  for (const input of inputs) {
    if (!input) continue;
    
    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) {
          classes.push(key);
        }
      }
    }
  }
  
  return classes.join(' ');
}

/**
 * Generate a unique ID for component instances
 */
export function generateId(prefix: string = 'we'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Debounce function for event handlers
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttle function for event handlers
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if an element is visible in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Focus trap utility for modals and dialogs
 */
export class FocusTrap {
  private element: HTMLElement;
  private previousFocus: HTMLElement | null = null;
  private isActive: boolean = false;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  activate(): void {
    if (this.isActive) return;
    
    this.previousFocus = document.activeElement as HTMLElement;
    this.isActive = true;
    
    const focusableElements = this.getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
    
    this.element.addEventListener('keydown', this.handleKeyDown);
  }

  deactivate(): void {
    if (!this.isActive) return;
    
    this.isActive = false;
    this.element.removeEventListener('keydown', this.handleKeyDown);
    
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key !== 'Tab') return;
    
    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  private getFocusableElements(): HTMLElement[] {
    const selector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(this.element.querySelectorAll<HTMLElement>(selector));
  }
}

/**
 * Portal utility for rendering content outside the normal DOM hierarchy
 */
export class Portal {
  private container: HTMLElement;
  
  constructor(id: string = 'windelements-portal') {
    let existing = document.getElementById(id);
    if (!existing) {
      existing = document.createElement('div');
      existing.id = id;
      document.body.appendChild(existing);
    }
    this.container = existing;
  }
  
  append(element: HTMLElement): void {
    this.container.appendChild(element);
  }
  
  remove(element: HTMLElement): void {
    if (this.container.contains(element)) {
      this.container.removeChild(element);
    }
  }
}

/**
 * Position an element relative to a target (for popovers, dropdowns, etc.)
 */
export type Placement = 'top' | 'top-start' | 'top-end' | 
  'bottom' | 'bottom-start' | 'bottom-end' |
  'left' | 'left-start' | 'left-end' |
  'right' | 'right-start' | 'right-end';

export function positionElement(
  element: HTMLElement,
  target: HTMLElement,
  placement: Placement = 'bottom',
  offset: number = 8
): void {
  const targetRect = target.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  
  let top = 0;
  let left = 0;
  
  // Calculate position based on placement
  switch (placement) {
    case 'top':
      top = targetRect.top - elementRect.height - offset;
      left = targetRect.left + (targetRect.width - elementRect.width) / 2;
      break;
    case 'top-start':
      top = targetRect.top - elementRect.height - offset;
      left = targetRect.left;
      break;
    case 'top-end':
      top = targetRect.top - elementRect.height - offset;
      left = targetRect.right - elementRect.width;
      break;
    case 'bottom':
      top = targetRect.bottom + offset;
      left = targetRect.left + (targetRect.width - elementRect.width) / 2;
      break;
    case 'bottom-start':
      top = targetRect.bottom + offset;
      left = targetRect.left;
      break;
    case 'bottom-end':
      top = targetRect.bottom + offset;
      left = targetRect.right - elementRect.width;
      break;
    case 'left':
      top = targetRect.top + (targetRect.height - elementRect.height) / 2;
      left = targetRect.left - elementRect.width - offset;
      break;
    case 'left-start':
      top = targetRect.top;
      left = targetRect.left - elementRect.width - offset;
      break;
    case 'left-end':
      top = targetRect.bottom - elementRect.height;
      left = targetRect.left - elementRect.width - offset;
      break;
    case 'right':
      top = targetRect.top + (targetRect.height - elementRect.height) / 2;
      left = targetRect.right + offset;
      break;
    case 'right-start':
      top = targetRect.top;
      left = targetRect.right + offset;
      break;
    case 'right-end':
      top = targetRect.bottom - elementRect.height;
      left = targetRect.right + offset;
      break;
  }
  
  element.style.position = 'fixed';
  element.style.top = `${top}px`;
  element.style.left = `${left}px`;
  element.style.zIndex = '9999';
}
