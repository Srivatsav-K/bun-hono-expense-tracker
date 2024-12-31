import { useExpense, useUpdateExpense } from "@/api/hooks/expenses";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";

const EditExpense = () => {
  const { expenseId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    data: expense,
    isLoading,
    error,
  } = useExpense(expenseId!, { enabled: !state });
  const { isPending, mutate } = useUpdateExpense();

  if (isLoading) {
    return <div className="text-center">Fetching expense...</div>;
  }

  if (error) {
    return <div className="text-center">Error fetching expense</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <ExpenseForm
        defaultValues={state ?? expense}
        isLoading={isPending}
        handleSubmit={(data, setError) => {
          mutate(
            { expenseId: expenseId!, data },
            {
              // https://tkdodo.eu/blog/mastering-mutations-in-react-query#some-callbacks-might-not-fire
              onSuccess: () => {
                navigate("/expenses");
              },
              onError: (e) => {
                console.log("🚀 ~ AddExpense ~ e:", e);
                setError("root", { message: "Something went wrong" });
              },
            }
          );
        }}
      />
    </div>
  );
};
export default EditExpense;
