import { TabsContent } from "@/components/ui/tabs";
import { createSector, getAllFiliere, updateSector } from "@/lib/data/sector";
import { useSector } from "@/services/queries";
import { Sector, SectorSpecialityErrorType } from "@/types/sector";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import InputError from "@/components/InputError";
import { ChevronsUpDown, LucideCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Le nom est obligatoire" }),
  // type: z.string().min(1, {message: "Le type est obligatoire"}),
  acronym: z.string().min(1, { message: "" }),
  sector_id: z.string().min(1, { message: "" }),
});

const SpecialityForm = ({ sector }: { sector?: Sector }) => {
  const [errors, setErrors] = useState<SectorSpecialityErrorType>({});
  const { sectors } = getAllFiliere();
  const { mutate } = useSector();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: sector ? sector.name : "",
      acronym: sector ? sector.acronym : "",
      sector_id: sector ? sector.sector?.id.toString() : "",
    },
  });

  const submitCreateSpecialityForm = async (
    event: { preventDefault: () => void },
    name: string,
    type: string,
    acronym: string,
    sector_id: number
  ) => {
    event.preventDefault();

    await createSector({
      name,
      acronym,
      type,
      sector_id,
      setErrors,
    });
    mutate();
  };

  const submitEditSpecialityForm = async (
    event: { preventDefault: () => void },
    name: string,
    acronym: string,
    type: string,
    sector: number,
    sector_id: number
  ) => {
    event.preventDefault();

    await updateSector({ sector, name, acronym, type, sector_id, setErrors });
    mutate();
  };

  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    sector
      ? submitEditSpecialityForm(
          event,
          values.name,
          values.acronym,
          "Spécialité",
          sector.id,
          parseInt(values.sector_id)
        )
      : submitCreateSpecialityForm(
          event,
          values.name,
          "Spécialité",
          values.acronym,
          parseInt(values.sector_id)
        );
  }
  return (
    <TabsContent value="speciality">
      <div className="w-full">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-primary">
              {sector ? "Modifier la spécialité" : "Créer une spécialité"}
            </CardTitle>
            <CardDescription>
              Veillez remplir les champs ci dessous
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-primary-foreground">
                        Nom de la filière
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-primary-foreground border-border focus-visible:ring-ring"
                          placeholder="Informatique de gestion"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <InputError messages={errors.name} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="acronym"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-primary-foreground">
                        Acronyme
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-primary-foreground border-border focus-visible:ring-ring"
                          placeholder="IG"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <InputError messages={errors.acronym} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sector_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-primary-foreground">
                        Filière
                      </FormLabel>
                      {/* <FormControl>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Filière" />
                              </SelectTrigger>
                              <SelectContent>
                                {filieres?.map((filiere, index) => (
                                  <SelectItem value={filiere.id.toString()} key={filiere.id}>
                                    {filiere.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl> */}
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
                                ? sectors?.find(
                                    (sector) =>
                                      sector.id.toString() === field.value
                                  )?.name
                                : "Selectionner votre filiere"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full lg:w-[500px] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Rechercher la filiere"
                              className="h-9"
                            />
                            <CommandEmpty>Aucune filiere trouvé.</CommandEmpty>
                            <CommandGroup className="max-h-[300px] overflow-scroll">
                              {sectors?.map((sector) => (
                                <CommandList>
                                  <CommandItem
                                    value={sector.name}
                                    key={sector.id}
                                    onSelect={() => {
                                      form.setValue(
                                        "sector_id",
                                        sector.id.toString()
                                      );
                                    }}
                                  >
                                    {sector.name}
                                    <LucideCheck
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        sector.id.toString() === field.value
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
                      <InputError messages={errors.sector_id} />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="text-white mt-4">
                  Enregistrer
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};

export default SpecialityForm;
