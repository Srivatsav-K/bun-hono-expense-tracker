import { getExpenses } from "@/api/expenses";
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
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const Expenses = () => {
  const {
    data: expenses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });

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
            {/* <TableHead>Date</TableHead> */}
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
                  </TableRow>
                ))
            : expenses?.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell className="text-right">{expense.amount}</TableCell>
                  {/* <TableCell>{expense.date}</TableCell> */}
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
