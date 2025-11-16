import { cn } from '../lib/utils';

export interface TableProps {
  className?: string;
}

export class Table {
  private element: HTMLTableElement;
  private props: TableProps;

  constructor(props: TableProps = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLTableElement {
    const table = document.createElement('table');
    table.className = cn('w-full caption-bottom text-sm', this.props.className);
    return table;
  }

  setHeader(header: TableHeader): void {
    this.element.appendChild(header.getElement());
  }

  setBody(body: TableBody): void {
    this.element.appendChild(body.getElement());
  }

  setFooter(footer: TableFooter): void {
    this.element.appendChild(footer.getElement());
  }

  getElement(): HTMLTableElement {
    return this.element;
  }

  destroy(): void {
    this.element.remove();
  }
}

export class TableHeader {
  private element: HTMLTableSectionElement;
  private props: { className?: string };

  constructor(props: { className?: string } = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLTableSectionElement {
    const thead = document.createElement('thead');
    thead.className = cn('[&_tr]:border-b', this.props.className);
    return thead;
  }

  addRow(row: TableRow): void {
    this.element.appendChild(row.getElement());
  }

  getElement(): HTMLTableSectionElement {
    return this.element;
  }
}

export class TableBody {
  private element: HTMLTableSectionElement;
  private props: { className?: string };

  constructor(props: { className?: string } = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLTableSectionElement {
    const tbody = document.createElement('tbody');
    tbody.className = cn('[&_tr:last-child]:border-0', this.props.className);
    return tbody;
  }

  addRow(row: TableRow): void {
    this.element.appendChild(row.getElement());
  }

  getElement(): HTMLTableSectionElement {
    return this.element;
  }
}

export class TableFooter {
  private element: HTMLTableSectionElement;
  private props: { className?: string };

  constructor(props: { className?: string } = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLTableSectionElement {
    const tfoot = document.createElement('tfoot');
    tfoot.className = cn('border-t bg-[var(--muted)]/50 font-medium [&>tr]:last:border-b-0', this.props.className);
    return tfoot;
  }

  addRow(row: TableRow): void {
    this.element.appendChild(row.getElement());
  }

  getElement(): HTMLTableSectionElement {
    return this.element;
  }
}

export class TableRow {
  private element: HTMLTableRowElement;
  private props: { className?: string };

  constructor(props: { className?: string } = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLTableRowElement {
    const tr = document.createElement('tr');
    tr.className = cn('border-b transition-colors hover:bg-[var(--muted)]/50 data-[state=selected]:bg-[var(--muted)]', this.props.className);
    return tr;
  }

  addCell(cell: TableCell | TableHead): void {
    this.element.appendChild(cell.getElement());
  }

  getElement(): HTMLTableRowElement {
    return this.element;
  }
}

export class TableHead {
  private element: HTMLTableCellElement;
  private props: { className?: string; children?: string | HTMLElement | HTMLElement[] };

  constructor(props: { className?: string; children?: string | HTMLElement | HTMLElement[] } = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLTableCellElement {
    const th = document.createElement('th');
    th.className = cn('h-10 px-2 text-left align-middle font-medium text-[var(--muted-foreground)] [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', this.props.className);
    
    if (this.props.children) {
      if (typeof this.props.children === 'string') {
        th.textContent = this.props.children;
      } else if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => th.appendChild(child));
      } else {
        th.appendChild(this.props.children);
      }
    }
    
    return th;
  }

  getElement(): HTMLTableCellElement {
    return this.element;
  }
}

export class TableCell {
  private element: HTMLTableCellElement;
  private props: { className?: string; children?: string | HTMLElement | HTMLElement[] };

  constructor(props: { className?: string; children?: string | HTMLElement | HTMLElement[] } = {}) {
    this.props = props;
    this.element = this.render();
  }

  private render(): HTMLTableCellElement {
    const td = document.createElement('td');
    td.className = cn('p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]', this.props.className);
    
    if (this.props.children) {
      if (typeof this.props.children === 'string') {
        td.textContent = this.props.children;
      } else if (Array.isArray(this.props.children)) {
        this.props.children.forEach(child => td.appendChild(child));
      } else {
        td.appendChild(this.props.children);
      }
    }
    
    return td;
  }

  getElement(): HTMLTableCellElement {
    return this.element;
  }
}

export function createTable(props: TableProps = {}): Table {
  return new Table(props);
}

export function createTableHeader(props: { className?: string } = {}): TableHeader {
  return new TableHeader(props);
}

export function createTableBody(props: { className?: string } = {}): TableBody {
  return new TableBody(props);
}

export function createTableFooter(props: { className?: string } = {}): TableFooter {
  return new TableFooter(props);
}

export function createTableRow(props: { className?: string } = {}): TableRow {
  return new TableRow(props);
}

export function createTableHead(props: { className?: string; children?: string | HTMLElement | HTMLElement[] } = {}): TableHead {
  return new TableHead(props);
}

export function createTableCell(props: { className?: string; children?: string | HTMLElement | HTMLElement[] } = {}): TableCell {
  return new TableCell(props);
}
