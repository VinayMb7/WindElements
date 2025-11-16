# Select

Custom select dropdown.

## Installation

```bash
npx windelements@latest add select
```

## Usage

### Basic Example

```typescript
import { createSelect } from './components/ui/select';

const component = createSelect({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createSelect({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { SelectProps } from './components/ui/select';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createSelect(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Select } from './components/ui/select';

const component = new Select(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createSelect({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
