# Command

Command palette for keyboard-driven navigation.

## Installation

```bash
npx windelements@latest add command
```

## Usage

### Basic Example

```typescript
import { createCommand } from './components/ui/command';

const component = createCommand({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createCommand({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { CommandProps } from './components/ui/command';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createCommand(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Command } from './components/ui/command';

const component = new Command(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createCommand({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
