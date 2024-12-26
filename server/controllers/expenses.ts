import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";
import { db } from "../db";
import { expenses } from "../db/schema";
import {
  createExpenseSchema,
  getExpenseByIdSchema,
} from "../db/schema/expenses";

// https://hono.dev/docs/guides/best-practices#don-t-make-controllers-when-possible
const factory = createFactory();

export const getAllExpensesHandler = factory.createHandlers(async (c) => {
  const userId = c.var.user.id;

  const expenses = await db.query.expenses.findMany({
    where(fields, operators) {
      return operators.eq(fields.userId, userId);
    },
    orderBy(fields, operators) {
      return operators.desc(fields.createdAt);
    },
    limit: 100, //TODO add pagination
    columns: {
      userId: false,
    },
  });

  return c.json(expenses, 200);
});

export const getExpenseByIdHandler = factory.createHandlers(
  zValidator("param", getExpenseByIdSchema),
  async (c) => {
    const userId = c.var.user.id;
    const { id: expenseId } = c.req.valid("param");

    const expense = await db.query.expenses.findFirst({
      where(fields, operators) {
        return operators.and(
          operators.eq(fields.userId, userId),
          operators.eq(fields.id, expenseId)
        );
      },
      columns: {
        userId: false,
      },
    });

    if (!expense) {
      return c.json({ error: "not found" }, 404);
    }

    return c.json(expense, 200);
  }
);

export const createExpensehandler = factory.createHandlers(
  zValidator("json", createExpenseSchema),
  async (c) => {
    const userId = c.var.user.id;
    const body = c.req.valid("json");

    const createdExpense = await db
      .insert(expenses)
      .values({
        ...body,
        userId,
      })
      .returning({
        id: expenses.id,
        title: expenses.title,
        amount: expenses.amount,
        createdAt: expenses.createdAt,
        updatedAt: expenses.updatedAt,
      });

    return c.json(createdExpense[0], 201);
  }
);
