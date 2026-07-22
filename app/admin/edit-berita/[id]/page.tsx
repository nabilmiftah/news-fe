"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function EditBeritaPage() {
  const router = useRouter();
  const params = useParams();
  const idBerita = params.id; // Mengambil ID dari URL

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State untuk form
  const [judul, setJudul] = useState('');
  const [konten, setKonten] = useState('');
  const [kategoriId, setKategoriId] = useState('');
  const [status, setStatus] = useState('DRAF');
  const [gambarLama, setGambarLama] = useState('');
  const [fileGambarBaru, setFileGambarBaru] = useState<File | null>(null);
  
  const [daftarKategori, setDaftarKategori] = useState<any[]>([]);

  useEffect(() => {
    // Fungsi untuk menarik data kategori (untuk pilihan dropdown) dan data berita lama
    const fetchData = async () => {
      try {
        // 1. Ambil daftar kategori
        const { data: katData } = await supabase.from('kategori').select('*');
        if (katData) setDaftarKategori(katData);

        // 2. Ambil data berita spesifik berdasarkan ID
        if (idBerita) {
          const { data: beritaData, error } = await supabase
            .from('berita')
            .select('*')
            .eq('id', idBerita)
            .single();

          if (error) throw error;
          
          if (beritaData) {
            setJudul(beritaData.judul || '');
            setKonten(beritaData.konten || '');
            setKategoriId(beritaData.kategori_id || '');
            setStatus(beritaData.status || 'DRAF');
            setGambarLama(beritaData.gambar_utama || '');
          }
        }
      } catch (error: any) {
        alert("Gagal memuat data berita: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idBerita]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let urlGambarFix = gambarLama; // Secara default gunakan gambar lama

      // Jika user mengunggah gambar baru, upload ke bucket Supabase
      if (fileGambarBaru) {
        const fileExt = fileGambarBaru.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `berita/${fileName}`;

        // Asumsi nama bucket kamu adalah 'gambar_berita' (sesuaikan jika berbeda)
        const { error: uploadError } = await supabase.storage
          .from('gambar_berita')
          .upload(filePath, fileGambarBaru);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('gambar_berita')
          .getPublicUrl(filePath);

        urlGambarFix = publicUrlData.publicUrl;
      }

      // Update data ke tabel berita
      const { error: updateError } = await supabase
        .from('berita')
        .update({
          judul,
          konten,
          kategori_id: kategoriId || null,
          status,
          gambar_utama: urlGambarFix,
          updated_at: new Date().toISOString(),
        })
        .eq('id', idBerita);

      if (updateError) throw updateError;

      alert('Berita berhasil diperbarui!');
      router.push('/admin'); // Kembalikan ke halaman dasbor
      
    } catch (error: any) {
      alert("Gagal memperbarui berita: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500 font-bold">Memuat editor berita...</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="text-sm font-medium text-gray-500 mb-1">
            <Link href="/admin" className="hover:text-gray-900">Admin</Link> / <span className="text-[#75621e] font-bold">Edit Berita</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Perbarui Berita</h1>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri - Editor Utama */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <label className="block text-sm font-bold text-gray-700 mb-2">Judul Artikel</label>
            <input 
              type="text" 
              required
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-[#facc15]"
            />
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <label className="block text-sm font-bold text-gray-700 mb-2">Isi Konten Berita</label>
            <textarea 
              required
              rows={15}
              value={konten}
              onChange={(e) => setKonten(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#facc15]"
            />
          </div>
        </div>

        {/* Kolom Kanan - Pengaturan Tambahan */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Aksi Penerbitan</h3>
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-500 mb-2">Status Artikel</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#facc15] font-bold"
              >
                <option value="DRAF">Simpan sebagai Draf</option>
                <option value="DITERBITKAN">Publikasikan Segera</option>
              </select>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#facc15] text-gray-900 font-extrabold py-3 rounded-lg hover:bg-[#eab308] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Menyimpan...' : 'Perbarui Berita'}
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <label className="block text-sm font-bold text-gray-700 mb-2">Kategori Berita</label>
            <select 
              value={kategoriId}
              onChange={(e) => setKategoriId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#facc15]"
            >
              <option value="">Pilih Kategori...</option>
              {daftarKategori.map(kat => (
                <option key={kat.id} value={kat.id}>{kat.nama}</option>
              ))}
            </select>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <label className="block text-sm font-bold text-gray-700 mb-2">Gambar Utama (Thumbnail)</label>
            
            {/* Tampilkan gambar lama jika ada */}
            {gambarLama && !fileGambarBaru && (
              <div className="mb-3 relative rounded-lg overflow-hidden border border-gray-200">
                <img src={gambarLama} alt="Thumbnail Lama" className="w-full h-32 object-cover" />
                <div className="absolute top-0 left-0 bg-black/60 text-white text-xs px-2 py-1 font-bold">Gambar Saat Ini</div>
              </div>
            )}

            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setFileGambarBaru(e.target.files ? e.target.files[0] : null)}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-[#fbe789] file:text-[#75621e] hover:file:bg-[#facc15]"
            />
            <p className="text-[10px] text-gray-400 mt-2">Biarkan kosong jika tidak ingin mengubah gambar lama.</p>
          </div>
        </div>
      </form>
    </div>
  );
}