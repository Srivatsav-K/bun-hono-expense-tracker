import { useCreateExpense } from "@/api/hooks/expenses";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";

const AddExpense = () => {
  const navigate = useNavigate();

  const { isPending, mutate } = useCreateExpense();

  return (
    <div className="max-w-3xl mx-auto">
      <ExpenseForm
        isLoading={isPending}
        handleSubmit={(data, setError) => {
          mutate(data, {
            onSuccess() {
              navigate("/expenses");
            },
            onError: (e) => {
              console.log("🚀 ~ AddExpense ~ e:", e);
              setError("root", { message: "Something went wrong" });
            },
          });
        }}
      />
    </div>
  );
};
export default AddExpense;
