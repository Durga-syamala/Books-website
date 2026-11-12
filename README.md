# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Paper & Pages — Books Website

A beginner-friendly React + Vite bookstore demo.

## Run the project

1. Open this folder in VS Code.
2. Open Terminal in VS Code.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the localhost URL printed in the terminal.

## Features

- Responsive bookstore landing page
- Search books by title, author, or category
- Filter by category
- Sort by price or rating
- Add/remove wishlist hearts
- Shopping bag with quantity controls and subtotal
- Demo checkout (does not take payment)

## Main files

- `src/main.jsx` — starts the React app
- `src/App.jsx` — page layout, book data, search/filter/cart state
- `src/index.css` — styling and responsive layout
- `index.html` — browser page entry point
- `vite.config.js` — Vite + React configuration
- `eslint.config.js` — lint rules
- `package.json` — scripts and dependencies

This is a front-end demo. It does not have a database, login, real payment, or order storage.
