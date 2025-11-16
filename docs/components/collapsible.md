# Collapsible

Expandable and collapsible content container.

## Installation

```bash
npx windelements@latest add collapsible
```

## Usage

### Basic Example

```typescript
import { createCollapsible } from './components/ui/collapsible';

const component = createCollapsible({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createCollapsible({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { CollapsibleProps } from './components/ui/collapsible';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createCollapsible(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Collapsible } from './components/ui/collapsible';

const component = new Collapsible(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createCollapsible({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
