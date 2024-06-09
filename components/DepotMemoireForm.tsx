"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { motion } from "framer-motion";
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
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import InputError from "./InputError";
import { ChevronsUpDown, LucideCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandList } from "cmdk";
import AuthSessionStatus from "@/app/(auth)/AuthSessionStatus";
import { supportedMemoireDeposit } from "@/lib/data/memories";
import { getAllSoutenance } from "@/lib/data/soutenance";
import { getAllFiliere } from "@/lib/data/sector";
import { DepotMemoireErrorType } from "@/types/memory";

const steps = [
  {
    id: "1",
    name: "Etudiant",
    fields: [
      "first_author_matricule",
      "first_author_firstname",
      "first_author_lastname",
      "first_author_email",
      "first_author_phone",
    ],
  },
  {
    id: "2",
    name: "Etudiant",
    fields: [
      "second_author_matricule",
      "second_author_secondname",
      "second_author_lastname",
      "second_author_email",
      "second_author_phone",
    ],
  },
  {
    id: "3",
    name: "Mémoire",
    fields: [
      "theme",
      "filiere",
      "soutenance_date",
      "soutenance_hour",
      "jury_president",
      "memory_master",
      "memory_year",
      "file_path",
      "cover_page_path",
    ],
  },
  { id: "4", name: "Terminé" },
];

const FormSchema = z.object({
  first_author_matricule: z
    .string()
    .min(1, "Le matricule est requis"),
  first_author_firstname: z.string().min(1, "Le prenom est requis"),
  first_author_lastname: z.string().min(1, "Le nom de famille est requis"),
  first_author_email: z
    .string()
    .min(1, "L'adresse mail est obligatoire")
    .email("L'adresse email est invalide"),
  first_author_phone: z.string().min(3, "Le numéro de téléphone est invalide"),

  second_author_matricule: z
    .string()
    .min(1, "Le matricule est requis"),
  second_author_firstname: z.string().min(1, "Le prenom est requis"),
  second_author_lastname: z.string().min(1, "Le nom de famille est requis"),
  second_author_email: z
    .string()
    .min(1, "L'adresse mail est obligatoire")
    .email("L'adresse email est invalide"),
  second_author_phone: z.string().min(3, "Le numéro de téléphone est invalide"),

  theme: z.string().min(3, "Le thème est obligatoire"),
  sector_id: z.string(),
  soutenance_id: z.string(),
  start_at: z.string(),
  ends_at: z.string(),
  jury_president_name: z
    .string()
    .min(1, "Le nom du président du jury est obligatoire"),
  memory_master_name: z.string().min(1, "Le nom du maitre de mémoire est obligatoire"),
  memory_master_email: z
    .string()
    .min(1, "l'addresse mail du maitre de mémoire est obligatoire")
    .email("L'adresse email est invalide"),
  file_path:
    typeof window === "undefined"
      ? z.any()
      : z
          .instanceof(FileList)
          .refine((file) => file?.length == 1, "Le document est obligatoire."),
  cover_page_path:
    typeof window === "undefined"
      ? z.any()
      : z
          .instanceof(FileList)
          .refine((file) => file?.length == 1, "La couverture est obligatoire."),
});

