import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Consize GPT | Resumenes de audio con IA",
  openGraph: {
    images: "https://hackmd.io/_uploads/SJBRUPUI2.png",
  },
  description: "Haz resúmenes de tus audios en unos segundos",
  keywords: "summary, chatgpt, gpt, gpt3, ai",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
