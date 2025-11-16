# Drawer

Side drawer panel for navigation or content.

## Installation

```bash
npx windelements@latest add drawer
```

## Usage

### Basic Example

```typescript
import { createDrawer } from './components/ui/drawer';

const component = createDrawer({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createDrawer({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { DrawerProps } from './components/ui/drawer';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createDrawer(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Drawer } from './components/ui/drawer';

const component = new Drawer(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createDrawer({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
