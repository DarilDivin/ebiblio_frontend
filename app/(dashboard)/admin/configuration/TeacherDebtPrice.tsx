"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateTeacherDebtAmount } from "@/lib/data/configuration";
import { useLastConfig } from "@/services/queries";

const FormSchema = z.object({
  teacher_debt_price: z.string().min(3, { message: "Entrez un nombre avec au moins 3 chiffres" }),
});

const TeacherDebtPrice = ({amount}: {amount: number}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      teacher_debt_price: amount.toString() ,
    },
  });

  const {mutate} = useLastConfig();

  const submitForm = async (
    event: { preventDefault: () => void },
    teacher_debt_amount: number
  ) => {
    event.preventDefault();

    await updateTeacherDebtAmount({teacher_debt_amount});
    mutate()
  };

  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    console.log(values);

    submitForm(
      event,
      parseInt(values.teacher_debt_price),
    )
  }

  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground">
        <Edit className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier</DialogTitle>
        </DialogHeader>
        <div className="grid w-full items-center gap-1.5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="teacher_debt_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Montant de la dette enseignante</FormLabel>
                    <FormControl>
                      <Input className="outline-none focus-visible:ring-ring w-full" type="number" placeholder="500" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ceci est le montant que nous prélèveront chaque fois qu'un enseignat aura un jour de retard sur la dtae de retour des livres empruntés.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-4 text-primary-foreground">Modifier</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TeacherDebtPrice