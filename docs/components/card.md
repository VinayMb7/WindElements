# Card

Container with header, content, and footer sections.

## Installation

```bash
npx windelements@latest add card
```

## Usage

### Basic Example

```typescript
import { createCard } from './components/ui/card';

const component = createCard({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createCard({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { CardProps } from './components/ui/card';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createCard(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Card } from './components/ui/card';

const component = new Card(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createCard({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
