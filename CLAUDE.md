# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Portal V2 application for proxy customers and SDK partners, built with React 19, Vite, and Firebase. The project emphasizes clear architecture, easy maintenance, and simple UX.

## Essential Commands

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Testing

- `npm run test` - Run all tests (unit + e2e)
- `npm run test:unit` - Run Jest unit tests
- `npm run test:e2e` - Run Playwright e2e tests
- To run a single test: `npm run test:unit -- path/to/test.spec.js`
- For interactive Playwright UI: `npx playwright test --ui`

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

- **AuthContext** - Authentication state and user data
- **ThemeContext** - Dark/light theme switching
- **LocaleContext** - i18n language switching (EN/UK)
- **ModalContext** - Global modal management
- **NotificationContext** - Toast notifications

### Routing Architecture

Routes are defined in `/src/routes/` with three protection levels:

- **Protected routes** - Require authentication (user dashboard)
- **Public routes** - Accessible without auth (login, pricing)
- **Legal routes** - Privacy policy and terms

### Firebase Integration

All Firebase services are centralized in `/src/services/firebase/`:

- **auth.js** - Authentication with Google OAuth and email/password
- **firestore.js** - Database operations for users and data
- **realtime.js** - Real-time data subscriptions

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
3. **SCSS organization**: Global styles in `/src/styles/`, component styles co-located
4. **i18n keys**: Keep translations "short, clear, and easy to understand"
5. **ESLint compliance**: No console.log (use console.warn/error), prefer const
6. **Git hooks**: Pre-commit runs ESLint and Prettier on staged files
7. **Comment style**: 
   - Trailing comments: no capital letter, no period (e.g., `const i = 0 // initial value`)
   - Full-line comments: capital letter and period (e.g., `// This initializes the counter.`)

## Important Considerations

- The app supports English and Ukrainian languages
- Theme switching between dark and light modes is implemented
- Role-based access control differentiates admin and regular users
- All forms include proper validation and error handling
- Firebase rules and security are configured for production use
