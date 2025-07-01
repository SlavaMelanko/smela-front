# Storybook Documentation

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

This will launch Storybook on `http://localhost:6006`.

## 📖 Building Storybook

To build a static version of Storybook for deployment, use:

```bash
npm run build-storybook
```

The static files will be generated in the `storybook-static` directory.

## 🛠️ Customization

- **Adding Stories**: Add your stories in the `src` components directory, following the pattern `*.stories.@(js|jsx|ts|tsx)`.
- **Theming**: Modify the `massiveTheme.js` file in the `.storybook` directory to customize the Storybook UI theme.
- **Addons**: Add or configure addons in the `main.js` file under the `addons` array.

## 🔍 Troubleshooting

If you encounter issues, ensure that:

1. All dependencies are installed.
2. The `storybook` and `build-storybook` scripts are correctly defined in `package.json`.
3. The `.storybook` directory is not ignored in `.gitignore`.
4. The styles related to component are imported correctly in your stories.
5. The Storybook server is running without errors in the console.

For further assistance, refer to the [Storybook documentation](https://storybook.js.org/docs).
