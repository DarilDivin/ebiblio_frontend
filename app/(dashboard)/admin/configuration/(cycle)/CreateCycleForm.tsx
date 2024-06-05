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

import { Edit, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(3, { message: "Entrez un nombre avec au moins 3 chiffres" }),
  code: z.string().min(1, { message: "Le code est requis"})
});

const CreateCycleForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '' ,
      code: '' ,
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger className="inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 p-1 bg-primary/80 hover:bg-primary hover:text-white text-white">
        Nouveau <PlusCircle className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer un cycle</DialogTitle>
        </DialogHeader>
        <div className="grid w-full items-center gap-1.5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cycle</FormLabel>
                    <FormControl>
                      <Input className="outline-none focus-visible:ring-ring w-full" type="text" placeholder="500" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      Ceci est le montant que nous prélèveront chaque fois qu'un étudiant aura un jour de retard sur la dtae de retour des livres empruntés.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input className="outline-none focus-visible:ring-ring w-full" type="text" placeholder="500" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      Ceci est le montant que nous prélèveront chaque fois qu'un étudiant aura un jour de retard sur la dtae de retour des livres empruntés.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-8">Modifier</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateCycleForm