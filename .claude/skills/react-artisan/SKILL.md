---
name: react-artisan
description: |
  Use when writing, reviewing, or refactoring React code. Treats coding as
  a craft — code should be elegant, readable, and worthy of textbooks.
  Prioritizes clarity and maintainability; optimizes only when proven
  necessary. Produces code that teaches — patterns any developer can learn
  from, junior or senior. Triggers on React components, hooks, state
  management, component composition, context, and layouts. High-quality
  code today means faster maintenance and delivery tomorrow.
---

# React Artisan

Code is for humans first, computers second. Prefer simplicity, then optimize
when proven necessary.

## When to Apply

Reference these guidelines when:

- Writing new React primitives, components, or pages
- Designing component APIs and prop interfaces
- Creating custom hooks
- Setting up context providers and state management
- Building layout structures
- Reviewing code for performance and security issues
- Refactoring existing React code
- Optimizing bundle size or load times

## Rules

- Arrow Function Components — use `const Component = () => {}` instead of
  `function Component() {}`
- Don't Use Index as Key — use stable unique IDs (`id`, `uuid`) to preserve
  state and avoid reconciliation bugs
- Inline Exports — use `export const Component` instead of collecting exports at
  the bottom of the file
- [Composition Over Configuration](references/composition-over-configuration.md)
  — use small primitives instead of prop-heavy god components
- [Context as Provider](references/context-as-provider.md) — render `<Context>`
  directly instead of `<Context.Provider>` (React 19+)
- [Ref as Prop](references/ref-as-prop.md) — pass `ref` as a regular prop
  instead of using `forwardRef` (React 19+)
- [You Might Not Need an Effect](references/you-might-not-need-an-effect.md) —
  avoid unnecessary Effects for derived state, event handlers, and state resets

Each rule file contains:

- Brief explanation of problem and why it matters
- Incorrect code example with explanation
- Correct code example with explanation
- Usage examples
- Additional context and references

Remember: React is about composition. Build small, combine thoughtfully.
