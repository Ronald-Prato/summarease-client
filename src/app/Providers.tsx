"use client";

import "./globals.css";
import { Provider as StoreProvider } from "react-redux";

import { store } from "@/store";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <StoreProvider store={store}>{children}</StoreProvider>;
}
