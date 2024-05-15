'use client'

import { useAuth } from "@/hooks/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import InputError from "@/components/InputError"
import { Input } from "@/components/ui/input"
import AuthSessionStatus from "../../AuthSessionStatus"
import { ResetPasswordErrorType } from "@/types"

const FormSchema = z.object({
  email: z.string().email({message: "invalid email"}),
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

const PasswordReset = () => {
  const searchParams = useSearchParams()
  let defaultEmailValue: string | null = '';

  const { resetPassword } = useAuth({ middleware: 'guest' })

  const [errors, setErrors ] = useState<ResetPasswordErrorType>({})
  const [status, setStatus] = useState<string | null>(null)

  const submitForm = (event: { preventDefault: () => void}, email: string, password: string, password_confirmation: string) => {
    event.preventDefault();

    resetPassword({ email, password, password_confirmation, setErrors, setStatus })
  }

  useEffect(() => {
    defaultEmailValue = searchParams.get('email');
  }, [searchParams.get('email')])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: defaultEmailValue,
      password: '',
      password_confirmation: '',
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    console.log(values.email, values.password, values.password_confirmation);

    submitForm(
      event,
      values.email,
      values.password,
      values.password_confirmation
    )
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[400px]">
        <Card className="dark">
          <CardHeader>
            <CardTitle>Reset Password </CardTitle>
            <CardDescription>Enter your credentials to reset your password</CardDescription>
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
                      <FormLabel className="text-gray-100">Email</FormLabel>
                      <FormControl>
                        <Input 
                          className="bg-transparent text-gray-100 mb-8"
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-gray-100">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="bg-transparent text-gray-100"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <InputError messages={errors.password} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-gray-100">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="bg-transparent text-gray-100"
                          placeholder=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mt-8">Reset Password</Button>
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

export default PasswordReset