# Chip

Removable tags and labels.

## Installation

```bash
npx windelements@latest add chip
```

## Usage

### Basic Example

```typescript
import { createChip } from './components/ui/chip';

const component = createChip({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createChip({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { ChipProps } from './components/ui/chip';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createChip(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Chip } from './components/ui/chip';

const component = new Chip(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createChip({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
