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

const FormSchema = z.object({
  student_loan_delay: z.string().min(1, { message: "Entrez un nombre avec au moins 1 chiffres" }),
});


const StudentLoanDelay = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      student_loan_delay: '14' ,
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
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
                name="student_loan_delay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Durée d'un prêt Etudiant</FormLabel>
                    <FormControl>
                      <Input className="outline-none focus-visible:ring-ring w-full" type="number" placeholder="500" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ceci est la durée maximale d'un prêt par les Etudiants en jours.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-4 text-primary-foreground">Sauvegarder</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default StudentLoanDelay