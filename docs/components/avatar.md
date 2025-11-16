# Avatar

Display user profile pictures with fallback support.

## Installation

```bash
npx windelements@latest add avatar
```

## Usage

### Basic Example

```typescript
import { createAvatar } from './components/ui/avatar';

const component = createAvatar({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createAvatar({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { AvatarProps } from './components/ui/avatar';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createAvatar(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { Avatar } from './components/ui/avatar';

const component = new Avatar(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createAvatar({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
