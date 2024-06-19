"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ArrowUpDown, Copy, FileCheck2, MoreHorizontal, Trash2 } from "lucide-react";
import MemoireConsultDialog from "@/components/MemoireConsultDialog";
import { validateMemory } from "@/lib/data/memories";
import RejectMemoryDialog from "@/components/RejectMemoryDialog";
import { toast } from "sonner";
import { Memoire } from "@/types/memory";
import { useMemory, useUser } from "@/services/queries";
import { User } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { deleteUser } from "@/lib/data/user";
import { Switch } from "@/components/ui/switch";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "matricule",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Matricule
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Badge variant={"secondary"}>
          {user.matricule ? user.matricule : "Indéfini"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "lastname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "firstname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Prénoms
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email ",
  },
  {
    accessorKey: "sex",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sex
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      if (user.sex !== undefined) {
        if (user.sex === "Masculin") {
          return <Badge className="bg-blue-400 hover:bg-blue-400/80 dark:bg-blue-400 dark:hover:bg-blue-400/80">{user.sex}</Badge>;
        } else if (user.sex === "Féminin") {
          return <Badge className="bg-orange-400 hover:bg-orange-400/80 dark:bg-orange-400 dark:hover:bg-orange-400/80">{user.sex}</Badge>;
        } else {
          return <Badge variant={'secondary'}>Indéfini</Badge>;
        }
      }
    },
  },
  {
    accessorKey: "has_paid",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payé
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;

      const { mutate } = useUser()

      const handlePaid = () => {
        toast('Paid')
        mutate()
      }
      return (
        <Switch className="data-[state=checked]:bg-primary dark:data-[state=checked]:bg-primary focus-visible:ring-ring"
          checked={user.has_paid ? true : false}
          onChange={handlePaid}
        />
      )
    }
  },
  {
    id: "actions",
    header: 'Actions',
    cell: ({ row }) => {
      const user = row.original;

      const { mutate } = useUser();

      const handleDeleteUser = async (user: number) => {
        await deleteUser({ user });
        mutate()
      }

      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => {
              navigator.clipboard.writeText(
                user.matricule ? user.matricule : "Il n'a pas de matricule"
              ),
                toast("Matricule de l'utilisateur copié");
            }}
          >
            <span className="sr-only">Copier la cote du mémoire</span>
            <Copy className="h-4 w-4" />
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Dialog>
                  <DialogTrigger className="text-destructive/70 hover:bg-destructive/20 hover:text-destructive h-8 w-8 flex justify-center items-center p-1 rounded-md">
                    <span className="sr-only">Supprimer l'utilisateur</span>
                    <Trash2 className="text-destructive h-4 w-4" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Voulez vraiment supprimer cet utilisateur
                      </DialogTitle>
                      <DialogDescription className="">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Beatae dolorum maiores cumque eius, quidem veniam?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-end">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Annuler
                        </Button>
                      </DialogClose>
                      <Button
                        variant={"destructive"}
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Supprimer
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TooltipTrigger>
              <TooltipContent>
                <p>Supprimer l' utilisateur</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];

// {
//   accessorKey: "amount",
//   header: () => <div className="text-right">Amount</div>,
//   cell: ({ row }) => {
//     const amount = parseFloat(row.getValue("amount"))
//     const formatted = new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount)

//     return <div className="text-right font-medium">{formatted}</div>
//   },
// },
