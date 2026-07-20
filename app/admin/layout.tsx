import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f9f9f9]">
      
      {/* ================= BILAH SISI (SIDEBAR) ================= */}
      <aside className="w-64 bg-[#f8f7f4] border-r border-gray-200 flex flex-col justify-between flex-shrink-0">
        
        {/* Bagian Atas: Logo & Menu */}
        <div>
          <div className="p-8">
            <h1 className="text-4xl font-extrabold text-[#75621e] tracking-tight">Kabarin</h1>
          </div>
          
          <nav className="flex flex-col gap-2 px-4">
            <Link href="/admin" className="flex items-center gap-3 bg-[#facc15] text-gray-900 px-4 py-3 rounded-lg font-bold shadow-sm">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              Dasbor
            </Link>
            <Link href="/admin/tambah-berita" className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 px-4 py-3 rounded-lg font-medium transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Tambah Berita
            </Link>
            <Link href="#" className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 px-4 py-3 rounded-lg font-medium transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
              Kategori
            </Link>
            <Link href="#" className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 px-4 py-3 rounded-lg font-medium transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Pengaturan
            </Link>
          </nav>
        </div>

        {/* Bagian Bawah: Profil & Keluar */}
        <div className="p-4 border-t border-gray-200">
          <Link href="#" className="flex items-center gap-3 text-gray-600 hover:text-gray-900 px-4 py-2 mb-4 font-medium">
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
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <main className="flex-1 p-8">
          {children}
        </main>

        {/* Footer Admin */}
        <footer className="bg-[#eae8e1] p-8 border-t border-gray-200 flex justify-between items-center relative">
          <div>
            <h2 className="text-2xl font-extrabold text-[#75621e] mb-1">Kabarin</h2>
            <p className="text-sm text-gray-600">© 2026 Kabarin News. Dilindungi Hak Cipta</p>
          </div>
          <div className="flex gap-6 text-sm font-medium text-gray-600">
            <Link href="#" className="hover:text-gray-900">Tentang Kami</Link>
            <Link href="#" className="hover:text-gray-900">Kontak</Link>
            <Link href="#" className="hover:text-gray-900">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-gray-900">Ketentuan Layanan</Link>
          </div>
          {/* Tombol Plus Mengambang (Floating Action Button) */}
          <button className="absolute right-8 -top-6 w-12 h-12 bg-[#75621e] rounded-full text-white flex items-center justify-center shadow-lg hover:bg-[#5c4a11] transition-transform hover:scale-105">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          </button>
        </footer>
      </div>

    </div>
  );
}