# Scroll Area

Custom scrollable area.

## Installation

```bash
npx windelements@latest add scroll-area
```

## Usage

### Basic Example

```typescript
import { createScrollArea } from './components/ui/scroll-area';

const component = createScrollArea({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createScrollArea({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { ScrollAreaProps } from './components/ui/scroll-area';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createScrollArea(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { ScrollArea } from './components/ui/scroll-area';

const component = new ScrollArea(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createScrollArea({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
