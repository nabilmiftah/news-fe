"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Pastikan path ini sesuai

export default function KategoriPage() {
  const [daftarKategori, setDaftarKategori] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State untuk Modal Tambah Kategori
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [namaKategoriBaru, setNamaKategoriBaru] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fungsi mengambil data kategori dari database
  const fetchKategori = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('kategori')
        .select('*')
        .order('id', { ascending: true });
        
      if (error) throw error;
      setDaftarKategori(data || []);
    } catch (error) {
      console.error("Gagal memuat kategori:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKategori();
  }, []);

  // Fungsi menyimpan kategori baru
  const handleSimpanKategori = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaKategoriBaru.trim()) return;

    setIsSubmitting(true);
    
    // 1. Buat slug otomatis dari nama kategori
    const slugBaru = namaKategoriBaru
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

    try {
      // 2. Sertakan slug ke dalam data yang di-insert
      const { error } = await supabase
        .from('kategori')
        .insert([{ 
          nama: namaKategoriBaru, 
          slug: slugBaru 
        }]);

      if (error) throw error;

      alert('Kategori berhasil ditambahkan!');
      setNamaKategoriBaru('');
      setIsModalOpen(false);
      fetchKategori(); // Muat ulang data setelah berhasil tambah
    } catch (error: any) {
      alert('Gagal menambah kategori: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      
      {/* HEADER */}
      <div className="mb-8">
        <div className="text-sm font-medium text-gray-500 mb-1">
          Admin / <span className="text-[#75621e] font-bold">Manajemen Kategori</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-3xl font-extrabold text-gray-900">Taksonomi Berita</h2>
          
          <div className="flex w-full md:w-auto gap-3">
            <div className="relative flex-1 md:w-64">
              <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Cari kategori..." 
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#facc15]"
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#facc15] text-gray-900 px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#eab308] transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Buat Kategori
            </button>
          </div>
        </div>
      </div>

      {/* STATISTIK SEDERHANA (Visual Statis Sesuai Desain) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-[#fbe789] rounded-xl p-6 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xs font-bold text-[#75621e] tracking-widest uppercase mb-2">Total Artikel Dikelola</h3>
            <p className="text-4xl font-extrabold text-gray-900 mb-4">12,482</p>
            <div className="flex items-center text-sm font-bold text-[#75621e]">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              +12% dari bulan lalu
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/20 rounded-full blur-2xl"></div>
        </div>
        <div className="bg-[#e4e2d7] rounded-xl p-6 flex flex-col justify-center">
          <h3 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-2">Kategori Aktif</h3>
          <p className="text-4xl font-extrabold text-gray-900 mb-2">{daftarKategori.length}</p>
          <button className="text-sm font-bold text-[#75621e] flex items-center gap-1 hover:underline">
            Lihat Arsip <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      </div>

      {/* GRID KATEGORI DINAMIS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          <p className="text-gray-500 font-medium">Memuat data...</p>
        ) : (
          daftarKategori.map((kategori) => (
            <div key={kategori.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                  {/* Ikon Statis Sementara */}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-gray-400 hover:text-[#75621e]"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                  <button className="text-gray-400 hover:text-red-500"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{kategori.nama}</h3>
              <p className="text-sm text-gray-500 mb-6 flex-1">Kategori konten untuk seputar {kategori.nama.toLowerCase()}.</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-400">ID: {kategori.id}</span>
                <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Aktif</span>
              </div>
            </div>
          ))
        )}

        {/* KARTU TAMBAH BARU */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:text-[#75621e] hover:border-[#facc15] hover:bg-[#fbfaf8] transition-colors min-h-[200px]"
        >
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          </div>
          <span className="font-bold text-sm text-gray-700">Tambah Kategori Baru</span>
        </button>
      </div>

      {/* ================= MODAL TAMBAH KATEGORI ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-extrabold text-gray-900">Buat Kategori Baru</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleSimpanKategori}>
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Kategori</label>
                <input 
                  type="text" 
                  autoFocus
                  required
                  value={namaKategoriBaru}
                  onChange={(e) => setNamaKategoriBaru(e.target.value)}
                  placeholder="Misal: Prestasi Siswa" 
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#facc15]"
                />
              </div>
              <div className="flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 bg-[#facc15] hover:bg-[#eab308] text-gray-900 font-bold rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}