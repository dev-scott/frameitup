import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { cn, constructMetadata } from "@/lib/utils";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "../globals.css";
import Footer from "@/components/Footer";
import { nunito, goblin_one, playfair_Display } from "@/lib/font";
import TopBar from "@/components/topBar";

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        playfair_Display.className,
        nunito.className,
        // goblin_one.className,
      )}
    >
      <body className={cn("relative h-full  antialiased")}>
        <main className="relative flex flex-col min-h-screen">
          <Providers>
            <TopBar />

            <Navbar />
            <div className="flex-grow flex-1">{children}</div>
            <Footer />
          </Providers>
        </main>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
