import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import ContextWrapper from "@/components/ContextWrapper";

const dmsans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stock Manager",
  applicationName: "Xenos",
  authors: [
    {
      name: "Michael Christwin",
      url: "https://github.com/michaelchristwin",
    },
  ],
  description: "An inventory management REST application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ContextWrapper>
        <body className={dmsans.className}>
          <Toaster />
          <Navbar />
          <div>{children}</div>
        </body>
      </ContextWrapper>
    </html>
  );
}
