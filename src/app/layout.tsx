import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/site/Navbar";
import Footer from "./components/site/Footer";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-mono" });



export const metadata: Metadata = {
  title: "Gannah Eltonsy - Ecommerce",
  description: "Next.js e-commerce final project from route by Gannah Eltonsy",
  
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="min-h-screen flex flex-col justify-between">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
    </>
  );
}
