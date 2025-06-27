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
    <main className="  relative flex flex-col  min-h-screen">
      <Providers>
        <TopBar />

        <Navbar />
        <div className="h-full">{children}</div>
        <Footer />
        <Toaster position="top-center" richColors />
      </Providers>
    </main>
  );
}
