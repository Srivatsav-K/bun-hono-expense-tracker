import { ExpenseFormData } from "@/components/ExpenseForm";
import { api } from "./client";
import { parseError } from "./utils";

export const getExpenses = async () => {
  const res = await api.expenses.$get();

  if (!res.ok) {
    throw await parseError(res);
  }

  return res.json();
};

export const getExpense = async (id: string | number) => {
  const res = await api.expenses[":id"].$get({
    param: {
      id: id.toString(),
    },
  });

  if (!res.ok) {
    throw await parseError(res);
  }

  return res.json();
};

export const createExpense = async (data: ExpenseFormData) => {
  const res = await api.expenses.$post({
    json: {
      ...data,
    },
  });

  if (!res.ok) {
    throw await parseError(res);
  }

  return res.json();
};
