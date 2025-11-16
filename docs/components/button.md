# Button

Interactive button component with multiple variants, sizes, and states.

## Installation

```bash
npx windelements@latest add button
```

## Usage

### Basic Button

```typescript
import { createButton } from './components/ui/button';

const button = createButton({
  children: 'Click me',
  onClick: () => console.log('Button clicked!')
});

document.body.appendChild(button.getElement());
```

### Variants

```typescript
// Default variant
const defaultBtn = createButton({
  variant: 'default',
  children: 'Default'
});

// Primary variant
const primaryBtn = createButton({
  variant: 'primary',
  children: 'Primary'
});

// Secondary variant
const secondaryBtn = createButton({
  variant: 'secondary',
  children: 'Secondary'
});

// Outline variant
const outlineBtn = createButton({
  variant: 'outline',
  children: 'Outline'
});

// Ghost variant
const ghostBtn = createButton({
  variant: 'ghost',
  children: 'Ghost'
});

// Destructive variant
const destructiveBtn = createButton({
  variant: 'destructive',
  children: 'Destructive'
});
```

### Sizes

```typescript
// Small
const smallBtn = createButton({
  size: 'sm',
  children: 'Small'
});

// Medium (default)
const mediumBtn = createButton({
  size: 'md',
  children: 'Medium'
});

// Large
const largeBtn = createButton({
  size: 'lg',
  children: 'Large'
});
```

### Disabled State

```typescript
const disabledBtn = createButton({
  disabled: true,
  children: 'Disabled Button'
});
```

### Loading State

```typescript
const button = createButton({
  children: 'Submit',
  onClick: async () => {
    button.getElement().setAttribute('disabled', 'true');
    button.getElement().textContent = 'Loading...';
    
    await fetch('/api/submit');
    
    button.getElement().removeAttribute('disabled');
    button.getElement().textContent = 'Submit';
  }
});
```

### Custom Styling

```typescript
const customBtn = createButton({
  variant: 'default',
  className: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-transform',
  children: 'Custom Styled'
});
```

## Props

### ButtonProps

```typescript
interface ButtonProps {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children?: string | HTMLElement | HTMLElement[];
  onClick?: (event: MouseEvent) => void;
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive'` | `'default'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Disable the button |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type attribute |
| `className` | `string` | `''` | Additional CSS classes |
| `children` | `string \| HTMLElement \| HTMLElement[]` | - | Button content |
| `onClick` | `(event: MouseEvent) => void` | - | Click event handler |

## API Reference

### Class-based API

```typescript
import { Button } from './components/ui/button';

const button = new Button({
  variant: 'primary',
  children: 'Click me'
});

// Get the DOM element
const element = button.getElement();

// Update props
button.update({ disabled: true });

// Destroy
button.destroy();
```

### Factory Function API

```typescript
import { createButton } from './components/ui/button';

const button = createButton({
  variant: 'primary',
  children: 'Click me'
});

const element = button.getElement();
```

## Examples

### Submit Form Button

```typescript
const submitBtn = createButton({
  type: 'submit',
  variant: 'primary',
  children: 'Submit Form',
  onClick: (e) => {
    e.preventDefault();
    // Handle form submission
  }
});
```

### Button with Icon

```typescript
const iconBtn = createButton({
  variant: 'outline',
  className: 'flex items-center gap-2'
});

const icon = document.createElement('svg');
icon.innerHTML = '<path d="..." />'; // SVG path

const text = document.createTextNode('Download');

iconBtn.getElement().appendChild(icon);
iconBtn.getElement().appendChild(text);
```

### Button Group

```typescript
import { createButtonGroup } from './components/ui/button-group';
import { createButton } from './components/ui/button';

const group = createButtonGroup({
  variant: 'outline'
});

const btn1 = createButton({ children: 'Left' });
const btn2 = createButton({ children: 'Center' });
const btn3 = createButton({ children: 'Right' });

group.getElement().appendChild(btn1.getElement());
group.getElement().appendChild(btn2.getElement());
group.getElement().appendChild(btn3.getElement());
```

## Accessibility

The Button component includes:

- ✅ Proper `button` element semantics
- ✅ `disabled` attribute support
- ✅ `type` attribute for form buttons
- ✅ Keyboard navigation (Enter/Space)
- ✅ Focus visible styles

## Styling

The button uses CSS custom properties for theming:

```css
.button {
  background: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius);
}
```

## Related Components

- [Button Group](/components/button-group) - Group multiple buttons
- [Form](/components/form) - Form with buttons
- [Dialog](/components/dialog) - Dialog with action buttons

## Changelog

### v1.0.0
- Initial release with all variants and sizes
