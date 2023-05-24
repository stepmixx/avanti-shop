import Navbar from "@/components/layout/navbar";
import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Take Home | AVANTI",
  description: "Take home assignment for Avanti",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans pt-16`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
