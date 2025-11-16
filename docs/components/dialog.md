# Dialog

Modal dialog overlay.

## Installation

```bash
npx windelements@latest add dialog
```

## Usage

### Basic Example

```typescript
import { createDialog } from './components/ui/dialog';

const component = createDialog({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createDialog({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { DialogProps } from './components/ui/dialog';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createDialog(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Dialog } from './components/ui/dialog';

const component = new Dialog(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createDialog({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
