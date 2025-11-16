# Toast

Temporary notification toast.

## Installation

```bash
npx windelements@latest add toast
```

## Usage

### Basic Example

```typescript
import { createToast } from './components/ui/toast';

const component = createToast({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createToast({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { ToastProps } from './components/ui/toast';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createToast(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Toast } from './components/ui/toast';

const component = new Toast(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createToast({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
