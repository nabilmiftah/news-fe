"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";

export default function BeritaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f6]">
        <div className="w-10 h-10 border-4 border-[#facc15] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <BeritaContent />
    </Suspense>
  );
}

// 2. Komponen Isi Halaman Berita
function BeritaContent() {
  const searchParams = useSearchParams();
  const queryDariNavbar = searchParams.get('q') || ""; // Menangkap teks dari navbar

  const [semuaBerita, setSemuaBerita] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Masukkan query dari URL sebagai nilai awal pencarian
  const [kataKunci, setKataKunci] = useState(queryDariNavbar);

  // Sinkronkan jika pengguna mencari kata kunci baru dari navbar saat sudah berada di halaman ini
  useEffect(() => {
    if (queryDariNavbar !== null) {
      setKataKunci(queryDariNavbar);
    }
  }, [queryDariNavbar]);

  useEffect(() => {
    const fetchSemuaBerita = async () => {
      try {
        const { data, error } = await supabase
          .from('berita')
          .select('*, kategori(nama)')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSemuaBerita(data || []);
      } catch (error: any) {
        console.error('Gagal memuat arsip berita:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSemuaBerita();
  }, []);

  // Fungsi utilitas memformat tanggal
  const formatTanggal = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Logika Filter Pencarian
  const beritaTersaring = kataKunci.trim() === "" 
    ? semuaBerita 
    : semuaBerita.filter((item) => 
        item.judul.toLowerCase().includes(kataKunci.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-[#faf9f6] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        
        {/* HEADER & PENCARIAN */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-200 pb-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Indeks Berita</h1>
            <p className="text-lg text-gray-600">
              Telusuri seluruh arsip liputan, laporan mendalam, dan artikel terbaru dari tim redaksi Kabarin.
            </p>
          </div>
        </div>

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#facc15] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* HASIL PENCARIAN KOSONG */}
            {beritaTersaring.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Tidak ada berita ditemukan</h3>
                <p className="text-gray-500">Coba gunakan kata kunci pencarian yang berbeda.</p>
              </div>
            )}

            {/* GRID DAFTAR BERITA */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beritaTersaring.map((item) => (
                <Link href={`/berita/${item.slug}`} key={item.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  
                  {/* Gambar Berita */}
                  <div className="relative h-56 w-full overflow-hidden bg-gray-200">
                    <img 
                      src={item.gambar_utama || "https://images.unsplash.com/photo-1495020685536-1509e3424981?q=80&w=800&auto=format&fit=crop"} 
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Label Kategori Melayang */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md">
                      <span className="text-[10px] font-extrabold text-[#857022] uppercase tracking-wider">
                        {item.kategori?.nama || "UMUM"}
                      </span>
                    </div>
                  </div>

                  {/* Konten Teks */}
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-xs font-medium text-gray-500 mb-2">
                      {formatTanggal(item.created_at)}
                    </p>
                    <h2 className="text-xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-[#857022] transition-colors line-clamp-3">
                      {item.judul}
                    </h2>
                    
                    {/* Menggunakan line-clamp untuk membatasi deskripsi singkat */}
                    <div 
                      className="text-sm text-gray-600 line-clamp-2 mt-auto"
                      dangerouslySetInnerHTML={{ __html: item.konten }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}