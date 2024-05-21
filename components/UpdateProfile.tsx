// 'use client'

// import { TabsContent } from "./ui/tabs"
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import Link from 'next/link';
// import { Checkbox } from './ui/checkbox';
// import { z } from 'zod';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import InputError from "./InputError";
// import AuthSessionStatus from "@/app/(auth)/AuthSessionStatus";
// import { useAuth } from "@/hooks/auth";
// import { RegisterErrorType, UserType } from "@/types";

// const FormSchema = z
//   .object({
//     firstname: z
//       .string()
//       .min(2, {
//         message: "Firstname must be at least 2 characters.",
//       })
//       .max(50),
//     lastname: z
//       .string()
//       .min(2, {
//         message: "Lastname must be at least 2 characters.",
//       })
//       .max(50),
//     email: z.string().email({ message: "Invalid email address" }),
//   })

// const UpdateProfile = ({ user }: {user: any}) => {

//   console.log(user?.email);
//   // const {name, email} = user;
//   // console.log(name, email);


//   const {updateProfile} = useAuth({
//     middleware: 'auth',
//     redirectIfAuthenticated: "/settings",
//   });

//   const [errors, setErrors] = useState<RegisterErrorType>({});
  
//   const submitForm = (
//     event: { preventDefault: () => void },
//     name: string,
//     lastname: string,
//     email: string,
//   ) => {
//     event.preventDefault();

//     updateProfile({
//       name,
//       lastname,
//       email,
//       setErrors,
//     });
//   };
//   const name: string | undefined = user?.name
//   const email: string | undefined = user?.email

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       firstname: "",
//       lastname: "",
//       email: {email},  
//     },
//   });

//   // 2. Define a submit handler.
//   function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
//     submitForm(
//       event,
//       values.firstname,
//       values.lastname,
//       values.email,
//     );
//     console.log( values.firstname, values.lastname, values.email );
//   }

//   return (
//     <div>
//       <Card className='bg-card'>
//           <CardHeader>
//             <CardTitle className='text-primary'>Profile Information</CardTitle>
//             <CardDescription>Update your account's profile information and email address.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <AuthSessionStatus className={'mb-4'} status={status} />
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
//                 <FormField
//                   control={form.control}
//                   name="firstname"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className=" text-primary-foreground">Firstname</FormLabel>
//                       <FormControl>
//                         <Input 
//                           className="text-primary-foreground border-border focus-visible:ring-ring"
//                           placeholder="John Doe"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage/>
//                       <InputError messages={errors.email} />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="lastname"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className=" text-primary-foreground">Lastname</FormLabel>
//                       <FormControl>
//                         <Input 
//                           className="text-primary-foreground border-border focus-visible:ring-ring"
//                           placeholder="John Doe"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage/>
//                       <InputError messages={errors.email} />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className=" text-primary-foreground">Email</FormLabel>
//                       <FormControl>
//                         <Input 
//                           className="text-primary-foreground focus-visible:ring-ring"
//                           placeholder="email@email.com"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage/>
//                       <InputError messages={errors.email} />
//                     </FormItem>
//                   )}
//                 />
//                 <Button type="submit" className='text-white mt-4' >Submit</Button>
//               </form>
//             </Form>
//           </CardContent>
//           <CardFooter>
//           </CardFooter>
//         </Card>
//     </div>
//   )
// }

// export default UpdateProfile