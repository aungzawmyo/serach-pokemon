import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; 
import ApolloProviderWrapper from "@/lib/ApolloProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokemon Search",
  description: "Search for your favorite Pokemon and its details",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="w-full bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Pokemon Search</h1>
          </div>
        </header>

        <ApolloProviderWrapper>{children}</ApolloProviderWrapper>
      
        <footer className="flex  bg-gray-200 flex-wrap items-center justify-center w-full">
          <div className="w-full  text-center p-4 mt-auto">
            <div className="container mx-auto">
              <p className="text-sm text-gray-600">©2025 Pokemon Search.</p>
            </div>
          </div>
        </footer>
        </body>
    </html>
  );
}