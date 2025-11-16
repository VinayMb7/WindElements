# Tooltip

Hover tooltip.

## Installation

```bash
npx windelements@latest add tooltip
```

## Usage

### Basic Example

```typescript
import { createTooltip } from './components/ui/tooltip';

const component = createTooltip({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createTooltip({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { TooltipProps } from './components/ui/tooltip';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createTooltip(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Tooltip } from './components/ui/tooltip';

const component = new Tooltip(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createTooltip({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
