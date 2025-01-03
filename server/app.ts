import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { expensesRouter } from "./routes/expenses";
import { authRouter } from "./routes/auth";

const app = new Hono();

app.use(logger());

const apiRoutes = app
  .basePath("/api")
  .route("/auth", authRouter)
  .route("/expenses", expensesRouter);

app.use("*", serveStatic({ root: "./client/dist" }));
app.get("*", serveStatic({ path: "./client/dist/index.html" }));

export type ApiRoutes = typeof apiRoutes;

export default app;
