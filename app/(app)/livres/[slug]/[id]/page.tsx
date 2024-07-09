"use client";

import BookCommentForm from "@/components/BookCommentForm";
import BookShowSkeleton from "@/components/Skeletons/BookShowSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  askForLoan,
  canUserAskForLoan,
  deleteComment,
  getSpecificBook,
} from "@/lib/data/book";
import { useSpecificBook } from "@/services/queries";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUp,
  BookMarked,
  LibraryBig,
  SaveAll,
  Share2,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ShowBook = ({ params }: { params: { slug: string; id: string } }) => {
  const [canAskForLoan, setCanAskForLoan] = useState(false);

  const { book, isLoading, error } = getSpecificBook(params.id);
  const { mutate } = useSpecificBook(params.id);

  useEffect(() => {
    canUserAskForLoan({ article: parseInt(params.id), setCanAskForLoan });
  }, []);

  const handleDeleteComment = (article: number, comment: number) => {
    deleteComment({ article: article, comment: comment });
    mutate();
  };

  const handleAskForloan = async (id: number) => {
    await askForLoan({ article: id });
    await canUserAskForLoan({ article: id, setCanAskForLoan });
  };

  if (error) {
    return <div>Erreur de chargement des données</div>;
  }
  if (isLoading || !book) return <BookShowSkeleton />;

  const filename = book.file_path?.split('/')[2];
  console.log(filename);

  return (
    <div className="w-full h-auto pt-16 px-28 max-sm:px-0 bg-primary/5">
      <div className="grid grid-cols-[300px_300px_1fr] max-lg:grid-cols-[300px_300px] max-sm:grid-cols-1 p-4 h-72 justify-center">
        <div className="flex flex-col font-thin justify-center items-center gap-8 h-full max-sm:hidden">
          <Link
            href={"/livres/popins-two-good/15"}
            className=" w-14 h-14 rounded-full border border-muted flex justify-center items-center"
          >
            <ArrowUp className=" size-4 text-muted-foreground" />
          </Link>
          <Link
            href={"/livres/popins-two-good/15"}
            className=" w-14 h-14 rounded-full border border-muted flex justify-center items-center"
          >
            <ArrowDown className=" size-4 text-muted-foreground" />
          </Link>
        </div>
        <div className="relative">
          <Image
            src={"/B3.webp"}
            alt="Book Cover"
            className="absolute shadow-2xl h-[350px] max-lg:h-[250px] max-lg:w-[170px] max-sm:left-1/4"
            width={250}
            height={250}
          />
        </div>
        <div className=" pr-20  max-lg:col-span-2 max-lg:mt-32 max-sm:mt-[280px]">
          <h1 className="text-3xl font-poppins font-semibold mb-8">
            {book?.title}
          </h1>
          <p className="font-medium font-poppins text-muted-foreground mb-8">
            {book?.author}
          </p>
          <div className="text-xs max-w-[700px] font-poppins text-muted-foreground/80   flex flex-wrap gap-4">
            {book.keywords
              ? book.keywords.map((keyword) => <Badge>{keyword.keyword}</Badge>)
              : "Pas de mots clés pour ce livre"}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full py-8 bg-background rounded-md px-12 max-lg:mt-56">
        <div className="flex justify-end">
          <div className="flex justify-between gap-4 w-[500px]">
            {book.is_physical && book.has_ebooks ? (
              <>
                <Button
                  className="gap-2 rounded-3xl bg-primary/70"
                  disabled={!canAskForLoan}
                  onClick={() => handleAskForloan(book.id)}
                >
                  Demander un prêt
                  <LibraryBig className="size-[16px]" />
                </Button>
                <Link href={`/livres/epub-reader/${filename}`} className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors gap-2 rounded-3xl bg-primary/70 px-4 hover:bg-primary/90">
                  Commencer la lecture
                  <BookMarked className="size-[16px]" />
                </Link>
              </>
            ) : book.is_physical ? (
              <Button
                  className="gap-2 rounded-3xl bg-primary/70"
                  disabled={!canAskForLoan}
                  onClick={() => handleAskForloan(book.id)}
                >
                  Demander un prêt
                  <LibraryBig className="size-[16px]" />
                </Button>
            ) : (
              <Button className="gap-2 rounded-3xl bg-primary/70">
                Commencer la lecture
                <BookMarked className="size-[16px]" />
              </Button>
            )}
            <div className=" flex gap-3">
              <Button className="bg-muted/50 text-foreground hover:bg-muted/80 transition-colors bg cursor-pointer w-10 h-10 flex justify-center items-center rounded-full p-1">
                <SaveAll className="size-[18px]" />
              </Button>
              <Button className="bg-muted/50 text-foreground hover:bg-muted/80 transition-colors bg cursor-pointer w-10 h-10 flex justify-center items-center rounded-full p-1">
                <Share2 className="size-[18px]" />
              </Button>
              <Button className="bg-muted/50 text-foreground hover:bg-muted/80 transition-colors bg cursor-pointer w-10 h-10 flex justify-center items-center rounded-full p-1">
                <ArrowDownToLine className="size-[18px]" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 max-lg:grid-cols-1 mt-16">
          <div className="flex gap-4 flex-col px-10 max-sm:px-0">
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-base font-poppins mb-1">Résumé</h3>
              <p className="text-sm text-muted-foreground font-normal font-poppins leading-relaxed">
                {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis itaque optio eum fuga magnam. A consectetur libero sint error accusamus illo quia quisquam ipsum similique incidunt odio voluptates adipisci provident enim possimus dolorem nam quibusdam quae, dignissimos dolores id quis. Itaque neque molestiae iure odio ea nihil distinctio, quidem minima. */}
                {book?.summary}
              </p>
              {/* <p className='text-sm text-muted-foreground font-normal font-poppins'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est enim dolore culpa accusamus voluptates? Iste quam doloribus, soluta porro nihil obcaecati accusantium delectus aperiam iure ducimus repudiandae quisquam assumenda saepe.
              </p> */}
            </div>
          </div>

          <div className="flex gap-4 flex-col px-10 max-sm:px-0">
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-base font-poppins mb-1">Editeur</h3>
              <p className="text-sm text-muted-foreground font-normal font-poppins">
                {book?.editor}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-base font-poppins mb-1">
                Année d'édition
              </h3>
              <p className="text-sm text-muted-foreground font-normal font-poppins">
                {book?.editing_year}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-base font-poppins mb-1">ISBN</h3>
              <p className="text-sm text-muted-foreground font-normal font-poppins">
                {book?.ISBN}
              </p>
            </div>
          </div>

          <Card className="bg-primary/10 mt-6">
            <CardHeader>
              <CardTitle>Commentaires</CardTitle>
              <CardDescription>
                Découvrez l'avis des autres sur ce livre et donnez le votre.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] p-2 space-y-2 overflow-y-scroll scroll-smooth scroll-py-4 card">
              {book?.comments?.map((comment) => (
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="border bg-card text-card-foreground rounded-md p-1 max-w-[300px] w-fit">
                    <p className="text-xs font-light">{comment.content}</p>
                  </div>

                  {/* {user.id === comment.user_id ? ( */}
                  <Button
                    onClick={() => handleDeleteComment(book.id, comment.id)}
                    className="bg-muted text-muted-foreground rounded-full p-1 flex justify-center items-center self-end hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer size-5"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                  {/* ) : (
                    ""
                  )} */}
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <BookCommentForm id={params.id} />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
