import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Import } from "lucide-react";
import { importTeacher } from "@/lib/data/user";
import { useUser } from "@/services/queries";

const FormSchema = z.object({
  file_path:
    typeof window === "undefined"
      ? z.any()
      : z
          .instanceof(FileList)
          .refine((file) => file?.length == 1, "Le document est obligatoire."),
});

const ImportTeacherDialog = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate } = useUser()

  const submitForm = async (
    event: { preventDefault: () => void },
    file_path: File
  ) => {
    event.preventDefault();
    await importTeacher({file: file_path})
    mutate()
  };

  const onSubmit = (values: z.infer<typeof FormSchema>, event: any) => {
    submitForm(values.file_path[0], event);
  };

  const filePathRef = form.register("file_path");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Dialog>
            <DialogTrigger
              className="flex items-center gap-2 group bg-primary text-background/70 hover:border-primary hover:border-[1px] hover:bg-primary/0 hover:text-primary/70 justify-center p-2 rounded-md"
              asChild
            >
              <div>
                <span className="sr-only">
                  Importer les enseignants
                </span>
                <Import />
                <p>Enseignants</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Importer des Enseignants</DialogTitle>
                <DialogDescription>
                  Sélectionner un fichier Excel contenant les enseignants que
                  vous voulez ajouter
                </DialogDescription>
              </DialogHeader>

              {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="import-student">Fichier d'Enseignants</Label>
                <Input id="import-student" type="file" />
              </div> */}
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
                        <FormLabel>Fichier d'Enseignants</FormLabel>
                        <FormControl>
                          <Input
                            id="import-student"
                            type="file"
                            {...filePathRef}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent>
          <p>Importer les enseignants</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ImportTeacherDialog;
