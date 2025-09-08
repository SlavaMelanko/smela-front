# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

This is a Portal V2 application for proxy customers and SDK partners, built with
React 19, Vite, and TanStack Query. The project uses a custom backend API and
emphasizes clear architecture, easy maintenance, and simple UX.

## Essential Commands

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Testing

- `npm run ut` - Run Jest unit tests
- `npm run e2e` - Run Playwright e2e tests
- `npm run e2e:ui` - Run Playwright tests in UI mode
- To run a single test: `npm run ut -- path/to/test.spec.js`

### Code Quality

- `npm run lint` - Check code with ESLint
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run lint:styles` - Check SCSS with Stylelint
- `npm run format` - Format code with Prettier

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
- **E2E tests** in `/tests/` require pre-registered `admin@example.com` account
- Test utilities available in `/src/lib/tests/`

## Key Development Patterns

1. **Path aliases**: Use `@/` for `src/` and `@components` for `src/components`
2. **Component imports**: Always import from component folders, not files
3. **SCSS organization**: Global styles in `/src/styles/`, component styles
   co-located
4. **i18n keys**: Keep translations "short, clear, and easy to understand"
5. **ESLint compliance**: No console.log (use console.warn/error), prefer const
6. **Git hooks**: Pre-commit runs ESLint and Prettier on staged files
7. **Comment style**:
   - Trailing comments: no capital letter, no period (e.g.,
     `const i = 0 // initial value`)
   - Full-line comments: capital letter and period (e.g.,
     `// This initializes the counter.`)

## Important Considerations

- The app supports English and Ukrainian languages
- Theme switching between dark and light modes is implemented
- Role-based access control differentiates admin and regular users
- All forms include proper validation and error handling
- API authentication uses JWT tokens for secure access
- TanStack Query provides automatic caching, background refetching, and
  optimistic updates
