# Aspect Ratio

Maintain consistent aspect ratios for media content.

## Installation

```bash
npx windelements@latest add aspect-ratio
```

## Usage

### Basic Example

```typescript
import { createAspectRatio } from './components/ui/aspect-ratio';

const component = createAspectRatio({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createAspectRatio({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { AspectRatioProps } from './components/ui/aspect-ratio';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createAspectRatio(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { AspectRatio } from './components/ui/aspect-ratio';

const component = new AspectRatio(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createAspectRatio({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
