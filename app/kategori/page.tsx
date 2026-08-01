"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// --- FUNGSI HELPER UNTUK IKON & DESKRIPSI DINAMIS ---
// Secara otomatis mencocokkan nama kategori dari database dengan aset visual
const getCategoryMeta = (kategoriNama: string) => {
  const name = kategoriNama.toLowerCase();
  
  if (name.includes("politik")) {
    return {
      desc: "Kebijakan global, liputan pemilu, dan pembaruan legislatif dari seluruh dunia.",
      icon: <svg className="w-8 h-8 text-[#857022]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3M8 10v1m4-1v1m4-1v1" /></svg>
    };
  }
  if (name.includes("teknologi")) {
    return {
      desc: "Terobosan AI, ulasan gadget, dan lanskap garis depan digital yang terus berkembang.",
      icon: <svg className="w-8 h-8 text-[#857022]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
    };
  }
  if (name.includes("lingkungan") || name.includes("alam")) {
    return {
      desc: "Inisiatif keberlanjutan, sains iklim, dan cerita tentang planet kita yang terus berubah.",
      icon: <svg className="w-8 h-8 text-[#857022]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />{/* Catatan: SVG Daun alternatif */}<path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg> // Menggunakan bentuk yang mirip daun
    };
  }
  if (name.includes("ekonomi") || name.includes("bisnis")) {
    return {
      desc: "Analisis pasar, keuangan pribadi, dan tren ekonomi global yang membentuk masa depan kita.",
      icon: <svg className="w-8 h-8 text-[#857022]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
    };
  }
  if (name.includes("sains") || name.includes("ilmu")) {
    return {
      desc: "Eksplorasi ruang angkasa, penelitian medis, dan penemuan yang mendorong batas pengetahuan.",
      icon: <svg className="w-8 h-8 text-[#857022]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
    };
  }
  if (name.includes("budaya") || name.includes("seni")) {
    return {
      desc: "Seni, gaya hidup, filosofi, dan cerita yang mendefinisikan pengalaman manusia bersama kita.",
      icon: <svg className="w-8 h-8 text-[#857022]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
    };
  }
  if (name.includes("kesehatan")) {
    return {
      desc: "Tips kesejahteraan, advokasi kesehatan mental, dan berita terbaru dari komunitas medis.",
      icon: <svg className="w-8 h-8 text-[#857022]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m-9 1V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2H3a2 2 0 01-2-2v-9z" /></svg>
    };
  }
  if (name.includes("olahraga")) {
    return {
      desc: "Kompetisi tingkat tinggi, profil atlet, dan liputan turnamen besar di berbagai cabang olahraga.",
      icon: <svg className="w-8 h-8 text-[#857022]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
    };
  }
  
  // Kategori Umum / Default jika tidak ada yang cocok
  return {
    desc: "Berita dan pembaruan terbaru seputar topik ini untuk menambah wawasan Anda setiap hari.",
    icon: <svg className="w-8 h-8 text-[#857022]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" /></svg>
  };
};


export default function KategoriPage() {
  const [kategoriList, setKategoriList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk menyimpan ID kategori yang dipilih pengguna
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const { data, error } = await supabase
          .from('kategori')
          .select('*')
          .order('nama', { ascending: true }); // Diurutkan sesuai abjad

        if (error) throw error;
        setKategoriList(data || []);
      } catch (error: any) {
        console.error('Gagal memuat kategori:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKategori();
  }, []);

  // Fungsi untuk menambah/menghapus pilihan kategori
  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) => 
      prev.includes(id) 
        ? prev.filter(topicId => topicId !== id) // Hapus jika sudah ada
        : [...prev, id] // Tambahkan jika belum ada
    );
  };

  const handleSimpanPilihan = () => {
    // Di sini nantinya bisa disambungkan ke database untuk menyimpan preferensi user
    alert(`Berhasil menyimpan ${selectedTopics.length} topik pilihan Anda!`);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        
        {/* BAGIAN HEADER */}
        <div className="mb-10 max-w-2xl">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Pilih Minat Anda</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Personalisasikan pengalaman Kabarin Anda. Pilih topik yang paling Anda 
            pedulikan untuk mengkurasi feed berita yang membuat Anda tetap 
            terinformasi dan terinspirasi.
          </p>
        </div>

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#facc15] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* GRID KATEGORI DINAMIS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {kategoriList.map((kat) => {
                const meta = getCategoryMeta(kat.nama);
                const isSelected = selectedTopics.includes(kat.id);

                return (
                  <div 
                    key={kat.id}
                    onClick={() => toggleTopic(kat.id)}
                    className={`
                      cursor-pointer rounded-2xl p-6 transition-all duration-300
                      flex flex-col h-full
                      ${isSelected 
                        ? 'bg-white border-2 border-[#857022] shadow-md transform -translate-y-1' 
                        : 'bg-white border border-transparent shadow-sm hover:shadow-md hover:border-gray-200'
                      }
                    `}
                  >
                    <div className="mb-5">
                      {meta.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{kat.nama}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-grow">
                      {meta.desc}
                    </p>
                    
                    {/* Indikator Checkmark jika terpilih (Tambahan manis untuk UX) */}
                    {isSelected && (
                      <div className="mt-4 flex justify-end">
                        <svg className="w-6 h-6 text-[#857022]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ACTION BAR BAWAH (Sesuai Desain) */}
            <div className="bg-[#f0ece1] rounded-2xl p-6 border border-[#e3dfd3] flex flex-col sm:flex-row justify-between items-center gap-6 shadow-sm">
              <div className="text-center sm:text-left">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Status Pilihan</p>
                <p className="text-lg font-extrabold text-gray-900">
                  {selectedTopics.length} Topik Dipilih
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button 
                  onClick={() => setSelectedTopics([])} // Reset fungsi lewati
                  className="px-8 py-3.5 border border-gray-400 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
                >
                  Lewati Sekarang
                </button>
                <button 
                  onClick={handleSimpanPilihan}
                  disabled={selectedTopics.length === 0}
                  className={`px-8 py-3.5 font-bold rounded-lg transition-all w-full sm:w-auto shadow-sm
                    ${selectedTopics.length > 0 
                      ? 'bg-[#facc15] text-gray-900 hover:bg-[#eab308]' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  Simpan Pilihan
                </button>
              </div>
            </div>
          </>
        )}
        
      </div>
    </div>
  );
}