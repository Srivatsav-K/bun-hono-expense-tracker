import { zValidator } from "@hono/zod-validator";
import { createFactory } from "hono/factory";
import { db } from "../db";
import { expenses } from "../db/schema";
import {
  createExpenseSchema,
  expenseIdParamSchema,
  updateExpenseSchema,
} from "../db/schema/expenses";
import { and, eq } from "drizzle-orm";

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
  zValidator("param", expenseIdParamSchema),
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

export const updateExpenseHandler = factory.createHandlers(
  zValidator("param", expenseIdParamSchema),
  zValidator("json", updateExpenseSchema),
  async (c) => {
    const userId = c.var.user.id;
    const { id: expenseId } = c.req.valid("param");
    const body = c.req.valid("json");

    // Check if the expense exists
    const expense = await db
      .select({
        userId: expenses.userId,
      })
      .from(expenses)
      .where(eq(expenses.id, expenseId))
      .limit(1);

    if (expense.length === 0) {
      // Expense does not exist
      return c.json({ error: "Expense not found" }, 404);
    }

    if (expense[0].userId !== userId) {
      // Expense exists but belongs to a different user
      return c.json(
        { error: "Access forbidden: You cannot update this expense" },
        403
      );
    }

    const updatedExpense = await db
      .update(expenses)
      .set(body)
      .where(and(eq(expenses.userId, userId), eq(expenses.id, expenseId)))
      .returning({
        id: expenses.id,
        title: expenses.title,
        amount: expenses.amount,
        createdAt: expenses.createdAt,
        updatedAt: expenses.updatedAt,
      });

    return c.json(updatedExpense[0], 200);
  }
);

export const deleteExpenseHandler = factory.createHandlers(
  zValidator("param", expenseIdParamSchema),
  async (c) => {
    const userId = c.var.user.id;
    const { id: expenseId } = c.req.valid("param");

    const deletedExpense = await db
      .delete(expenses)
      .where(and(eq(expenses.userId, userId), eq(expenses.id, expenseId)))
      .returning({
        id: expenses.id,
        title: expenses.title,
        amount: expenses.amount,
        createdAt: expenses.createdAt,
        updatedAt: expenses.updatedAt,
      });

    if (!deletedExpense.length) {
      return c.json(
        {
          status_code: "OPERATION_FAILED",
          error: "Cannot be deleted with the given inputs",
        },
        400
      );
    }

    return c.json(deletedExpense[0], 200);
  }
);
