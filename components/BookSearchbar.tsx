import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BookText, Calendar, Captions, CircleUser, Key, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Book } from "@/types/book";

const BookSearchbar = ({book, setFilteredData}: {book: Book[], setFilteredData: Dispatch<SetStateAction<Book[]>>}) => {
  const [query, setQuery] = useState({
    title: "",
    author: "",
    year: "",
  });
  const [data, setData] = useState(book);
  useEffect(() => {
    console.log('Monter');
    setFilteredData(book)
  }, [])
  
  
  // setFilteredData(book)
  // const [filteredData, setFilteredData] = useState(book);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setQuery({
      ...query,
      [name]: value,
    });
  };

  useEffect(() => {
    const filtered = data.filter((item) => {
      return (
        item.title.toLowerCase().includes(query.title.toLowerCase()) &&
        item.author.toLowerCase().includes(query.author.toLowerCase()) &&
        item.editor.toLowerCase().includes(query.year.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }, [query, data]);

  // console.log(filteredData)

  return (
    <div className="bg-white rounded-lg shadow-lg w-3/4 py-1 px-1">
      <form
        action=""
        className="flex max-sm:flex-col w-full gap-4 items-center"
      >
        <div className="flex max-sm:flex-col flex-1 gap-2 items-center max-sm:w-full">
          <div className="flex flex-1 h-14 justify-evenly items-center gap-2 relative max-sm:w-full">
            <BookText className="absolute left-1 font-bold text-foreground/80" />
            <Input
              className="border-none pl-10 outline-none focus-visible:ring-ring"
              placeholder="Titre du livre"
              name="title"
              value={query.title}
              onChange={handleInputChange}
            />
          </div>

          <Separator
            orientation="vertical"
            className="w-[2px] h-[35px] max-sm:hidden"
          />
          <Separator
            orientation="horizontal"
            className="w-[80%] h-[2px] sm:hidden"
          />

          <div className="flex flex-1 h-14 justify-evenly items-center gap-2 relative max-sm:w-full">
            <CircleUser className="absolute left-1 font-bold text-foreground/80" />
            <Input
              className="border-none pl-10 outline-none focus-visible:ring-ring"
              placeholder="Auteur"
              name="author"
              value={query.author}
              onChange={handleInputChange}
            />
          </div>

          <Separator
            orientation="vertical"
            className="w-[2px] h-[35px] max-sm:hidden"
          />
          <Separator
            orientation="horizontal"
            className="w-[80%] h-[2px] sm:hidden"
          />

          <div className="flex flex-1 h-14 justify-evenly items-center gap-2 relative max-sm:w-full">
            <Key className="absolute left-1 font-bold text-foreground/80" />
            {/* <Select
              value={query.title}
              onValueChange={handleInputChange}
            >
              <SelectTrigger className="border-none pl-10 outline-none focus:ring-ring focus-visible:ring-ring">
                <SelectValue placeholder="Mots Clés" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="licence">Licence</SelectItem>
                <SelectItem value="master">Master</SelectItem>
                <SelectItem value="doctorat">Doctorat</SelectItem>
              </SelectContent>
            </Select> */}
            <Input
              className="border-none pl-10 outline-none focus-visible:ring-ring"
              placeholder="Auteur"
              name="year"
              value={query.year}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Button className="h-14 max-sm:h-10 max-sm:w-full">Rechercher</Button>
      </form>
    </div>
  );
};

export default BookSearchbar;
