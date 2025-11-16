# Alert Dialog

Modal dialog for confirmations and important alerts.

## Installation

```bash
npx windelements@latest add alert-dialog
```

## Usage

### Basic Example

```typescript
import { createAlertDialog } from './components/ui/alert-dialog';

const component = createAlertDialog({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createAlertDialog({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { AlertDialogProps } from './components/ui/alert-dialog';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createAlertDialog(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { AlertDialog } from './components/ui/alert-dialog';

const component = new AlertDialog(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createAlertDialog({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
