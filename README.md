# Next.js Boilerplate

Boilerplate [Next.js](https://nextjs.org) project with strict-mode TypeScript, Sass,
and linters ready for action ⚡️

Clone this project and use it to create your own Next.js project.

```bash
git clone --depth=1 https://github.com/jdchum/nextjs-boilerplate.git my-next-project
cd my-next-project
git remote rm origin
npm install
```

Optionally, add this function to your shell startup script (`~/.zshrc` or `~/.bashrc`) to automate the above process:

```bash
nextapp() # Call this function whatever you like
{
  git clone --depth=1 https://github.com/jdchum/nextjs-boilerplate.git $1
  cd $1
  git remote rm origin
  npm install
}
```

Now you can initialize a Next.js app based on this boilerplate with `nextapp my-next-app` 🚀

## TODO

- [ ] Testing configuration
  - [ ] Jest + RTL for unit tests
  - [ ] Cypress for integration tests
- [ ] Dockerfile
- [ ] [Optimize Tailwind for production](https://tailwindcss.com/docs/optimizing-for-production)
- [ ] Better documentation

## Features

- 🛠 TypeScript
- 🎨 Sass
- 🖥 ESLint
- 👩‍🎨 Stylelint
- ✈️ Tailwind CSS
- 🦸 Heroicons
- 💅 Prettier
- 🗂 Sensible file structure
- 🧑‍🚀 Apollo GraphQL client & server
- 🐋 Docker compose w/Neo4j database

## GraphQL + Neo4j

- Start `neo4j` service from Docker Compose (`docker-compose up neo4j`)
- Add the following environment variables to `.env.local`:
  - `NEO4J_URI=neo4j://127.0.0.1`
  - `NEO4J_USER=neo4j`
  - `NEO4J_PASSWORD=test`
- GraphQL Playground available at [localhost:3000/api/graphql](http://localhost:3000/api/graphql) (non-production only)
- Neo4j Browser available at [localhost:7474](http://localhost:7474/browser/)

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

## Using Tailwind CSS

By default, Tailwind CSS is imported in `src/styles/globals.scss`, which itself is imported in
`src/pages/_app.page.tsx`. Tailwind classes are available globally. Optionally, custom CSS classes
can be extended using Tailwind using the `@apply` directive ([see Tailwind documentation](https://tailwindcss.com/docs/functions-and-directives#apply)).

To build an app without custom CSS, delete the default stylesheets (`src/styles/*` and remove references to those files. Then add `import 'tailwindcss/tailwind.css'` to the top
of `src/pages/_app.page.tsx`. Tailwind CSS classes will be available globally without the need for additional
stylesheets.

## Icons

This project includes [Heroicons](https://heroicons.com/) from the makers of Tailwind CSS. The Heroicons webpage includes
an icon search.

## Included Libraries

- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server)
- [Classnames](https://github.com/JedWatson/classnames#readme)
- [Heroicons (React)](https://github.com/tailwindlabs/heroicons#readme)
- [Lodash](https://lodash.com/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)

