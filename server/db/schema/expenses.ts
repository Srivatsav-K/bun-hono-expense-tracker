import { sql } from "drizzle-orm";
import {
  index,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

export const expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(), // https://www.postgresql.org/docs/current/datatype-numeric.html#DATATYPE-NUMERIC-DECIMAL
    createdAt: timestamp("created_at", {
      mode: "string",
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", {
      mode: "string",
      withTimezone: true,
    })
      .defaultNow()
      .notNull()
      .$onUpdate(() => sql`CURRENT_TIMESTAMP`), // update the time when the row is modified
  },
  (expenses) => {
    return [index("user_idx").on(expenses.userId)];
  }
);

export const expenseIdParamSchema = z.object({
  id: z.number({ coerce: true }).positive(),
});

export const createExpenseSchema = createInsertSchema(expenses, {
  title: z.string().min(3),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Amount must be a valid monetary value",
  }),
})
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true, // Get from user auth middleware
  })
  .strict();

export const updateExpenseSchema = createUpdateSchema(expenses, {
  title: z.string().min(3),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Amount must be a valid monetary value",
  }),
})
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true, // Get from user auth middleware
  })
  .strict();
