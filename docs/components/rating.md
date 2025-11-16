# Rating

Star rating component (interactive/readonly).

## Installation

```bash
npx windelements@latest add rating
```

## Usage

### Basic Example

```typescript
import { createRating } from './components/ui/rating';

const component = createRating({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createRating({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { RatingProps } from './components/ui/rating';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createRating(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Rating } from './components/ui/rating';

const component = new Rating(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createRating({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
