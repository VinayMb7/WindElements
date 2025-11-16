# Switch

Toggle switch input.

## Installation

```bash
npx windelements@latest add switch
```

## Usage

### Basic Example

```typescript
import { createSwitch } from './components/ui/switch';

const component = createSwitch({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createSwitch({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { SwitchProps } from './components/ui/switch';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createSwitch(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Switch } from './components/ui/switch';

const component = new Switch(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createSwitch({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
