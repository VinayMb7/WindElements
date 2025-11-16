# Breadcrumb

Navigation breadcrumbs showing current page location.

## Installation

```bash
npx windelements@latest add breadcrumb
```

## Usage

### Basic Example

```typescript
import { createBreadcrumb } from './components/ui/breadcrumb';

const component = createBreadcrumb({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createBreadcrumb({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { BreadcrumbProps } from './components/ui/breadcrumb';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createBreadcrumb(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Breadcrumb } from './components/ui/breadcrumb';

const component = new Breadcrumb(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createBreadcrumb({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
