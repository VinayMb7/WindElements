# Hover Card

Card that appears on hover.

## Installation

```bash
npx windelements@latest add hover-card
```

## Usage

### Basic Example

```typescript
import { createHoverCard } from './components/ui/hover-card';

const component = createHoverCard({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createHoverCard({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { HoverCardProps } from './components/ui/hover-card';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createHoverCard(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { HoverCard } from './components/ui/hover-card';

const component = new HoverCard(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createHoverCard({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
