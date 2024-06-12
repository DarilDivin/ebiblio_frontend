"use client";

import Image from "next/image";
import BookPic from "../../../../public/B3.webp";
import { getAllBooks } from "@/lib/data/book";
import MemoireSearchbar from "@/components/MemoireSearchbar";
import BookSearchbar from "@/components/BookSearchbar";
import { useState } from "react";
import { Book } from "@/types/book";
import Link from "next/link";

const PhysicalBooksListPage = () => {
  const { physical, isLoading, error } = getAllBooks();
  const [filteredData, setFilteredData] = useState<Book[]>()

  if (error) return <div>Erreur de chargement des données</div>;
  if (isLoading || !physical) return <div>Chargement...</div>;



  return (
    <div className="p-2">
      <div className="h-[55vh] max-sm:h-[35vh] w-full bg-green-50 grid grid-cols-2 max-md:grid-cols-[400px_1fr] max-sm:grid-cols-1 justify-center items-center px-52 max-md:px-10 max-sm:px-12 pt-8 rounded-lg mb-4">
        <div>
          <p className="text-[2.5rem] max-sm:text-[1.5rem] max-sm:text-center font-bold font-poppins text-primary justify-self-end ">
            Vous chercher un livre en particulier ?
          </p>
          <p className="text-base max-sm:text-base max-sm:text-center font-semibold font-poppins text-primary-foreground/70 justify-self-end">
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
      <div className="w-full h-screen overflow-scroll p-2 flex flex-col gap-4">
        <h3>Livres Physiques</h3>
        <div className="grid grid-cols-4 gap-4 w-full px-32 max-sm:px-8 ">
          {filteredData?.map((book) => (
            <div className="flex p-2 bg-primary/10 hover:bg-primary/30 rounded-md gap-4">
              <div className="min-w-[100px] h-fit overflow-hidden rounded-md bg-red-300">
                <Image
                  src='/B5.jpg'
                  alt="Book cover"
                  className=" object-cover w-full h-full"
                  width={50}
                  height={100}
                  priority
                />
              </div>
              <div className="flex flex-col justify-start mt-4">
                <Link href={`/livres/${book.slug}/${book.id}`} className="font-poppins font-bold text-[13px]">
                  {book.title}
                </Link>
                <p className=" text-[11px] font-poppins font-medium text-foreground/80 flex items-center gap-2">
                  {book.author} 
                  <span className=" w-1 h-1 rounded-full bg-foreground inline-block"></span>
                  {book.editing_year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhysicalBooksListPage;
