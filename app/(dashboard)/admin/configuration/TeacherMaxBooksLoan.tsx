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
import { updateMaxBookPerStudent, updateMaxBookPerTeacher } from "@/lib/data/configuration";
import { useLastConfig } from "@/services/queries";

const FormSchema = z.object({
  max_books_per_teacher: z.string().min(1, { message: "Entrez un nombre avec au moins 1 chiffres" }),
});


const TeacherMaxBooksLoan = ({max}: {max: number}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      max_books_per_teacher: max.toString() ,
    },
  });

  const {mutate} = useLastConfig();

  const submitForm = async (
    event: { preventDefault: () => void },
    max_books_per_teacher: number
  ) => {
    event.preventDefault();

    await updateMaxBookPerTeacher({max_books_per_teacher});
    mutate()
  };

  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    // console.log(values);
    submitForm(
      event,
      parseInt(values.max_books_per_teacher),
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
                name="max_books_per_teacher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre maximale de livre prêté par les Enseignant</FormLabel>
                    <FormControl>
                      <Input className="outline-none focus-visible:ring-ring w-full" type="number" placeholder="500" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ceci est le nombre maximale de livre qui peuvent faire l'objet d'un prêt par les enseignants.
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

export default TeacherMaxBooksLoan