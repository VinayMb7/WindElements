# Sidebar

Collapsible side navigation.

## Installation

```bash
npx windelements@latest add sidebar
```

## Usage

### Basic Example

```typescript
import { createSidebar } from './components/ui/sidebar';

const component = createSidebar({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createSidebar({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { SidebarProps } from './components/ui/sidebar';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createSidebar(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Sidebar } from './components/ui/sidebar';

const component = new Sidebar(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createSidebar({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
