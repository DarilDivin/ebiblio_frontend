'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { Checkbox } from './ui/checkbox';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TabsContent } from "./ui/tabs";
import { signIn } from "next-auth/react";
import InputError from "./InputError";
import { useAuth } from "@/hooks/auth";
import AuthSessionStatus from "@/app/(auth)/AuthSessionStatus";
import { LoginErrorType } from "@/types";

const FormSchema = z.object({
  email: z.string().email({message: 'Invalid email address'}),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'Mot de passe invalide'
  }),
  remember: z.boolean().default(false).optional(),
});

const Login = () => {

  const router = useRouter()
  
  const { login } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/home'
  });

  const [errors, setErrors] = useState<LoginErrorType>({})
  const [status, setStatus] = useState<string | null>(null)
  const [shouldRemember, setShouldRemember] = useState(false)

  // useEffect(() => {
  //   // if (router.reset?.length > 0 && Object.keys(errors).length === 0) {
  //   //   setStatus(atob(router.reset))
  //   // } else {
  //   //   setStatus(null)
  //   // }

  //   console.log(router.refresh);
  // })
  
  // console.log(Object.keys(errors).length === 0);
  
  const submitForm = async (
    event: { preventDefault: () => void },
    email: string,
    password: string,
    remember: boolean
  ) => {
    event.preventDefault();

    login({email, password, remember, setErrors, setStatus});
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    console.log(event, values.email, values.password, shouldRemember);
    
    submitForm(
      event,
      values.email,
      values.password,
      shouldRemember
    );
  }

  return (
    <TabsContent value='login'>
      <div className="w-full">
        <Card className='bg-card'>
          <CardHeader>
            <CardTitle className='text-primary'>Se connecter</CardTitle>
            <CardDescription>Rensignez vos informations de connexion</CardDescription>
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
                      <FormLabel className="text-foreground">Email</FormLabel>
                      <FormControl>
                        <Input 
                          className="text-foreground"
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
                      <FormLabel className="text-foreground">Mot de passe</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          className="text-foreground"
                          placeholder="exemple0000"
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
                  name="remember"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center space-x-2 my-8 cursor-pointer">
                          <Checkbox 
                            id="remember" 
                            onCheckedChange={
                              (event: boolean) => setShouldRemember(event)
                            } 
                            className='focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground'
                          />
                          <label
                            htmlFor="remember"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Me rappeler
                          </label>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className='text-input'>Se connecter</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <div>
              <Link
                  href="/forgot-password"
                  className="underline text-sm text-primary-foreground hover:text-primary">
                  Mot de passe oublié?
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </TabsContent>
  )
}

export default Login