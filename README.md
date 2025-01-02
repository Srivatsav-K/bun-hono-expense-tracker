# Expense tracker

This is a full stack application with simple UI but built using a modern typescript stack under the hood

## Tech stack

- [Bun](https://bun.sh/) as the JS runtime & package manager
- [Hono](https://hono.dev/) as the backend server framework. Fast, lightweight, built on web standards. Supports any JavaScript runtime for deployment.
- [Hono RPC](https://hono.dev/docs/guides/rpc) for end to end type safety between the server and the client.
- [PostgresSQL](https://www.postgresql.org/) for database
- [Drizzle ORM](https://orm.drizzle.team/) for typesafe queries
- [Kinde](https://kinde.com/) for authentication & user management (Google SSO, email 2FA)
- [Zod](https://zod.dev/) for typeScript-first schema validation with static type inference on the server & client
- [React](https://react.dev/) for the client side web application
- [Vite](https://vite.dev/) as the client side dev server, proxy & bundler
- [React router](https://reactrouter.com/) for client side routing
- [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/) for styling & UI components
- [Tanstack query](https://tanstack.com/query/latest/docs/framework/react/overview) for asynchronous state management
- [React hook form](https://react-hook-form.com/) as the form management library

## How to run

- Ensure Docker is installed
- Set the environment variables
- Run `docker compose up` from the root dir
