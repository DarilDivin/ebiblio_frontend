// pages/read-epub.js
import EpubReader from "@/components/EpubReader";


const ReadEpubPage = () => {
  const fileUrl = '/epubs/epub.epub'; // URL vers votre fichier EPUB

  return (
    <div>
      <h1>Read EPUB</h1>
      <EpubReader fileUrl={fileUrl} />
    </div>
  );
};

export default ReadEpubPage;
