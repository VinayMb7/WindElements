# Feature Card

Feature showcase card with icon and description.

## Installation

```bash
npx windelements@latest add feature-card
```

## Usage

### Basic Example

```typescript
import { createFeatureCard } from './components/ui/feature-card';

const component = createFeatureCard({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createFeatureCard({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { FeatureCardProps } from './components/ui/feature-card';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createFeatureCard(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { FeatureCard } from './components/ui/feature-card';

const component = new FeatureCard(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createFeatureCard({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
