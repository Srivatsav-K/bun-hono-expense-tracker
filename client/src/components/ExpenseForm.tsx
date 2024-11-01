import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootError,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormSetError } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(3),
  amount: z.number({ coerce: true }).positive(),
});

export type ExpenseFormData = z.infer<typeof formSchema>;

type ExpenseFormProps = {
  defaultValues?: ExpenseFormData;
  isLoading: boolean;
  handleSubmit: (
    values: ExpenseFormData,
    setError: UseFormSetError<ExpenseFormData>
  ) => void;
};

const ExpenseForm = ({
  defaultValues = {
    title: "",
    amount: 0,
  },
  isLoading = false,
  handleSubmit,
}: ExpenseFormProps) => {
  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            handleSubmit(data, form.setError)
          )}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter expense title" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Enter amount" type="number" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* {form.formState.errors.root?.message && (
            <Label>{form.formState.errors.root?.message}</Label>
          )} */}
          <FormRootError />

          <Button type="submit" disabled={isLoading}>
            Submit
          </Button>
        </form>
      </Form>

      <DevTool control={form.control} />
    </>
  );
};
export default ExpenseForm;
