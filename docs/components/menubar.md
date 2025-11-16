# Menubar

Application menu bar (File/Edit/View style).

## Installation

```bash
npx windelements@latest add menubar
```

## Usage

### Basic Example

```typescript
import { createMenubar } from './components/ui/menubar';

const component = createMenubar({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createMenubar({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { MenubarProps } from './components/ui/menubar';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createMenubar(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Menubar } from './components/ui/menubar';

const component = new Menubar(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createMenubar({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
