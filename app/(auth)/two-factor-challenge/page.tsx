"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/auth";
import { TwoFactorChallengeErrorType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthSessionStatus from "../AuthSessionStatus";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputError from "@/components/InputError";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Checkbox } from "@/components/ui/checkbox";

const FormSchema = z.object({
  code: z.string().optional(),
  recovery_code: z.string().optional(),
  use_recovery_code: z.boolean().optional(),
});

const TwoFactorChallenge = () => {
  const [errors, setErrors] = useState<TwoFactorChallengeErrorType>({});

  const { twoFactorChallenge } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/home",
  });

  const submitForm = (
    event: { preventDefault: () => void },
    code?: string,
    recovery_code?: string
  ) => {
    event.preventDefault();

    if (useRecoveryCode) {
      twoFactorChallenge({recovery_code, setErrors})
    } else {
      twoFactorChallenge({code, setErrors,});
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: "",
      recovery_code: "",
    },
  });

  const useRecoveryCode = form.watch("use_recovery_code");

  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    console.log(values.code, values.recovery_code);

    submitForm(event, values.code, values.recovery_code);
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[500px]">
        <Card className="">
          <CardHeader>
            <CardTitle>Authentification à 2 Facteur</CardTitle>
            <CardDescription>
              Entrer votre code pour vour connecter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthSessionStatus className={"mb-4"} status={status} />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-start gap-4"
              >
                {useRecoveryCode && (
                  <FormField
                    control={form.control}
                    name="recovery_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary-foreground">
                          Code de récupération
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="text-primary-foreground border-border focus-visible:ring-ring"
                            placeholder=""
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <InputError messages={errors.recovery_code} />
                      </FormItem>
                    )}
                  />
                )} 
                {!useRecoveryCode && (
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary-foreground">
                          Code
                        </FormLabel>
                        <FormControl>
                          <InputOTP
                            maxLength={6}
                            {...field}
                            pattern={REGEXP_ONLY_DIGITS}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                        <InputError messages={errors.code? errors.code : undefined} />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="use_recovery_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="flex gap-2 items-center space-x-2">
                        <div>
                          <Checkbox
                            checked={field.value}
                            id="use_recovery_code"
                            onCheckedChange={field.onChange}
                            className="focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-secondary"
                          />
                          <label htmlFor="use_recovery_code" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Utiliser un code de récupération
                          </label>
                        </div>
                      </FormControl>
                      {/* <div className="space-y-1 leading-none"> */}
                      {/* </div> */}
                    </FormItem>
                  )}
                />

                <Button type="submit" className="text-white mt-4 self-end">
                  Se connecter
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TwoFactorChallenge;
