# Hint

Lightweight tooltip for hints.

## Installation

```bash
npx windelements@latest add hint
```

## Usage

### Basic Example

```typescript
import { createHint } from './components/ui/hint';

const component = createHint({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createHint({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { HintProps } from './components/ui/hint';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createHint(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Hint } from './components/ui/hint';

const component = new Hint(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createHint({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
