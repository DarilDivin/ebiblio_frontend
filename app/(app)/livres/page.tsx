"use client";

import { Button } from "@/components/ui/button";
import { getAllBooks } from "@/lib/data/book";
import { ArrowBigRight, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BookHomePage = () => {
  const { booksMostViewed, isLoading, error } = getAllBooks();

  return (
    <div className="flex flex-col gap-4">
      <div className="h-[45vh] mb-28 flex  justify-center items-center w-full mt-8 p-4">
        <div className="w-full h-[100%] bg-primary/50 flex flex-col justify-center items-center rounded-full gap-4 relative">
          <h1 className="text-4xl w-[900px] text-center font-poppins text-background">
            Votre Ressource Ultime pour la Connaissance et la Recherche
            Académique
          </h1>
          <p className="text-background/70 w-[500px] text-center">
            Explorez une vaste collection de mémoires, de thèses, de livres et
            de ressources numériques. Accédez facilement aux informations dont
            vous avez besoin pour exceller dans vos études et recherches.
          </p>
          <Button className="rounded-full bg-primary-foreground text-foreground dark:text-background hover:bg-secondary hover:text-accent">
            Explore now
          </Button>

          <div className="blob1 absolute -translate-x-1/2 left-[15%] -top-[10%]"></div>
          <div className="blob2 absolute -translate-x-1/2 -translate-y-1/2 left-[25%] top-[100%]"></div>
          <div className="blob3 absolute -translate-x-1/2 right-[15%] -top-[10%]"></div>
          <div className="blob4 absolute -translate-x-1/2 -translate-y-1/2 right-[5%] top-[100%]"></div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-8 xl:px-12 max-lg:px-8">
        <h3 className="font-poppins font-bold text-3xl">Les plus consultés</h3>
        {error && (
          <div className="w-full h-60 flex justify-center items-center">
            <p>Erreur de chagement des données</p>
          </div>
        )}

        {isLoading || !booksMostViewed ? (
          <div className="w-full h-60 flex justify-center items-center">
            <p>Chargement...</p>
          </div>
        ) : (
          <>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 max-lg:grid-cols-4 max-sm:grid-cols-2 gap-4 w-full mb-8">
              {booksMostViewed?.map((book) => (
                <div className="flex max-lg:flex-col p-2 bg-primary/10 hover:bg-primary/15 rounded-md gap-4">
                  <div className="min-w-[100px] h-fit overflow-hidden rounded-md bg-red-300">
                    <Image
                      // src="/B5.jpg"
                      src={`http://localhost:8000/api/books-covers/${book.thumbnail_path?.split('/')[2]}`}
                      alt="Book cover"
                      className=" object-cover w-full h-full"
                      width={500}
                      height={500}
                      priority
                    />
                  </div>
                  <div className="flex flex-col justify-start mt-4 relative flex-grow">
                    <Link
                      href={`/livres/${book.slug}/${book.id}`}
                      className="font-poppins font-bold text-[14px]"
                    >
                      {book.title}
                    </Link>
                    <p className=" text-[11px] font-poppins font-medium text-foreground/70 flex items-center gap-2">
                      {book.author}
                      <span className=" w-1 h-1 rounded-full bg-foreground inline-block"></span>
                      {book.editing_year}
                    </p>
                    <p className="text-xs text-foreground/50">
                      <span className="line-clamp-2">{book.summary}</span>
                      <Link
                        href={`/livres/${book.slug}/${book.id}`}
                        className="underline hover:text-foreground"
                      >
                        lire plus
                      </Link>
                    </p>

                    <Link
                      href={`/livres/${book.slug}/${book.id}`}
                      className=" group w-8 hover:w-fit h-8 flex justify-center items-center absolute bottom-0 right-0 rounded-md text-primary justify-self-end self-end p-1 bg-transparent hover:bg-primary/20 transition-[width] duration-700"
                    >
                      <Plus className="size-4 group-hover:mr-1" />
                      <p className="hidden invisible group-hover:visible group-hover:inline">
                        Voir plus
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 w-full justify-end items-center mb-8">
              <Link
                className="p-1 rounded-md bg-primary/70 hover:bg-primary transition-all flex gap-2 hover:gap-4 text-primary-foreground"
                href={"/livres/physiques"}
              >
                {" "}
                Voir la liste complète des livres physiques <ChevronRight />
              </Link>
              <Link
                className="p-1 rounded-md bg-primary/70 hover:bg-primary transition-all flex gap-2 hover:gap-4 text-primary-foreground"
                href={"/livres/ebooks"}
              >
                {" "}
                Voir la liste complète des ebooks <ChevronRight />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookHomePage;
