# Data Table

Advanced data table with sorting and pagination.

## Installation

```bash
npx windelements@latest add data-table
```

## Usage

### Basic Example

```typescript
import { createDataTable } from './components/ui/data-table';

const component = createDataTable({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createDataTable({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { DataTableProps } from './components/ui/data-table';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createDataTable(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { DataTable } from './components/ui/data-table';

const component = new DataTable(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createDataTable({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
