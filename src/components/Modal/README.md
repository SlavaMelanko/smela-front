# Modal System Documentation

A modal system with accessibility features and mobile responsiveness.

## Setup

The modal system is already configured in the app. The `ModalProvider` wraps the entire application through the router layouts.

## useModal Hook

### Available Methods

```javascript
const {
  openModal, // Create and show a modal
  closeModal, // Close specific modal by ID
  closeAllModals, // Close all open modals
  updateModal, // Update modal properties
  modals // Array of current modals
} = useModal()
```

### openModal(config)

Creates and displays a new modal. Returns a close function.

```javascript
const close = openModal({
  children: <div>Modal content</div>,
  size: 'md',
  onClose: () => console.log('Modal closed')
})
```

### closeModal(id)

Closes a specific modal by its ID.

```javascript
closeModal('modal-uuid-here')
```

### closeAllModals()

Closes all currently open modals.

```javascript
closeAllModals()
```

### updateModal(id, updates)

Updates properties of an existing modal.

```javascript
updateModal('modal-id', { size: 'lg', centered: false })
```

## Modal Configuration

Available options when calling `openModal()`:

```javascript
{
  children, // React component or JSX to display
    size, // 'xs', 'sm', 'md', 'lg', 'xl', 'full'
    centered, // true/false - center modal on screen
    closeOnOverlayClick, // true/false - click outside to close
    closeOnEsc, // true/false - ESC key to close
    preserveScrollBarGap, // true/false - prevent layout shift
    animationPreset, // 'slide-in-bottom', 'slide-in-top', 'scale', 'fade'
    onClose // function called when modal closes
}
```

### Default Values

```javascript
{
  size: 'md',
  centered: true,
  closeOnOverlayClick: true,
  closeOnEsc: true,
  preserveScrollBarGap: true,
  animationPreset: 'slide-in-bottom'
}
```

## Modal Components

### ModalHeader

```jsx
import { ModalHeader } from '@/components/modals';

// Usage:
<ModalHeader onClose={closeFunction}>Modal Title</ModalHeader>
```

### ModalBody

```jsx
import { ModalBody } from '@/components/modals';

// Usage:
<ModalBody>
  <p>Your modal content goes here</p>
</ModalBody>
```

### ModalFooter

```jsx
import { ModalFooter } from '@/components/modals';

// Usage:
<ModalFooter>
  <button onClick={close}>Cancel</button>
  <button onClick={save}>Save</button>
</ModalFooter>
```

## Usage Examples

### Basic Modal

```javascript
import useModal from '@/hooks/useModal'
import { ModalHeader, ModalBody, ModalFooter } from '@/components/modals'

function MyPage() {
  const { openModal } = useModal()

  const showModal = () => {
    const close = openModal({
      children: (
        <>
          <ModalHeader onClose={close}>Settings</ModalHeader>
          <ModalBody>
            <p>Configure your preferences here</p>
          </ModalBody>
          <ModalFooter>
            <button onClick={close}>Close</button>
          </ModalFooter>
        </>
      )
    })
  }

  return <button onClick={showModal}>Open Settings</button>
}
```

### Simple Content Modal

```javascript
const showAlert = () => {
  const close = openModal({
    children: (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Success!</h3>
        <p>Your changes have been saved.</p>
        <button onClick={close}>OK</button>
      </div>
    ),
    size: 'sm'
  })
}
```

### Form Modal

```javascript
const showEditForm = () => {
  const close = openModal({
    children: (
      <>
        <ModalHeader onClose={close}>Edit Profile</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Name' />
            <input type='email' placeholder='Email' />
          </form>
        </ModalBody>
        <ModalFooter>
          <button onClick={close}>Cancel</button>
          <button type='submit'>Save Changes</button>
        </ModalFooter>
      </>
    ),
    size: 'lg'
  })
}
```

## Modal Sizes

- `xs` - 320px (alerts, confirmations)
- `sm` - 384px (simple forms)
- `md` - 512px (default size)
- `lg` - 768px (detailed forms)
- `xl` - 1024px (admin panels, data tables)
- `full` - Full screen (mobile optimized)

## Animation Options

- `slide-in-bottom` - Slides up from bottom (default)
- `slide-in-top` - Slides down from top
- `scale` - Scales from center point
- `fade` - Simple fade in/out

## Best Practices

**Do:**

- Always provide a close button or method
- Use appropriate sizes for content
- Test on mobile devices
- Handle form submissions properly

**Don't:**

- Open too many modals at once
- Use modals for complex multi-step flows
- Forget about keyboard navigation
- Make modals too wide on mobile

## Error Handling

The `useModal` hook must be used within a component that's inside the router. If used outside the provider context, it will throw:

```
Error: useModal must be used within a ModalProvider
```

This is already set up in the app through the layout components in `router.jsx`.
