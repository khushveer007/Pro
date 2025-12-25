import type { Metadata } from "next";
import { Cinzel, Black_Ops_One } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const blackOpsOne = Black_Ops_One({
  variable: "--font-stencil",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Pro | Projections",
  description: "Professional portfolio and projection showcase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${blackOpsOne.variable}`}>
        {children}
      </body>
    </html>
  );
}
