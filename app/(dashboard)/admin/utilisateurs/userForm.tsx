import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CreatableSelect from "react-select/creatable";


import { useUser } from "@/services/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputError from "@/components/InputError";
import { updateUser } from "@/lib/data/user";
import { EditUserErrorType, User } from "@/types/user";
import { getAllRole } from "@/lib/data/role";

const FormSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide" }),
  roles: z.array(z.string()).optional(),
});
const UserForm = ({ user }: { user: User }) => {
  const [errors, setErrors] = useState<EditUserErrorType>({});

  const oldSelectedValues = user.roles.map(role => ({ label: role.name, value: role.id }));

  const [selectedOption, setSelectedOption] = useState(oldSelectedValues);

  const { mutate } = useUser();

  const { roles } = getAllRole();

  const options = roles?.map((role) => ({
    label: role.name,
    value: role.id,
  }));

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: user ? user.email : undefined,
    },
  });

  const submitEditUserForm = async (
    event: { preventDefault: () => void },
    email: string,
    roles: number[],
    user: number
  ) => {
    event.preventDefault();

    await updateUser({
      email,
      roles,
      user,
      setErrors,
    });
    mutate();
  };

  function onSubmit(values: z.infer<typeof FormSchema>, event: any) {    
    const selectedValues = selectedOption?.map((option) => option.value);
    submitEditUserForm(event, values.email, selectedValues, user.id,)
  }
  return (
    <Dialog>
      <DialogTrigger
        onClick={() => console.log(user)}
        className="h-8 w-8 p-0 flex justify-center items-center text-orange-400/70 hover:bg-orange-400/20 hover:text-orange-400 rounded-md"
      >
        <span className="sr-only">Modifier l'utilisateur</span>
        <Edit className="text-orange-400 h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier l'utilisateur</DialogTitle>
        </DialogHeader>
        <div className="grid w-full items-center gap-1.5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="outline-none focus-visible:ring-ring w-full"
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <InputError messages={errors.email} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <CreatableSelect
                          className="w-full "
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                          isMulti
                        />
                    </FormControl>
                    <FormMessage />
                    <InputError messages={errors.roles} />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-8">
                Modifier
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
