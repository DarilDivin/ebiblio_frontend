"use client";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronsUpDown, LucideCheck } from "lucide-react";
import { CommandList } from "cmdk";
import { createBook } from "@/lib/data/book";
import { getAllSchoolYear } from "@/lib/data/schoolyear";
import { useBook } from "@/services/queries";
import { Book, CreateBookErrorType } from "@/types/book";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import InputError from "./InputError";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import TomSelectComponent from "./TomSelect";

const FormSchema = z.object({
  title: z.string().min(1, "Le titre du livre est obligatoire"),
  author: z.string().min(1, "L'auteur du livre est obligatoire"),
  number_pages: z.string().min(1, "Le nombre de pages est obligatoire"),
  summary: z.string().min(1, "Un résumé est requis"),
  editor: z.string().min(1, "Léditeur du livre est obligatoire"),
  editing_year: z.string().min(1, "Lannée d'édition est obligatoire"),
  ISBN: z.string().min(1, "IBSN requis"),
  cote: z.string().min(1, "La cote est obligatoire"),
  school_year_id: z.string(),
  is_physical: z.boolean(),
  has_ebooks: z.boolean(),
  keywords: z.array(z.string()),
  available_stock: z.string().min(1, "Le stock est requis"),
  file_path:
    typeof window === "undefined"
      ? z.any()
      : z
          .instanceof(FileList)
          .refine((file) => file?.length == 1, "Le document est obligatoire."),
});
const BookForm = ({ book }: { book?: Book }) => {
  const schoolyears = getAllSchoolYear();
  const [errors, setErrors] = useState<CreateBookErrorType>({});
  const [status, setStatus] = useState<string | null>(null);
  const { mutate } = useBook();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "Livre de Daril",
      author: "Daril Djk",
      number_pages: "150",
      summary: "Le long résumé",
      editor: "Divin's Edition",
      editing_year: "2017",
      ISBN: "OU845IRC394705059708928",
      cote: "125/15/489",
      keywords: ["livre", "Daril", "Djk"],
      available_stock: "2",
    },
  });

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelectChange = (values: string[]) => {
    setSelectedOptions(values);
  };

  const hasEbooks = form.watch("has_ebooks");
  const isPhysical = form.watch("is_physical");

  const submitCreateBookForm = async (
    event: { preventDefault: () => void },
    title: string,
    author: string,
    number_pages: number,
    summary: string,
    editor: string,
    editing_year: string,
    ISBN: string,
    cote: string,
    keywords: string[],
    is_physical: number,
    has_ebooks: number,
    available_stock: number,
    file_path: File,
    school_year_id: number
  ) => {
    event.preventDefault();
    await createBook({
      title,
      author,
      number_pages,
      summary,
      editor,
      editing_year,
      ISBN,
      cote,
      keywords,
      is_physical,
      has_ebooks,
      available_stock,
      file_path,
      school_year_id,
      setStatus,
      setErrors,
    });

    mutate();
  };

  const submitUpdateBookForm = async () => {
    mutate();
  };

  const onSubmit = (values: z.infer<typeof FormSchema>, event: any) => {
    console.log(values);
    book
      ? submitUpdateBookForm()
      : submitCreateBookForm(
          event,
          values.title,
          values.author,
          parseInt(values.number_pages),
          values.summary,
          values.editor,
          values.editing_year,
          values.ISBN,
          values.cote,
          values.keywords,
          values.is_physical ? 1 : 0,
          values.has_ebooks ? 1 : 0,
          parseInt(values.available_stock),
          values.file_path[0],
          parseInt(values.school_year_id)
        );
  };

  const filePathRef = form.register("file_path");

  return (
    <Dialog>
      {book ? (
        <DialogTrigger
          onClick={() => console.log(book)}
          className="h-8 w-8 p-0 flex justify-center items-center text-orange-400/70 hover:bg-orange-400/20 hover:text-orange-400 rounded-md"
        >
          <span className="sr-only">Modifier le Livre</span>
          <Edit className="text-orange-400 h-4 w-4" />
        </DialogTrigger>
      ) : (
        <DialogTrigger className="inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 p-1 bg-primary/80 hover:bg-primary hover:text-white text-white">
          Nouveau <PlusCircle className="h-4 w-4" />
        </DialogTrigger>
      )}
      <DialogContent className=" sm:max-w-[700px] lg:max-w-[1100px]">
        <DialogHeader>
          <DialogTitle>
            {book ? "Modifier le livre" : "Ajouter un livre"}
          </DialogTitle>
          <DialogDescription>
            Renseignez les champs pour complèter votre action
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-[3fr_2fr] max-sm:grid-cols-1 gap-4 mb-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-primary-foreground">
                      Titre du Livre
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-primary-foreground border-border focus-visible:ring-ring"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <InputError messages={errors.title} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-primary-foreground">
                      Auteur
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-primary-foreground border-border focus-visible:ring-ring"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <InputError messages={errors.author} />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 mb-8">
              <FormField
                control={form.control}
                name="number_pages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-primary-foreground">
                      Nombre de page
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-primary-foreground border-border focus-visible:ring-ring"
                        type="number"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <InputError messages={errors.number_pages} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="editor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-primary-foreground">
                      Editeur
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-primary-foreground border-border focus-visible:ring-ring"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <InputError messages={errors.author} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="editing_year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-primary-foreground">
                      Année d'édition
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-primary-foreground border-border focus-visible:ring-ring"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <InputError messages={errors.editing_year} />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 mb-8">
              <FormField
                control={form.control}
                name="ISBN"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-primary-foreground">
                      ISBN
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-primary-foreground border-border focus-visible:ring-ring"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <InputError messages={errors.ISBN} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" text-primary-foreground">
                      Cote du Livre
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-primary-foreground border-border focus-visible:ring-ring"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <InputError messages={errors.cote} />
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
                    {/* <FormControl> */}
                    {/* <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full text-primary-foreground border-border focus-visible:ring-ring">
                          <SelectValue placeholder="Select a timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>North America</SelectLabel>
                            <SelectItem value="est">
                              Eastern Standard Time (EST)
                            </SelectItem>
                            <SelectItem value="cst">
                              Central Standard Time (CST)
                            </SelectItem>
                            <SelectItem value="mst">
                              Mountain Standard Time (MST)
                            </SelectItem>
                            <SelectItem value="pst">
                              Pacific Standard Time (PST)
                            </SelectItem>
                            <SelectItem value="akst">
                              Alaska Standard Time (AKST)
                            </SelectItem>
                            <SelectItem value="hst">
                              Hawaii Standard Time (HST)
                            </SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Europe & Africa</SelectLabel>
                            <SelectItem value="gmt">
                              Greenwich Mean Time (GMT)
                            </SelectItem>
                            <SelectItem value="cet">
                              Central European Time (CET)
                            </SelectItem>
                            <SelectItem value="eet">
                              Eastern European Time (EET)
                            </SelectItem>
                            <SelectItem value="west">
                              Western European Summer Time (WEST)
                            </SelectItem>
                            <SelectItem value="cat">
                              Central Africa Time (CAT)
                            </SelectItem>
                            <SelectItem value="eat">
                              East Africa Time (EAT)
                            </SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Asia</SelectLabel>
                            <SelectItem value="msk">
                              Moscow Time (MSK)
                            </SelectItem>
                            <SelectItem value="ist">
                              India Standard Time (IST)
                            </SelectItem>
                            <SelectItem value="cst_china">
                              China Standard Time (CST)
                            </SelectItem>
                            <SelectItem value="jst">
                              Japan Standard Time (JST)
                            </SelectItem>
                            <SelectItem value="kst">
                              Korea Standard Time (KST)
                            </SelectItem>
                            <SelectItem value="ist_indonesia">
                              Indonesia Central Standard Time (WITA)
                            </SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Australia & Pacific</SelectLabel>
                            <SelectItem value="awst">
                              Australian Western Standard Time (AWST)
                            </SelectItem>
                            <SelectItem value="acst">
                              Australian Central Standard Time (ACST)
                            </SelectItem>
                            <SelectItem value="aest">
                              Australian Eastern Standard Time (AEST)
                            </SelectItem>
                            <SelectItem value="nzst">
                              New Zealand Standard Time (NZST)
                            </SelectItem>
                            <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>South America</SelectLabel>
                            <SelectItem value="art">
                              Argentina Time (ART)
                            </SelectItem>
                            <SelectItem value="bot">
                              Bolivia Time (BOT)
                            </SelectItem>
                            <SelectItem value="brt">
                              Brasilia Time (BRT)
                            </SelectItem>
                            <SelectItem value="clt">
                              Chile Standard Time (CLT)
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select> */}
                    {/* </FormControl> */}
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
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="is_physical"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      {/* <select ref={selectRef} defaultValue={value}>
                        {options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select> */}
                      <div className="">
                        <TomSelectComponent
                          options={options}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 mb-8">
              <FormField
                control={form.control}
                name="is_physical"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-secondary"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Est disponible en physique</FormLabel>
                      <FormDescription>
                        Sélectionner si le document est disponible en version
                        physique.
                      </FormDescription>
                    </div>
                    <InputError messages={errors.is_physical} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="has_ebooks"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-secondary"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Est disponible en ebook</FormLabel>
                      <FormDescription>
                        Sélectionner si le document est disponible en version
                        ebook.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-[4fr_2fr] max-sm:grid-cols-1 gap-4 mb-8">
              {hasEbooks && (
                <FormField
                  control={form.control}
                  name="file_path"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-primary-foreground">
                        Document
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-primary-foreground border-border focus-visible:ring-ring"
                          type="file"
                          // {...field}
                          {...filePathRef}
                        />
                      </FormControl>
                      <FormMessage />
                      <InputError messages={errors.file_path} />
                    </FormItem>
                  )}
                />
              )}

              {isPhysical && (
                <FormField
                  control={form.control}
                  name="available_stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-primary-foreground">
                        Stock
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-primary-foreground border-border focus-visible:ring-ring"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <InputError messages={errors.available_stock} />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <Button type="submit" className="text-white mt-4">
              Enregistrer
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookForm;
