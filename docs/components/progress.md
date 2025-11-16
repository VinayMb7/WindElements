# Progress

Progress bar indicator.

## Installation

```bash
npx windelements@latest add progress
```

## Usage

### Basic Example

```typescript
import { createProgress } from './components/ui/progress';

const component = createProgress({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createProgress({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { ProgressProps } from './components/ui/progress';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createProgress(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Progress } from './components/ui/progress';

const component = new Progress(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createProgress({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
