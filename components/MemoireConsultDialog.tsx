import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import Image from "next/image";

const MemoireConsultDialog = ({ ...memory_data }) => {

  // console.log(memory_data.memory_data);

  return (
    <Dialog>
      <DialogTrigger className=" text-blue-400/70 hover:bg-blue-400/20 hover:text-blue-400 h-8 w-8 flex justify-center items-center p-1 rounded-md">
        <span className="sr-only">Consulter le mémoire</span> 
        <Eye className="text-blue-400 h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {/* <DialogTitle>Soutenance {memory_data.memory_data.memory_year}</DialogTitle> */}
          <DialogDescription className="text-center">
            Aucun fichier n'est disponible pour ce mémoire.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MemoireConsultDialog;
