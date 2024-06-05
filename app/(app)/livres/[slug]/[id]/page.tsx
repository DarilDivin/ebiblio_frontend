import BookCommentForm from '@/components/BookCommentForm'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowDown, ArrowDownToLine, ArrowUp, BookMarked, SaveAll, Share2, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ShowBook = ({ params }: {params: { slug: string, id: string }}) => {
  return (
    <div className='w-full h-auto pt-16 px-28 bg-primary/5'>
      <div className='grid grid-cols-[300px_300px_1fr] p-4 h-72 justify-center'>
        <div className='flex flex-col font-thin justify-center items-center gap-8 h-full'>
          <Link href={'/livres/popins-two-good/15'} className=' w-14 h-14 rounded-full border border-muted flex justify-center items-center'>
            <ArrowUp className=' size-4 text-muted-foreground' />
          </Link>
          <Link href={'/livres/popins-two-good/15'} className=' w-14 h-14 rounded-full border border-muted flex justify-center items-center'>
            <ArrowDown className=' size-4 text-muted-foreground' />
          </Link>
        </div>
        <div className='relative'>
          <Image src={'/B3.webp'} alt='Book Cover' className='absolute shadow-2xl h-[350px]' width={250} height={250}/>
        </div>
        <div className=' pr-20'>
          <h1 className='text-3xl font-poppins font-semibold mb-8'>Algorithmique pour les nuls</h1>
          <p className='font-medium font-poppins text-muted-foreground mb-8'>JK Rowling</p>
          <p className='text-xs max-w-[500px] font-poppins text-muted-foreground/80'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus numquam in quod quam eligendi omnis doloribus consectetur sit eaque tempora.
          </p>
        </div>
      </div>
      <div className='flex flex-col w-full py-8 bg-background rounded-md px-12'>
        <div className='flex justify-end'>
          <div className='flex justify-between gap-4 w-[500px]'>
            <Button className='gap-2 rounded-3xl'>Commencer la lecture 
              <BookMarked className='size-[16px]'/>
            </Button>
            <div className=' flex gap-3'>
              <Button className='bg-muted/50 text-foreground hover:bg-muted/80 transition-colors bg cursor-pointer w-10 h-10 flex justify-center items-center rounded-full p-1'>
                <SaveAll className='size-[18px]'/>
              </Button>
              <Button className='bg-muted/50 text-foreground hover:bg-muted/80 transition-colors bg cursor-pointer w-10 h-10 flex justify-center items-center rounded-full p-1'>
                <Share2 className='size-[18px]'/>
              </Button>
              <Button className='bg-muted/50 text-foreground hover:bg-muted/80 transition-colors bg cursor-pointer w-10 h-10 flex justify-center items-center rounded-full p-1'>
                <ArrowDownToLine className='size-[18px]'/>
              </Button>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 mt-16'>
          <div className='flex gap-4 flex-col px-10'>
            <div className='flex flex-col gap-4'>
              <h3 className='font-bold text-base font-poppins mb-3'>Résumé</h3>
              <p className='text-sm text-muted-foreground font-normal font-poppins'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis itaque optio eum fuga magnam. A consectetur libero sint error accusamus illo quia quisquam ipsum similique incidunt odio voluptates adipisci provident enim possimus dolorem nam quibusdam quae, dignissimos dolores id quis. Itaque neque molestiae iure odio ea nihil distinctio, quidem minima.
              </p>
              <p className='text-sm text-muted-foreground font-normal font-poppins'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est enim dolore culpa accusamus voluptates? Iste quam doloribus, soluta porro nihil obcaecati accusantium delectus aperiam iure ducimus repudiandae quisquam assumenda saepe.
              </p>
            </div>
          </div>

          <div className='flex gap-4 flex-col px-10'>
            <div className='flex flex-col gap-4'>
              <h3 className='font-bold text-base font-poppins mb-3'>Editeur</h3>
              <p className='text-sm text-muted-foreground font-normal font-poppins'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis itaque optio eum fuga magnam.
              </p>
            </div>
            <div className='flex flex-col gap-4'>
              <h3 className='font-bold text-base font-poppins mb-3'>Langue</h3>
              <p className='text-sm text-muted-foreground font-normal font-poppins'>
                Lorem ipsum dolor
              </p>
            </div>
            <div className='flex flex-col gap-4'>
              <h3 className='font-bold text-base font-poppins mb-3'>Editors</h3>
              <p className='text-sm text-muted-foreground font-normal font-poppins'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis itaque optio eum fuga magnam.
              </p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Commentaires</CardTitle>
              <CardDescription>Découvrez l'avis des autres sur ce livre et donnez le votre.</CardDescription>
            </CardHeader>
            <CardContent className='h-[400px] p-2 space-y-2'>
              <div className='flex gap-2'>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='border bg-card text-card-foreground rounded-md p-1 max-w-[300px] w-fit'>
                  <p className='text-xs font-light'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam dolores eius incidunt dolorem ipsa ut officiis temporibus distinctio voluptas porro.
                  </p>
                </div>
                <Button className='bg-muted text-muted-foreground rounded-full p-1 flex justify-center items-center self-end hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer size-5'>
                  <Trash2 className='size-4'/>
                </Button>
              </div>
              <div className='flex gap-2'>
                <Avatar>
                  <AvatarImage src="https://github.om/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='border bg-card text-card-foreground rounded-md p-1 max-w-[300px] w-fit'>
                  <p className='text-xs font-light'>
                    Lorem ipsum dolor sit. 
                  </p>
                </div>
                <Button className='bg-muted text-muted-foreground rounded-full p-1 flex justify-center items-center self-end hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer size-5'>
                  <Trash2 className='size-4'/>
                </Button>
              </div>
              <div className='flex gap-2'>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='border bg-card text-card-foreground rounded-md p-1 max-w-[300px] w-fit'>
                  <p className='text-xs font-light'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit..
                  </p>
                </div>
                <Button className='bg-muted text-muted-foreground rounded-full p-1 flex justify-center items-center self-end hover:bg-destructive hover:text-destructive-foreground transition-colors cursor-pointer size-5'>
                  <Trash2 className='size-4'/>
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <BookCommentForm id='3      '/>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ShowBook