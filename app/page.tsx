"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import NewsCard from "../components/NewsCard"; // Sesuaikan path jika berbeda
import Button from "../components/Button"; // Sesuaikan path jika berbeda

export default function Home() {
  const [berita, setBerita] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBeritaPublik = async () => {
      try {
        // Mengambil data berita terbaru beserta nama kategorinya
        const { data, error } = await supabase
          .from('berita')
          .select('*, kategori(nama)')
          .order('created_at', { ascending: false })
          .limit(10); // Ambil 10 data terbaru untuk didistribusikan ke halaman

        if (error) throw error;
        setBerita(data || []);
      } catch (error: any) {
        console.error('Gagal memuat berita publik:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBeritaPublik();
  }, []);

  // Memecah (Slicing) data untuk masing-masing seksi
  const heroArticle = berita[0];
  const secondaryArticles = berita.slice(1, 3);
  const trendingArticles = berita.slice(3, 6);
  const recommendedArticles = berita.slice(6, 10);

  // Fungsi utilitas untuk memformat tanggal (opsional)
  const formatTanggal = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#facc15] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* 1. BARIS BERITA TERKINI */}
      <div className="bg-[#eae8e1] rounded w-full h-8 mb-6 flex items-center px-1">
        <span className="bg-[#857022] text-white text-[10px] font-bold px-3 py-1 rounded-sm tracking-wide">
          BERITA TERKINI
        </span>
      </div>

      {/* Jika belum ada data sama sekali */}
      {berita.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold text-gray-500">Belum ada berita yang dipublikasikan.</h2>
        </div>
      )}

      {/* 2. KONTEN UTAMA (KIRI & KANAN) */}
      {berita.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* === KOLOM KIRI (70%) === */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            
            {/* Hero Image (Berita Utama - Data [0]) */}
            {heroArticle && (
              <Link href={`/berita/${heroArticle.slug}`} className="relative w-full h-[420px] rounded-xl overflow-hidden group cursor-pointer block">
                <img 
                  src={heroArticle.gambar_utama || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"} 
                  alt={heroArticle.judul} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 p-8 w-full md:w-5/6">
                  <div className="flex items-center gap-2 mb-3 text-xs font-bold">
                    <span className="bg-[#facc15] text-gray-900 px-2 py-0.5 rounded-sm uppercase">
                      {heroArticle.kategori?.nama || "Umum"}
                    </span>
                    <span className="text-gray-300">{formatTanggal(heroArticle.created_at)}</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                    {heroArticle.judul}
                  </h1>
                  <p className="text-gray-300 text-sm line-clamp-2" dangerouslySetInnerHTML={{ __html: heroArticle.konten }}></p>
                </div>
              </Link>
            )}

            {/* Grid 2 Berita Sekunder (Data [1] & [2]) */}
            {secondaryArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {secondaryArticles.map((item) => (
                  <NewsCard 
                    key={item.id}
                    title={item.judul}
                    description="" // Dikosongkan agar desain card tidak penuh, atau isi dengan substring
                    category={item.kategori?.nama || "UMUM"}
                    timeAgo={formatTanggal(item.created_at)}
                    imageUrl={item.gambar_utama || "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"}
                    slug={item.slug}
                  />
                ))}
              </div>
            )}
          </div>

          {/* === KOLOM KANAN (30%) === */}
          <aside className="w-full lg:w-1/3 flex flex-col gap-6">
            
            {/* Topik Populer (Data [3], [4], [5]) */}
            <div className="bg-[#f8f7f3] p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Topik Populer
              </h3>
              
              <div className="flex flex-col gap-6">
                {trendingArticles.length > 0 ? (
                  trendingArticles.map((item, index) => (
                    <Link href={`/berita/${item.slug}`} key={item.id} className="flex gap-4 group">
                      <span className="text-4xl font-bold text-transparent group-hover:text-[#bca873] transition-colors" style={{ WebkitTextStroke: '1px #bca873' }}>
                        0{index + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 leading-snug group-hover:text-[#a18c35] transition-colors line-clamp-2">
                          {item.judul}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{formatTanggal(item.created_at)}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Belum cukup berita untuk ditampilkan.</p>
                )}
              </div>
            </div>

            {/* Kotak Newsletter (Tetap Statis) */}
            <div className="bg-[#857022] p-6 rounded-xl text-white shadow-md">
              <h3 className="text-xl font-bold mb-2">Tetap Terinformasi</h3>
              <p className="text-sm text-[#e5dcc3] mb-5 leading-relaxed">
                Dapatkan cerita terpenting yang dikirimkan ke kotak masuk Anda setiap pagi. Bergabunglah dengan 50.000+ pelanggan.
              </p>
              <input 
                type="email" 
                placeholder="alamat@email.com" 
                className="w-full px-4 py-2.5 rounded border border-[#a38a2e] bg-[#75621e] text-white placeholder-[#c4b587] text-sm focus:outline-none mb-4"
              />
              <Button variant="primary" className="w-full shadow-sm">Berlangganan Sekarang</Button>
              <p className="text-[9px] text-[#d6cdb4] mt-3 text-center">
                Dengan berlangganan, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi kami.
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* 3. BAGIAN BAWAH: REKOMENDASI UNTUK ANDA (Data [6] dst) */}
      {recommendedArticles.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Rekomendasi untuk Anda</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedArticles.map((item) => (
              <Link href={`/berita/${item.slug}`} key={item.id} className="flex gap-4 items-center group cursor-pointer">
                <img 
                  src={item.gambar_url || "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=200&auto=format&fit=crop"} 
                  alt="Thumbnail" 
                  className="w-20 h-20 rounded-md object-cover group-hover:opacity-80" 
                />
                <div>
                  <span className="text-[9px] text-[#a18c35] font-bold uppercase tracking-wider">
                    {item.kategori?.nama || "UMUM"}
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 leading-snug mt-1 group-hover:text-[#a18c35] line-clamp-2">
                    {item.judul}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}