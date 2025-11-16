# Sonner

Toast notification system (sonner style).

## Installation

```bash
npx windelements@latest add sonner
```

## Usage

### Basic Example

```typescript
import { createSonner } from './components/ui/sonner';

const component = createSonner({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createSonner({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { SonnerProps } from './components/ui/sonner';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createSonner(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Sonner } from './components/ui/sonner';

const component = new Sonner(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createSonner({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
