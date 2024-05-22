import AuthSessionStatus from "@/app/(auth)/AuthSessionStatus";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "./Spinner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const FormSchema = z.object({
  code: z.string().length(6),
});

const TwoFactorAuthentication = () => {
  const router = useRouter();

  const {
    user,
    logout,
    twoFactorAuthenticationEnable,
    twoFactorAuthenticationDisable,
    twoFactorQrCode,
    twoFactorAuthenticationConfirmation,
  } = useAuth({
    middleware: "auth",
  });
  const [status, setStatus] = useState<string | null>(null);
  const [twofactorIsEnabled, setTwofactorIsEnabled] = useState(false);
  const [svgQrCode, setSvgQrCode] = useState<string | TrustedHTML>("");

  useEffect(() => {
    // if(twofactorIsEnabled) {
    twoFactorQrCode({ setSvgQrCode });
    // } else {
    // setSvgQrCode('')
    // }
  }, [twofactorIsEnabled]);

  useEffect(() => {
    if (user?.two_factor_secret) {
      setTwofactorIsEnabled(true);
    } else {
      setTwofactorIsEnabled(false);
    }
  }, [user?.two_factor_secret]);

  const submitForm = (event: { preventDefault: () => void }, code: string) => {
    event.preventDefault();

    twoFactorAuthenticationConfirmation({
      code,
      setStatus,
    });
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      code: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    console.log(parseInt(values.code));

    submitForm(event, values.code);
  }

  return (
    <div id="2fa">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-primary">
            Two Factor Authentication
          </CardTitle>
          <CardDescription>
            Add additional security to your account using two factor
            authentication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            {twofactorIsEnabled ? (
              <div>
                <h3 className="font-bold text-lg text-black/80">
                  Vous avez activé la double authentification
                </h3>

                {twofactorIsEnabled && (
                  <div className="grid grid-cols-2 max-sm:grid-cols-1 rev gap-4 p-2">
                    <div className="flex justify-center items-center">
                      <Suspense fallback={<Spinner/>}>
                        <div
                          dangerouslySetInnerHTML={{ __html: svgQrCode }}
                          className="flex justify-center items-center p-4 rounded-lg border bg-white "
                        />
                      </Suspense>
                    </div>
                    <div>
                      <p className="mb-4">
                        La double authentification est maintenant active.
                        Scanner le code Qr suivant avec l'application
                        d'authentification de votre télephone.
                      </p>
                      <Card className="bg-card">
                        <CardHeader>
                          <CardTitle>Forgot Password ?</CardTitle>
                          <CardDescription>
                            Enter your credentials to log into your account
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <AuthSessionStatus
                            className={"mb-4"}
                            status={status}
                          />
                          <Form {...form}>
                            <form
                              onSubmit={form.handleSubmit(onSubmit)}
                              className="space-y-2"
                            >
                              <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-primary-foreground">
                                      Password
                                    </FormLabel>
                                    <FormControl>
                                      <InputOTP 
                                   maxLength={6} {...field}
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
                                      {/* <Input
                                        className="text-primary-foreground border-border focus-visible:ring-ring"
                                        placeholder="code"
                                        required
                                        autoFocus
                                        type="text"
                                        {...field}
                                      /> */}
                                    </FormControl>
                                    <FormMessage />
                                    {/* <InputError messages={errors.code} /> */}
                                  </FormItem>
                                )}
                              />
                              <Button type="submit" className="text-white">
                                Confirm
                              </Button>
                            </form>
                          </Form>
                        </CardContent>
                        <CardFooter></CardFooter>
                      </Card>
                    </div>
                    
                  </div>
                )}
              </div>
            ) : (
              <h3 className="font-bold text-lg text-black/80">
                Vous n'avez pas activé la double authentification
              </h3>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Two-factor authentication (2FA) adds an extra layer of security to
            your online accounts by requiring two forms of verification:
            something you know (like a password) and something you have (like a
            mobile device or security token). This ensures that even if your
            password is compromised, unauthorized access is still prevented.
          </p>
          {twofactorIsEnabled ? (
            <Button
              onClick={() => {
                setTwofactorIsEnabled(false);
                twoFactorAuthenticationDisable({ setStatus });
              }}
              className="bg-destructive text-white border-none rounded cursor-pointer font-bold p-2"
            >
              Disable
            </Button>
          ) : (
            <Button
              onClick={() => {
                setTwofactorIsEnabled(true);
                twoFactorAuthenticationEnable({ setStatus });
                router.refresh();
              }}
              className="bg-primary text-white border-none rounded cursor-pointer font-bold p-2"
            >
              Enable
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default TwoFactorAuthentication;
