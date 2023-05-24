import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans pt-16`}>
        <Navbar />
        <main className="flex min-h-screen w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export default AppLayout;