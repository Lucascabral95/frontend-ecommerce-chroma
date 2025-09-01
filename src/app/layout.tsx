import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import TansTackQueryGlobal from "@/Insfraestructure/Tans-Tack-Query/TansTackQuery.global";
import Header from "@/production/Header/Header";
import Footer from "@/production/components/Footer/Footer";
import Subscribe from "@/production/Benefits/Subscribe/Subscribe";
import { StoreInitializer } from "@/providers/zustand.provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chroma",
  description: "Ecommerce platform",
  keywords: ["ecommerce", "shop", "store"],
  authors: [{ name: "Lucas Cabral" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen antialiased`}
      >
        <StoreInitializer>
          <TansTackQueryGlobal>
            <Header />
            <main className="grow">{children}</main>
            <Subscribe />
            <Footer />
          </TansTackQueryGlobal>
        </StoreInitializer>
      </body>
    </html>
  );
}
