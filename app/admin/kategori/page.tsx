"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function KategoriPage() {
  const [kategori, setKategori] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // States untuk Modal Tambah
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [namaKategoriBaru, setNamaKategoriBaru] = useState('');

  // States untuk Modal Edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editKategoriId, setEditKategoriId] = useState<number | null>(null);
  const [namaKategoriEdit, setNamaKategoriEdit] = useState('');

  // States untuk Modal Hapus
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteKategoriId, setDeleteKategoriId] = useState<number | null>(null);

  // Fungsi mengambil data kategori dari database
  const fetchKategori = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('kategori')
        .select('*')
        .order('id', { ascending: true }); // Diurutkan berdasarkan ID agar aman

      if (error) throw error;
      setKategori(data || []);
    } catch (error: any) {
      console.error('Gagal memuat kategori:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKategori();
  }, []);

  // ================= FUNGSI TAMBAH =================
  const handleSimpanKategori = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaKategoriBaru.trim()) return;
    setIsSubmitting(true);
    
    const slugBaru = namaKategoriBaru.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    try {
      const { error } = await supabase
        .from('kategori')
        .insert([{ nama: namaKategoriBaru, slug: slugBaru }]);

      if (error) throw error;
      
      setNamaKategoriBaru('');
      setIsAddModalOpen(false);
      fetchKategori(); 
    } catch (error: any) {
      alert('Gagal menambah kategori: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= FUNGSI EDIT =================
  const openEditModal = (kat: any) => {
    setEditKategoriId(kat.id);
    setNamaKategoriEdit(kat.nama);
    setIsEditModalOpen(true);
  };

  const handleUpdateKategori = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaKategoriEdit.trim() || !editKategoriId) return;
    setIsSubmitting(true);

    const slugBaru = namaKategoriEdit.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    try {
      const { error } = await supabase
        .from('kategori')
        .update({ nama: namaKategoriEdit, slug: slugBaru })
        .eq('id', editKategoriId);

      if (error) throw error;

      setIsEditModalOpen(false);
      setEditKategoriId(null);
      setNamaKategoriEdit('');
      fetchKategori();
    } catch (error: any) {
      alert('Gagal memperbarui kategori: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= FUNGSI HAPUS =================
  const openDeleteModal = (id: number) => {
    setDeleteKategoriId(id);
    setIsDeleteModalOpen(true);
  };

  const handleHapusKategori = async () => {
    if (!deleteKategoriId) return;
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('kategori')
        .delete()
        .eq('id', deleteKategoriId);

      if (error) throw error;

      setIsDeleteModalOpen(false);
      setDeleteKategoriId(null);
      fetchKategori();
    } catch (error: any) {
      // Menangkap error jika kategori masih dipakai oleh artikel berita (Foreign Key Constraint)
      if (error.code === '23503') {
        alert('Gagal menghapus: Kategori ini sedang digunakan oleh satu atau beberapa artikel berita. Silakan ubah atau hapus artikel tersebut terlebih dahulu.');
      } else {
        alert('Gagal menghapus kategori: ' + error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      {/* Header Halaman */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#75621e]">Manajemen Kategori</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola label taksonomi untuk mengelompokkan artikel berita.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#facc15] text-black px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#5c4a11] transition-colors flex items-center gap-2 shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Tambah Kategori
        </button>
      </div>

      {/* Grid Kategori */}
      {isLoading ? (
        <div className="text-center py-12 text-gray-500 font-bold">Memuat kategori...</div>
      ) : kategori.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 text-gray-500 font-medium">Belum ada kategori. Silakan tambahkan kategori pertama Anda.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {kategori.map((kat) => (
            <div key={kat.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between group hover:border-[#facc15] transition-colors">
              <div className="mb-6">
                <h3 className="text-xl font-extrabold text-gray-900">{kat.nama}</h3>
                <p className="text-xs font-medium text-gray-400 mt-1 uppercase tracking-wider">/{kat.slug}</p>
              </div>
              <div className="flex gap-2 justify-end border-t border-gray-50 pt-4 mt-auto">
                {/* Tombol Edit */}
                <button 
                  onClick={() => openEditModal(kat)}
                  className="p-2 text-[#75621e] bg-[#f8f7f4] rounded-lg hover:bg-[#facc15] transition-colors"
                  title="Edit Kategori"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                {/* Tombol Hapus */}
                <button 
                  onClick={() => openDeleteModal(kat.id)}
                  className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  title="Hapus Kategori"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL TAMBAH ================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-extrabold text-gray-900 mb-4">Tambah Kategori Baru</h3>
            <form onSubmit={handleSimpanKategori}>
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Kategori</label>
                <input 
                  type="text" 
                  required
                  autoFocus
                  value={namaKategoriBaru}
                  onChange={(e) => setNamaKategoriBaru(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#facc15]"
                  placeholder="Contoh: Berita Utama"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Batal</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-bold text-white bg-[#75621e] hover:bg-[#5c4a11] rounded-lg">
                  {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL EDIT ================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-extrabold text-gray-900 mb-4">Edit Kategori</h3>
            <form onSubmit={handleUpdateKategori}>
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Kategori</label>
                <input 
                  type="text" 
                  required
                  autoFocus
                  value={namaKategoriEdit}
                  onChange={(e) => setNamaKategoriEdit(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#facc15]"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">Batal</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-bold text-[#900] bg-[#facc15] hover:bg-[#eab308] rounded-lg">
                  {isSubmitting ? 'Memperbarui...' : 'Perbarui'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL HAPUS ================= */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Hapus Kategori?</h3>
            <p className="text-gray-500 text-sm mb-6">Tindakan ini tidak dapat dibatalkan. Pastikan tidak ada artikel berita yang menggunakan kategori ini.</p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Batal
              </button>
              <button 
                onClick={handleHapusKategori}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg"
              >
                {isSubmitting ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}