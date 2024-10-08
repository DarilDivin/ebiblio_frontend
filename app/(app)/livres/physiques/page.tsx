"use client";

import Image from "next/image";
import BookPic from "../../../../public/B3.webp";
import { getAllBooks } from "@/lib/data/book";
import MemoireSearchbar from "@/components/MemoireSearchbar";
import BookSearchbar from "@/components/BookSearchbar";
import { useState } from "react";
import { Book } from "@/types/book";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Plus } from "lucide-react";

const PhysicalBooksListPage = () => {
  const { physical, isLoading, error } = getAllBooks();
  const [filteredData, setFilteredData] = useState<Book[]>()

  if (error) return <div>Erreur de chargement des données</div>;
  if (isLoading || !physical) return <div>Chargement...</div>;
  const imageUrl = 'Articles/cover-pages/1722353735-le-parfum-9977.jpg';
  // http://localhost:8000/api/books-covers/1722353735-le-parfum-9977.jpg

  // console.log(physical)
  return (
    <div className="p-2">
      <div className="h-[55vh] max-sm:h-[35vh] w-full bg-primary/5 grid grid-cols-2 max-md:grid-cols-[400px_1fr] max-sm:grid-cols-1 justify-center items-center px-12 lg:px-12 max-sm:px-8 pt-8 rounded-lg mb-4">
        <div>
          <p className="text-[2rem] max-sm:text-[1.5rem] max-sm:text-center font-bold font-poppins text-primary justify-self-end ">
            Vous cherchez un livre en particulier ?
          </p>
          <p className="text-base max-sm:text-base max-sm:text-center font-semibold font-poppins text-foreground/70 justify-self-end">
            Effectuer une recherche parmis les livres disponibles en version
            papier de l'Eneam. Vous pouvez ensuite vous rendre à l'Eneam pour
            les consulter directement ou effectuer un demande de prêt en ligne
            pour le lire chez vous en toute tranquilité.
          </p>
        </div>
        <div className="h-full overflow-hidden max-sm:hidden">
          <Image
            src={"/bookshelves.svg"}
            alt="Searching File Image"
            className="object-contain w-full h-full"
            width={800}
            height={800}
            priority
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-center -translate-y-1/2 max-sm:-translate-y-8">
        <BookSearchbar book={physical} setFilteredData={setFilteredData} />
      </div>
      <div className="w-full min-h-screen overflow-scroll p-2 flex flex-col gap-4">
        <h3 className="text-xl text-primary font-poppins font-bold xl:px-12 max-lg:px-8">Liste des Livres Physiques</h3>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 max-lg:grid-cols-4 max-sm:grid-cols-2 gap-4 w-full xl:px-12 max-lg:px-8 ">
          {filteredData?.map((book) => (
            <div className="flex max-lg:flex-col p-2 bg-primary/10 hover:bg-primary/15 rounded-md gap-4">
              <div className="min-w-[100px] h-fit overflow-hidden rounded-md bg-red-300">
                <Image
                  // src={imageUrl}
                  src={`http://localhost:8000/api/books-covers/${book.thumbnail_path?.split('/')[2]}`}
                  alt="Book cover"
                  className=" object-cover w-full h-full"
                  width={500}
                  height={500}
                  priority
                />
              </div>
              <div className="flex flex-col justify-start mt-4 relative flex-grow">
                <Link href={`/livres/${book.slug}/${book.id}`} className="font-poppins font-bold text-[14px]">
                  {book.title}
                </Link>
                <p className=" text-[11px] font-poppins font-medium text-foreground/70 flex items-center gap-2">
                  {book.author} 
                  <span className=" w-1 h-1 rounded-full bg-foreground inline-block"></span>
                  {book.editing_year}
                </p>
                <p className="text-xs text-foreground/50">
                  <span className="line-clamp-2">{book.summary}</span>
                  <Link href={`/livres/${book.slug}/${book.id}`} className="underline hover:text-foreground">lire plus</Link>
                </p>

                <Link href={`/livres/${book.slug}/${book.id}`} className="w-8 h-8 flex justify-center items-center absolute bottom-0 right-0 rounded-md text-primary justify-self-end self-end p-1 bg-transparent hover:bg-primary/20">
                  <Plus className="size-4"/>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhysicalBooksListPage;
