"use client";

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputError from "./InputError";
import AuthSessionStatus from "@/app/(auth)/AuthSessionStatus";
import { useAuth } from "@/hooks/auth";
import { RegisterErrorType, UpdateProfileErrorType } from "@/types";
import { User } from "@/types/user";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { fr } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const FormSchema = z.object({
  firstname: z
    .string()
    .min(1, {
      message: "Le prénom est requis.",
    })
    .max(50),
  lastname: z
    .string()
    .min(1, {
      message: "Le nom de famille est requis.",
    })
    .max(50),
  email: z.string().email({ message: "Adresse email invalide" }),
  phone_number: z.string().min(1, "Le numéro de téléphone est invalide"),
  birth_date: z.string(),
  sex: z.string(),
});

const UpdateProfile = ({ user }: { user: User }) => {
  // const values: {
  //   firstname: string | undefined,
  //   lastname: string | undefined,
  //   email: string | undefined
  // } = {
  //   firstname: user?.name,
  //   lastname: "CAPO CHICHI",
  //   email: user?.email
  // }

  const { updateProfile } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: "/settings",
  });

  const [errors, setErrors] = useState<UpdateProfileErrorType>({});
  const [status, setStatus] = useState<string | null>(null);

  const submitForm = (
    event: { preventDefault: () => void },
    firstname: string,
    lastname: string,
    email: string,
    phone_number: string,
    birth_date: string,
    sex: string
  ) => {
    event.preventDefault();

    updateProfile({
      firstname,
      lastname,
      email,
      phone_number,
      birth_date,
      sex,
      setErrors,
      setStatus,
    });
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: user ? user.firstname : "",
      lastname: user ? user.lastname : "",
      email: user ? user.email : "",
      phone_number: user ? (user.phone_number ? user.phone_number : "") : "",
      birth_date: user ? (user.birth_date ? user.birth_date : "") : "",
      sex: user ? (user.sex ? user.sex : "Masculin") : "Masculin",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    submitForm(
      event,
      values.firstname,
      values.lastname,
      values.email,
      values.phone_number,
      format(values.birth_date, "yyyy-MM-dd"),
      values.sex
    );
    console.log(values.firstname, values.lastname, values.email);
  }

  return (
    <div id="update_profile">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-primary">Profile</CardTitle>
          <CardDescription>
            Vous pouvez modifier les informations de profile de votre compte.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthSessionStatus className={"mb-4"} status={status} />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 w-full">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-foreground">
                        Prénoms
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-foreground border-border focus-visible:ring-ring"
                          placeholder="John Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <InputError messages={errors.firstname} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-foreground">
                        Nom de Famille
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-foreground border-border focus-visible:ring-ring"
                          placeholder="John Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <InputError messages={errors.lastname} />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-foreground">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-foreground focus-visible:ring-ring"
                          placeholder="email@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <InputError messages={errors.email} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-foreground">
                        Numéro de téléphone
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-foreground border-border focus-visible:ring-ring"
                          placeholder="+229 96969696"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <InputError messages={errors.phone_number} />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 w-full">
                <FormField
                  control={form.control}
                  name="birth_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-foreground">
                        Date de naissance
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-foreground border-border focus-visible:ring-ring"
                          placeholder=""
                          type="date"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <InputError messages={errors.birth_date} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-foreground">
                        Date de naissance
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="focus:ring-ring">
                            <SelectValue placeholder="Selectionner votre sex" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Masculin">Masculin</SelectItem>
                          <SelectItem value="Féminin">Féminin</SelectItem>
                          <SelectItem value="Autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                      <InputError messages={errors.sex} />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="text-white mt-4">
                Sauvegarder
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default UpdateProfile;
