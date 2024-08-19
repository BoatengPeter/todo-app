import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    template: " dashboard | %s Todos ",
    default: "Todo App",
  },
  description: "Todo App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <ClerkProvider>

      <html lang="en" className={`${GeistSans.variable}`}>

        <body>
          <Toaster />
          {children}
        </body>
      </html>
    </ClerkProvider>

  );
}
