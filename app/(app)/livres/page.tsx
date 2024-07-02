import { Button } from "@/components/ui/button"

const BookHomePage = () => {
  return (
    <div>
      <div className="h-[45vh] flex justify-center items-center w-full mt-8 p-4">
        <div className="w-full h-[100%] bg-primary/50 flex flex-col justify-center items-center rounded-full gap-4 relative">
          <h1 className="text-7xl font-poppins text-background">Découvrez le monde des livres</h1>
          <p className="text-background/70">Find your next adventure, knowledge, and inspiration</p>
          <Button className="rounded-full bg-primary-foreground text-primary hover:text-primary-foreground">Explore now</Button>

          <div className="blob1 absolute -translate-x-1/2 left-[15%] -top-[10%]"></div>
          <div className="blob2 absolute -translate-x-1/2 -translate-y-1/2 left-[25%] top-[100%]"></div>
          <div className="blob3 absolute -translate-x-1/2 right-[15%] -top-[10%]"></div>
          <div className="blob4 absolute -translate-x-1/2 -translate-y-1/2 right-[5%] top-[100%]"></div>
        </div>
      </div>
    </div>
  )
}

export default BookHomePage