import { cn } from '../lib/utils';

export interface ResizablePanelProps {
  className?: string;
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
}

export interface ResizableProps {
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

export class Resizable {
  private element: HTMLDivElement;
  private props: ResizableProps;
  private panels: ResizablePanel[] = [];

  constructor(props: ResizableProps = {}) {
    this.props = {
      direction: props.direction || 'horizontal',
      ...props
    };
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = cn(
      'flex w-full',
      this.props.direction === 'horizontal' ? 'flex-row h-full' : 'flex-col',
      this.props.className
    );
    wrapper.setAttribute('data-resizable', '');
    return wrapper;
  }

  addPanel(panel: ResizablePanel): void {
    this.panels.push(panel);
    this.element.appendChild(panel.getElement());

    if (this.panels.length > 1) {
      const handle = this.createHandle();
      // Insert handle before the last panel
      this.element.insertBefore(handle, panel.getElement());
      this.setupResizing(handle, this.panels.length - 2);
    }
  }

  private createHandle(): HTMLDivElement {
    const handle = document.createElement('div');
    handle.className = cn(
      'relative flex items-center justify-center bg-[var(--border)] transition-colors hover:bg-[var(--border)]/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)]',
      this.props.direction === 'horizontal' 
        ? 'w-1 cursor-col-resize hover:w-2' 
        : 'h-1 cursor-row-resize hover:h-2'
    );
    handle.setAttribute('role', 'separator');
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('data-resizable-handle', '');

    const indicator = document.createElement('div');
    indicator.className = cn(
      'z-10 flex items-center justify-center rounded-sm bg-[var(--border)]',
      this.props.direction === 'horizontal' 
        ? 'h-4 w-3' 
        : 'h-3 w-4'
    );
    
    const dot1 = document.createElement('div');
    dot1.className = 'h-1 w-1 rounded-full bg-[var(--foreground)] opacity-50';
    
    const dot2 = document.createElement('div');
    dot2.className = 'h-1 w-1 rounded-full bg-[var(--foreground)] opacity-50 mx-0.5';

    indicator.appendChild(dot1);
    indicator.appendChild(dot2);
    handle.appendChild(indicator);

    return handle;
  }

  private setupResizing(handle: HTMLDivElement, panelIndex: number): void {
    let isResizing = false;
    let startPos = 0;
    let startSize1 = 0;
    let startSize2 = 0;

    const panel1 = this.panels[panelIndex];
    const panel2 = this.panels[panelIndex + 1];

    const onMouseDown = (e: MouseEvent) => {
      isResizing = true;
      startPos = this.props.direction === 'horizontal' ? e.clientX : e.clientY;
      
      const rect1 = panel1.getElement().getBoundingClientRect();
      const rect2 = panel2.getElement().getBoundingClientRect();
      
      startSize1 = this.props.direction === 'horizontal' ? rect1.width : rect1.height;
      startSize2 = this.props.direction === 'horizontal' ? rect2.width : rect2.height;
      
      document.body.style.cursor = this.props.direction === 'horizontal' ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const currentPos = this.props.direction === 'horizontal' ? e.clientX : e.clientY;
      const delta = currentPos - startPos;

      let newSize1 = startSize1 + delta;
      let newSize2 = startSize2 - delta;

      // Apply min/max constraints
      if (panel1.props.minSize !== undefined) {
        newSize1 = Math.max(newSize1, panel1.props.minSize);
      }
      if (panel1.props.maxSize !== undefined) {
        newSize1 = Math.min(newSize1, panel1.props.maxSize);
      }
      if (panel2.props.minSize !== undefined) {
        newSize2 = Math.max(newSize2, panel2.props.minSize);
      }
      if (panel2.props.maxSize !== undefined) {
        newSize2 = Math.min(newSize2, panel2.props.maxSize);
      }

      // Recalculate delta based on constraints
      const adjustedDelta = newSize1 - startSize1;
      newSize2 = startSize2 - adjustedDelta;

      if (this.props.direction === 'horizontal') {
        panel1.getElement().style.width = `${newSize1}px`;
        panel2.getElement().style.width = `${newSize2}px`;
      } else {
        panel1.getElement().style.height = `${newSize1}px`;
        panel2.getElement().style.height = `${newSize2}px`;
      }
    };

    const onMouseUp = () => {
      isResizing = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    handle.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export class ResizablePanel {
  private element: HTMLDivElement;
  public props: ResizablePanelProps;

  constructor(props: ResizablePanelProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLDivElement {
    const panel = document.createElement('div');
    panel.className = cn('relative overflow-auto', this.props.className);
    panel.setAttribute('data-resizable-panel', '');

    if (this.props.defaultSize !== undefined) {
      panel.style.flexBasis = `${this.props.defaultSize}%`;
      panel.style.flexGrow = '0';
      panel.style.flexShrink = '0';
    } else {
      panel.style.flex = '1';
    }

    return panel;
  }

  setContent(content: HTMLElement | string): void {
    if (typeof content === 'string') {
      this.element.innerHTML = content;
    } else {
      this.element.innerHTML = '';
      this.element.appendChild(content);
    }
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createResizable(props: ResizableProps = {}): Resizable {
  return new Resizable(props);
}

export function createResizablePanel(props: ResizablePanelProps = {}): ResizablePanel {
  return new ResizablePanel(props);
}
