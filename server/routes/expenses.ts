import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getUser } from "../middleware/authenticateUser";

const fakeExpenses = [
  {
    id: 1,
    title: "Expense 1",
    amount: 100,
    date: new Date(),
  },
  {
    id: 2,
    title: "Expense 2",
    amount: 200,
    date: new Date(),
  },
  {
    id: 3,
    title: "Expense 3",
    amount: 300,
    date: new Date(),
  },
];

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3),
  amount: z.number().int().positive(),
  date: z.string().date(),
});

const createExpenseSchema = expenseSchema.omit({ id: true, date: true });

const getExpenseSchema = z.object({
  id: z.number({ coerce: true }).positive(),
});

export const expensesRouter = new Hono()
  .get("/", getUser, (c) => {
    const userId = c.var.user.id;
    console.log("🚀 ~ .get ~ userId:", userId);
    return c.json(fakeExpenses);
  })
  .get("/:id", getUser, zValidator("param", getExpenseSchema), (c) => {
    const { id } = c.req.valid("param");
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) {
      return c.json({ error: "not found" }, 404);
    }
    return c.json(expense);
  })
  .post("/", getUser, zValidator("json", createExpenseSchema), async (c) => {
    const body = c.req.valid("json");
    fakeExpenses.push({
      id: fakeExpenses.length + 1,
      ...body,
      date: new Date(),
    });
    return c.json(body, 201);
  });
