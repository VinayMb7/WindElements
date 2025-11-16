# TypeScript

WindElements is built with TypeScript and provides full type safety for all components.

## Type Definitions

All components export TypeScript interfaces for their props:

```typescript
import { Button, ButtonProps } from './components/ui/button';
import { Input, InputProps } from './components/ui/input';
import { Card, CardProps } from './components/ui/card';
```

## Component Props

### Typed Props

Every component has a typed props interface:

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

const props: ButtonProps = {
  variant: 'primary',
  size: 'lg',
  children: 'Type-safe button',
  onClick: (e: MouseEvent) => {
    console.log('Clicked:', e.target);
  }
};

const button = new Button(props);
```

### Optional vs Required Props

Most props are optional with sensible defaults:

```typescript
// All optional
const button1 = createButton({});

// With some props
const button2 = createButton({
  variant: 'primary'
});

// Fully specified
const button3 = createButton({
  variant: 'primary',
  size: 'lg',
  disabled: false,
  type: 'button',
  className: 'custom-class',
  children: 'Click me',
  onClick: () => {}
});
```

## Class-based API

All components have a class-based API:

```typescript
import { Button, ButtonProps } from './components/ui/button';

class MyApp {
  private button: Button;

  constructor() {
    this.button = new Button({
      variant: 'primary',
      children: 'Click me',
      onClick: this.handleClick.bind(this)
    });
  }

  private handleClick(e: MouseEvent): void {
    console.log('Button clicked!', e);
  }

  public render(): HTMLElement {
    return this.button.getElement();
  }

  public destroy(): void {
    this.button.destroy();
  }
}
```

## Factory Functions

Use factory functions for simpler syntax:

```typescript
import { createButton } from './components/ui/button';
import { createInput } from './components/ui/input';
import { createCard } from './components/ui/card';

const button = createButton({ variant: 'primary' });
const input = createInput({ type: 'email' });
const card = createCard();
```

## Generic Components

Some components support generics for type-safe data:

```typescript
import { createDataTable } from './components/ui/data-table';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

const table = createDataTable<User>({
  columns: [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' }
  ],
  data: [
    { id: 1, name: 'John', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane', email: 'jane@example.com', role: 'user' }
  ],
  onRowClick: (row: User) => {
    console.log('Clicked user:', row.name);
  }
});
```

## Event Handlers

Event handlers are fully typed:

```typescript
import { createButton } from './components/ui/button';
import { createInput } from './components/ui/input';

const button = createButton({
  onClick: (event: MouseEvent) => {
    // MouseEvent type is inferred
    console.log(event.clientX, event.clientY);
  }
});

const input = createInput({
  onInput: (event: Event) => {
    const target = event.target as HTMLInputElement;
    console.log(target.value);
  },
  
  onFocus: (event: FocusEvent) => {
    console.log('Input focused');
  },
  
  onBlur: (event: FocusEvent) => {
    console.log('Input blurred');
  }
});
```

## Utility Types

WindElements exports useful utility types:

```typescript
import { cn, generateId, FocusTrap, Portal } from './lib/utils';
import type { Placement } from './lib/utils';

// Placement type for popovers
const placement: Placement = 'bottom-start';

// Use the cn utility for class merging
const classes = cn(
  'base-class',
  'another-class',
  { 'conditional-class': true }
);

// Generate unique IDs
const id: string = generateId('button');
```

## Type Guards

Create type guards for runtime type checking:

```typescript
function isButtonProps(props: unknown): props is ButtonProps {
  return (
    typeof props === 'object' &&
    props !== null &&
    (!('variant' in props) || typeof props.variant === 'string')
  );
}

function createSafeButton(props: unknown) {
  if (isButtonProps(props)) {
    return createButton(props);
  }
  throw new Error('Invalid button props');
}
```

## Extending Components

Extend component types for custom variants:

```typescript
import { Button, ButtonProps } from './components/ui/button';

interface CustomButtonProps extends ButtonProps {
  variant?: ButtonProps['variant'] | 'custom' | 'special';
  loading?: boolean;
}

class CustomButton extends Button {
  constructor(props: CustomButtonProps) {
    super(props);
    
    if (props.loading) {
      this.element.classList.add('loading');
    }
  }
}

const customBtn = new CustomButton({
  variant: 'custom',
  loading: true,
  children: 'Custom Button'
});
```

## TSConfig Settings

Recommended `tsconfig.json` for WindElements:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Type Inference

TypeScript will infer types from usage:

```typescript
const button = createButton({
  variant: 'primary',
  onClick: (e) => {
    // e is inferred as MouseEvent
    console.log(e.clientX);
  }
});

// Return type is inferred
const element = button.getElement(); // HTMLElement
```

## Common Patterns

### Wrapper Components

Create type-safe wrapper components:

```typescript
interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}

function createFormField(props: FormFieldProps) {
  const wrapper = document.createElement('div');
  wrapper.className = 'form-field';
  
  const label = createLabel({
    htmlFor: props.name,
    children: props.label
  });
  
  const input = createInput({
    type: props.type || 'text',
    name: props.name,
    required: props.required
  });
  
  wrapper.appendChild(label.getElement());
  wrapper.appendChild(input.getElement());
  
  if (props.error) {
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = props.error;
    wrapper.appendChild(error);
  }
  
  return wrapper;
}
```

### Component Factory

Create a typed component factory:

```typescript
type ComponentType = 'button' | 'input' | 'card';

interface ComponentMap {
  button: ReturnType<typeof createButton>;
  input: ReturnType<typeof createInput>;
  card: ReturnType<typeof createCard>;
}

function createComponent<T extends ComponentType>(
  type: T,
  props: any
): ComponentMap[T] {
  switch (type) {
    case 'button':
      return createButton(props) as ComponentMap[T];
    case 'input':
      return createInput(props) as ComponentMap[T];
    case 'card':
      return createCard(props) as ComponentMap[T];
    default:
      throw new Error(`Unknown component type: ${type}`);
  }
}

const button = createComponent('button', { variant: 'primary' });
const input = createComponent('input', { type: 'email' });
```

## Type Errors

### Common Issues

**Issue**: "Property does not exist on type"

```typescript
// ❌ Wrong
const button = createButton({
  invalidProp: true // Error!
});

// ✅ Correct
const button = createButton({
  variant: 'primary'
});
```

**Issue**: "Type is not assignable"

```typescript
// ❌ Wrong
const variant: string = 'invalid'; // Too broad
const button = createButton({ variant }); // Error!

// ✅ Correct
const variant: ButtonProps['variant'] = 'primary';
const button = createButton({ variant });
```

## IDE Support

### VS Code

WindElements provides excellent IDE support:

- ✅ Autocomplete for all props
- ✅ Inline documentation
- ✅ Type checking
- ✅ Go to definition
- ✅ Find all references

### IntelliSense

Hover over any component to see its full documentation:

```typescript
const button = createButton({
  variant: // IntelliSense shows all variants
});
```

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript with DOM](https://www.typescriptlang.org/docs/handbook/dom-manipulation.html)
- [Type Inference](https://www.typescriptlang.org/docs/handbook/type-inference.html)
