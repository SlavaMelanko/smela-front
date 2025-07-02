# Storybook

## ⚠️ Prerequisites

Before using Storybook, ensure that all dependencies are installed. Run the following command to install the required packages:

```bash
npm install
```

## 📦 Setup

Storybook is already configured in this project. You can find the configuration files in the `.storybook` directory. These include:

- `main.js`: Defines the Storybook configuration, including stories and addons.
- `preview.js`: Sets global parameters and imports styles.
- `manager.js`: Customizes the Storybook UI theme.
- `massiveTheme.js`: Defines our custom theme for Storybook.

## 🚀 Running Storybook

To start Storybook in development mode, run:

```bash
npm run storybook
```

## 📘 Storybook Guidelines

> Keep stories focused on demonstrating the component’s states, not on reproducing entire app flows.

1. Name your story files using the pattern: `<Component>.stories.js` where `<Component>` matches the PascalCase singular component name (e.g., `Button.stories.js`, `UserCard.stories.js`)
1. If you need additional code for complex examples (e.g., mock data, wrappers), use a `stories/` subfolder next to your component
1. Avoid importing `styles.scss` directly into stories. Components must include their own styles internally.
