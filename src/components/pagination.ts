import { cn } from '../lib/utils';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisible?: number;
}

export class Pagination {
  private element: HTMLElement;
  private props: PaginationProps;

  constructor(props: PaginationProps) {
    this.props = {
      showFirstLast: true,
      showPrevNext: true,
      maxVisible: 7,
      ...props
    };
    this.element = this.render();
  }

  private render(): HTMLElement {
    const nav = document.createElement('nav');
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'pagination');
    nav.className = cn('mx-auto flex w-full justify-center', this.props.className);
    
    const list = document.createElement('ul');
    list.className = 'flex flex-row items-center gap-1';
    
    // First page button
    if (this.props.showFirstLast) {
      const firstItem = this.createPageItem('First', 1, this.props.currentPage === 1);
      list.appendChild(firstItem);
    }
    
    // Previous button
    if (this.props.showPrevNext) {
      const prevItem = this.createPageItem('Previous', this.props.currentPage - 1, this.props.currentPage === 1);
      list.appendChild(prevItem);
    }
    
    // Page numbers
    const pages = this.getVisiblePages();
    pages.forEach((page) => {
      if (page === '...') {
        const ellipsis = document.createElement('li');
        ellipsis.textContent = '...';
        ellipsis.className = 'px-2';
        list.appendChild(ellipsis);
      } else {
        const pageItem = this.createPageItem(String(page), page as number, false, page === this.props.currentPage);
        list.appendChild(pageItem);
      }
    });
    
    // Next button
    if (this.props.showPrevNext) {
      const nextItem = this.createPageItem('Next', this.props.currentPage + 1, this.props.currentPage === this.props.totalPages);
      list.appendChild(nextItem);
    }
    
    // Last page button
    if (this.props.showFirstLast) {
      const lastItem = this.createPageItem('Last', this.props.totalPages, this.props.currentPage === this.props.totalPages);
      list.appendChild(lastItem);
    }
    
    nav.appendChild(list);
    return nav;
  }

  private getVisiblePages(): (number | string)[] {
    const { currentPage, totalPages, maxVisible = 7 } = this.props;
    const pages: (number | string)[] = [];
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }
    
    const halfVisible = Math.floor(maxVisible / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);
    
    if (currentPage <= halfVisible) {
      endPage = maxVisible;
    }
    
    if (currentPage + halfVisible >= totalPages) {
      startPage = totalPages - maxVisible + 1;
    }
    
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    
    return pages;
  }

  private createPageItem(label: string, page: number, disabled: boolean, isActive: boolean = false): HTMLLIElement {
    const li = document.createElement('li');
    
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.disabled = disabled;
    button.className = cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] h-9 px-4 py-2',
      isActive && 'bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90'
    );
    
    if (!disabled && !isActive) {
      button.addEventListener('click', () => {
        if (this.props.onPageChange) {
          this.props.onPageChange(page);
        }
      });
    }
    
    li.appendChild(button);
    return li;
  }

  setPage(page: number): void {
    this.props.currentPage = page;
    const newElement = this.render();
    this.element.replaceWith(newElement);
    this.element = newElement;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export function createPagination(props: PaginationProps): Pagination {
  return new Pagination(props);
}
