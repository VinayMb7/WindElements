# Counter

Numeric counter with increment/decrement controls.

## Installation

```bash
npx windelements@latest add counter
```

## Usage

### Basic Example

```typescript
import { createCounter } from './components/ui/counter';

const component = createCounter({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createCounter({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { CounterProps } from './components/ui/counter';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createCounter(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Counter } from './components/ui/counter';

const component = new Counter(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createCounter({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
