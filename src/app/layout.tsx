import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/navbar/Header";
import Footer from "@/components/layout/Footer/Footer";
import { ToastContainer } from "react-toastify";
import { getUserSession } from "@/services/core/session";
import { BottomNav } from "@/components/navbar/BottomNav";
import { UserSession } from "@/interface/user/userSession";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "milbe",
  description: "Share and discover books in your community",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserSession() as UserSession;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <BottomNav />
        <Footer />

        <ToastContainer />
      </body>
    </html>
  );
}