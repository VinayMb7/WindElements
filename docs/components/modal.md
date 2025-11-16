# Modal

Advanced modal with sizes and focus management.

## Installation

```bash
npx windelements@latest add modal
```

## Usage

### Basic Example

```typescript
import { createModal } from './components/ui/modal';

const component = createModal({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createModal({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { ModalProps } from './components/ui/modal';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createModal(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Modal } from './components/ui/modal';

const component = new Modal(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createModal({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
