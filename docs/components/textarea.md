# Textarea

Multi-line text input.

## Installation

```bash
npx windelements@latest add textarea
```

## Usage

### Basic Example

```typescript
import { createTextarea } from './components/ui/textarea';

const component = createTextarea({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createTextarea({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { TextareaProps } from './components/ui/textarea';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createTextarea(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Textarea } from './components/ui/textarea';

const component = new Textarea(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createTextarea({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
