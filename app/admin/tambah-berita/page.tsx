"use client";

import { useState, useRef } from 'react';
import ConfirmModal from '@/components/ConfirmModal';

export default function TambahBerita() {
    // State untuk mengontrol apakah modal terbuka atau tertutup
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Ref untuk menghubungkan klik div ke input file yang disembunyikan
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fungsi untuk menangani saat gambar dipilih
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Membuat URL lokal sementara untuk pratinjau
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleDeleteConfirm = () => {
    alert("Draf berhasil dihapus!");
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      
      {/* HEADER: Judul & Aksi */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-gray-200 gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-extrabold text-gray-900">Buat Berita Baru</h2>
          <span className="bg-[#facc15] text-gray-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Draf
          </span>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex justify-center items-center gap-2 border border-gray-300 bg-white px-5 py-2.5 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Pratinjau
          </button>
          <button className="flex-1 md:flex-none bg-[#facc15] text-gray-900 px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#eab308] transition-colors shadow-sm">
            Terbitkan Berita
          </button>
        </div>
      </div>

      {/* AREA FORM UTAMA */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* ================= KOLOM KIRI (EDITOR UTAMA) - 70% ================= */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          
          {/* Input Judul */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
              Judul Berita
            </label>
            <input 
              type="text" 
              placeholder="Masukkan judul yang menarik..." 
              className="w-full text-3xl md:text-4xl font-extrabold text-gray-900 placeholder-gray-300 border-none focus:ring-0 p-0 outline-none bg-transparent"
            />
          </div>

          {/* Input Unggah Gambar */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
              Gambar Utama
            </label>
            
            {/* Input file asli (Disembunyikan secara visual) */}
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden" 
            />

            <div 
              onClick={() => fileInputRef.current?.click()} // Membuka dialog file saat div diklik
              className="w-full h-64 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 hover:border-[#facc15] transition-colors cursor-pointer relative overflow-hidden group"
            >
              {/* Jika ada imagePreview, tampilkan gambarnya. Jika tidak, tampilkan background samar. */}
              {imagePreview ? (
                <img 
                  src={imagePreview} 
                  alt="Pratinjau" 
                  className="absolute inset-0 w-full h-full object-cover z-10" 
                />
              ) : (
                <img 
                  src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800&auto=format&fit=crop" 
                  alt="Bg" 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:scale-105 transition-transform duration-500" 
                />
              )}
              
              {/* Instruksi Teks (Sembunyikan jika gambar sudah dipilih agar tidak menutupi) */}
              {!imagePreview && (
                <div className="relative z-10 flex flex-col items-center bg-white/80 p-4 rounded-lg backdrop-blur-sm">
                  <svg className="w-8 h-8 mb-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-bold text-gray-700">Klik untuk unggah atau seret & lepas</p>
                  <p className="text-xs text-gray-500 mt-1">Ukuran disarankan: 1600x800px (Maks 5MB)</p>
                </div>
              )}
            </div>
            
            {/* Tombol Hapus Gambar (Muncul hanya jika gambar sudah dipilih) */}
            {imagePreview && (
              <button 
                onClick={() => setImagePreview(null)}
                className="mt-3 text-xs font-bold text-red-600 hover:underline"
              >
                Hapus Gambar
              </button>
            )}
          </div>

          {/* Text Editor (Rich Text) */}
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col h-[500px]">
            {/* Toolbar Editor */}
            <div className="flex flex-wrap items-center justify-between border-b border-gray-200 bg-[#fbfaf8] p-3">
              <div className="flex items-center gap-1 text-gray-600">
                <button className="p-1.5 hover:bg-gray-200 rounded text-sm font-bold font-serif">B</button>
                <button className="p-1.5 hover:bg-gray-200 rounded text-sm font-bold font-serif italic">I</button>
                <button className="p-1.5 hover:bg-gray-200 rounded">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </button>
                <button className="p-1.5 hover:bg-gray-200 rounded font-serif font-bold">”</button>
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                <button className="p-1.5 hover:bg-gray-200 rounded">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                </button>
                <button className="p-1.5 hover:bg-gray-200 rounded">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </button>
                <button className="p-1.5 hover:bg-gray-200 rounded font-bold font-mono">{'< >'}</button>
              </div>
              <div className="text-xs text-gray-400 font-medium flex items-center gap-3">
                <span>Menyimpan...</span>
                <span>0 Kata</span>
              </div>
            </div>
            {/* Textarea */}
            <textarea 
              className="w-full flex-1 p-6 resize-none outline-none text-gray-700 text-lg leading-relaxed placeholder-gray-400"
              placeholder="Mulai tulis berita Anda di sini..."
            ></textarea>
          </div>

        </div>

        {/* ================= KOLOM KANAN (PENGATURAN) - 30% ================= */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-6">
          
          {/* Box 1: Penerbitan */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Penerbitan</h3>
            <div className="bg-[#fbfaf8] border border-gray-200 p-5 rounded-xl">
              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="font-bold text-gray-900">Draf</span>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Jadwalkan Rilis</label>
                <input 
                  type="datetime-local" 
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#facc15]"
                />
              </div>
              <button className="w-full border border-gray-300 bg-white text-gray-700 font-bold py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                Simpan sebagai Draf
              </button>
            </div>
          </div>

          {/* Box 2: Kategorisasi */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Kategorisasi</h3>
            <div className="bg-[#fbfaf8] border border-gray-200 p-5 rounded-xl space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Kategori Utama</label>
                <select className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#facc15] bg-white appearance-none">
                  <option>Teknologi</option>
                  <option>Politik</option>
                  <option>Ekonomi</option>
                  <option>Olahraga</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Tag (maks 5)</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="flex items-center gap-1 bg-gray-200 text-gray-700 text-[10px] font-bold px-2 py-1 rounded">
                    INOVASI <button className="hover:text-red-500">×</button>
                  </span>
                  <span className="flex items-center gap-1 bg-gray-200 text-gray-700 text-[10px] font-bold px-2 py-1 rounded">
                    AI <button className="hover:text-red-500">×</button>
                  </span>
                </div>
                <input 
                  type="text" 
                  placeholder="Tambah tag..." 
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#facc15] bg-white"
                />
              </div>
            </div>
          </div>

          {/* Box 3: SEO & Metadata */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">SEO & Metadata</h3>
            <div className="bg-[#fbfaf8] border border-gray-200 p-5 rounded-xl space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Meta Deskripsi</label>
                <textarea 
                  rows={3} 
                  placeholder="Ringkasan SEO..." 
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#facc15] bg-white resize-none"
                ></textarea>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-[#facc15] border-gray-300 rounded focus:ring-[#facc15]"
                />
                <label className="text-sm text-gray-700 font-medium">
                  Tandai sebagai Berita Terkini
                </label>
              </div>
            </div>
          </div>

          {/* Tombol Hapus */}
          <div className="pt-6 pb-2 text-center">
            <button 
              onClick={() => setIsDeleteModalOpen(true)} // Buka modal saat diklik
              className="flex items-center justify-center gap-2 text-red-600 font-bold text-sm w-full hover:bg-red-50 py-2 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Hapus Draf
            </button>
          </div>
        </aside>

      </div>
      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        title="Hapus Draf Berita?"
        message="Apakah Anda yakin ingin menghapus draf ini? Semua tulisan dan pengaturan yang belum disimpan akan hilang selamanya."
        confirmText="Ya, Hapus"
        cancelText="Batal"
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)} // Tutup modal jika batal
      />
    </div>
  );
}