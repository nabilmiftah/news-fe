"use client"; // Tambahkan ini

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Tambahkan ini

export default function Footer() {
  const pathname = usePathname(); // Panggil fungsinya

  // Jika URL saat ini adalah '/login', jangan tampilkan Footer
  if (pathname === '/login') {
    return null;
  }

  return (
    <footer className="bg-[#eae8e1] text-gray-700 mt-10 border-t border-gray-300">
      <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-extrabold text-[#5c4a11] mb-1">Kabarin</h2>
          <p className="text-sm text-gray-600 font-medium">
            &copy; 2024 Kabarin News. Optimis yang Terinformasi.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex space-x-5 text-sm font-medium text-gray-600">
            <Link href="/tentang" className="hover:text-gray-900">Tentang Kami</Link>
            <Link href="/kontak" className="hover:text-gray-900">Kontak</Link>
            <Link href="/privasi" className="hover:text-gray-900">Kebijakan Privasi</Link>
            <Link href="/syarat" className="hover:text-gray-900">Syarat Layanan</Link>
          </div>

          <div className="flex space-x-3 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer hover:text-gray-900">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 cursor-pointer hover:text-gray-900">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
        </div>

      </div>
    </footer>
  );
}