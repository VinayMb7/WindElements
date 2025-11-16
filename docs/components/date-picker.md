# Date Picker

Date input with calendar popup.

## Installation

```bash
npx windelements@latest add date-picker
```

## Usage

### Basic Example

```typescript
import { createDatePicker } from './components/ui/date-picker';

const component = createDatePicker({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createDatePicker({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { DatePickerProps } from './components/ui/date-picker';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createDatePicker(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { DatePicker } from './components/ui/date-picker';

const component = new DatePicker(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createDatePicker({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
