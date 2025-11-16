# Calendar

Date picker calendar with month/year navigation.

## Installation

```bash
npx windelements@latest add calendar
```

## Usage

### Basic Example

```typescript
import { createCalendar } from './components/ui/calendar';

const component = createCalendar({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createCalendar({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { CalendarProps } from './components/ui/calendar';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createCalendar(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Calendar } from './components/ui/calendar';

const component = new Calendar(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createCalendar({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
