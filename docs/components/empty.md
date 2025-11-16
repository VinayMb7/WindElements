# Empty

Empty state placeholder.

## Installation

```bash
npx windelements@latest add empty
```

## Usage

### Basic Example

```typescript
import { createEmpty } from './components/ui/empty';

const component = createEmpty({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createEmpty({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { EmptyProps } from './components/ui/empty';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createEmpty(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Empty } from './components/ui/empty';

const component = new Empty(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createEmpty({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
