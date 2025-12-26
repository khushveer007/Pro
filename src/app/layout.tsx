import type { Metadata } from "next";
import { Cinzel, Black_Ops_One } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const blackOpsOne = Black_Ops_One({
  variable: "--font-stencil",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const armyRust = localFont({
  src: "../../public/assets/fonts/ARMY RUST.ttf",
  variable: "--font-army",
  display: "swap",
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
  /* Combined font variables for global availability */
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${blackOpsOne.variable} ${armyRust.variable}`}>
        {children}
      </body>
    </html>
  );
}
