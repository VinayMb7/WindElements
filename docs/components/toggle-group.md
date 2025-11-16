# Toggle Group

Group of toggle buttons.

## Installation

```bash
npx windelements@latest add toggle-group
```

## Usage

### Basic Example

```typescript
import { createToggleGroup } from './components/ui/toggle-group';

const component = createToggleGroup({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createToggleGroup({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { ToggleGroupProps } from './components/ui/toggle-group';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createToggleGroup(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { ToggleGroup } from './components/ui/toggle-group';

const component = new ToggleGroup(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createToggleGroup({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
