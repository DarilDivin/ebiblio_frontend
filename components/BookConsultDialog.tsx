import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, Info } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Keyword } from "@/types/keyword";

const BookConsultDialog = ({ ...book_data }) => {

  // console.log(book_data.book_data);

  return (
    <Dialog>
      <DialogTrigger className=" text-blue-400/70 hover:bg-blue-400/20 hover:text-blue-400 h-8 w-8 flex justify-center items-center p-1 rounded-md">
        <span className="sr-only">Consulter le mémoire</span> 
        <Info className="text-blue-400 h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="w-fit max-w-screen-xl overflow-scroll ">
        <DialogHeader>
          <DialogDescription className="text-center">
            {/* Aucun fichier n'est disponible pour ce mémoire. */}
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-fit flex gap-4 relative">
          <div className="relative min-h-96 w-[400px]">
            <Image
              // src={"/B3.webp"}
              src={`http://localhost:8000/api/books-covers/${book_data.book_data.thumbnail_path?.split('/')[2]}`}
              alt="Book Cover"
              className="absolute shadow-2xl h-[350px] max-lg:h-[250px] max-lg:w-[170px] max-sm:left-1/4"
              width={250}
              height={250}
            />
          </div>
          <div className="w-full h-full flex flex-col gap-2">
            <h3 className="text-3xl font-poppins font-semibold">{book_data.book_data.title}</h3>
            <p className="font-medium font-poppins text-sm text-muted-foreground mb-1">{book_data.book_data.author} - {book_data.book_data.editing_year}</p>
            <p className="font-normal leading-relaxed font-poppins text-sm text-muted-foreground mb-8 line-clamp-6 text-justify">{book_data.book_data.summary}</p>

            <div className="text-xs max-w-[700px] font-poppins text-muted-foreground/80 flex flex-wrap gap-4">
              {book_data.book_data.keywords
                ? book_data.book_data.keywords.map((keyword: Keyword) => <Badge>{keyword.keyword}</Badge>)
                : "Pas de mots clés pour ce livre"}
            </div>
          </div>

          <div className="flex gap-2 absolute bottom-1 right-1">
            <span>Cote: </span>
            <span className="font-semibold">{book_data.book_data.cote}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookConsultDialog;
