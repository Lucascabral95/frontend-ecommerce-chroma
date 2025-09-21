"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { usePathname } from "next/navigation";
import "@/app/globals.css";
import TansTackQueryGlobal from "@/Insfraestructure/Tans-Tack-Query/TansTackQuery.global";
import Header from "@/production/Header/Header";
import Footer from "@/production/components/Footer/Footer";
import Subscribe from "@/production/Benefits/Subscribe/Subscribe";
import { StoreInitializer } from "@/providers/zustand.provider";
import MarqueeBanner from "@/production/components/Marquee/Maraquee";
import ReactHelmetAsyncProvider from "@/providers/react-helmet-async";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ADMIN_BASE_ROUTE = "/api/dashboard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith(ADMIN_BASE_ROUTE);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen antialiased`}
      >
        <ReactHelmetAsyncProvider>
          <StoreInitializer>
            <TansTackQueryGlobal>
              {!isAdminRoute && <MarqueeBanner />}
              {!isAdminRoute && <Header />}
              <main className="grow">{children}</main>
              {!isAdminRoute && <Subscribe />}
              {!isAdminRoute && <Footer />}
            </TansTackQueryGlobal>
          </StoreInitializer>
        </ReactHelmetAsyncProvider>
      </body>
    </html>
  );
}
