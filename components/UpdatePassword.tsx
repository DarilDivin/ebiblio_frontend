'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/auth";
import { UpdatePasswordErrorType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { Input } from "./ui/input";
import InputError from "./InputError";

const FormSchema = z
  .object({
    current_password: z.string(),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
        message:
          "Votre mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.",
      }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['password_confirmation'],
  })

const UpdatePassword = () => {

  const { updatePassword } = useAuth({
    middleware: 'auth',
    redirectIfAuthenticated: '/settings'
  })

  const [errors, setErrors] = useState<UpdatePasswordErrorType>({})
  const [status, setStatus] = useState<string | null>(null)

  const submitForm = (
    event: { preventDefault: () => void },
    current_password: string,
    password: string,
    password_confirmation: string,
  ) => {
    event.preventDefault();

    updatePassword({current_password, password, password_confirmation, setStatus, setErrors});
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      current_password: '',
      password: '',
      password_confirmation: '',
    },
  })

  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    submitForm(
      event,
      values.current_password,
      values.password,
      values.password_confirmation,
    )
  }
  return (
    <div id="update_password">
      <Card className='bg-card'>
          <CardHeader>
            <CardTitle className='text-primary'>Modifier votre mot de passe</CardTitle>
            <CardDescription>Assurez-vous que votre compte utilise un mot de passe long et aléatoire pour rester sécurisé.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                  control={form.control}
                  name="current_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground">Mot de passe actuelle</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          className="text-primary-foreground focus-visible:ring-ring"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                      <InputError messages={errors.current_password} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground">Nouveau mot de passe</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          className="text-primary-foreground focus-visible:ring-ring"
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
                      <FormLabel className="text-primary-foreground">Confirmation du mot de passe</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          className="text-primary-foreground focus-visible:ring-ring"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <Button type="submit" className='text-white mt-4' >Enregistrer</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
    </div>
  )
}

export default UpdatePassword