---
name: react-project-structure
description:
  File and folder organization conventions for React + Vite + shadcn/ui
  projects. Use when creating new components, organizing files, deciding folder
  structure, naming files/folders, or reviewing project organization. Covers
  folder-per-component vs flat structure, naming conventions, barrel exports,
  internal elements, and form patterns.
---

# React Project Structure Guidelines

## Core Conventions

| Convention    | Rule                                                           |
| ------------- | -------------------------------------------------------------- |
| Folder naming | `lowercase` = grouping folder, `PascalCase` = component folder |
| Exports       | Named exports only (except `ui/`)                              |
| Functions     | Arrow functions (except `ui/`)                                 |
| Imports       | Use `index.js` barrel files                                    |
| File naming   | `ComponentName.jsx` (not just `index.jsx`)                     |
| Suffixes      | Keep descriptive suffixes (`LoginPrompt`, `ConfirmDialog`)     |

## Folder vs Flat Decision

| Condition               | Structure                              | Example                                  |
| ----------------------- | -------------------------------------- | ---------------------------------------- |
| Single `.jsx` file only | Flat in grouping folder                | `prompts/LoginPrompt.jsx`                |
| 2+ related files        | Folder-per-component                   | `DataTable/` with hooks, sub-components  |
| Tests                   | Shared `__tests__/` in grouping folder | `prompts/__tests__/LoginPrompt.test.jsx` |

## Internal Folder Naming

| Location            | Internal folder | Purpose                                     |
| ------------------- | --------------- | ------------------------------------------- |
| `src/components/*/` | `elements/`     | Small atomic primitives (Label, Error)      |
| `src/pages/*/`      | `components/`   | Larger page-specific pieces (forms, tables) |

## Directory Structure

```
src/
├── components/          # Shared/reusable components
│   ├── prompts/         # Grouping folder (flat structure)
│   │   ├── index.js
│   │   ├── LoginPrompt.jsx
│   │   ├── SignupPrompt.jsx
│   │   ├── elements/    # Internal primitives
│   │   │   └── Prompt.jsx
│   │   └── __tests__/
│   ├── dialogs/
│   │   ├── PricingSliderDialog/  # Complex → folder-per-component
│   │   │   ├── index.js
│   │   │   ├── PricingSliderDialog.jsx
│   │   │   ├── hooks/
│   │   │   └── elements/
│   │   └── ConfirmDialog.jsx    # Simple → flat
│   ├── form/            # Form utilities pattern
│   │   ├── index.js
│   │   ├── FormController.jsx
│   │   ├── FormField.jsx
│   │   ├── elements/    # Shared internal primitives
│   │   └── containers/  # Layout utilities (not layouts/)
│   ├── ui/              # shadcn/ui primitives ONLY
│   └── Copyright/       # Top-level component (no grouping)
├── layouts/
├── pages/
│   └── admin/Users/
│       ├── index.jsx
│       └── components/  # Page-specific pieces
└── hooks/               # Shared hooks
```

## File Patterns

### index.js (barrel)

```js
export { ComponentName } from './ComponentName'
```

### ComponentName.jsx

```jsx
export const ComponentName = ({ ...props }) => {
  return (/* ... */)
}
```

### When to Extract vs Inline

| Condition                    | Action                 |
| ---------------------------- | ---------------------- |
| Few lines, single-file usage | Inline in same file    |
| Used by 2+ sibling files     | Extract to `elements/` |
| Complex logic                | Extract to `elements/` |

### Inline Helpers Example

```jsx
// ProfileDialog.jsx
const Row = ({ children }) => (
  <div className='flex items-center gap-2'>{children}</div>
)

export const ProfileDialog = ({ profile }) => {
  /* ... */
}
```

## Form Utilities Pattern

```
form/
├── index.js              # Exports: FormController, FormField, FormContainer, FormFields
├── FormController.jsx    # Wrapper for controlled inputs (Select, Switch)
├── FormField.jsx         # Wrapper for native inputs (Input, Textarea)
├── elements/             # Shared primitives (Error, Label, FieldWrapper)
└── containers/           # Layout utilities (FormContainer, FormFields)
```

Use `containers/` (not `layouts/`) to avoid confusion with page layouts.

## src/components/ui/ Rules

- Reserved for shadcn/ui primitives only
- Install via `npx shadcn@latest add <component>`
- Uses regular functions + default exports (shadcn convention)
- Custom wrappers go in `src/components/`, not `ui/`

## Import Examples

```jsx
import { LoginPrompt, SignupPrompt } from '@/components/prompts'
import { PricingSliderDialog } from '@/components/dialogs'
import { Button, Card } from '@/components/ui'
import { FormController, FormContainer } from '@/components/form'
```
