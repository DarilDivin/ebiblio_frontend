"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Edit, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Cycle } from "@/types/cycle";
import { useState } from "react";
import { createCycle, editCycle } from "@/lib/data/cycle";
import { useCycle } from "@/services/queries";
import InputError from "@/components/InputError";

const FormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Entrez un nombre avec au moins 3 chiffres" }),
  code: z.string().min(1, { message: "Le code est requis" }),
});

const CycleForm = ({ cycle }: { cycle?: Cycle }) => {

  const { mutate } = useCycle();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: cycle ? cycle.name : '',
      code: cycle ? cycle.code : '',
    },
  });

  const submitCreateCycleForm = async (
    event: { preventDefault: () => void },
    name: string,
    code: string
  ) => {
    event.preventDefault();

    await createCycle({ name, code });
    mutate();
  };

  const submitEditCycleForm = async (
    event: { preventDefault: () => void },
    id: number,
    name: string,
    code: string
  ) => {
    event.preventDefault();

    await editCycle({ cycle: id, name, code });
    mutate();
  };

  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    cycle
      ? submitEditCycleForm(event, cycle.id, values.name, values.code)
      : submitCreateCycleForm(event, values.name, values.code);
  }

  return (
    <Dialog>
      {cycle ? (
        <DialogTrigger
          className="h-8 w-8 p-0 flex justify-center items-center text-orange-400/70 hover:bg-orange-400/20 hover:text-orange-400 rounded-md"
        >
          <span className="sr-only">Modifier un cycle</span>
          <Edit className="text-orange-400 h-4 w-4" />
        </DialogTrigger>
      ) : (
        <DialogTrigger className="inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 p-1 bg-primary/80 hover:bg-primary hover:text-white text-white">
          Nouveau <PlusCircle className="h-4 w-4" />
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{cycle ? "Modifier le cycle" : "Créer un cycle"}</DialogTitle>
        </DialogHeader>
        <div className="grid w-full items-center gap-1.5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary-foreground">Cycle</FormLabel>
                    <FormControl>
                      <Input
                        className="outline-none focus-visible:ring-ring w-full"
                        type="text"
                        placeholder="Libellé du cycle"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    {/* <InputError messages={errors.name} /> */}
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
                      <Input
                        className="outline-none focus-visible:ring-ring w-full"
                        type="text"
                        placeholder="Code du cycle"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    {/* <InputError messages={errors.code} /> */}
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-8">
                {cycle ? "Modifier" : "Créer"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CycleForm;
