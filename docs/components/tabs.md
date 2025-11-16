# Tabs

Tabbed interface.

## Installation

```bash
npx windelements@latest add tabs
```

## Usage

### Basic Example

```typescript
import { createTabs } from './components/ui/tabs';

const component = createTabs({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createTabs({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { TabsProps } from './components/ui/tabs';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createTabs(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Tabs } from './components/ui/tabs';

const component = new Tabs(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createTabs({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
