# Stepper

Multi-step progress indicator.

## Installation

```bash
npx windelements@latest add stepper
```

## Usage

### Basic Example

```typescript
import { createStepper } from './components/ui/stepper';

const component = createStepper({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createStepper({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { StepperProps } from './components/ui/stepper';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createStepper(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Stepper } from './components/ui/stepper';

const component = new Stepper(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createStepper({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
