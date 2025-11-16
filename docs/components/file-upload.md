# File Upload

Drag-and-drop file upload with validation.

## Installation

```bash
npx windelements@latest add file-upload
```

## Usage

### Basic Example

```typescript
import { createFileUpload } from './components/ui/file-upload';

const component = createFileUpload({
  // Component props
});

document.body.appendChild(component.getElement());
```

### With Custom Styling

```typescript
const component = createFileUpload({
  className: 'custom-class hover:scale-105',
  // Other props
});
```

## Props

See the TypeScript interface in the component source file for all available props and options.

```typescript
import { FileUploadProps } from './components/ui/file-upload';
```

## Examples

Check the [Examples](/examples) page for real-world usage patterns.

## API Reference

### Factory Function

```typescript
const component = createFileUpload(props);
const element = component.getElement();
```

### Class-based API

```typescript
import { FileUpload } from './components/ui/file-upload';

const component = new FileUpload(props);
const element = component.getElement();
```

## Accessibility

This component follows WAI-ARIA best practices for accessibility.

## Related Components

Browse all [Components](/components/) to see related options.

## Styling

Customize the component using the `className` prop and CSS custom properties:

```typescript
const component = createFileUpload({
  className: 'bg-primary text-primary-foreground rounded-lg'
});
```
