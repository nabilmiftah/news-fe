"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // State untuk Autentikasi
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [adminName, setAdminName] = useState("Pengguna Admin");
  const [adminEmail, setAdminEmail] = useState("");

  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    // Fungsi Satpam: Mengecek sesi login
    const cekSesiPengguna = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        // Tendang ke halaman login jika tidak ada sesi
        if (error || !session) {
          router.replace('/login');
          return;
        }

        // Ambil data profil
        const namaLengkap = session.user.user_metadata?.nama_lengkap || "Admin Redaksi";
        setAdminName(namaLengkap);
        setAdminEmail(session.user.email || "");
        
      } catch (err) {
        console.error("Gagal memeriksa sesi:", err);
        router.replace('/login');
      } finally {
        setIsCheckingAuth(false);
      }
    };

    cekSesiPengguna();
  }, [router]);

  // Fungsi Keluar (Logout)
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push('/login');
    } catch (error: any) {
      alert("Gagal keluar: " + error.message);
    }
  };

  // Array menu
  const menuItems = [
    {
      nama: "Dashboard",
      href: "/admin",
      ikon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      nama: "Tambah Berita",
      href: "/admin/tambah-berita",
      ikon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      )
    },
    {
      nama: "Kategori",
      href: "/admin/kategori",
      ikon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      )
    }
  ];

  // Layar Pemuatan
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-[#facc15] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-bold animate-pulse">Memverifikasi akses aman...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f9f9f9] relative overflow-hidden">
      
      {/* ================= OVERLAY GELAP (KHUSUS MOBILE) ================= */}
      {isSidebarOpen && (
        <div 
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
        />
      )}

      {/* ================= BILAH SISI (SIDEBAR) ================= */}
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
            <button onClick={closeSidebar} className="md:hidden text-gray-500 hover:text-red-500">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="flex flex-col gap-2 px-4">
            {menuItems.map((item) => {
              const isActive = item.href === '/admin' 
                ? pathname === '/admin' 
                : pathname.startsWith(item.href);

              return (
                <Link 
                  key={item.nama}
                  onClick={closeSidebar} 
                  href={item.href} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-[#facc15] text-gray-900 font-bold shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-100 font-medium'
                  }`}
                >
                  {item.ikon}
                  {item.nama}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bagian Bawah: Profil Dinamis & Keluar */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-[#eae8e1] rounded-lg p-3 flex items-center gap-3 mb-3 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" alt="Admin" className="w-10 h-10 rounded-full object-cover shrink-0" />
            <div className="min-w-0"> {/* min-w-0 memastikan teks bisa dipotong jika terlalu panjang */}
              <p className="text-sm font-bold text-gray-900 leading-none truncate">{adminName}</p>
              <p className="text-[10px] text-gray-500 mt-1 truncate">{adminEmail}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full bg-[#fee2e2] text-red-600 font-bold py-2.5 rounded-lg text-sm hover:bg-red-200 transition-colors"
          >
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
          <button className="hidden md:flex absolute right-8 -top-6 w-12 h-12 bg-[#75621e] rounded-full text-white items-center justify-center shadow-lg hover:bg-[#5c4a11] transition-transform hover:scale-105">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          </button>
        </footer>
      </div>

    </div>
  );
}