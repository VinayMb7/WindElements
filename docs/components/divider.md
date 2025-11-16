# Divider

Horizontal or vertical divider with label support.

## Installation

```bash
npx windelements@latest add divider
```

## Usage

### Basic Example

```typescript
import { createDivider } from './components/ui/divider';

const component = createDivider({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createDivider({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { DividerProps } from './components/ui/divider';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createDivider(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Divider } from './components/ui/divider';

const component = new Divider(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createDivider({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
