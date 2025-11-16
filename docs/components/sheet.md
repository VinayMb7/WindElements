# Sheet

Side sheet panel (left/right/top/bottom).

## Installation

```bash
npx windelements@latest add sheet
```

## Usage

### Basic Example

```typescript
import { createSheet } from './components/ui/sheet';

const component = createSheet({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createSheet({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { SheetProps } from './components/ui/sheet';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createSheet(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Sheet } from './components/ui/sheet';

const component = new Sheet(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createSheet({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
