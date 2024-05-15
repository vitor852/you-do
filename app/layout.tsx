import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { cn } from "@/_lib/utils";
import { BoardProvider } from "./_contexts/board";
import { Toaster } from "./_components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "todo",
  description: "your todo's",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen font-sans antialiased", inter.className)}
      >
        <BoardProvider>{children}</BoardProvider>
        <Toaster />
      </body>
    </html>
  );
}
