# Next.js Boilerplate

Boilerplate [Next.js](https://nextjs.org) project with strict-mode TypeScript, Sass,
and linters ready for action ⚡️

Clone this project and use it to create your own Next.js project.

```bash
git clone --depth=1 https://github.com/jdchum/nextjs-boilerplate.git my-next-project
cd my-next-project
npm install
```

## TODO

- [ ] Testing configuration
- [ ] Dockerfile
- [ ] Better documentation

## Features

- 🛠 TypeScript
- 🎨 Sass
- 🖥 ESLint
- 👩‍🎨 Stylelint
- 💅 Prettier
- 🗂 Sensible file structure

## File Structure

- Any directory directly under `src` can be imported using shorthand instead of
relative imports
  - Example: `~components/some-component` to access `src/components/some-component`
- Files under `src/pages` ending in `.page.tsx` will be exposed as a page
  - This allows subcomponents and utility files to exist under `src/pages` without
    automatically exposing pages
- Files under `src/pages/api` ending in `.api.ts will be exposed as an API endpoint
  - This allows utility files to exist under `src/pages/api` without exposing endpoints

```text
src/
├─ pages/
│  ├─ index.page.tsx
│  ├─ _app.page.tsx
│  ├─ other-page/
│  │  ├─ other-page.module.scss
│  │  ├─ index.page.tsx
│  │  ├─ other-page-helpers.ts
│  │  ├─ components/
│  │  │  ├─ subcomponent.tsx
│  │  │  ├─ subcomponent.module.scss
├─ components/
│  ├─ some-component/
│  │  ├─ index.tsx
│  │  ├─ some-component.module.scss
│  │  ├─ some-component-helpers.ts
│  │  ├─ components/
│  │  │  ├─ subcomponent.tsx
│  │  │  ├─ subcomponent.module.scss

```
