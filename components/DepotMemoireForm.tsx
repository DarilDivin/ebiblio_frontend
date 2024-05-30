"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import InputError from "./InputError";
import { DepotMemoireErrorType } from "@/types";
import Link from "next/link";
import { DatePicker } from "./ui/date-picker";

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
  { id: "4", name: "Terminé" }
];

const filieres = [
  {id: "1", name: 'Informatique de gestion 1'},
  {id: "2", name: 'Informatique de gestion 2'},
  {id: "3", name: 'Analyse Informatique et Programmation'},
  {id: "4", name: 'Administration des Réseaux Informatique'},
  {id: "5", name: 'Planification 1'},
  {id: "6", name: 'Planification 2'},
  {id: "7", name: 'Statistique 1'}
]

const FormSchema = z.object({
  first_author_matricule: z
    .string()
    .length(8, "Matricule is required and has exactly 6 numbers"),
  first_author_firstname: z.string().min(1, "First name is required"),
  first_author_lastname: z.string().min(1, "Last name is required"),
  first_author_email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  first_author_phone: z.string().length(8, "Invalid cell phone number"),

  second_author_matricule: z
    .string()
    .length(8, "Matricule is required and has exactly 6 numbers"),
  second_author_firstname: z.string().min(1, "First name is required"),
  second_author_lastname: z.string().min(1, "Last name is required"),
  second_author_email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  second_author_phone: z.string().length(8, "Invalid cell phone number"),

  theme: z.string().min(3, "Thème is required"),
  filiere: z.string(),
  soutenance_date: z.string().min(1, "Soutenance date is required"),
  soutenance_hour: z.string().min(1, "Soutenance hour is required"),
  jury_president: z.string().min(1, "Jury President is required is required"),
  memory_master: z.string().min(1, "Memory master is required"),
  memory_year: z.string().min(1, "Memory year is required"),
  file_path: z.string().min(1, "Document is required"),
  cover_page_path: z.string().min(1, "Cover page is required"),
});

const DepotMemoireForm = () => {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const [errors, setErrors] = useState<DepotMemoireErrorType>({});

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = (data) => {
    console.log(data);
    form.reset();
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

  return (
    <section className="w-full flex flex-col px-28 max-md:px-10">
      {/* steps */}
      <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base mb-8">
        {steps.map((step, index) => (
          <>
            {console.log(step, index)}
            {currentStep > index ? (
              <li className="flex md:w-full items-center text-primary dark:text-primary/90 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
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
              <li className="flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  <span className="me-2">{step.id}</span>
                  {step.name}{" "}
                  <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                </span>
              </li>
            ) : currentStep === index && index === steps.length - 1 ? (
              <li className="flex md:w-full items-center text-primary dark:text-primary/90">
                <span className="me-2">{step.id}</span>
                {step.name}
              </li>
            ) : currentStep === index ? (
              <li className="flex md:w-full items-center text-primary dark:text-primary/90 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                  <span className="me-2">{step.id}</span>
                  {step.name}{" "}
                  <span className="hidden sm:inline-flex sm:ms-2">Info</span>
                </span>
              </li>
            ) : (
              <li className="flex md:w-full items-center ">
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
              <Card>
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
                              type="number"
                              placeholder="90909090"
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
                              type="number"
                              placeholder="90909090"
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
                      name="filiere"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Filière
                          </FormLabel>
                          <FormControl>
                            <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Filière" />
                            </SelectTrigger>
                            <SelectContent>
                              {filieres.map((filiere, index) =>(
                                <SelectItem value={filiere.id}>{filiere.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          </FormControl>
                          <FormMessage />
                          <InputError messages={errors.filiere} />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-4 mb-8">
                    <FormField
                      control={form.control}
                      name="memory_year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Année de soutenance
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError messages={errors.memory_year} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="soutenance_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Date de soutenance
                          </FormLabel>
                          <FormControl>
                            {/* <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              type="date"
                              {...field}
                            /> */}
                            <DatePicker />
                          </FormControl>
                          <FormMessage />
                          <InputError messages={errors.soutenance_date} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="soutenance_hour"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-primary-foreground">
                            Heure de soutenance
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="text-primary-foreground border-border focus-visible:ring-ring"
                              type="time"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError messages={errors.soutenance_hour} />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 mb-8">
                    <FormField
                      control={form.control}
                      name="jury_president"
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
                          <InputError messages={errors.jury_president} />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="memory_master"
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
                          <InputError messages={errors.memory_master} />
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
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <InputError messages={errors.file_path} />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter></CardFooter>
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
