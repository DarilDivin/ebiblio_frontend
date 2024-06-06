import { TabsContent } from "@/components/ui/tabs";
import { createSector, updateSector } from "@/lib/data/sector";
import { useSector } from "@/services/queries";
import { Sector, SectorSpecialityErrorType } from "@/types/sector";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputError from "@/components/InputError";


const FormSchema = z.object({
  name: z.string().min(1, {message: "Le nom est obligatoire"}),
  // type: z.string().min(1, {message: "Le type est obligatoire"}),
  acronym: z.string().min(1, {message: ""}),
  // sector_id: z.string().min(1, {message: ""}),
});
const SectorForm = ({ sector }: { sector?: Sector }) => {
  const [errors, setErrors] = useState<SectorSpecialityErrorType>({})
  const { mutate } = useSector()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: sector ? sector.name : '',
      acronym: sector ? sector.acronym : '',
    }
  })

  const submitCreateSectorForm = async (
    event: {preventDefault: () => void},
    name: string,
    type: string,
    acronym: string,
  ) => {
    event.preventDefault();

    await createSector({
      name, acronym, type, setErrors
    })
    mutate()
  }

  const submitEditSectorForm = async (
    event: { preventDefault: () => void },
    name: string,
    acronym: string,
    type: string,
    sector: number,
  ) => {
    event.preventDefault();

    await updateSector({sector, name, acronym, type, setErrors})
    mutate();
  }

  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    sector ? submitEditSectorForm(event, values.name, values.acronym, 'Filière', sector.id) :
    submitCreateSectorForm(event, values.name, 'Filière', values.acronym)  
    
  }
  return (
    <TabsContent value="sector">
      <div className="w-full">
        <Card className='bg-card'>
          <CardHeader>
            <CardTitle className='text-primary'>{sector ? 'Modifier la filière' : 'Créer une filière'}</CardTitle>
            <CardDescription>Veillez remplir les champs ci dessous</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-primary-foreground">Nom de la filière</FormLabel>
                      <FormControl>
                        <Input 
                          className="text-primary-foreground border-border focus-visible:ring-ring"
                          placeholder="Informatique de gestion"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                      <InputError messages={errors.name} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="acronym"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-primary-foreground">Acronyme</FormLabel>
                      <FormControl>
                        <Input 
                          className="text-primary-foreground border-border focus-visible:ring-ring"
                          placeholder="IG"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                      <InputError messages={errors.acronym} />
                    </FormItem>
                  )}
                />
                <Button type="submit" className='text-white mt-4' >Enregistrer</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};

export default SectorForm;
