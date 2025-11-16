# Slider

Range slider input.

## Installation

```bash
npx windelements@latest add slider
```

## Usage

### Basic Example

```typescript
import { createSlider } from './components/ui/slider';

const component = createSlider({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createSlider({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { SliderProps } from './components/ui/slider';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createSlider(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Slider } from './components/ui/slider';

const component = new Slider(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createSlider({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
