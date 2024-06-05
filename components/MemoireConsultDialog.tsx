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
          <DialogTitle>Soutenance {memory_data.memory_data.memory_year}</DialogTitle>
          <DialogDescription className="">
            <div className="w-full p-2 font-bold text-xl">
              {memory_data.memory_data.theme}
            </div>
            <div className="grid grid-cols-[200px_1fr]">
              <div className="w-full h-[250px] bg-slate-400 rounded-md overflow-hidden">
                {/* <Image src={'http://localhost:8000/'+ memory_data.memory_data.cover_page_path} width={100} height={250} alt="cover" /> */}
              </div>
              <div className="p-2 flex flex-col gap-1">
                <p>
                  <span>Auteurs: </span>
                  <span>{memory_data.memory_data.first_author_name} {'& ' + memory_data.memory_data.second_author_name}</span>
                </p>
                <p>
                  <span>Maitre de mémoire: </span>
                  <span>{memory_data.memory_data.memory_master}</span>
                </p>
                <p>
                  <span>Président du jury: </span>
                  <span>{memory_data.memory_data.jury_president}</span>
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MemoireConsultDialog;
