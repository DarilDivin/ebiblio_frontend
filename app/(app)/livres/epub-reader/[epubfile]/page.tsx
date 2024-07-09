// pages/read-epub.js
import EpubReader from "@/components/EpubReader";


const ReadEpubPage = ({ params }: { params: { epubfile: string } }) => {
  // const fileUrl = '/epubs/epub.epub'; // URL vers votre fichier EPUB
  const fileUrl = `http://localhost:8000/api/epub/${params.epubfile}`; // URL vers votre fichier EPUB

  // console.log(fileUrl);
  
  return (
    <div>
      <h1>Read EPUB</h1>
      <EpubReader fileUrl={fileUrl} />
    </div>
  );
};

export default ReadEpubPage;
