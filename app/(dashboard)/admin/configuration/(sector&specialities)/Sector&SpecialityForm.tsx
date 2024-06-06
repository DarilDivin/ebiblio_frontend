import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sector } from "@/types/sector";
import { Edit, PlusCircle } from "lucide-react";
import SectorForm from "./SectorForm";
import SpecialityForm from "./SpecialityForm";

const SectorSpecialityForm = ({ sector, type }: { sector?: Sector, type?: string }) => {
  return (
    <Dialog>
      {sector ? (
        <DialogTrigger
          onClick={() => console.log(sector)}
          className="h-8 w-8 p-0 flex justify-center items-center text-orange-400/70 hover:bg-orange-400/20 hover:text-orange-400 rounded-md"
        >
          <span className="sr-only">Modifier une soutenance</span>
          <Edit className="text-orange-400 h-4 w-4" />
        </DialogTrigger>
      ) : (
        <DialogTrigger className="inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 p-1 bg-primary/80 hover:bg-primary hover:text-white text-white">
          Nouveau <PlusCircle className="h-4 w-4" />
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une filière ou une spécialité</DialogTitle>
          <DialogDescription>
            Choisissez en fonction de ce que vous voulez créer
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue={ type === 'Spécialité' ? "speciality" : "sector"} className="w-full">
        {/* <Tabs defaultValue={ type ? type === 'sp' } className="w-[400px]"> */}
          <TabsList className="w-full grid grid-cols-2 mb-1">
            <TabsTrigger value="sector">Filière</TabsTrigger>
            <TabsTrigger value="speciality">Spécialité</TabsTrigger>
          </TabsList>
          {sector ? 
            <div>
              <SectorForm sector={sector}/>
              <SpecialityForm sector={sector} />
            </div>
           : 
           <div>
            <SectorForm />
            <SpecialityForm />
           </div>
           }
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SectorSpecialityForm;
