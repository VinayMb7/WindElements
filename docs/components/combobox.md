# Combobox

Searchable select dropdown with autocomplete.

## Installation

```bash
npx windelements@latest add combobox
```

## Usage

### Basic Example

```typescript
import { createCombobox } from './components/ui/combobox';

const component = createCombobox({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createCombobox({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { ComboboxProps } from './components/ui/combobox';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createCombobox(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Combobox } from './components/ui/combobox';

const component = new Combobox(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createCombobox({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
