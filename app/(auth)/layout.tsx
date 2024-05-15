import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
      <div className="hidden lg:flex justify-center items-center h-screen">
        <div className="">
          <Image src='/reading_time.svg' alt="Reading Time Image" className="object-contain" width={800} height={800} priority/>
        </div>
      </div>
      <div className="h-screen flex justify-center items-center flex-col">
        {children}  
      </div>
    </div>
  );
}