import { cn } from '../lib/utils';

export interface DataTableColumn<T = any> {
  key: string;
  header: string;
  cell?: (row: T) => string | HTMLElement;
  sortable?: boolean;
  width?: string;
}

export interface DataTableProps<T = any> {
  className?: string;
  columns: DataTableColumn<T>[];
  data: T[];
  onRowClick?: (row: T, index: number) => void;
  striped?: boolean;
  hoverable?: boolean;
}

export class DataTable<T = any> {
  private element: HTMLDivElement;
  private table: HTMLTableElement;
  private thead: HTMLTableSectionElement;
  private tbody: HTMLTableSectionElement;
  private props: DataTableProps<T>;
  private sortColumn?: string;
  private sortDirection: 'asc' | 'desc' = 'asc';
  private sortedData: T[];

  constructor(props: DataTableProps<T>) {
    this.props = props;
    this.sortedData = [...props.data];
    this.element = this.render();
    this.table = this.element.querySelector('table') as HTMLTableElement;
    this.thead = this.table.querySelector('thead') as HTMLTableSectionElement;
    this.tbody = this.table.querySelector('tbody') as HTMLTableSectionElement;
    this.renderTable();
  }

  private render(): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = cn('relative w-full overflow-auto', this.props.className);

    const table = document.createElement('table');
    table.className = 'w-full caption-bottom text-sm';

    const thead = document.createElement('thead');
    thead.className = '[&_tr]:border-b border-[var(--border)]';
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    tbody.className = '[&_tr:last-child]:border-0';
    table.appendChild(tbody);

    wrapper.appendChild(table);
    return wrapper;
  }

  private renderTable(): void {
    this.renderHeader();
    this.renderBody();
  }

  private renderHeader(): void {
    this.thead.innerHTML = '';
    const row = document.createElement('tr');
    row.className = 'border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)]/50';

    this.props.columns.forEach(column => {
      const th = document.createElement('th');
      th.className = 'h-12 px-4 text-left align-middle font-medium text-[var(--muted-foreground)]';
      
      if (column.width) {
        th.style.width = column.width;
      }

      if (column.sortable) {
        th.className += ' cursor-pointer select-none hover:text-[var(--foreground)]';
        
        const headerContent = document.createElement('div');
        headerContent.className = 'flex items-center gap-2';
        headerContent.textContent = column.header;
        
        if (this.sortColumn === column.key) {
          const icon = document.createElement('span');
          icon.textContent = this.sortDirection === 'asc' ? '▲' : '▼';
          icon.className = 'text-xs';
          headerContent.appendChild(icon);
        }
        
        th.appendChild(headerContent);
        
        th.addEventListener('click', () => {
          this.sort(column.key);
        });
      } else {
        th.textContent = column.header;
      }

      row.appendChild(th);
    });

    this.thead.appendChild(row);
  }

  private renderBody(): void {
    this.tbody.innerHTML = '';

    this.sortedData.forEach((row, index) => {
      const tr = document.createElement('tr');
      tr.className = cn(
        'border-b border-[var(--border)] transition-colors',
        this.props.hoverable && 'hover:bg-[var(--muted)]/50',
        this.props.striped && index % 2 === 1 && 'bg-[var(--muted)]/20',
        this.props.onRowClick && 'cursor-pointer'
      );

      if (this.props.onRowClick) {
        tr.addEventListener('click', () => {
          this.props.onRowClick!(row, index);
        });
      }

      this.props.columns.forEach(column => {
        const td = document.createElement('td');
        td.className = 'p-4 align-middle';

        if (column.cell) {
          const content = column.cell(row);
          if (typeof content === 'string') {
            td.textContent = content;
          } else {
            td.appendChild(content);
          }
        } else {
          td.textContent = (row as any)[column.key]?.toString() || '';
        }

        tr.appendChild(td);
      });

      this.tbody.appendChild(tr);
    });

    if (this.sortedData.length === 0) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      td.colSpan = this.props.columns.length;
      td.className = 'p-8 text-center text-[var(--muted-foreground)]';
      td.textContent = 'No data available';
      tr.appendChild(td);
      this.tbody.appendChild(tr);
    }
  }

  private sort(columnKey: string): void {
    if (this.sortColumn === columnKey) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = columnKey;
      this.sortDirection = 'asc';
    }

    this.sortedData.sort((a, b) => {
      const aVal = (a as any)[columnKey];
      const bVal = (b as any)[columnKey];

      let comparison = 0;
      if (aVal > bVal) comparison = 1;
      if (aVal < bVal) comparison = -1;

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });

    this.renderTable();
  }

  setData(data: T[]): void {
    this.props.data = data;
    this.sortedData = [...data];
    this.renderBody();
  }

  getData(): T[] {
    return this.props.data;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export function createDataTable<T = any>(props: DataTableProps<T>): DataTable<T> {
  return new DataTable(props);
}
