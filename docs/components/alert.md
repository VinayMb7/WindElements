# Alert

Display important messages and notifications to users.

## Installation

```bash
npx windelements@latest add alert
```

## Usage

### Basic Example

```typescript
import { createAlert } from './components/ui/alert';

const component = createAlert({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createAlert({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { AlertProps } from './components/ui/alert';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createAlert(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Alert } from './components/ui/alert';

const component = new Alert(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createAlert({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
