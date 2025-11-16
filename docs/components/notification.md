# Notification

System notifications with positioning.

## Installation

```bash
npx windelements@latest add notification
```

## Usage

### Basic Example

```typescript
import { createNotification } from './components/ui/notification';

const component = createNotification({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createNotification({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { NotificationProps } from './components/ui/notification';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createNotification(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Notification } from './components/ui/notification';

const component = new Notification(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createNotification({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
