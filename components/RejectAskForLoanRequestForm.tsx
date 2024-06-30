"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rejectLoanRequest } from "@/lib/data/book";
import { useLoan } from "@/services/queries";

const FormSchema = z.object({
  reason: z.string().min(1, 'Vous devez justifier votre refus')
})

const RejectAskForLoanRequestForm = ({ loan }: { loan: number }) => {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { mutate } = useLoan()

  const submitForm = async (event: { preventDefault: () => void }, reason: string) => {
    event.preventDefault();

    await rejectLoanRequest({loan, reason});
    mutate()
  }

  const onSubmit = (values: z.infer<typeof FormSchema>, event: any) => {
    submitForm(event, values.reason)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 text-destructive/70 hover:bg-destructive/20 hover:text-destructive rounded-md"
        >
          <span className="sr-only">Rejeter la demande</span>
          <X className="text-destructive h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
          <DialogDescription>
            Renseignez la raison pour laquelle la demande à été rejeté
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raison du rejet</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RejectAskForLoanRequestForm;
