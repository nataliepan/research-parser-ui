# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## While developing
* ensure tailwind is being compiled in index.css and output as index-output.css use `yarn tailwind`
* `yarn dev` to see latest code served 

## Styles use Tailwind and Material UI
// * to use tailwind class prefix them with 'tw-' as specified in tailwind.config.js prefix
// (https://sandygoody.medium.com/vite-twin-macro-d27a5f89df06)
// https://webkul.com/blog/tailwind-css-material-ui-with-next-js/#:~:text=By%20combining%20the%20utility%2Dfirst,unique%20approach%20to%20styling%20websites.
// https://mui.com/base-ui/guides/working-with-tailwind-css/


## Folder Structure: group files by feature
Based on reading (https://profy.dev/article/react-folder-structure)
* kebab-case: use 'use-my-hook.js' vs 'useMyHook.js' due to certain case sensitivities
* use absolute imports instead of relative paths
* index.js as "barrel files" (way to group and export multiple modules from a single file) or "the public API" of a module or a component
* ui: folder for components like buttons, form fields, and so on

see sample [repo](https://github.com/profydev/prolog-app/tree/main/features)
└── src/
    ├── features/
    │   │   # the todo "feature" contains everything related to todos
    │   ├── todos/
    │   │   │   # this is used to export the relevant modules aka the public API (more on that in a bit)
    │   │   ├── index.tsx
    │   │   ├── create-todo-form/
    │   │   ├── edit-todo-modal/
    │   │   ├── todo-form/
    │   │   └── todo-list/
    │   │       │   # the public API of the component (exports the todo-list component and hook)
    │   │       ├── index.tsx
    │   │       ├── todo-item.component.tsx
    │   │       ├── todo-list.component.tsx
    │   │       ├── todo-list.context.tsx
    │   │       ├── todo-list.css
    │   │       ├── todo-list.test.tsx
    │   │       ├── use-todo-list.tsx
    │   │       └── api/
    │   │           └── use-get-todo-list.tsx
    │   ├── projects/
    │   │   ├── index.tsx
    │   │   ├── create-project-form/
    │   │   ├── project-list/
    │   │   └── api/
    │   │       └── use-get-projects.tsx
    │   ├── ui/
    │   │   ├── index.tsx
    │   │   ├── button/
    │   │   ├── card/
    │   │   ├── checkbox/
    │   │   ├── header/
    │   │   ├── footer/
    │   │   ├── modal/
    │   │   └── text-field/
    │   └── users/
    │       ├── index.tsx
    │       ├── login/
    │       ├── signup/
    │       └── use-auth.tsx
    └── pages/
        │   # all that's left in the pages folder are simple JS files
        │   # each file represents a page (like Next.js)
        ├── create-project.tsx
        ├── create-todo.tsx
        ├── index.tsx
        ├── login.tsx
        ├── privacy.tsx
        ├── project.tsx
        ├── signup.tsx
        └── terms.tsx