'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Tambahkan useRouter
import { useState } from 'react'; // Tambahkan useState

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  
  // State untuk menyimpan teks pencarian
  const [searchQuery, setSearchQuery] = useState('');

  // Jika URL saat ini adalah '/admin' atau '/login', jangan tampilkan Navbar
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
    return null;
  }

  // Fungsi untuk menangani saat pencarian di-submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Arahkan ke halaman berita dengan membawa parameter 'q' (query)
      router.push(`/berita?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(''); // Kosongkan kolom pencarian setelah dikirim
    }
  };

  // Fungsi pengecekan rute aktif
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  // Fungsi pengatur gaya (warna) menu
  const getLinkStyle = (path: string) => {
    return isActive(path)
      ? "text-gray-900 font-semibold border-b-2 border-[#d9a01e] pb-1"
      : "text-gray-600 hover:text-gray-900 font-medium pb-1 border-b-2 border-transparent transition-colors";
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Bagian Kiri: Logo & Menu Navigasi */}
          <div className="flex items-center space-x-10">
            <Link href="/" className="text-3xl font-extrabold text-[#5c4a11] tracking-tight">
              Kabarin
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <Link href="/" className={getLinkStyle('/')}>
                Beranda
              </Link>
              <Link href="/berita" className={getLinkStyle('/berita')}>
                Berita
              </Link>
              <Link href="/kategori" className={getLinkStyle('/kategori')}>
                Kategori
              </Link>
            </div>
          </div>

          {/* Bagian Kanan: Kolom Pencarian & Tombol Admin */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Ubah div menjadi form agar merespons tombol Enter */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari berita..."
                className="pl-4 pr-10 py-1.5 border border-gray-300 rounded-full text-sm w-64 focus:outline-none focus:ring-1 focus:ring-[#d9a01e]"
              />
              <button type="submit" className="absolute right-3 top-2 text-gray-500 hover:text-[#d9a01e] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            </form>

            <Link href="/login" className="bg-[#facc15] hover:bg-[#eab308] text-gray-900 font-semibold px-5 py-1.5 rounded-md text-sm transition-colors">
              Portal Admin
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}