import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const APP_NAME = "Take Home | AVANTI";
const APP_DESCRIPTION = "Take home assignment for Avanti";

export function metadata() {
  return {
    applicationName: APP_NAME,
    description: APP_DESCRIPTION,
    keywords: [
      "AVANTI",
      "Take Home",
      "Gallery",
      "e-commerce",
      "shop",
      "store",
      "galeria AVANTI",
    ],
    authors: [{ name: "Stephan" }],
    colorScheme: "dark",
    creator: "Stephan",
    manifest: "/manifest.json",
    metadataBase: new URL("https://avanti-take-home.vercel.app"),
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: APP_NAME,
    },
    formatDetection: {
      telephone: false,
    },
    openGraph: {
      type: "website",
      siteName: APP_NAME,
      title: APP_NAME,
      description: APP_DESCRIPTION,
    },
    twitter: {
      card: "summary",
      title: APP_NAME,
      description: APP_DESCRIPTION,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans pt-16 bg-white`}>
        <Navbar />
        <main className="flex min-h-screen w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
