# Resizable

Resizable panel system.

## Installation

```bash
npx windelements@latest add resizable
```

## Usage

### Basic Example

```typescript
import { createResizable } from './components/ui/resizable';

const component = createResizable({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createResizable({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { ResizableProps } from './components/ui/resizable';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createResizable(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Resizable } from './components/ui/resizable';

const component = new Resizable(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createResizable({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
