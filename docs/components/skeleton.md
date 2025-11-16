# Skeleton

Loading placeholder skeleton.

## Installation

```bash
npx windelements@latest add skeleton
```

## Usage

### Basic Example

```typescript
import { createSkeleton } from './components/ui/skeleton';

const component = createSkeleton({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createSkeleton({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { SkeletonProps } from './components/ui/skeleton';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createSkeleton(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Skeleton } from './components/ui/skeleton';

const component = new Skeleton(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createSkeleton({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
