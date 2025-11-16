# Button Group

Group multiple buttons together.

## Installation

```bash
npx windelements@latest add button-group
```

## Usage

### Basic Example

```typescript
import { createButtonGroup } from './components/ui/button-group';

const component = createButtonGroup({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createButtonGroup({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { ButtonGroupProps } from './components/ui/button-group';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createButtonGroup(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { ButtonGroup } from './components/ui/button-group';

const component = new ButtonGroup(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createButtonGroup({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
