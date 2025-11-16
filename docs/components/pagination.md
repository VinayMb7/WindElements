# Pagination

Page navigation controls.

## Installation

```bash
npx windelements@latest add pagination
```

## Usage

### Basic Example

```typescript
import { createPagination } from './components/ui/pagination';

const component = createPagination({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createPagination({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { PaginationProps } from './components/ui/pagination';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createPagination(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Pagination } from './components/ui/pagination';

const component = new Pagination(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createPagination({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
