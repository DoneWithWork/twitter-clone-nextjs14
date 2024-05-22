import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import Sidenav from "./_components/Sidenav";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Twitter Clone",
  description: "twitter clone made by DoneWithWork",

  openGraph: {
    type: "website",
    title: "Twitter Clone",
    url: "https://twitter-clone-nextjs14.vercel.app",
    description: "A Twitter Clone made by DoneWithWork",
    countryName: "Malaysia",
    locale: "en_MY",
    images: [
      {
        url: "https://cdn.pixabay.com/photo/2020/05/18/16/17/social-media-5187243_1280.png",
        width: 1200,
        height: 630,
        alt: "Twitter Clone",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background font-sans max-w-7xl mx-auto antialiased",
            fontSans.variable
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
