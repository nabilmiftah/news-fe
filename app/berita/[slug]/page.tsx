"use client";

import { useEffect, useState, use } from "react"; // Tambahkan import 'use' dari react
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Ubah tipe params menjadi Promise
export default function DetailBerita({ params }: { params: Promise<{ slug: string }> }) {
  // Gunakan React.use() untuk mengurai (unwrap) nilai params
  const { slug } = use(params);
  
  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetailBerita = async () => {
      try {
        // Mengambil data spesifik yang slug-nya cocok dengan URL
        const { data, error } = await supabase
          .from('berita')
          .select('*, kategori(nama)')
          .eq('slug', slug) // Gunakan variabel slug yang sudah diurai
          .single();

        if (error) throw error;
        setArticle(data);
      } catch (error: any) {
        console.error('Gagal memuat detail berita:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchDetailBerita();
    }
  }, [slug]); // Masukkan variabel slug ke dalam dependency array

  // Fungsi utilitas memformat tanggal
  const formatTanggal = (dateString: string) => {
    if (!dateString) return '';
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // --- TAMPILAN LOADING ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#facc15] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // --- TAMPILAN 404 (JIKA SLUG TIDAK DITEMUKAN) ---
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-extrabold text-gray-200 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Berita Tidak Ditemukan</h2>
        <p className="text-gray-500 mb-6">Artikel yang Anda cari mungkin telah dihapus atau URL-nya salah.</p>
        <Link href="/berita" className="bg-[#857022] hover:bg-[#6e5d1c] text-white font-bold py-3 px-6 rounded-lg transition-colors">
          Kembali ke Indeks Berita
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* KONTEN UTAMA & SIDEBAR */}
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* === KOLOM KIRI (ARTIKEL DINAMIS) - 70% === */}
        <article className="w-full lg:w-2/3">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase mb-6">
            <Link href="/" className="text-gray-500 hover:text-gray-900">BERANDA</Link>
            <span className="text-gray-400">{'>'}</span>
            <Link href="/berita" className="text-gray-500 hover:text-gray-900">BERITA</Link>
            <span className="text-gray-400">{'>'}</span>
            <span className="text-[#a18c35]">{article.kategori?.nama || "UMUM"}</span>
          </div>

          {/* Judul Artikel */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
            {article.judul}
          </h1>

          {/* Meta Penulis & Interaksi */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" 
                alt="Penulis" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-bold text-gray-900">Redaksi Kabarin</p>
                <p className="text-xs text-gray-500">{formatTanggal(article.created_at)}</p>
              </div>
            </div>
            
            {/* Tombol Interaksi */}
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
              </button>
            </div>
          </div>

          {/* Gambar Artikel */}
          <div className="mb-8">
            <img 
              src={article.gambar_utama || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"} 
              alt={article.judul} 
              className="w-full h-[450px] object-cover rounded-xl mb-3"
            />
          </div>

          {/* Teks Konten Dinamis (Melalui dangerouslySetInnerHTML) */}
          <div 
            className="prose prose-lg max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: article.konten }}
          />

        </article>

        {/* === KOLOM KANAN (SIDEBAR STATIS) - 30% === */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-10">
          
          {/* Sedang Tren */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Sedang Tren
            </h3>
            
            <div className="flex flex-col gap-6">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-[9px] font-bold text-[#a18c35] uppercase tracking-widest">TEKNOLOGI</span>
                <h4 className="font-bold text-sm text-gray-900 mt-1 hover:text-[#a18c35] cursor-pointer">Bagaimana AI menulis ulang aturan pasar saham</h4>
                <p className="text-xs text-gray-500 mt-1">45rb pembaca</p>
              </div>
              <div className="border-b border-gray-100 pb-4">
                <span className="text-[9px] font-bold text-[#a18c35] uppercase tracking-widest">EKONOMI</span>
                <h4 className="font-bold text-sm text-gray-900 mt-1 hover:text-[#a18c35] cursor-pointer">Larangan ekspor nikel: Kemenangan bagi peleburan lokal?</h4>
                <p className="text-xs text-gray-500 mt-1">32rb pembaca</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-[#f5f4ef] p-6 rounded-xl border border-gray-200 text-center">
            <svg className="w-8 h-8 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Tetap Terinformasi</h3>
            <p className="text-xs text-gray-500 mb-5 leading-relaxed px-2">
              Dapatkan wawasan terbaru tentang teknologi dan politik Indonesia setiap hari.
            </p>
            <input 
              type="email" 
              placeholder="Masukkan email Anda" 
              className="w-full px-4 py-2.5 rounded border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#d9a01e] mb-3"
            />
            <button className="w-full bg-[#857022] hover:bg-[#6e5d1c] text-white font-bold py-2.5 rounded text-sm transition-colors">
              Berlangganan Sekarang
            </button>
          </div>
        </aside>
      </div>

    </div>
  );
}