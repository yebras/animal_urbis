import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Navigation } from "@/components/navigation";
import { ChatAssistant } from "@/components/chat-assistant";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Animal Urbis - Tu compañero animal",
  description: "Web app para dueños de mascotas en España. Noticias animalescas, recursos legales y mucho más.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Animal Urbis",
  },
};

export const viewport: Viewport = {
  themeColor: "#F97316",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navigation />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <ChatAssistant />
        <Toaster />
      </body>
    </html>
  );
}
