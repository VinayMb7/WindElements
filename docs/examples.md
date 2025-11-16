# Examples

Real-world examples of building UIs with WindElements.

## Simple Form

Complete login form with validation:

```typescript
import { createForm, createFormField, validators } from './components/ui/form';
import { createButton } from './components/ui/button';
import { createCard, createCardHeader, createCardTitle, createCardContent, createCardFooter } from './components/ui/card';

// Create form
const form = createForm({
  onSubmit: (data) => {
    const formData = Object.fromEntries(data);
    console.log('Login:', formData);
    
    // Send to API
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
  }
});

// Email field
const emailField = createFormField('email', 'email', 'Email Address');
emailField.addValidator(validators.required());
emailField.addValidator(validators.email());
form.addField(emailField);

// Password field
const passwordField = createFormField('password', 'password', 'Password');
passwordField.addValidator(validators.required());
passwordField.addValidator(validators.minLength(8));
form.addField(passwordField);

// Submit button
const submitBtn = createButton({
  type: 'submit',
  variant: 'primary',
  className: 'w-full',
  children: 'Sign In'
});

// Card wrapper
const card = createCard();
const header = createCardHeader();
const title = createCardTitle({ children: 'Welcome Back' });
const content = createCardContent();
const footer = createCardFooter();

header.getElement().appendChild(title.getElement());
content.getElement().appendChild(form.getElement());
footer.getElement().appendChild(submitBtn.getElement());

card.getElement().appendChild(header.getElement());
card.getElement().appendChild(content.getElement());
card.getElement().appendChild(footer.getElement());

document.body.appendChild(card.getElement());
```

## Data Table with Sorting

Interactive data table with sorting and row selection:

```typescript
import { createDataTable } from './components/ui/data-table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive' },
];

const table = createDataTable({
  columns: [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'role', header: 'Role', sortable: true },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value: string) => {
        const badge = createBadge({
          variant: value === 'active' ? 'success' : 'secondary',
          children: value
        });
        return badge.getElement();
      }
    }
  ],
  data: users,
  striped: true,
  hoverable: true,
  onRowClick: (row) => {
    console.log('Selected user:', row);
  }
});

document.body.appendChild(table.getElement());
```

## Modal Dialog

Confirmation modal with actions:

```typescript
import { createModal, createModalHeader, createModalTitle, createModalDescription, createModalFooter } from './components/ui/modal';
import { createButton } from './components/ui/button';

function showDeleteConfirmation(itemName: string) {
  const modal = createModal({
    size: 'md',
    showCloseButton: true,
    closeOnOverlayClick: false,
    closeOnEscape: true,
    onOpenChange: (isOpen) => {
      if (!isOpen) {
        console.log('Modal closed');
      }
    }
  });

  const header = createModalHeader();
  const title = createModalTitle({ children: 'Confirm Deletion' });
  const description = createModalDescription({
    children: `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
  });

  const footer = createModalFooter();
  
  const cancelBtn = createButton({
    variant: 'outline',
    children: 'Cancel',
    onClick: () => modal.close()
  });

  const deleteBtn = createButton({
    variant: 'destructive',
    children: 'Delete',
    onClick: async () => {
      // Perform deletion
      await fetch(`/api/items/${itemName}`, { method: 'DELETE' });
      modal.close();
      notification.success('Deleted', `${itemName} has been deleted`);
    }
  });

  header.getElement().appendChild(title.getElement());
  header.getElement().appendChild(description.getElement());
  
  footer.getElement().appendChild(cancelBtn.getElement());
  footer.getElement().appendChild(deleteBtn.getElement());

  const modalEl = modal.getElement();
  modalEl.appendChild(header.getElement());
  modalEl.appendChild(footer.getElement());

  modal.open();
}

