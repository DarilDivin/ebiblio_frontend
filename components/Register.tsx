'use client'

import { TabsContent } from "./ui/tabs"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { Checkbox } from './ui/checkbox';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputError from "./InputError";
import AuthSessionStatus from "@/app/(auth)/AuthSessionStatus";
import { useAuth } from "@/hooks/auth";
import { RegisterErrorType } from "@/types";

const FormSchema = z.object({
    firstname: z
      .string()
      .min(2, {
        message: "Firstname must be at least 2 characters.",
      })
      .max(50),
    lastname: z
      .string()
      .min(2, {
        message: "Lastname must be at least 2 characters.",
      })
      .max(50),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.",
      }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

const Register = () => {

  const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/home",
  });

  const [errors, setErrors] = useState<RegisterErrorType>({});

  const submitForm = (
    event: { preventDefault: () => void },
    name: string,
    lastname: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    event.preventDefault();

    register({
      name,
      lastname,
      email,
      password,
      password_confirmation,
      setErrors,
    });
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    submitForm(
      event,
      values.firstname,
      values.lastname,
      values.email,
      values.password,
      values.password_confirmation
    );
    console.log( values.firstname, values.lastname, values.email, values.password, values.password_confirmation );
  }

  return (
    <TabsContent value="register">
      <div className="w-full">
        <Card className='bg-card'>
          <CardHeader>
            <CardTitle className='text-primary'>Créer un compte</CardTitle>
            <CardDescription>Entrez vos informations pour créer votre compte</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-primary-foreground">Firstname</FormLabel>
                      <FormControl>
                        <Input 
                          className="text-primary-foreground border-border focus-visible:ring-ring"
                          placeholder="John Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                      <InputError messages={errors.email} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-primary-foreground">Lastname</FormLabel>
                      <FormControl>
                        <Input 
                          className="text-primary-foreground border-border focus-visible:ring-ring"
                          placeholder="John Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                      <InputError messages={errors.email} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-primary-foreground">Email</FormLabel>
                      <FormControl>
                        <Input 
                          className="text-primary-foreground focus-visible:ring-ring"
                          placeholder="email@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                      <InputError messages={errors.email} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground">Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          className="bg-transparent text-primary-foreground focus-visible:ring-ring"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                      <InputError messages={errors.password} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground">Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          className="bg-transparent text-primary-foreground focus-visible:ring-ring"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <Button type="submit" className='text-white mt-4' >Submit</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div>
              <span className="text-sm text-primary-foreground">Already have an account ? </span>
              <Link
                  href="/registration"
                  className="underline text-sm text-primary-foreground hover:text-primary">
                  Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </TabsContent>
  )
}

export default Register