import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      <div className="hidden lg:flex justify-center items-center h-screen">
        <Image src='/reading_time.svg' alt="Reading Time Image" className="w-full object-contain" width={500} height={500}/>
      </div>
      <div className="h-screen flex justify-center items-center flex-col">
        {children}  
      </div>
    </div>
  );
}