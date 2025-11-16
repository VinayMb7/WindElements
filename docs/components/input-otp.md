# Input OTP

One-time password input with auto-focus.

## Installation

```bash
npx windelements@latest add input-otp
```

## Usage

### Basic Example

```typescript
import { createInputOTP } from './components/ui/input-otp';

const component = createInputOTP({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createInputOTP({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { InputOTPProps } from './components/ui/input-otp';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createInputOTP(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { InputOTP } from './components/ui/input-otp';

const component = new InputOTP(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createInputOTP({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
