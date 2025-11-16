# Context Menu

Right-click context menu.

## Installation

```bash
npx windelements@latest add context-menu
```

## Usage

### Basic Example

```typescript
import { createContextMenu } from './components/ui/context-menu';

const component = createContextMenu({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createContextMenu({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { ContextMenuProps } from './components/ui/context-menu';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createContextMenu(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { ContextMenu } from './components/ui/context-menu';

const component = new ContextMenu(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createContextMenu({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
