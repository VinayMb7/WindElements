# Label

Form label with accessibility support.

## Installation

```bash
npx windelements@latest add label
```

## Usage

### Basic Example

```typescript
import { createLabel } from './components/ui/label';

const component = createLabel({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createLabel({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { LabelProps } from './components/ui/label';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createLabel(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Label } from './components/ui/label';

const component = new Label(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createLabel({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
