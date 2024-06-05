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
import { updateEneaminanSubscribeAmount, updateSchoolCity, updateSchoolName } from "@/lib/data/configuration";
import { useLastConfig } from "@/services/queries";

const FormSchema = z.object({
  school_city: z
    .string()
    .min(1, { message: "Entrez un nombre avec au moins 1 caractère" }),
});

const SchoolCityForm = ({name}: {name: string}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      school_city: name,
    },
  });

  const {mutate} = useLastConfig();

  const submitForm = async (
    event: { preventDefault: () => void },
    school_city: string
  ) => {
    event.preventDefault();

    await updateSchoolCity({school_city});
    mutate()
  };

  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    // console.log(values);
    submitForm(
      event,
      values.school_city,
    )
  }

  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8 p-0 hover:bg-accent hover:text-accent-foreground">
        {/* <span className="sr-only">Open menu</span> */}
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
                name="school_city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Montant</FormLabel>
                    <FormControl>
                      <Input
                        className="outline-none focus-visible:ring-ring w-full"
                        type="text"
                        placeholder="Eneam"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Ceci est le nom de l'établissement
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-4">
                Modifier
              </Button>
            </form>
          </Form>
        </div>
        {/* <div className="w-full flex justify-end p-2 border-t">

        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default SchoolCityForm;
