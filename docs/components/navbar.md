# Navbar

Top navigation bar.

## Installation

```bash
npx windelements@latest add navbar
```

## Usage

### Basic Example

```typescript
import { createNavbar } from './components/ui/navbar';

const component = createNavbar({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createNavbar({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { NavbarProps } from './components/ui/navbar';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createNavbar(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Navbar } from './components/ui/navbar';

const component = new Navbar(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createNavbar({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
