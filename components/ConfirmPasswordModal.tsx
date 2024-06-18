import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { useAuth } from "@/hooks/auth";
import { ConfirmPasswordErrorType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
import Modal from "./ui/modal";
import AuthSessionStatus from "@/app/(auth)/AuthSessionStatus";

const FormSchema = z.object({
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: "Non valide",
  }),
});

interface ConfirmPasswordModalProps {
  confirming: boolean
  setPassword: Dispatch<SetStateAction<string>>
  password: string
  setConfirming: Dispatch<SetStateAction<boolean>>
  onConfirm: () => void
}

const ConfirmPasswordModal = ({confirming, setPassword, password, setConfirming, onConfirm}: ConfirmPasswordModalProps) => {
  const [errors, setErrors] = useState<ConfirmPasswordErrorType>({});
  // const [status, setStatus] = useState<string | null>(null);
  // const [open, setOpen] = useState(false);

  const { confirmPassword } = useAuth();

  // setOpen(confirming);

  // const submitForm = (
  //   event: { preventDefault: () => void },
  //   password: string
  // ) => {
  //   event.preventDefault();

  //   // confirmPassword({
  //   //   password,
  //   //   setErrors,
  //   //   setStatus,
  //   // });
  // };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {
    console.log(values.password);
    setPassword(values.password)
    onConfirm()
    // submitForm(event, values.password);
  }

  return (
    <Modal isOpen={confirming}>
      {/* <div>
        Confirm Password:{" "}
        <Input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-between pt-10">
        <Button onClick={() => setConfirming(false)}>Cancel</Button>
        <Button className="bg-green-400 text-white" onClick={onConfirm}>
          Confirm
        </Button>
      </div> */}

      <Card className="">
        <CardHeader className="flex flex-col items-start">
          <CardTitle>Confirmation</CardTitle>
          <CardDescription>
            Entrer votre mot de passe pour procéder à la confirmation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthSessionStatus className={"mb-4"} status={status} />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel className="text-primary-foreground items-start">
                      Mot de passe
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-primary-foreground border-border focus-visible:ring-ring w-[500px] max-sm:w-[300px]"
                        required
                        autoFocus
                        type="passsword"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <InputError messages={errors.password} />
                  </FormItem>
                )}
              />
              <Button type="submit" className="text-white self-end mt-8">
                Confirm
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </Modal>
  );
};

export default ConfirmPasswordModal;
