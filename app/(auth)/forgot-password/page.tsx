'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/auth"
import { ForgotPasswordErrorType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import AuthSessionStatus from "../AuthSessionStatus";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputError from "@/components/InputError";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address"})
});

const ForgotPassword = () => {
  const [errors, setErrors] = useState<ForgotPasswordErrorType>({})
  const [status, setStatus] = useState<string | null>(null)

  const { forgotPassword } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard'
  })

  const submitForm = (
    event: { preventDefault: () => void },
    email: string
  ) => {
    event.preventDefault();

    forgotPassword({
      email,
      setErrors,
      setStatus
    })
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    console.log(values.email);
    
    submitForm(
      event,
      values.email
    )
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[500px]">
        <Card className="">
          <CardHeader>
            <CardTitle>Forgot Password ?</CardTitle>
            <CardDescription>Enter your credentials to log into your account</CardDescription>
          </CardHeader>
          <CardContent>
            <AuthSessionStatus className={'mb-4'} status={status} />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground">Email</FormLabel>
                      <FormControl>
                        <Input 
                          className="text-primary-foreground border-border focus-visible:ring-ring"
                          placeholder="email@email.com"
                          required
                          autoFocus
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                      <InputError messages={errors.email} />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="text-white">Email Password Reset Link</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default ForgotPassword