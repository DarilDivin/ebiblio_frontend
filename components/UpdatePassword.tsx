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
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.",
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
            <CardTitle className='text-primary'>Update Password</CardTitle>
            <CardDescription>Ensure your account is using a long, random password to stay secure</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                  control={form.control}
                  name="current_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground">Current Password</FormLabel>
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
                      <FormLabel className="text-primary-foreground">Password</FormLabel>
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
                      <FormLabel className="text-primary-foreground">Confirm Password</FormLabel>
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
                <Button type="submit" className='text-white mt-4' >Submit</Button>
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