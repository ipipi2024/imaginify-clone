import type { Metadata } from "next";
import IBM_Plex_Sans from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const IBMPlex = IBM_Plex_Sans({
  src: "./fonts/GeistVF.woff",
  variable: "--font-ibm-plex",
  weight: "400 500 600 700 100 900",
});
// const geistMono = IBM_Plex_Sans({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-ibm-plex",
//   weight: "400 500 600 700 100 900",
// });

export const metadata: Metadata = {
  title: "Imaginify",
  description: "An AI-powered image generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables: { colorPrimary: '#624cf5'}
    }}>
      <html lang="en">
        <body className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
