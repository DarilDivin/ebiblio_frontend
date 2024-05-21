'use client'

import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'
import InputError from '@/components/InputError'
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { useAuth } from '@/hooks/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod' 
import AppLayout from '../layout'
import Link from 'next/link'
// import UpdateProfile from '@/components/UpdateProfile'

const FormSchema = z
  .object({
    code: z.string().length(6)
  })

const Settings = () => {
  const { user, logout, twoFactorAuthenticationEnable, twoFactorAuthenticationDisable, twoFactorQrCode, twoFactorAuthenticationConfirmation } = useAuth({
    middleware: "auth"
  })

  const [status, setStatus] = useState<string | null>(null);
  const [svgQrCode, setSvgQrCode] = useState<string | TrustedHTML>('')


  console.log(user)
  console.log(status)

  const submitForm = (
    event: { preventDefault: () => void },
    code: string
  ) => {
    event.preventDefault();

    twoFactorAuthenticationConfirmation({
      code,
      setStatus
    })
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    console.log(parseInt(values.code));
    
    submitForm(
      event,
      values.code
    )
  }

  return (
    // <div>

    //   <AuthSessionStatus className={'mb-4'} status={status} />


    //   <p className='inline mr-8'>Bon retour sur votre SettingsPage {user?.name}</p>
    //   <Button onClick={logout} className='bg-destructive text-white border-none rounded cursor-pointer font-bold p-2 mb-8 inline'>
    //     Logout
    //   </Button>

      

    //   {/* <div>
    //     <div dangerouslySetInnerHTML={{ __html: svgQrCode }} />
    //   </div> */}

    //   { status == '200enabled' && 
    //     <div className="mb-4 font-medium text-sm">
    //         Please finish configuring two factor authentication below.

    //       <div>
    //           <Button onClick={() => twoFactorQrCode({setSvgQrCode})} className='bg-destructive text-white border-none rounded cursor-pointer font-bold p-2 mb-8 ml-8'>
    //             Cick to see Qr Code
    //           </Button>

    //           <div dangerouslySetInnerHTML={{ __html: svgQrCode }} />

    //           <div className="w-[500px]">
    //             <Card className="">
    //               <CardHeader>
    //                 <CardTitle>Forgot Password ?</CardTitle>
    //                 <CardDescription>Enter your credentials to log into your account</CardDescription>
    //               </CardHeader>
    //               <CardContent>
    //                 <AuthSessionStatus className={'mb-4'} status={status} />
    //                 <Form {...form}>
    //                   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
    //                     <FormField
    //                       control={form.control}
    //                       name="code"
    //                       render={({ field }) => (
    //                         <FormItem>
    //                           <FormLabel className="text-primary-foreground">Password</FormLabel>
    //                           <FormControl>
    //                             {/* <InputOTP 
    //                               maxLength={6} {...field}
    //                               pattern={REGEXP_ONLY_DIGITS}
    //                             >
    //                               <InputOTPGroup>
    //                                 <InputOTPSlot index={0} />
    //                                 <InputOTPSlot index={1} />
    //                                 <InputOTPSlot index={2} />
    //                                 <InputOTPSlot index={3} />
    //                                 <InputOTPSlot index={4} />
    //                                 <InputOTPSlot index={5} />
    //                               </InputOTPGroup>
    //                             </InputOTP> */}
    //                             <Input 
    //                               className="text-primary-foreground border-border focus-visible:ring-ring"
    //                               placeholder="code"
    //                               required
    //                               autoFocus
    //                               type="text"
    //                               {...field}
    //                             />
    //                           </FormControl>
    //                           <FormMessage/>
    //                           {/* <InputError messages={errors.code} /> */}
    //                         </FormItem>
    //                       )}
    //                     />
    //                     <Button type="submit" className="text-white">Confirm</Button>
    //                   </form>
    //                 </Form>
    //               </CardContent>
    //               <CardFooter>
                    
    //               </CardFooter>
    //             </Card>
    //           </div>
    //       <div>
    //   </div>
    //       </div>

    //     </div>
    //   }

    //   { user?.two_factor_secret ? 
    //     <div className="mt-8">
    //         <h3>
    //             Désactivé la double authentification
    //         </h3>
    //         <Button 
    //           onClick = {() => twoFactorAuthenticationDisable({ setStatus })}
    //           className='bg-[#dc0101] text-white border-none rounded cursor-pointer font-bold p-2'>
    //             Disable
    //         </Button>
    //     </div> : 
    //     <div className="twofa-message error">
    //         <h3>
    //             Vous n'avez pas activé la double authentification
    //         </h3>
    //         <Button 
    //           onClick = {() => twoFactorAuthenticationEnable({ setStatus })}
    //           className='bg-[#31dc01] text-white border-none rounded cursor-pointer font-bold p-2'>
    //             Enable
    //         </Button>
    //     </div>
    //   }
    // </div>
    <div className='w-full h-screen flex justify-center items-start gap-4 px-12'>
      <div className='w-1/4 h-full relative'>
        <div className='sticky flex flex-col gap-5 p-2 w-full top-8'>
          <Link href='/settings#profile' className='p-2 rounded-lg text-xl w-3/4 font-semibold text-primary'>Profile</Link>
          <Link href='/settings#2fa' className='p-2 text-foreground rounded-lg text-xl w-3/4 font-semibold'>2FA</Link>
        </div>
      </div>
      <div className='w-3/4 h-full p-2 flex flex-col gap-4'>
        <div>
          {/* <UpdateProfile user={user}/> */}
        </div>
      </div>
    </div>
  )
}

export default Settings