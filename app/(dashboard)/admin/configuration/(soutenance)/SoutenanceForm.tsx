import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ChevronsUpDown, LucideCheck } from "lucide-react";
import { CommandList } from "cmdk";
import { Input } from "@/components/ui/input";

import { createSoutenance, updateSoutenance } from "@/lib/data/soutenance";
import { useSoutenance } from "@/services/queries";
import { CreateSoutenanceErrorType, Soutenance } from "@/types/soutenance";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Edit, PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { getAllCycle } from "@/lib/data/cycle";
import InputError from "@/components/InputError";
import { getAllSchoolYear } from "@/lib/data/schoolyear";

const FormSchema = z.object({
  start_date: z.date(),
  end_date: z.date(),
  number_memories_expected: z
    .string()
    .min(1, { message: "Le nombre de mémoire espéré est indispensable" }),
  cycle_id: z.string(),
  school_year_id: z.string(),
});
const SoutenanceForm = ({ soutenance }: { soutenance?: Soutenance }) => {
  const [errors, setErrors] = useState<CreateSoutenanceErrorType>({});
  const { mutate } = useSoutenance();
  const schoolyears = getAllSchoolYear();
  const { cycles } = getAllCycle();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      start_date: soutenance ? new Date(soutenance.start_date) : undefined,
      end_date: soutenance ? new Date(soutenance.end_date) : undefined,
      number_memories_expected: soutenance
        ? soutenance.number_memories_expected.toString()
        : "",
      cycle_id: soutenance ? soutenance.cycle.id.toString() : "",
      school_year_id: soutenance ? soutenance.school_year.id.toString() : "",
    },
  });

  const submitCreateSoutenanceForm = async (
    event: { preventDefault: () => void },
    start_date: string,
    end_date: string,
    number_memories_expected: number,
    cycle_id: number,
    school_year_id: number,
  ) => {
    event.preventDefault();

    await createSoutenance({
      start_date,
      end_date,
      number_memories_expected,
      cycle_id,
      school_year_id,
      setErrors,
    });
    mutate();
  };

  const submitEditSoutenanceForm = async (
    event: { preventDefault: () => void },
    start_date: string,
    end_date: string,
    number_memories_expected: number,
    cycle_id: number,
    school_year_id: number,
    soutenance: number
  ) => {
    event.preventDefault();

    await updateSoutenance({
      soutenance: soutenance,
      start_date,
      end_date,
      number_memories_expected,
      cycle_id,
      school_year_id,

      setErrors,
    });
    mutate();
  };

  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    console.log(
      format(values.start_date, "yyyy-MM-dd"),
      format(values.end_date, "yyyy-MM-dd"),
      parseInt(values.number_memories_expected),
      parseInt(values.cycle_id)
    );
    soutenance
      ? submitEditSoutenanceForm(
          event,
          format(values.start_date, "yyyy-MM-dd"),
          format(values.end_date, "yyyy-MM-dd"),
          parseInt(values.number_memories_expected),
          parseInt(values.cycle_id),
          parseInt(values.school_year_id),
          soutenance.id
        )
      : submitCreateSoutenanceForm(
          event,
          format(values.start_date, "yyyy-MM-dd"),
          format(values.end_date, "yyyy-MM-dd"),
          parseInt(values.number_memories_expected),
          parseInt(values.cycle_id),
          parseInt(values.school_year_id),
        );
  }
  return (
    <Dialog>
      {soutenance ? (
        <DialogTrigger
          onClick={() => console.log(soutenance)}
          className="h-8 w-8 p-0 flex justify-center items-center text-orange-400/70 hover:bg-orange-400/20 hover:text-orange-400 rounded-md"
        >
          <span className="sr-only">Modifier une soutenance</span>
          <Edit className="text-orange-400 h-4 w-4" />
        </DialogTrigger>
      ) : (
        <DialogTrigger className="inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 p-1 bg-primary/80 hover:bg-primary hover:text-white text-white">
          Nouveau <PlusCircle className="h-4 w-4" />
        </DialogTrigger>
      )}
      {/* <DialogTrigger className="inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 p-1 bg-primary/80 hover:bg-primary hover:text-white text-white">
      Nouveau <PlusCircle className="h-4 w-4" />
    </DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer un soutenance</DialogTitle>
        </DialogHeader>
        <div className="grid w-full items-center gap-1.5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date de début</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarDays className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP", { locale: fr })
                          ) : (
                            <span>Sélectionner une date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                    <InputError messages={errors.start_date} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date de fin</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarDays className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP", { locale: fr })
                          ) : (
                            <span>Sélectionner un date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                    <InputError messages={errors.end_date} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="number_memories_expected"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de mémoire espéré</FormLabel>
                    <FormControl>
                      <Input
                        className="outline-none focus-visible:ring-ring w-full"
                        type="number"
                        min={0}
                        placeholder="500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <InputError messages={errors.number_memories_expected} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cycle_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cycle</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="focus:ring-ring">
                          <SelectValue placeholder="Selectionner un cycle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cycles?.map((cycle) => (
                          <SelectItem key={cycle.id} value={cycle.id.toString()}>
                            {cycle.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                    <InputError messages={errors.cycle_id} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="school_year_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-primary-foreground">
                      Année scolaire
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? schoolyears?.find(
                                  (schoolyear) =>
                                    schoolyear.id.toString() === field.value
                                )?.school_year
                              : "Selectionner l'année scolaire"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full lg:w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Rechercher l'année scolaire"
                            className="h-9"
                          />
                          <CommandEmpty>
                            Aucune année scolaire trouvée.
                          </CommandEmpty>
                          <CommandGroup className="max-h-[300px] overflow-scroll">
                            {schoolyears?.map((schoolyear) => (
                              <CommandList>
                                <CommandItem
                                  value={schoolyear.school_year}
                                  key={schoolyear.id}
                                  onSelect={() => {
                                    form.setValue(
                                      "school_year_id",
                                      schoolyear.id.toString()
                                    );
                                  }}
                                >
                                  {schoolyear.school_year}
                                  <LucideCheck
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      schoolyear.id.toString() === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              </CommandList>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                    <InputError messages={errors.school_year_id} />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-8">
                {soutenance ? "Modifier" : "Créer"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SoutenanceForm;
