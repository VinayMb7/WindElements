# Pricing Card

Pricing plan card with features list.

## Installation

```bash
npx windelements@latest add pricing-card
```

## Usage

### Basic Example

```typescript
import { createPricingCard } from './components/ui/pricing-card';

const component = createPricingCard({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createPricingCard({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { PricingCardProps } from './components/ui/pricing-card';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createPricingCard(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { PricingCard } from './components/ui/pricing-card';

const component = new PricingCard(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createPricingCard({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
