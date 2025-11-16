# Badge

Small status indicators and labels.

## Installation

```bash
npx windelements@latest add badge
```

## Usage

### Basic Example

```typescript
import { createBadge } from './components/ui/badge';

const component = createBadge({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createBadge({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { BadgeProps } from './components/ui/badge';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createBadge(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Badge } from './components/ui/badge';

const component = new Badge(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createBadge({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
