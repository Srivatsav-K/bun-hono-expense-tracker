import { ExpenseFormData } from "@/components/ExpenseForm";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  createExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  updateExpense,
} from "../expenses";

export const useExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });
};

type ExpenseQueryOptions<TData = unknown> = Omit<
  UseQueryOptions<TData, unknown, TData>,
  "queryKey" | "queryFn"
>;
export const useExpense = (expenseId: string, options: ExpenseQueryOptions) => {
  return useQuery({
    queryKey: ["expenses", expenseId],
    queryFn: () => getExpense(expenseId),
    ...options,
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExpense,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });
};

type UpdateExpenseMutation = {
  expenseId: string;
  data: ExpenseFormData;
};
export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // https://tkdodo.eu/blog/mastering-mutations-in-react-query#mutations-only-take-one-argument-for-variables
    mutationFn: ({ expenseId, data }: UpdateExpenseMutation) =>
      updateExpense(expenseId, data),

    // https://tkdodo.eu/blog/mastering-mutations-in-react-query#some-callbacks-might-not-fire
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpense,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });
};
