# Toggle

Toggle button.

## Installation

```bash
npx windelements@latest add toggle
```

## Usage

### Basic Example

```typescript
import { createToggle } from './components/ui/toggle';

const component = createToggle({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createToggle({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { ToggleProps } from './components/ui/toggle';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createToggle(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Toggle } from './components/ui/toggle';

const component = new Toggle(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createToggle({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
