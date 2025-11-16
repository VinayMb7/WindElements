# Typography

Typography styles (h1-h6, p, code).

## Installation

```bash
npx windelements@latest add typography
```

## Usage

### Basic Example

```typescript
import { createTypography } from './components/ui/typography';

const component = createTypography({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createTypography({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { TypographyProps } from './components/ui/typography';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createTypography(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Typography } from './components/ui/typography';

const component = new Typography(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createTypography({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
