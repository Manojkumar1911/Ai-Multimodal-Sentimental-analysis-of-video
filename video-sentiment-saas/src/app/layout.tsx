import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "~/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Sentiment Analysis",
  description: "Sentiment Analysis",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}