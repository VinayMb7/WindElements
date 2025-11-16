# Stats

Statistics display with trend indicators.

## Installation

```bash
npx windelements@latest add stats
```

## Usage

### Basic Example

```typescript
import { createStats } from './components/ui/stats';

const component = createStats({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createStats({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { StatsProps } from './components/ui/stats';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createStats(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Stats } from './components/ui/stats';

const component = new Stats(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createStats({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
