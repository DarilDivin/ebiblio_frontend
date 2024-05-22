import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'
import {Poppins} from 'next/font/google'

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

const alexana = localFont({
  src: '../Alexana.ttf',
  display: 'swap',
  variable: '--font-alexana',
})

export const metadata: Metadata = {
  title: "EBiblio",
  description: "A digital library for Eneam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${alexana.variable}`}>{children}</body>
    </html>
  );
}
