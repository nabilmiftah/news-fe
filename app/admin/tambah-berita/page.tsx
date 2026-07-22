"use client";

import { useState, useRef, useEffect } from 'react';
import ConfirmModal from '@/components/ConfirmModal';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function TambahBerita() {
  const router = useRouter();

  // ==========================================
  // 1. STATE UNTUK UI (MODAL & GAMBAR)
  // ==========================================
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ==========================================
  // 2. STATE UNTUK DATA FORMULIR
  // ==========================================
  const [daftarKategori, setDaftarKategori] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Variabel penyimpan isian formulir
  const [judul, setJudul] = useState('');
  const [slug, setSlug] = useState('');
  const [konten, setKonten] = useState('');
  const [kategoriId, setKategoriId] = useState('');
  const [metaDeskripsi, setMetaDeskripsi] = useState('');
  const [isTerkini, setIsTerkini] = useState(false);
  const [tagsInput, setTagsInput] = useState(''); // Diisi string dengan koma
  const [status, setStatus] = useState('Draf');

  // ==========================================
  // 3. EFEK (USE EFFECT)
  // ==========================================
  // Mengambil daftar kategori dari database saat halaman dimuat
  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const res = await fetch('/api/kategori');
        const json = await res.json();
        if (json.sukses) {
          setDaftarKategori(json.data);
        }
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
      }
    };
    fetchKategori();
  }, []);

  // Membuat slug otomatis setiap kali judul berubah
  useEffect(() => {
    const generateSlug = judul
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
    setSlug(generateSlug);
  }, [judul]);

  // ==========================================
  // 4. FUNGSI HANDLER
  // ==========================================
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleDeleteConfirm = () => {
    alert("Draf berhasil dihapus!");
    setIsDeleteModalOpen(false);
  };

  // Fungsi untuk mengirim data ke database
  const handleSimpanData = async (statusSimpan: string) => {
    if (!judul || !kategoriId) {
      alert("Judul dan Kategori wajib diisi!");
      return;
    }

    setIsLoading(true);
    setStatus(statusSimpan);

    let urlGambarPublik = "";
    
    // Proses unggah gambar jika ada fail yang dipilih
    const fileGambar = fileInputRef.current?.files?.[0];
    if (fileGambar) {
      // Membuat nama fail unik menggunakan timestamp agar tidak bentrok
      const ekstensi = fileGambar.name.split('.').pop();
      const namaFailUnik = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ekstensi}`;
      
      try {
        // 1. Unggah fail ke Supabase Storage (bucket: gambar_berita)
        const { error: uploadError } = await supabase.storage
          .from('gambar_berita')
          .upload(namaFailUnik, fileGambar);

        if (uploadError) throw uploadError;

        // 2. Dapatkan URL publik dari gambar yang baru diunggah
        const { data: publicUrlData } = supabase.storage
          .from('gambar_berita')
          .getPublicUrl(namaFailUnik);

        urlGambarPublik = publicUrlData.publicUrl;
      } catch (error: any) {
        alert('Gagal mengunggah gambar: ' + error.message);
        setIsLoading(false);
        return; // Hentikan proses simpan jika gambar gagal diunggah
      }
    }

    const tagsArray = tagsInput.split(',').map((tag) => tag.trim()).filter(Boolean);

    const payload = {
      judul: judul,
      slug: slug,
      konten: konten,
      gambar_utama: urlGambarPublik, // Sekarang berisi URL asli dari Supabase!
      status: statusSimpan,
      kategori_id: parseInt(kategoriId),
      penulis_id: 1, 
      meta_deskripsi: metaDeskripsi,
      is_terkini: isTerkini,
      tags: tagsArray
    };

    try {
      const res = await fetch('/api/berita', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const json = await res.json();
      
      if (json.sukses) {
        alert(`Berita berhasil disimpan sebagai ${statusSimpan}!`);
        router.push('/admin');
      } else {
        alert('Gagal menyimpan berita: ' + json.pesan);
      }
    } catch (error) {
      alert('Terjadi kesalahan pada sistem!');
    } finally {
      setIsLoading(false);
    }
  };


  // ==========================================
  // 5. TAMPILAN ANTARMUKA (RENDER UI)
  // ==========================================
  return (
    <div className="max-w-screen-2xl mx-auto">
      
      {/* HEADER: Judul & Aksi */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-gray-200 gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-extrabold text-gray-900">Buat Berita Baru</h2>
          <span className="bg-[#facc15] text-gray-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {status}
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
          <button 
            onClick={() => handleSimpanData('Diterbitkan')}
            disabled={isLoading}
            className="flex-1 md:flex-none bg-[#facc15] text-gray-900 px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#eab308] transition-colors shadow-sm disabled:opacity-50"
          >
            {isLoading ? 'Memproses...' : 'Terbitkan Berita'}
          </button>
        </div>
      </div>

      {/* AREA FORM UTAMA */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* ================= KOLOM KIRI (EDITOR UTAMA) ================= */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          
          {/* Input Judul */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
              Judul Berita
            </label>
            <input 
              type="text" 
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Masukkan judul yang menarik..." 
              className="w-full text-3xl md:text-4xl font-extrabold text-gray-900 placeholder-gray-300 border-none focus:ring-0 p-0 outline-none bg-transparent"
            />
          </div>

          {/* Input Unggah Gambar */}
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-2">
              Gambar Utama
            </label>
            
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden" 
            />

            <div 
              onClick={() => fileInputRef.current?.click()} 
              className="w-full h-64 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 hover:border-[#facc15] transition-colors cursor-pointer relative overflow-hidden group"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Pratinjau" className="absolute inset-0 w-full h-full object-cover z-10" />
              ) : (
                <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800&auto=format&fit=crop" alt="Bg" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:scale-105 transition-transform duration-500" />
              )}
              
              {!imagePreview && (
                <div className="relative z-10 flex flex-col items-center bg-white/80 p-4 rounded-lg backdrop-blur-sm">
                  <svg className="w-8 h-8 mb-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-bold text-gray-700">Klik untuk unggah gambar</p>
                </div>
              )}
            </div>
            
            {imagePreview && (
              <button onClick={() => setImagePreview(null)} className="mt-3 text-xs font-bold text-red-600 hover:underline">
                Hapus Gambar
              </button>
            )}
          </div>

          {/* Text Editor (Rich Text) */}
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col h-[500px]">
            {/* Toolbar Editor (Statis) */}
            <div className="flex flex-wrap items-center justify-between border-b border-gray-200 bg-[#fbfaf8] p-3">
              <div className="flex items-center gap-1 text-gray-600">
                <button className="p-1.5 hover:bg-gray-200 rounded text-sm font-bold font-serif">B</button>
                <button className="p-1.5 hover:bg-gray-200 rounded text-sm font-bold font-serif italic">I</button>
              </div>
            </div>
            <textarea 
              value={konten}
              onChange={(e) => setKonten(e.target.value)}
              className="w-full flex-1 p-6 resize-none outline-none text-gray-700 text-lg leading-relaxed placeholder-gray-400"
              placeholder="Mulai tulis berita Anda di sini..."
            ></textarea>
          </div>

        </div>

        {/* ================= KOLOM KANAN (PENGATURAN) ================= */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-6">
          
          {/* Box 1: Penerbitan */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3">Penerbitan</h3>
            <div className="bg-[#fbfaf8] border border-gray-200 p-5 rounded-xl">
              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-gray-600">Status:</span>
                <span className="font-bold text-gray-900">{status}</span>
              </div>
              <button 
                onClick={() => handleSimpanData('Draf')}
                disabled={isLoading}
                className="w-full border border-gray-300 bg-white text-gray-700 font-bold py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
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
                <select 
                  value={kategoriId}
                  onChange={(e) => setKategoriId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#facc15] bg-white"
                >
                  <option value="">-- Pilih Kategori --</option>
                  {daftarKategori.map((kat) => (
                    <option key={kat.id} value={kat.id}>
                      {kat.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Tag (Pisahkan dengan koma)</label>
                <input 
                  type="text" 
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="kampus, inovasi, teknologi..." 
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
                  value={metaDeskripsi}
                  onChange={(e) => setMetaDeskripsi(e.target.value)}
                  rows={3} 
                  placeholder="Ringkasan SEO..." 
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#facc15] bg-white resize-none"
                ></textarea>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={isTerkini}
                  onChange={(e) => setIsTerkini(e.target.checked)}
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
              onClick={() => setIsDeleteModalOpen(true)}
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
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}