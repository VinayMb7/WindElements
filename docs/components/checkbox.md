# Checkbox

Checkbox input for boolean selections.

## Installation

```bash
npx windelements@latest add checkbox
```

## Usage

### Basic Example

```typescript
import { createCheckbox } from './components/ui/checkbox';

const component = createCheckbox({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createCheckbox({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { CheckboxProps } from './components/ui/checkbox';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createCheckbox(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Checkbox } from './components/ui/checkbox';

const component = new Checkbox(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createCheckbox({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
