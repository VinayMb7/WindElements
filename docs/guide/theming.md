# Theming

WindElements uses a modern theming system based on OKLCH colors and CSS custom properties, making it easy to customize the look and feel of your components.

## Color System

### OKLCH Colors

WindElements uses the [OKLCH color space](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl), which provides:

- ✅ Perceptually uniform colors
- ✅ Better color interpolation
- ✅ Consistent lightness across hues
- ✅ Wider color gamut support
- ✅ Future-proof for modern displays

### CSS Custom Properties

All colors are defined as CSS custom properties in your global CSS file:

```css
:root {
  --radius: 0.625rem;
  
  /* Base colors */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  
  /* Card colors */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  
  /* Primary colors */
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  
  /* Secondary colors */
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  
  /* Muted colors */
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  
  /* Accent colors */
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  
  /* Destructive colors */
  --destructive: oklch(0.577 0.245 27.325);
  
  /* Border colors */
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  
  /* Popover colors */
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
}
```

## Dark Mode

Dark mode is implemented using a `.dark` class:

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  /* ... more dark mode colors */
}
```

### Implementing Dark Mode

Add a theme toggle to your app:

```typescript
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  
  // Save preference
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
}

// Create toggle button
const toggleBtn = createButton({
  variant: 'outline',
  children: 'Toggle Dark Mode',
  onClick: toggleDarkMode
});
```

### System Preference Detection

Respect user's system color scheme preference:

```typescript
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    // Use saved preference
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  } else {
    // Use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
  }
}

// Watch for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    document.documentElement.classList.toggle('dark', e.matches);
  }
});

initTheme();
```

## Customizing Colors

### Change Primary Color

To change the primary color, update the OKLCH values:

```css
:root {
  /* Blue primary */
  --primary: oklch(0.5 0.2 250);
  --primary-foreground: oklch(1 0 0);
}

.dark {
  --primary: oklch(0.7 0.2 250);
  --primary-foreground: oklch(0.2 0 0);
}
```

### OKLCH Values Explained

OKLCH has three components:

1. **L (Lightness)**: 0 (black) to 1 (white)
2. **C (Chroma)**: 0 (gray) to 0.4+ (vibrant)
3. **H (Hue)**: 0-360 degrees (color wheel)

Examples:
- `oklch(0.5 0.2 250)` - Blue (L=50%, C=0.2, H=250°)
- `oklch(0.6 0.25 140)` - Green (L=60%, C=0.25, H=140°)
- `oklch(0.55 0.22 25)` - Red (L=55%, C=0.22, H=25°)

### Color Palette Generator

Use online tools to generate OKLCH color palettes:

- [OKLCH Color Picker](https://oklch.com/)
- [Culori](https://culorijs.org/)
- [LCH Color Picker](https://lch.oklch.com/)

## Border Radius

Customize the border radius of components:

```css
:root {
  --radius: 0.5rem;  /* Default */
  
  /* Or other values */
  --radius: 0;       /* Square corners */
  --radius: 0.25rem; /* Subtle rounding */
  --radius: 1rem;    /* More rounded */
  --radius: 9999px;  /* Fully rounded (pills) */
}
```

## Component-Specific Theming

### Override Individual Components

You can override colors for specific components using the `className` prop:

```typescript
const customButton = createButton({
  variant: 'default',
  className: 'bg-purple-500 hover:bg-purple-600 text-white',
  children: 'Custom Purple Button'
});
```

### Create Custom Variants

Modify the component source to add custom variants:

```typescript
// In src/components/ui/button.ts

const variantClasses = {
  default: 'bg-[var(--primary)] text-[var(--primary-foreground)]',
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-[var(--secondary)] text-[var(--secondary-foreground)]',
  
  // Add custom variant
  purple: 'bg-purple-500 text-white hover:bg-purple-600 active:bg-purple-700',
};
```

## Theme Presets

### Create Multiple Themes

Define multiple theme presets:

```css
/* Light theme */
.theme-light {
  --primary: oklch(0.5 0.2 250);
  --background: oklch(1 0 0);
  /* ... */
}

/* Dark theme */
.theme-dark {
  --primary: oklch(0.7 0.2 250);
  --background: oklch(0.145 0 0);
  /* ... */
}

/* Custom themes */
.theme-ocean {
  --primary: oklch(0.5 0.2 220);
  --accent: oklch(0.6 0.18 180);
  /* ... */
}

.theme-sunset {
  --primary: oklch(0.55 0.25 30);
  --accent: oklch(0.6 0.22 50);
  /* ... */
}
```

Apply themes:

```typescript
function setTheme(themeName: string) {
  document.documentElement.className = `theme-${themeName}`;
  localStorage.setItem('theme', themeName);
}

setTheme('ocean');
```

## Advanced Customization

### Scoped Theming

Apply different themes to different parts of your app:

```html
<div class="theme-light">
  <header>Light theme header</header>
</div>

<div class="theme-dark">
  <main>Dark theme content</main>
</div>
```

### Dynamic Theme Generation

Generate themes programmatically:

```typescript
function generateTheme(primaryHue: number) {
  document.documentElement.style.setProperty(
    '--primary',
    `oklch(0.5 0.2 ${primaryHue})`
  );
  document.documentElement.style.setProperty(
    '--primary-foreground',
    'oklch(1 0 0)'
  );
}

// Generate blue theme
generateTheme(250);

// Generate green theme
generateTheme(140);
```

## Tailwind CSS Integration

WindElements components work seamlessly with Tailwind's utility classes:

```typescript
const button = createButton({
  className: 'shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200',
  children: 'Animated Button'
});
```

### Extend Tailwind Config

Add custom colors to your `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
      }
    }
  }
}
```

## Best Practices

1. **Use CSS Variables** - Don't hardcode colors
2. **Test Both Modes** - Always check light and dark mode
3. **Maintain Contrast** - Ensure text is readable
4. **Be Consistent** - Use the same color system throughout
5. **Document Custom Themes** - Keep track of your color choices

## Resources

- [OKLCH Color Picker](https://oklch.com/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Tailwind CSS Theming](https://tailwindcss.com/docs/theming)
