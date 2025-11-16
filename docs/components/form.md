# Form

Form wrapper with validation support.

## Installation

```bash
npx windelements@latest add form
```

## Usage

### Basic Example

```typescript
import { createForm } from './components/ui/form';

const component = createForm({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createForm({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { FormProps } from './components/ui/form';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createForm(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Form } from './components/ui/form';

const component = new Form(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createForm({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
