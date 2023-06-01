import { Header } from "@/components";
import styles from "./landing.module.css";
import { Metadata } from "next";

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

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.landingLayout}>
      <Header />
      {children}
    </div>
  );
}
