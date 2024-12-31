import { useDeleteExpense, useExpenses } from "@/api/hooks/expenses";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrashIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const Expenses = () => {
  const { data: expenses, isLoading, error } = useExpenses();
  const { mutate, isPending } = useDeleteExpense();
  const { toast } = useToast();

  if (error) {
    return <pre className="bg-red-500">{JSON.stringify(error, null, 2)}</pre>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between mb-2">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Expenses
        </h2>

        <Button asChild size={"sm"}>
          <Link to={"/expenses/new"}>Add Expense</Link>
        </Button>
      </div>

      <Table>
        <TableCaption>A list of your recent expenses.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-center">Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading
            ? Array(3)
                .fill(3)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-4" />
                    </TableCell>
                    <TableCell className="text-center">
                      <Skeleton className="h-4" />
                    </TableCell>
                  </TableRow>
                ))
            : expenses?.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">
                    <Link
                      to={`/expenses/${expense.id}`}
                      className="hover:underline"
                      state={expense}
                    >
                      {expense.id}
                    </Link>
                  </TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell className="text-right">{expense.amount}</TableCell>
                  <TableHead className="text-center py-2">
                    <Button
                      type="button"
                      variant={"destructive"}
                      disabled={isPending}
                      onClick={() => {
                        mutate(expense.id.toString(), {
                          onError(error) {
                            console.log("🚀 ~ onError ~ error:", error);
                            toast({
                              variant: "destructive",
                              title: "Error deleting expense",
                            });
                          },
                        });
                      }}
                    >
                      <TrashIcon />
                    </Button>
                  </TableHead>
                </TableRow>
              ))}
        </TableBody>

        {expenses?.length ? (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">
                ₹ {expenses?.reduce((prev, curr) => prev + +curr.amount, 0)}
              </TableCell>
            </TableRow>
          </TableFooter>
        ) : null}
      </Table>
    </div>
  );
};

export default Expenses;
