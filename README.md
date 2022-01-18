# Minurl 💎

> A minimal url shortener

## Quick Launch 🚀

0. Clone this repo
1. Run `make setup` to install dependencies
2. Run `make test` to run linters and test suite (optional)
3. Run `make server` to build and start the server
4. Visit **Minurl** at `localhost:8080`!

## About 🖊️

This project leverages [Next.js](https://nextjs.org/) to build a simple React application
using [TailwindCSS](https://tailwindcss.com/), SASS, and TypeScript. Data is persisted locally using
SQLite with [Prisma](https://www.prisma.io/) ORM.

Unit testing is handled with [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
E2E tests are automated through [Cypress](https://www.cypress.io/).

## Future Work 🔮

- [ ] User accounts to manage mini URLs
  - [ ] Editable mini urls
  - [ ] Expiration dates
  - [ ] URL analytics (device, platform, browser, unique visits)
  - [ ] Detect website status (e.g. not found, unauthenticated, server error, etc.)
- [ ] Public API
  - [ ] Rate limits
