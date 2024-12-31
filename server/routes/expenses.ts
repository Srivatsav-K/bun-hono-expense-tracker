import { Hono } from "hono";
import {
  createExpensehandler,
  deleteExpenseHandler,
  getAllExpensesHandler,
  getExpenseByIdHandler,
  updateExpenseHandler,
} from "../controllers/expenses";
import { getUser } from "../middleware/authenticateUser";

export const expensesRouter = new Hono()
  .get("/", getUser, ...getAllExpensesHandler)
  .get("/:id", getUser, ...getExpenseByIdHandler)
  .post("/", getUser, ...createExpensehandler)
  .patch("/:id", getUser, ...updateExpenseHandler)
  .delete("/:id", getUser, ...deleteExpenseHandler);
