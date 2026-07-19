import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Menggunakan font Inter yang bersih dan modern
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VibeNews - Portal Berita Digital",
  description: "Dapatkan berita terbaru dan terpercaya hanya di VibeNews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen text-gray-900`}>
        {/* Navbar akan selalu muncul di atas */}
        <Navbar />
        
        {/* Konten halaman spesifik (Beranda, Detail, dll) akan masuk ke sini */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer akan selalu berada di paling bawah */}
        <Footer />
      </body>
    </html>
  );
}