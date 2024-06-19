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
import { ChevronsUpDown, LucideCheck } from "lucide-react";
import { CommandList } from "cmdk";
import { createBook, updateBook } from "@/lib/data/book";
import { getAllSchoolYear } from "@/lib/data/schoolyear";
import { useBook } from "@/services/queries";
import { Book, CreateBookErrorType, SingleBook } from "@/types/book";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, PlusCircle } from "lucide-react";
import {  useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import InputError from "./InputError";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import CreatableSelect from "react-select/creatable";
import { getAllKeywords } from "@/lib/data/keyword";
import { MultiValue } from "react-select";

const FormSchema = z
  .object({
    title: z.string().min(1, "Le titre du livre est obligatoire"),
    author: z.string().min(1, "L'auteur du livre est obligatoire"),
    number_pages: z.string().min(1, "Le nombre de pages est obligatoire"),
    summary: z.string().min(1, "Un résumé est requis"),
    editor: z.string().min(1, "Léditeur du livre est obligatoire"),
    editing_year: z.string().min(1, "Lannée d'édition est obligatoire"),
    ISBN: z.string().min(1, "ISBN requis"),
    cote: z.string().min(1, "La cote est obligatoire"),
    school_year_id: z.string(),
    is_physical: z.boolean().optional(),
    has_ebooks: z.boolean().optional(),
    keywords: z.array(z.string()).optional(),
    available_stock: z.string().min(1, "Le stock est requis").optional(),
    file_path:
      typeof window === "undefined"
        ? z.any()
        : z
            .instanceof(FileList)
            .refine((file) => file?.length == 1, "Le document est obligatoire.")
            .optional(),
  })
  .superRefine((data, ctx) => {
    // Validation conditionnelle: `file_path` est requis si `has_ebooks` est `true`
    if (data.has_ebooks === true && !data.file_path) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Le fichier numérique du livre est requis",
        path: ["file_path"],
      });
    }
    // Validation conditionnelle: `available_stock` est requis si `is_physical` est `true`
    if (data.is_physical === true && !data.available_stock) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Details is required when status is active",
        path: ["available_stock"],
      });
    }
  });

interface Option {
  value: string;
  label: string;
  __isNew__?: boolean;
}

const BookForm = ({ book }: { book?: Book }) => {

  // console.log(book);
  const schoolyears = getAllSchoolYear();
  const [errors, setErrors] = useState<CreateBookErrorType>({});
  const [status, setStatus] = useState<string | null>(null);

  const oldSelectedValues = book
    ? book?.keywords?.map(keyword => ({ label: keyword.keyword, value: keyword.keyword }))
    : [{ value: "Eneam", label: "Eneam" }];

  const [selectedOption, setSelectedOption] = useState(oldSelectedValues);

  // console.log(`Old Option selected:`, oldSelectedValues);
  // console.log(`Option selected:`, selectedOption);

  const { mutate } = useBook();
  const { keywordValues } = getAllKeywords();

  const options = keywordValues?.map((keyword) => ({
    label: keyword,
    value: keyword,
  }));
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: book ? book.title : "Livre de Daril",
      author: book ? book.author : "Daril Djk",
      number_pages: book ? book.number_pages.toString() : "150",
      summary: book ? book.summary : "Le long résumé",
      editor: book ? book.editor : "Divin's Edition",
      editing_year: book ? book.editing_year : "2017",
      ISBN: book ? book.ISBN : "OU845IRC394705059708928",
      cote: book ? book.cote : "125/15/489",
      school_year_id: book ? book.school_year.id.toString() : "",

      available_stock: book ? book.available_stock !== null ? book.available_stock : '0' : '0',
    },
  });

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
    school_year_id: number,
    available_stock?: number,
    file_path?: File
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

  const submitUpdateBookForm = async (
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
    school_year_id: number,
    article: number,
    available_stock?: number,
    file_path?: File
  ) => {
    event.preventDefault();
    await updateBook({
      article,
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

  const onSubmit = (values: z.infer<typeof FormSchema>, event: any) => {
    const selectedValues = selectedOption?.map((option) => option.value);
    book
      ? submitUpdateBookForm(
          event,
          values.title,
          values.author,
          parseInt(values.number_pages),
          values.summary,
          values.editor,
          values.editing_year,
          values.ISBN,
          values.cote,
          selectedValues,
          values.is_physical ? 1 : 0,
          values.has_ebooks ? 1 : 0,
          parseInt(values.school_year_id),
          book.id,
          values.available_stock ? parseInt(values.available_stock) : undefined,
          values.file_path ? values.file_path[0] : undefined
        )
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
          selectedValues,
          values.is_physical ? 1 : 0,
          values.has_ebooks ? 1 : 0,
          parseInt(values.school_year_id),
          values.available_stock ? parseInt(values.available_stock) : undefined,
          values.file_path ? values.file_path[0] : undefined
        );
  };

  const filePathRef = form.register("file_path");
  const keywordsRef = form.register("keywords");

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
                    <FormLabel className=" ">
                      Titre du Livre
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="focus-visible:ring-ring"
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
                    <FormLabel className=" ">
                      Auteur
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=" border-border focus-visible:ring-ring"
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
                    <FormLabel className=" ">
                      Nombre de page
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=" border-border focus-visible:ring-ring"
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
                    <FormLabel className=" ">
                      Editeur
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=" border-border focus-visible:ring-ring"
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
                    <FormLabel className=" ">
                      Année d'édition
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=" border-border focus-visible:ring-ring"
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
                    <FormLabel className=" ">
                      ISBN
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=" border-border focus-visible:ring-ring"
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
                    <FormLabel className=" ">
                      Cote du Livre
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=" border-border focus-visible:ring-ring"
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
                    <FormLabel className=" ">
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
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=" ">
                      Mots clés
                    </FormLabel>
                    <FormControl>
                      <CreatableSelect
                        className="w-full "
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                        isMulti
                      />
                    </FormControl>
                    <FormMessage />
                    <InputError messages={errors.keywords} />
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
                      <FormLabel className=" ">
                        Document
                      </FormLabel>
                      <FormControl>
                        <Input
                          className=" border-border focus-visible:ring-ring"
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
                      <FormLabel className=" ">
                        Stock
                      </FormLabel>
                      <FormControl>
                        <Input
                          className=" border-border focus-visible:ring-ring"
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
