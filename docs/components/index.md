# Components

Browse all 70+ production-ready components for your Vanilla JavaScript/TypeScript project.

## All Components

### 🎨 Foundational (11 components)

Components for building forms and basic interactions.

- [Button](/components/button) - Interactive buttons with multiple variants
- [Button Group](/components/button-group) - Group multiple buttons together
- [Input](/components/input) - Text input with validation
- [Label](/components/label) - Form labels with accessibility
- [Textarea](/components/textarea) - Multi-line text input
- [Form](/components/form) - Form wrapper with validation
- [File Upload](/components/file-upload) - Drag-and-drop file upload
- [Checkbox](/components/checkbox) - Checkbox input
- [Switch](/components/switch) - Toggle switch
- [Radio Group](/components/radio-group) - Radio button group
- [Kbd](/components/kbd) - Keyboard key display

### 📐 Layout (10 components)

Components for structuring your UI.

- [Card](/components/card) - Container with header, content, footer
- [Separator](/components/separator) - Visual divider
- [Accordion](/components/accordion) - Collapsible content sections
- [Aspect Ratio](/components/aspect-ratio) - Maintain aspect ratio
- [Breadcrumb](/components/breadcrumb) - Navigation breadcrumbs
- [Collapsible](/components/collapsible) - Expandable content
- [Tabs](/components/tabs) - Tabbed interface
- [Scroll Area](/components/scroll-area) - Custom scrollable area
- [Divider](/components/divider) - Horizontal/vertical divider
- [Resizable](/components/resizable) - Resizable panel system

### 🧭 Navigation (6 components)

Components for site navigation.

- [Navbar](/components/navbar) - Top navigation bar
- [Sidebar](/components/sidebar) - Collapsible side navigation
- [Footer](/components/footer) - Page footer
- [Menubar](/components/menubar) - Application menu bar
- [Dropdown Menu](/components/dropdown-menu) - Dropdown menu
- [Context Menu](/components/context-menu) - Right-click menu

### 💬 Feedback (11 components)

Components for user feedback and notifications.

- [Alert](/components/alert) - Alert messages
- [Alert Dialog](/components/alert-dialog) - Confirmation dialogs
- [Badge](/components/badge) - Status indicators
- [Progress](/components/progress) - Progress bar
- [Skeleton](/components/skeleton) - Loading placeholder
- [Spinner](/components/spinner) - Loading spinner
- [Toast](/components/toast) - Temporary notifications
- [Tooltip](/components/tooltip) - Hover tooltips
- [Empty](/components/empty) - Empty state placeholder
- [Notification](/components/notification) - System notifications
- [Sonner](/components/sonner) - Toast notification system

### 📝 Form Components (10 components)

Advanced form inputs and controls.

- [Select](/components/select) - Custom select dropdown
- [Slider](/components/slider) - Range slider
- [Toggle](/components/toggle) - Toggle button
- [Toggle Group](/components/toggle-group) - Group of toggles
- [Input OTP](/components/input-otp) - OTP input fields
- [Combobox](/components/combobox) - Searchable select
- [Counter](/components/counter) - Numeric counter
- [Calendar](/components/calendar) - Date calendar
- [Date Picker](/components/date-picker) - Date input with calendar
- [Rating](/components/rating) - Star rating

### 🎭 Display (13 components)

Components for displaying data and content.

- [Avatar](/components/avatar) - User avatar image
- [Avatar Group](/components/avatar-group) - Stacked avatars
- [Table](/components/table) - Data table
- [Data Table](/components/data-table) - Advanced data table
- [Typography](/components/typography) - Typography styles
- [Pagination](/components/pagination) - Page navigation
- [Chip](/components/chip) - Removable chips/tags
- [Stats](/components/stats) - Statistics display
- [Timeline](/components/timeline) - Event timeline
- [Stepper](/components/stepper) - Multi-step progress
- [Carousel](/components/carousel) - Image/content carousel
- [Testimonial](/components/testimonial) - Customer testimonials
- [Empty](/components/empty) - Empty state

### 🪟 Overlay (10 components)

Components that overlay the main content.

- [Dialog](/components/dialog) - Modal dialogs
- [Drawer](/components/drawer) - Side drawer panel
- [Popover](/components/popover) - Floating popover
- [Modal](/components/modal) - Advanced modal
- [Sheet](/components/sheet) - Side sheet panel
- [Hover Card](/components/hover-card) - Hover-triggered card
- [Hint](/components/hint) - Small tooltip hints
- [Command](/components/command) - Command palette
- [Alert Dialog](/components/alert-dialog) - Confirmation dialogs
- [Tooltip](/components/tooltip) - Tooltips

### 🎯 Marketing (4 components)

Components for marketing and landing pages.

- [Hero](/components/hero) - Hero section
- [Feature Card](/components/feature-card) - Feature showcase
- [Pricing Card](/components/pricing-card) - Pricing plans
- [Testimonial](/components/testimonial) - Customer testimonials

## Installation

Add components individually:

```bash
npx windelements@latest add button
npx windelements@latest add card
```

Or add all components:

```bash
npx windelements@latest add --all
```

## Usage Pattern

All components follow a consistent API:

```typescript
import { createComponentName } from './components/ui/component-name';

const component = createComponentName({
  // Props here
  className: 'custom-class',
  onClick: () => console.log('Clicked!')
});

// Get the DOM element
const element = component.getElement();

// Append to DOM
document.body.appendChild(element);
```

## Customization

Every component accepts a `className` prop for custom styling:

```typescript
const button = createButton({
  variant: 'default',
  className: 'my-custom-class hover:scale-105',
  children: 'Custom Button'
});
```

## TypeScript

All components are fully typed:

```typescript
import { ButtonProps } from './components/ui/button';

const props: ButtonProps = {
  variant: 'primary',
  size: 'lg',
  disabled: false
};
```
