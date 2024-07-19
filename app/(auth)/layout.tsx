import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-2 h-screen">
        <div className="hidden lg:flex flex-col gap-4 justify-center items-center h-full bg-primary/5 rounded-lg">
          <div className="h-40 w-full flex gap-4 justify-center items-center">
            <h1 className="text-3xl font-poppins font-semibold">Bienvenue sur </h1>
            <div className="font-semibold text-primary-foreground bg-primary/0 cursor-pointer flex gap-1 items-center h-1/2 p-1 rounded-md max-sm:hidden">
              <Image
                src="/LogoEneam.png"
                className="size-16"
                alt="EneamLogo"
                width={50}
                height={50}
              />
              <div className="text-4xl">
                <span className="text-primary font-bold text-5xl font-alexana">
                  E
                </span>
                <span>Biblio</span>
              </div>
            </div>
          </div>
          <div className="">
            <Image
              src="/reading_time.svg"
              alt="Reading Time Image"
              className="object-contain"
              width={800}
              height={800}
              priority
            />
          </div>
        </div>
        <div className="h-full flex justify-center items-center flex-col">
          {children}
        </div>
      </div>
    </>
  );
}