const DepotMemoireForm = () => {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const {soutenances} = getAllSoutenance();
  const {specialities} = getAllFiliere();

  const [errors, setErrors] = useState<DepotMemoireErrorType>({});
  const [status, setStatus] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      theme: "Le thème",
      start_at: "12:00",
      ends_at: "15:00",
      first_author_matricule: "14141414",
      first_author_firstname: "Divin",
      first_author_lastname: "Djk",
      first_author_email: "divindjk@gmail.com",
      first_author_phone: "12345678",
      second_author_matricule: "12121212",
      second_author_firstname: "Daril",
      second_author_lastname: "Djk",
      second_author_email: "divindjk@gmail.com",
      second_author_phone: "123456789",
      jury_president_name: "Comlan",
      memory_master_name: "Charbel",
      memory_master_email: "charbel@gmail.com",
      sector_id: "",
      soutenance_id: "3",
    },
  });

  const SubmitMemoireForm = (
    event: { preventDefault: () => void },
    theme: string,
    start_at: string,
    ends_at: string,
    first_author_matricule: string,
    first_author_firstname: string,
    first_author_lastname:string,
    first_author_email: string,
    first_author_phone: string,
    second_author_matricule: string,
    second_author_firstname: string,
    second_author_lastname: string,
    second_author_email: string,
    second_author_phone: string,
    jury_president_name: string,
    memory_master_name: string,
    memory_master_email: string,
    file_path: File,
    cover_page_path: File,
    sector_id: number,
    soutenance_id: number
  ) => {
    event.preventDefault();
    supportedMemoireDeposit({
      theme,
      start_at,
      ends_at,
      first_author_matricule,
      first_author_firstname,
      first_author_lastname,
      first_author_email,
      first_author_phone,
      second_author_matricule,
      second_author_firstname,
      second_author_lastname,
      second_author_email,
      second_author_phone,
      jury_president_name,
      memory_master_name,
      memory_master_email,
      file_path,
      cover_page_path,
      sector_id,
      soutenance_id,
      setErrors,
      setStatus,
    });
  };

  const onSubmit = (values: z.infer<typeof FormSchema>, event: any) => {
    SubmitMemoireForm(
      event,
      values.theme,
      values.start_at,
      values.ends_at,
      values.first_author_matricule,
      values.first_author_firstname,
      values.first_author_lastname,
      values.first_author_email,
      values.first_author_phone,
      values.second_author_matricule,
      values.second_author_firstname,
      values.second_author_lastname,
      values.second_author_email,
      values.second_author_phone,
      values.jury_president_name,
      values.memory_master_name,
      values.memory_master_email,
      values.file_path[0],
      values.cover_page_path[0],
      parseInt(values.sector_id),
      parseInt(values.soutenance_id)
    );
  };

  type FieldName = keyof z.infer<typeof FormSchema>;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 1) {
        await form.handleSubmit(onSubmit)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  const filePathRef = form.register("file_path");
  const coverPathRef = form.register("cover_page_path");

  return (
    <section className="w-full flex flex-col px-28 max-md:px-10">
      <AuthSessionStatus className={"mb-4"} status={status} />

      {/* steps */}
      <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base mb-8">
        {steps.map((step, index) => (
          <>
            {/* {console.log(step, index)} */}
            {currentStep > index ? (
              <li
                key={step.id}
                className="flex md:w-full items-center text-primary dark:text-primary/90 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
              >
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                  {step.name}{" "}
                  <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                </span>
              </li>
            ) : currentStep < index && index < steps.length - 1 ? (
              <li
                key={step.id}
                className="flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
              >
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  <span className="me-2">{step.id}</span>
                  {step.name}{" "}
                  <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                </span>
              </li>
            ) : currentStep === index && index === steps.length - 1 ? (
              <li
                key={step.id}
                className="flex md:w-full items-center text-primary dark:text-primary/90"
              >
                <span className="me-2">{step.id}</span>
                {step.name}
              </li>
            ) : currentStep === index ? (
              <li
                key={step.id}
                className="flex md:w-full items-center text-primary dark:text-primary/90 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700"
              >
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  <span className="me-2">{step.id}</span>
                  {step.name}{" "}
                  <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                </span>
              </li>
            ) : (
              <li key={step.id} className="flex md:w-full items-center ">
                <span className="me-2">{step.id}</span>
                {step.name}
              </li>
            )}
          </>
        ))}
      </ol>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>First Author Personal Information</CardTitle>
                  <CardDescription>
                    Provide your personal details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 mb-8">
                    <FormField
                      control={form.control}
                      name="first_author_matricule"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Matricule
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              type="number"
                              placeholder="1756389"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError
                            messages={errors.first_author_matricule}
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="first_author_firstname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Firstname
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              placeholder="John Doe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError
                            messages={errors.first_author_firstname}
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="first_author_lastname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Lastname
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              placeholder="John Doe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError messages={errors.first_author_lastname} />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 mb-8">
                    <FormField
                      control={form.control}
                      name="first_author_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              placeholder="John@doe.fr"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError messages={errors.first_author_email} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="first_author_phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              type="text"
                              placeholder="+22990909090"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError messages={errors.first_author_phone} />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Second Author Personal Information</CardTitle>
                  <CardDescription>
                    Provide your personal details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 mb-8">
                    <FormField
                      control={form.control}
                      name="second_author_matricule"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Matricule
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              type="number"
                              placeholder="1756389"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError
                            messages={errors.second_author_matricule}
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="second_author_firstname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Firstname
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              placeholder="John Doe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError
                            messages={errors.second_author_firstname}
                          />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="second_author_lastname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Lastname
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              placeholder="John Doe"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError
                            messages={errors.second_author_lastname}
                          />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 mb-8">
                    <FormField
                      control={form.control}
                      name="second_author_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              placeholder="John@doe.fr"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError messages={errors.second_author_email} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="second_author_phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              type="text"
                              placeholder="+22990909090"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError messages={errors.second_author_phone} />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Second Author Personal Information</CardTitle>
                  <CardDescription>
                    Provide your personal details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-[3fr_2fr] max-sm:grid-cols-1 gap-4 mb-8">
                    <FormField
                      control={form.control}
                      name="theme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Thème de soutenance
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              type="text"
                              placeholder="Reéalisation de ..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError messages={errors.theme} />
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
                                    ? specialities?.find(
                                        (specialitie) =>
                                          specialitie.id.toString() === field.value
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
                                <CommandEmpty>
                                  Aucune filiere trouvé.
                                </CommandEmpty>
                                <CommandGroup className="max-h-[300px] overflow-scroll">
                                  {specialities?.map((specialitie) => (
                                    <CommandList>
                                      <CommandItem
                                        value={specialitie.name}
                                        key={specialitie.id}
                                        onSelect={() => {
                                          form.setValue(
                                            "sector_id",
                                            specialitie.id.toString()
                                          );
                                        }}
                                      >
                                        {specialitie.name}
                                        <LucideCheck
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            specialitie.id.toString() ===
                                              field.value
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
                  </div>
                  <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 mb-8">
                    <FormField
                      control={form.control}
                      name="soutenance_id"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-center space-y-2">
                          <FormLabel className=" text-primary-foreground">
                            Soutenance
                          </FormLabel>
                          {/* <FormControl>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sélection votre soutenance" />
                              </SelectTrigger>
                              <SelectContent>
                                {soutenances?.map((soutenance, index) => (
                                  <SelectItem value={soutenance.id.toString()}>
                                    {soutenance.name}
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
                                    ? soutenances?.find(
                                        (soutenance) =>
                                          soutenance.id.toString() ===
                                          field.value
                                      )?.name
                                    : "Selectionner votre soutenance"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full lg:w-[500px] p-0">
                              <Command>
                                <CommandInput
                                  placeholder="Rechercher la soutenance"
                                  className="h-9"
                                />
                                <CommandEmpty>
                                  Aucune soutenance trouvé.
                                </CommandEmpty>
                                <CommandGroup className="max-h-[300px] overflow-scroll">
                                  {soutenances?.map((soutenance) => (
                                    <CommandList>
                                      <CommandItem
                                        value={soutenance.name}
                                        key={soutenance.id}
                                        onSelect={() => {
                                          form.setValue(
                                            "soutenance_id",
                                            soutenance.id.toString()
                                          );
                                        }}
                                      >
                                        {soutenance.name}
                                        <LucideCheck
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            soutenance.id.toString() ===
                                              field.value
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
                          <InputError messages={errors.soutenance_id} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="start_at"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Heure de début
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError messages={errors.start_at} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ends_at"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Heure de fin
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              type="time"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError messages={errors.ends_at} />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 mb-8">
                    <FormField
                      control={form.control}
                      name="jury_president_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Président du jury
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              type="text"
                              placeholder="Maurice Comlan"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError messages={errors.jury_president_name} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="memory_master_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Maitre mémoire
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              type="text"
                              placeholder="Maurice Comlan"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError messages={errors.memory_master_name} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="memory_master_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Maitre mémoire
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              type="email"
                              placeholder="Maurice Comlan"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError messages={errors.memory_master_email} />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 mb-8">
                    <FormField
                      control={form.control}
                      name="file_path"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Mémoire
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              type="file"
                              // {...register('file_path')}
                              {...filePathRef}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError messages={errors.file_path} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cover_page_path"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Page de garde
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              type="file"
                              // {...register('cover_page_path')}
                              {...coverPathRef}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError messages={errors.cover_page_path} />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Nous sommes à la fin</CardTitle>
                  <CardDescription>
                    Cliquez sur le bouton suivant pour soummettre votre mémoire.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button type="submit">Soummettre</Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Navigation */}
          <div className="mt-8 pt-5">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prev}
                disabled={currentStep === 0}
                className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                disabled={currentStep === steps.length - 1}
                className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default DepotMemoireForm;
