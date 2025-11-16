# Footer

Page footer with sections and links.

## Installation

```bash
npx windelements@latest add footer
```

## Usage

### Basic Example

```typescript
import { createFooter } from './components/ui/footer';

const component = createFooter({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createFooter({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { FooterProps } from './components/ui/footer';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createFooter(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Footer } from './components/ui/footer';

const component = new Footer(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createFooter({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
