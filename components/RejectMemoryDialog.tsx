import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { rejectMemory } from "@/lib/data/memories";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FileX2 } from "lucide-react";
import { useMemory } from "@/services/queries";

const FormSchema = z.object({
  reason: z.string(),
});

const RejectMemoryDialog = ({ idmemory }: { idmemory: number }) => {

  const { mutate } = useMemory();

  const submitForm = async (
    event: { preventDefault: () => void },
    reason: string
  ) => {
    event.preventDefault();

    await rejectMemory({ supportedMemory: idmemory, reason: reason });
    mutate();
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reason: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    console.log(values.reason);
    submitForm(event, values.reason);
  }

  return (
    <Dialog>
      <DialogTrigger className="text-destructive/70 hover:bg-destructive/20 hover:text-destructive h-8 w-8 flex justify-center items-center p-1 rounded-md">
        <span className="sr-only">Rejeter le mémoire</span> 
        <FileX2 className="text-destructive h-4 w-4"/>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Êtes vous sûre de vouloir rejeter ce mémoire ??
          </DialogTitle>
          <DialogDescription>
            En rejetant ce mémoire, les auteurs seront notifiés par mail que
            leur mémoire à été rejeté et verront la raison pour laquelle ceci à
            été fait
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-primary-foreground">
                    Raison
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-primary-foreground mb-8 focus-visible:ring-ring"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={"destructive"} type="submit" className="text-input mt-8">
              Rejeter
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RejectMemoryDialog;
