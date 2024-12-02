import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileCheck2 } from "lucide-react";
import { Memoire } from "@/types/memory";
import { Button } from "./ui/button";
import { validateMemory } from "@/lib/data/memories";
import { useMemory } from "@/services/queries";
import { DialogClose } from "@radix-ui/react-dialog";

const ValidMemoryDialog = ({ memory }: { memory: Memoire }) => {
  const { mutate } = useMemory();

  const handleValidatedMemory = async (supportedMemory: number) => {
    console.log(supportedMemory);
    await validateMemory({ supportedMemory });
    mutate();
  };

  return (
    <Dialog>
      <DialogTrigger className="text-primary/70 hover:bg-primary/20 hover:text-primary h-8 w-8 flex justify-center items-center p-1 rounded-md">
        <span className="sr-only">Valider le mémoire</span>
        <FileCheck2 className="text-primary h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Êtes vous sûre de vouloir valider ce mémoire ??
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Fermer
              </Button>
            </DialogClose>
              <Button
                variant="ghost"
                className="p-2 text-primary-foreground bg-primary/70 hover:bg-primary/60 rounded-md cursor-pointer"
                memoryid={memory.id}
                onClick={() => handleValidatedMemory(memory.id)}
              >
                <span className="sr-only">Valider le mémoire</span>
                  Valider
              </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ValidMemoryDialog;
