# Timeline

Event timeline with dates.

## Installation

```bash
npx windelements@latest add timeline
```

## Usage

### Basic Example

```typescript
import { createTimeline } from './components/ui/timeline';

const component = createTimeline({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createTimeline({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { TimelineProps } from './components/ui/timeline';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createTimeline(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Timeline } from './components/ui/timeline';

const component = new Timeline(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createTimeline({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
