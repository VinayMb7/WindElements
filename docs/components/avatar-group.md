# Avatar Group

Stack multiple avatars with overflow count.

## Installation

```bash
npx windelements@latest add avatar-group
```

## Usage

### Basic Example

```typescript
import { createAvatarGroup } from './components/ui/avatar-group';

const component = createAvatarGroup({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createAvatarGroup({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { AvatarGroupProps } from './components/ui/avatar-group';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createAvatarGroup(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { AvatarGroup } from './components/ui/avatar-group';

const component = new AvatarGroup(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createAvatarGroup({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
