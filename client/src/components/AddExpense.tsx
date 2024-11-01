import { createExpense } from "@/api/expenses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";

const AddExpense = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });

      navigate("/expenses");
    },
  });

  return (
    <>
      <ExpenseForm
        isLoading={isPending}
        handleSubmit={(data, setError) => {
          mutate(data, {
            onError: (e) => {
              console.log("🚀 ~ AddExpense ~ e:", e);
              setError("root", { message: "Something went wrong" });
            },
          });
        }}
      />
    </>
  );
};
export default AddExpense;