// Usage
const triggerBtn = createButton({
  variant: 'destructive',
  children: 'Delete Item',
  onClick: () => showDeleteConfirmation('My Document')
});
```

## Navigation Menu

Complete responsive navigation:

```typescript
import { createNavbar } from './components/ui/navbar';
import { createButton } from './components/ui/button';
import { createDropdownMenu } from './components/ui/dropdown-menu';

const navbar = createNavbar();

// Brand
const brand = document.createElement('a');
brand.href = '/';
brand.textContent = 'WindElements';
brand.className = 'text-xl font-bold';

// Navigation links
const navLinks = document.createElement('nav');
navLinks.className = 'hidden md:flex items-center gap-6';

const links = [
  { text: 'Home', href: '/' },
  { text: 'Components', href: '/components' },
  { text: 'Examples', href: '/examples' },
  { text: 'Docs', href: '/docs' }
];

links.forEach(link => {
  const a = document.createElement('a');
  a.href = link.href;
  a.textContent = link.text;
  a.className = 'hover:text-primary transition-colors';
  navLinks.appendChild(a);
});

// User menu
const userMenu = createDropdownMenu({
  trigger: createButton({
    variant: 'ghost',
    children: 'Account'
  }).getElement(),
  items: [
    { label: 'Profile', onClick: () => console.log('Profile') },
    { label: 'Settings', onClick: () => console.log('Settings') },
    { label: 'Sign Out', onClick: () => console.log('Sign Out') }
  ]
});

const navbarEl = navbar.getElement();
navbarEl.appendChild(brand);
navbarEl.appendChild(navLinks);
navbarEl.appendChild(userMenu.getElement());

document.body.appendChild(navbarEl);
```

## Pricing Section

Marketing pricing cards:

```typescript
import { createPricingCard } from './components/ui/pricing-card';
import { createButton } from './components/ui/button';

const plans = [
  {
    title: 'Free',
    price: '$0',
    period: 'month',
    features: [
      '10 components',
      'Basic support',
      'Community access'
    ],
    buttonText: 'Get Started'
  },
  {
    title: 'Pro',
    price: '$19',
    period: 'month',
    features: [
      'All 70+ components',
      'Priority support',
      'Private community',
      'Early access'
    ],
    buttonText: 'Start Free Trial',
    featured: true
  },
  {
    title: 'Enterprise',
    price: '$99',
    period: 'month',
    features: [
      'Everything in Pro',
      'Custom components',
      'Dedicated support',
      'SLA guarantee'
    ],
    buttonText: 'Contact Sales'
  }
];

const pricingSection = document.createElement('div');
pricingSection.className = 'grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto p-8';

plans.forEach(plan => {
  const card = createPricingCard({
    title: plan.title,
    price: plan.price,
    period: plan.period,
    features: plan.features,
    buttonText: plan.buttonText,
    featured: plan.featured,
    onButtonClick: () => {
      console.log('Selected plan:', plan.title);
    }
  });
  
  pricingSection.appendChild(card.getElement());
});

document.body.appendChild(pricingSection);
```

## Notification System

Toast notifications with different variants:

```typescript
import { notification } from './components/ui/notification';
import { createButton } from './components/ui/button';

const notificationDemo = document.createElement('div');
notificationDemo.className = 'flex gap-4 p-8';

const buttons = [
  {
    label: 'Success',
    variant: 'default',
    onClick: () => notification.success('Success!', 'Your changes have been saved')
  },
  {
    label: 'Error',
    variant: 'destructive',
    onClick: () => notification.error('Error!', 'Something went wrong. Please try again.')
  },
  {
    label: 'Warning',
    variant: 'secondary',
    onClick: () => notification.warning('Warning', 'This action may have consequences')
  },
  {
    label: 'Info',
    variant: 'outline',
    onClick: () => notification.info('Information', 'Here is some useful information')
  },
  {
    label: 'With Action',
    variant: 'default',
    onClick: () => notification.show({
      title: 'Update Available',
      description: 'A new version is ready to install',
      variant: 'info',
      duration: 10000,
      action: {
        label: 'Update Now',
        onClick: () => {
          console.log('Updating...');
          notification.success('Updated!', 'Application has been updated');
        }
      }
    })
  }
];

