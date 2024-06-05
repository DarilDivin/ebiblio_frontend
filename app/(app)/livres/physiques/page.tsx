import Image from 'next/image'
import BookPic from '../../../../public/B3.webp'

const PhysicalBooksListPage = () => {
  return (
    <div className="p-2">
      <div className="h-[55vh] max-sm:h-[35vh] w-full bg-green-50 grid grid-cols-2 max-md:grid-cols-[400px_1fr] max-sm:grid-cols-1 justify-center items-center px-52 max-md:px-10 max-sm:px-12 pt-8 rounded-lg mb-4">
        <div>
          <p className="text-[2.5rem] max-sm:text-[1.5rem] max-sm:text-center font-bold font-poppins text-primary justify-self-end ">Vous chercher un livre en particulier ?</p>
          <p className="text-base max-sm:text-base max-sm:text-center font-semibold font-poppins text-primary-foreground/70 justify-self-end">
            Effectuer une recherche parmis les livres disponibles en version papier de l'Eneam. Vous pouvez ensuite vous rendre à l'Eneam pour les consulter directement ou effectuer un demande de prêt en ligne pour le lire chez vous en toute tranquilité.
          </p>
        </div>
        <div className="h-full overflow-hidden max-sm:hidden" >
          <Image src={'/bookshelves.svg'} alt="Searching File Image" className="object-contain w-full h-full" width={800} height={800} priority/>
        </div>
      </div>

      <div className='w-full bg-blue-100 p-2 flex flex-col gap-4'>
        <h3>Livres Physiques</h3>
        <div className='grid grid-cols-5 w-full '>
          <div className=' flex flex-col p-2'>
            <div className='w-[180px] h-fit overflow-hidden rounded-md bg-red-300'>
              <Image src={BookPic} alt='Book cover' className='object-contain w-full h-full' width={50} height={100} priority/>
            </div>
            <div>
              <h4 className='font-poppins font-bold text-sm'>The Swallow</h4>
              <p className=' text-xs font-medium text-foreground/80'>Steve Krug</p>
            </div>
          </div>
          <div className=' flex flex-col p-2'>
            <div className='w-[180px] h-fit overflow-hidden rounded-md bg-red-300'>
              <Image src={BookPic} alt='Book cover' className='object-contain w-full h-full' width={50} height={100} priority/>
            </div>
            <div>
              <h4 className='font-poppins font-bold text-sm'>The Swallow</h4>
              <p className=' text-xs font-medium text-foreground/80'>Steve Krug</p>
            </div>
          </div>
          <div className=' flex flex-col p-2'>
            <div className='w-[180px] h-fit overflow-hidden rounded-md bg-red-300'>
              <Image src={BookPic} alt='Book cover' className='object-contain w-full h-full' width={50} height={100} priority/>
            </div>
            <div>
              <h4 className='font-poppins font-bold text-sm'>The Swallow</h4>
              <p className=' text-xs font-medium text-foreground/80'>Steve Krug</p>
            </div>
          </div>
          <div className=' flex flex-col p-2'>
            <div className='w-[180px] h-fit overflow-hidden rounded-md bg-red-300'>
              <Image src={BookPic} alt='Book cover' className='object-contain w-full h-full' width={50} height={100} priority/>
            </div>
            <div>
              <h4 className='font-poppins font-bold text-sm'>The Swallow</h4>
              <p className=' text-xs font-medium text-foreground/80'>Steve Krug</p>
            </div>
          </div>
          <div className=' flex flex-col p-2'>
            <div className='w-[180px] h-fit overflow-hidden rounded-md bg-red-300'>
              <Image src={BookPic} alt='Book cover' className='object-contain w-full h-full' width={50} height={100} priority/>
            </div>
            <div>
              <h4 className='font-poppins font-bold text-sm'>The Swallow</h4>
              <p className=' text-xs font-medium text-foreground/80'>Steve Krug</p>
            </div>
          </div>
          <div className=' flex flex-col p-2'>
            <div className='w-[180px] h-fit overflow-hidden rounded-md bg-red-300'>
              <Image src={BookPic} alt='Book cover' className='object-contain w-full h-full' width={50} height={100} priority/>
            </div>
            <div>
              <h4 className='font-poppins font-bold text-sm'>The Swallow</h4>
              <p className=' text-xs font-medium text-foreground/80'>Steve Krug</p>
            </div>
          </div>
          <div className=' flex flex-col p-2'>
            <div className='w-[180px] h-fit overflow-hidden rounded-md bg-red-300'>
              <Image src={BookPic} alt='Book cover' className='object-contain w-full h-full' width={50} height={100} priority/>
            </div>
            <div>
              <h4 className='font-poppins font-bold text-sm'>The Swallow</h4>
              <p className=' text-xs font-medium text-foreground/80'>Steve Krug</p>
            </div>
          </div>
          <div className=' flex flex-col p-2'>
            <div className='w-[180px] h-fit overflow-hidden rounded-md bg-red-300'>
              <Image src={BookPic} alt='Book cover' className='object-contain w-full h-full' width={50} height={100} priority/>
            </div>
            <div>
              <h4 className='font-poppins font-bold text-sm'>The Swallow</h4>
              <p className=' text-xs font-medium text-foreground/80'>Steve Krug</p>
            </div>
          </div>
          <div className=' flex flex-col p-2'>
            <div className='w-[180px] h-fit overflow-hidden rounded-md bg-red-300'>
              <Image src={BookPic} alt='Book cover' className='object-contain w-full h-full' width={50} height={100} priority/>
            </div>
            <div>
              <h4 className='font-poppins font-bold text-sm'>The Swallow</h4>
              <p className=' text-xs font-medium text-foreground/80'>Steve Krug</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PhysicalBooksListPage