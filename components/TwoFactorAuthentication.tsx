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
import { Suspense, useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "./Spinner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import ConfirmPass from "./ConfirmPass";
import { toast } from "sonner";

const FormSchema = z.object({
  code: z.string().length(6),
});

const TwoFactorAuthentication = () => {
  const {
    user,
    twoFactorAuthenticationEnable,
    twoFactorAuthenticationDisable,
    twoFactorQrCode,
    twoFactorRecoveryCode,
    twoFactorAuthenticationConfirmation,
  } = useAuth({
    middleware: "auth",
  });
  const [confirming, setConfirming] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [twofactorIsEnabled, setTwofactorIsEnabled] = useState(false);
  const [svgQrCode, setSvgQrCode] = useState<string | TrustedHTML>("");
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const UserHasConfirmed2FA = user.two_factor_confirmed_at ? true : false;
  const [
    twoFactorAuthenticationConfirmed,
    setTwoFactorAuthenticationConfirmed,
  ] = useState(UserHasConfirmed2FA);

  const handleEnable2FA = () => {
    twoFactorAuthenticationEnable({
      setStatus,
      setSvgQrCode,
      setRecoveryCodes,
      setTwofactorIsEnabled,
      setConfirming,
    });
  };

  const handleDisable2FA = () => {
    twoFactorAuthenticationDisable({
      setStatus,
      setConfirming,
      setTwofactorIsEnabled,
    });
  };

  useEffect(() => {
    setTwofactorIsEnabled(user.two_factor_secret);
  }, []);

  const submitForm = (event: { preventDefault: () => void }, code: string) => {
    event.preventDefault();

    twoFactorAuthenticationConfirmation({
      code,
      setStatus,
      setTwoFactorAuthenticationConfirmed,
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
            Authentification à deux facteurs
          </CardTitle>
          <CardDescription>
            Ajoutez une sécurité supplémentaire à votre compte en utilisant
            l'authentification à deux facteurs.
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
                    <div className="flex flex-col justify-center items-center relative">
                      <p className="mb-4">
                        La double authentification est maintenant active.
                        Scanner le code Qr suivant avec l'application
                        d'authentification de votre télephone.
                      </p>
                      <Suspense fallback={<Spinner />}>
                        {svgQrCode === "" ? (
                          <span className=" text-muted-foreground">
                            Cliquer pour regénérer le code Qr
                          </span>
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{ __html: svgQrCode }}
                            className="flex justify-center items-center p-4 rounded-lg border bg-white "
                          />
                        )}
                      </Suspense>
                      <Button
                        className="bottom-1 left-1 justify-self-end self-start text-white"
                        onClick={() => {
                          twoFactorQrCode({ setSvgQrCode, setConfirming });
                        }}
                      >
                        Regénérer code Qr
                      </Button>
                    </div>
                    <div>
                      {/* <p className="mb-4">
                        La double authentification est maintenant active.
                        Scanner le code Qr suivant avec l'application
                        d'authentification de votre télephone.
                      </p> */}
                      {!UserHasConfirmed2FA && (
                        <Card className="bg-card">
                          <CardHeader>
                            <CardTitle>Confirmer l'activation</CardTitle>
                            <CardDescription>
                              Scanner le code Qr et entrer le code.
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            {/* <AuthSessionStatus
                              className={"mb-4"}
                              status={status}
                            /> */}
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
                                      {/* <InputError messages={errors.code} /> */}
                                    </FormItem>
                                  )}
                                />
                                <Button type="submit" className="text-white">
                                  Confirmer
                                </Button>
                              </form>
                            </Form>
                          </CardContent>
                          <CardFooter></CardFooter>
                        </Card>
                      )}
                    </div>
                    <div className="mt-5">
                      {twoFactorAuthenticationConfirmed && (
                        <>
                          <h3 className="font-bold text-lg mb-2">
                            Codes de récupération
                          </h3>
                          {recoveryCodes.length === 0 ? (
                            <Button
                              className="text-white"
                              onClick={() => {
                                twoFactorRecoveryCode({
                                  setRecoveryCodes,
                                  setConfirming,
                                });
                              }}
                            >
                              Regénérer code de récupération
                            </Button>
                          ) : (
                            <pre className="gap-2 px-10">
                              <ul>
                                {recoveryCodes.map((recoveryCode) => (
                                  <li className=" list-disc" key={recoveryCode}>
                                    {recoveryCode}
                                  </li>
                                ))}
                              </ul>
                            </pre>
                          )}
                        </>
                      )}
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
            L'authentification à deux facteurs (2FA) ajoute une couche
            supplémentaire de sécurité à vos comptes en ligne en exigeant deux
            formes de vérification : quelque chose que vous connaissez (comme un
            mot de passe) et quelque chose que vous avez (comme un appareil
            mobile ou un jeton de sécurité). Cela garantit que même si votre mot
            de passe est compromis, l'accès non autorisé est toujours empêché.
          </p>
          {twofactorIsEnabled ? (
            <Button
              onClick={handleDisable2FA}
              className="bg-destructive text-white border-none rounded cursor-pointer font-bold p-2"
            >
              Disable
            </Button>
          ) : (
            <Button
              onClick={handleEnable2FA}
              className="bg-primary text-white border-none rounded cursor-pointer font-bold p-2"
            >
              Enable
            </Button>
          )}
        </CardFooter>
      </Card>

      {confirming ? (
        <ConfirmPass
          confirming={true}
          setConfirming={setConfirming}
          onSuccess={handleEnable2FA}
          onFail={() =>
            toast.error("Erreur de validation!!! Le mot de passe est incorrect")
          }
        />
      ) : null}
    </div>
  );
};

export default TwoFactorAuthentication;
