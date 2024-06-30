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
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  file_path:
    typeof window === "undefined"
      ? z.any()
      : z
          .instanceof(FileList)
          .refine((file) => file?.length == 1, "Le document est obligatoire."),
})

const ImportStudentDialog = () => {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const submitForm = (
    event: { preventDefault: () => void },
    file_path: File,
  ) => {
    event.preventDefault();
  }

  const onSubmit = (values: z.infer<typeof FormSchema>, event: any) => {
    submitForm(values.file_path[0], event)
  }

  const filePathRef = form.register('file_path')

  return (
    <Dialog>
      <DialogTrigger>Importer des Etudiants</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Importer des Etudiants</DialogTitle>
          <DialogDescription>
            Sélectionner un fichier Excel contenant les étudiants que vous
            voulez ajouter
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="file_path"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fichier d'étudiants</FormLabel>
                  <FormControl>
                    <Input id="import-student" type="file" {...filePathRef} />
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

export default ImportStudentDialog;
