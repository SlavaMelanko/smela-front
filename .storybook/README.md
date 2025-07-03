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
npm run stories
```

## 📘 Storybook Guidelines

> Stories should focus on showing the component’s different states—not reproducing full app flows, adding extra styles, or overengineering examples.

1. File naming: use the pattern `<Component>.stories.js`, where `<Component>` is the singular PascalCase component name, e.g. `Button.stories.js`
1. Keep examples simple. Avoid mock data, complex wrappers, or unnecessary logic
1. Don’t add separate `styles.scss` files in stories. Components must include their own styles internally
