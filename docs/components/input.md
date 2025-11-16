# Input

Text input component with validation and custom styling support.

## Installation

```bash
npx windelements@latest add input
```

## Usage

### Basic Input

```typescript
import { createInput } from './components/ui/input';

const input = createInput({
  type: 'text',
  placeholder: 'Enter your name',
  onInput: (e) => console.log((e.target as HTMLInputElement).value)
});

document.body.appendChild(input.getElement());
```

### Input Types

```typescript
// Text input
const textInput = createInput({ type: 'text', placeholder: 'Text' });

// Email input
const emailInput = createInput({ type: 'email', placeholder: 'Email' });

// Password input
const passwordInput = createInput({ type: 'password', placeholder: 'Password' });

// Number input
const numberInput = createInput({ type: 'number', placeholder: 'Number' });

// Tel input
const telInput = createInput({ type: 'tel', placeholder: 'Phone' });

// URL input
const urlInput = createInput({ type: 'url', placeholder: 'Website' });
```

### With Label

```typescript
import { createLabel } from './components/ui/label';
import { createInput } from './components/ui/input';

const label = createLabel({
  htmlFor: 'email',
  children: 'Email Address'
});

const input = createInput({
  id: 'email',
  type: 'email',
  placeholder: 'you@example.com'
});

const container = document.createElement('div');
container.appendChild(label.getElement());
container.appendChild(input.getElement());
```

### Disabled State

```typescript
const disabledInput = createInput({
  disabled: true,
  placeholder: 'Disabled input'
});
```

### Required Field

```typescript
const requiredInput = createInput({
  type: 'email',
  required: true,
  placeholder: 'Required email'
});
```

### Custom Styling

```typescript
const customInput = createInput({
  className: 'border-2 border-blue-500 focus:border-blue-700',
  placeholder: 'Custom styled input'
});
```

## Props

```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  onInput?: (event: Event) => void;
  onChange?: (event: Event) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}
```

## Examples

### Form Input

```typescript
const form = document.createElement('form');

const emailInput = createInput({
  type: 'email',
  name: 'email',
  required: true,
  placeholder: 'Enter your email'
});

form.appendChild(emailInput.getElement());
```

### With Validation

```typescript
const input = createInput({
  type: 'email',
  onBlur: (e) => {
    const value = (e.target as HTMLInputElement).value;
    if (!value.includes('@')) {
      e.target.classList.add('border-red-500');
    }
  }
});
```

## Accessibility

- ✅ Proper `input` element semantics
- ✅ Label association via `id` and `htmlFor`
- ✅ Required attribute support
- ✅ Disabled state
- ✅ Keyboard navigation

## Related Components

- [Label](/components/label) - Input labels
- [Form](/components/form) - Form with validation
- [Textarea](/components/textarea) - Multi-line input
