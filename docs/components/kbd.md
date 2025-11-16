# Kbd

Keyboard key display.

## Installation

```bash
npx windelements@latest add kbd
```

## Usage

### Basic Example

```typescript
import { createKbd } from './components/ui/kbd';

const component = createKbd({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createKbd({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { KbdProps } from './components/ui/kbd';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createKbd(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Kbd } from './components/ui/kbd';

const component = new Kbd(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createKbd({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
