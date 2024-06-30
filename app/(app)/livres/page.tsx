import { Button } from "@/components/ui/button"

const BookHomePage = () => {
  return (
    <div>
      <div className="h-[45vh] relative flex justify-center items-center w-full mt-8 p-4">
        <div className="w-full h-[90%] bg-primary/50 flex flex-col justify-center items-center rounded-full gap-4">
          <h1 className=" text-8xl font-poppins ">Discover a World of Books</h1>
          <p>Find your next adventure, knowledge, and inspiration</p>
          <Button className="rounded-full bg-foreground text-primary">Explore now</Button>

          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default BookHomePage