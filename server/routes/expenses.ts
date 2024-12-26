import { Hono } from "hono";
import {
  createExpensehandler,
  getAllExpensesHandler,
  getExpenseByIdHandler,
} from "../controllers/expenses";
import { getUser } from "../middleware/authenticateUser";

export const expensesRouter = new Hono()
  .get("/", getUser, ...getAllExpensesHandler)
  .get("/:id", getUser, ...getExpenseByIdHandler)
  .post("/", getUser, ...createExpensehandler);
