import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Consize GPT | Resúmenes de Audio con IA",
  description: "Haz resúmenes de tus audios en unos segundos",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Providers>
  );
}
