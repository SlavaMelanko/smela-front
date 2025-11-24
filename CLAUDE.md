# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

This is a frontend application built with React 19, Vite, and TanStack Query.
The project uses a custom backend API and emphasizes clear architecture, easy
maintenance, and simple UX.

## Technology Stack

- **React 19** - UI library for building user interfaces
- **Vite** - Next-generation frontend build tool
- **TanStack Query** - Powerful data synchronization for React
- **React Router** - Declarative routing for React
- **React Hook Form** - Performant forms with easy validation
- **Yup** - Schema validation
- **SCSS** - CSS preprocessor with BEM methodology
- **i18n** - Internationalization (English/Ukrainian)
- **Jest** - Unit testing framework
- **Playwright** - E2E testing framework

## Essential Commands

All pnpm scripts are defined in `package.json`. Key workflows:

### Development

- Development server, production builds, and preview: `dev`, `build`, `preview`
- Build analysis: `build:analyze` opens bundle visualization

### Testing

- Unit tests: `ut` (all tests), `ut:cov` (with coverage)
- E2E tests: `e2e` (headless), `e2e:ui` (interactive mode)
- Run single test: `pnpm run ut -- path/to/test.spec.js`
- E2E tests require pre-registered `jason@example.com` account

### Code Quality

- Linting: `lint`, `lint:fix`, `stylelint`, `stylelint:fix`
- Formatting: `format`
- Pre-commit hooks automatically run ESLint and Prettier on staged files

### Storybook

- Component library: `stories` (opens browser on port 6006)
- Build validation: `stories:build` (validates Storybook builds correctly)

## Architecture Overview

### Component Structure

Components are organized in `/src/components/` with each component having:

- `index.jsx` - Component implementation
- `styles.scss` - SCSS styles using BEM methodology
- Component stories for Storybook when applicable

### State Management

The app uses React Context API for global state:

- **ThemeContext** - Dark/light theme switching
- **LocaleContext** - i18n language switching (EN/UK)
- **ModalContext** - Global modal management
- **NotificationContext** - Toast notifications

### Routing Architecture

Routes are defined in `/src/routes/` with three protection levels:

- **Protected routes** - Require authentication (user dashboard)
- **Public routes** - Accessible without auth (login, pricing)
- **Legal routes** - Privacy policy and terms

### API Integration

The app uses TanStack Query for data fetching and state management with our
custom backend API:

- **API client** - Centralized API configuration and request handling
- **Query hooks** - Custom hooks for data fetching with caching and
  synchronization
- **Mutations** - Optimistic updates and error handling for data modifications

### Form Handling

Forms use React Hook Form with Yup validation:

```javascript
// Forms follow this pattern:
const resolver = yupResolver(schema)
const { register, handleSubmit } = useForm({ resolver })
```

### Testing Strategy

- **Unit tests** in `__tests__` folders near components
- **E2E tests** in `/e2e/` directory
- Test utilities available in `/src/lib/tests/`

## Key Development Patterns

1. **Path aliases**: Use `@/` for `src/` and `@components` for `src/components`
2. **Component imports**: Always import from component folders, not files
3. **SCSS organization**: Global styles in `/src/styles/`, component styles
   co-located
4. **i18n keys**: Keep translations "short, clear, and easy to understand"
5. **ESLint compliance**: No console.log (use console.warn/error), prefer const
6. **Control flow formatting**: Always use curly braces with `if` statements on
   new lines (no single-line `if (ok) return`)
7. **Git hooks**: Pre-commit runs ESLint and Prettier on staged files
8. **Comment style**:
   - Best practice: Use descriptive variable and function names instead of
     comments when possible
   - Full-line comments: Start with capital letter, end with period only if
     multiple sentences (e.g., `// This initializes the counter` or
     `// Initialize counter. Reset on page load.`)
   - Trailing comments: Lowercase start, brief, no period (e.g.,
     `const i = 0 // initial value`)

## Important Considerations

- The app supports English and Ukrainian languages
- Theme switching between dark and light modes is implemented
- Role-based access control differentiates admin and regular users
- All forms include proper validation and error handling
- API authentication uses JWT tokens for secure access
- TanStack Query provides automatic caching, background refetching, and
  optimistic updates
