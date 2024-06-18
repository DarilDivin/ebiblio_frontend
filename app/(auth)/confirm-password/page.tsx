'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/hooks/auth"
import { ConfirmPasswordErrorType } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import AuthSessionStatus from "../AuthSessionStatus"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import InputError from "@/components/InputError"
import { Button } from "@/components/ui/button"


const FormSchema = z.object({
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.",
    }),
})

const ConfirmPassword = () => {

  const [errors, setErrors] = useState<ConfirmPasswordErrorType>({})
  const [status, setStatus] = useState<string | null>(null)

  const { confirmPassword } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard'
  })

  const submitForm = (
    event: { preventDefault: () => void },
    password: string
  ) => {
    event.preventDefault();

    // confirmPassword({
    //   password,
    //   setErrors,
    //   setStatus
    // })
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    console.log(values.password);
    
    submitForm(
      event,
      values.password
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground">Password</FormLabel>
                      <FormControl>
                        <Input 
                          className="text-primary-foreground border-border focus-visible:ring-ring"
                          required
                          autoFocus
                          type="passsword"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                      <InputError messages={errors.password} />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="text-white">Confirm</Button>
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

export default ConfirmPassword