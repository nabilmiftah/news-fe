"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // State untuk mengontrol visibilitas sidebar di perangkat seluler
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fungsi untuk menutup sidebar saat menu diklik (khusus mobile)
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-[#f9f9f9] relative overflow-hidden">
      
      {/* ================= OVERLAY GELAP (KHUSUS MOBILE) ================= */}
      {/* Muncul di belakang sidebar saat terbuka, berfungsi untuk menutup sidebar jika diklik */}
      {isSidebarOpen && (
        <div 
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
        />
      )}

      {/* ================= BILAH SISI (SIDEBAR) ================= */}
      {/* Menggunakan transform -translate-x-full untuk menyembunyikan di luar layar pada mobile, 
          dan translate-x-0 untuk menampilkannya secara permanen di layar md (tablet/desktop) */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#f8f7f4] border-r border-gray-200 flex flex-col justify-between flex-shrink-0
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}
      >
        {/* Bagian Atas: Logo & Menu */}
        <div>
          <div className="p-8 flex justify-between items-center">
            <h1 className="text-4xl font-extrabold text-[#75621e] tracking-tight">Kabarin</h1>
            {/* Tombol Tutup Silang (Khusus Mobile) */}
            <button onClick={closeSidebar} className="md:hidden text-gray-500 hover:text-red-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="flex flex-col gap-2 px-4">
            <Link onClick={closeSidebar} href="/admin" className="flex items-center gap-3 bg-[#facc15] text-gray-900 px-4 py-3 rounded-lg font-bold shadow-sm">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              Dashboard
            </Link>
            <Link onClick={closeSidebar} href="/admin/tambah-berita" className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 px-4 py-3 rounded-lg font-medium transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Tambah Berita
            </Link>
            <Link onClick={closeSidebar} href="/admin/kategori" className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 px-4 py-3 rounded-lg font-medium transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
              Kategori
            </Link>
          </nav>
        </div>

        {/* Bagian Bawah: Profil & Keluar */}
        <div className="p-4 border-t border-gray-200">
          <Link onClick={closeSidebar} href="#" className="flex items-center gap-3 text-gray-600 hover:text-gray-900 px-4 py-2 mb-4 font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Pusat Bantuan
          </Link>
          <div className="bg-[#eae8e1] rounded-lg p-3 flex items-center gap-3 mb-3">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" alt="Admin" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-bold text-gray-900 leading-none">Pengguna Admin</p>
              <p className="text-[10px] text-gray-500 mt-1">Editor Kabarin</p>
            </div>
          </div>
          <button className="w-full bg-[#fee2e2] text-red-600 font-bold py-2.5 rounded-lg text-sm hover:bg-red-200 transition-colors">
            KELUAR
          </button>
        </div>
      </aside>

      {/* ================= KONTEN UTAMA ================= */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto w-full">
        
        {/* Header Khusus Mobile (Membawa Tombol Hamburger) */}
        <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 p-4 sticky top-0 z-30">
          <h1 className="text-2xl font-extrabold text-[#75621e] tracking-tight">Kabarin</h1>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Konten Halaman (Children) */}
        {/* Padding disesuaikan: p-4 untuk HP, p-8 untuk Desktop */}
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>

        {/* Footer Admin */}
        <footer className="bg-[#eae8e1] p-6 md:p-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center relative gap-6 md:gap-0 text-center md:text-left mt-auto">
          <div>
            <h2 className="text-2xl font-extrabold text-[#75621e] mb-1">Kabarin</h2>
            <p className="text-sm text-gray-600">© 2026 Kabarin News. Dilindungi Hak Cipta</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm font-medium text-gray-600">
            <Link href="#" className="hover:text-gray-900">Tentang Kami</Link>
            <Link href="#" className="hover:text-gray-900">Kontak</Link>
            <Link href="#" className="hover:text-gray-900">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-gray-900">Ketentuan Layanan</Link>
          </div>
          {/* Tombol Plus Mengambang - Disesuaikan posisinya di mobile agar tidak menabrak teks */}
          <button className="hidden md:flex absolute right-8 -top-6 w-12 h-12 bg-[#75621e] rounded-full text-white items-center justify-center shadow-lg hover:bg-[#5c4a11] transition-transform hover:scale-105">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          </button>
        </footer>
      </div>

    </div>
  );
}