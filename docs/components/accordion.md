# Accordion

Collapsible content sections with smooth animations.

## Installation

```bash
npx windelements@latest add accordion
```

## Usage

### Basic Example

```typescript
import { createAccordion } from './components/ui/accordion';

const component = createAccordion({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createAccordion({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { AccordionProps } from './components/ui/accordion';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createAccordion(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Accordion } from './components/ui/accordion';

const component = new Accordion(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createAccordion({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