buttons.forEach(btn => {
  const button = createButton({
    variant: btn.variant as any,
    children: btn.label,
    onClick: btn.onClick
  });
  notificationDemo.appendChild(button.getElement());
});

document.body.appendChild(notificationDemo);
```

## File Upload

Drag-and-drop file upload with validation:

```typescript
import { createFileUpload } from './components/ui/file-upload';
import { notification } from './components/ui/notification';

const upload = createFileUpload({
  accept: 'image/*,.pdf',
  multiple: true,
  maxSize: 5 * 1024 * 1024, // 5MB
  onFilesSelected: (files) => {
    console.log('Selected files:', files);
    
    // Upload files
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    
    fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    .then(() => {
      notification.success('Upload Complete', `${files.length} file(s) uploaded`);
    })
    .catch(error => {
      notification.error('Upload Failed', error.message);
    });
  },
  onError: (error) => {
    notification.error('Upload Error', error);
  }
});

document.body.appendChild(upload.getElement());
```

## Complete Dashboard

Full dashboard example combining multiple components:

```typescript
import { createNavbar } from './components/ui/navbar';
import { createSidebar } from './components/ui/sidebar';
import { createCard, createCardHeader, createCardTitle, createCardContent } from './components/ui/card';
import { createStats, createStat } from './components/ui/stats';
import { createDataTable } from './components/ui/data-table';

class Dashboard {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'min-h-screen bg-background';
    
    this.render();
  }

  private render() {
    // Navbar
    const navbar = createNavbar();
    this.container.appendChild(navbar.getElement());

    // Main layout
    const main = document.createElement('div');
    main.className = 'flex';

    // Sidebar
    const sidebar = createSidebar();
    main.appendChild(sidebar.getElement());

    // Content
    const content = document.createElement('div');
    content.className = 'flex-1 p-8';

    // Stats
    const statsGroup = createStatsGroup();
    statsGroup.addStat(createStat({
      label: 'Total Users',
      value: '12,345',
      trend: { direction: 'up', value: '12%' }
    }));
    statsGroup.addStat(createStat({
      label: 'Revenue',
      value: '$45,678',
      trend: { direction: 'up', value: '8%' }
    }));
    statsGroup.addStat(createStat({
      label: 'Active Projects',
      value: '89',
      trend: { direction: 'down', value: '3%' }
    }));

    content.appendChild(statsGroup.getElement());

    // Recent activity table
    const card = createCard();
    const header = createCardHeader();
    const title = createCardTitle({ children: 'Recent Activity' });
    const cardContent = createCardContent();

    const table = createDataTable({
      columns: [
        { key: 'action', header: 'Action', sortable: true },
        { key: 'user', header: 'User', sortable: true },
        { key: 'date', header: 'Date', sortable: true }
      ],
      data: [
        { action: 'Created project', user: 'John Doe', date: '2024-01-15' },
        { action: 'Updated settings', user: 'Jane Smith', date: '2024-01-14' }
      ],
      striped: true,
      hoverable: true
    });

    header.getElement().appendChild(title.getElement());
    cardContent.getElement().appendChild(table.getElement());
    card.getElement().appendChild(header.getElement());
    card.getElement().appendChild(cardContent.getElement());

    content.appendChild(card.getElement());
    main.appendChild(content);
    this.container.appendChild(main);
  }

  public mount(target: HTMLElement) {
    target.appendChild(this.container);
  }
}

const dashboard = new Dashboard();
dashboard.mount(document.body);
```

## More Examples

Check out more examples in the component documentation:

- [Forms](/components/form)
- [Tables](/components/data-table)
- [Modals](/components/modal)
- [Navigation](/components/navbar)
- [Marketing](/components/hero)
