"use client";

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function DashboardPage() {
  const [beritaTerbaru, setBeritaTerbaru] = useState<any[]>([]);
  const [totalArtikel, setTotalArtikel] = useState(0);
  const [kategoriStats, setKategoriStats] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State untuk Modal Hapus
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [beritaToHapus, setBeritaToHapus] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fungsi untuk memuat ulang semua data dasbor (diekstrak agar bisa dipanggil setelah hapus)
  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. Mengambil data untuk Tabel
      const { data: beritaData, error: beritaError } = await supabase
        .from('berita')
        .select(`id, judul, gambar_utama, status, created_at, penulis ( nama ), kategori ( nama )`)
        .order('created_at', { ascending: false })
        .limit(5);

      if (beritaError) throw beritaError;
      setBeritaTerbaru(beritaData || []);

      // 2. Mengambil total artikel dan kategori
      const { data: allBeritaKat, count, error: countError } = await supabase
        .from('berita')
        .select('kategori ( nama )', { count: 'exact' });

      if (countError) throw countError;
      setTotalArtikel(count || 0);

      // 3. Menghitung Persentase Kategori
      if (allBeritaKat && count && count > 0) {
        const perhitungan: Record<string, number> = {};
        allBeritaKat.forEach((item: any) => {
          const namaKat = item.kategori?.nama;
          if (namaKat) perhitungan[namaKat] = (perhitungan[namaKat] || 0) + 1;
        });

        const hasilStatistik = Object.keys(perhitungan).map(nama => {
          const jumlah = perhitungan[nama];
          const persen = Math.round((jumlah / count) * 100);
          return { nama, jumlah, persen: `${persen}%` };
        }).sort((a, b) => b.jumlah - a.jumlah);

        const paletWarna = ['bg-[#75621e]', 'bg-[#facc15]', 'bg-gray-400', 'bg-gray-300', 'bg-gray-200'];
        const statistikFinal = hasilStatistik.slice(0, 5).map((stat, indeks) => ({
          ...stat,
          warna: paletWarna[indeks % paletWarna.length]
        }));
        setKategoriStats(statistikFinal);
      } else {
        setKategoriStats([]);
      }
    } catch (error: any) {
      console.error("Gagal memuat data:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Fungsi Eksekusi Hapus Data ke Supabase
  const confirmHapus = async () => {
    if (!beritaToHapus) return;
    setIsDeleting(true);
    
    try {
      const { error } = await supabase
        .from('berita')
        .delete()
        .eq('id', beritaToHapus);

      if (error) throw error;

      // Tutup modal dan muat ulang data statistik & tabel
      setIsDeleteModalOpen(false);
      setBeritaToHapus(null);
      fetchDashboardData(); 
      
    } catch (error: any) {
      alert("Gagal menghapus berita: " + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatTanggal = (tanggalString: string) => {
    const date = new Date(tanggalString);
    return new Intl.DateTimeFormat('id-ID', { 
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(date);
  };

  const getStatusStyle = (status: string) => {
    switch(status.toLowerCase()) {
      case 'diterbitkan': return 'bg-green-100 text-green-700';
      case 'draf': return 'bg-gray-100 text-gray-700';
      case 'tinjauan': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto relative">
      
      {/* HEADER RINGKASAN */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-[#75621e]">Dasbor</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" placeholder="Cari artikel berita" 
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#facc15]"
            />
          </div>
          <button className="bg-[#75621e] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#5c4a11] transition-colors whitespace-nowrap">
            Portal Admin
          </button>
        </div>
      </div>

      {/* AREA STATISTIK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-[#facc15] rounded-full flex items-center justify-center text-gray-900 mb-6 shadow-md">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <p className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-2">Total Artikel Dikelola</p>
          <p className="text-6xl font-extrabold text-gray-900">{isLoading ? '...' : totalArtikel}</p>
        </div>

        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-8 shadow-sm flex flex-col">
          <h2 className="text-xl font-extrabold text-gray-900 mb-6">Distribusi Kategori Artikel</h2>
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 font-medium">Menghitung statistik...</div>
          ) : kategoriStats.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 font-medium">Belum ada artikel untuk dihitung.</div>
          ) : (
            <div className="space-y-6 flex-1 justify-center flex flex-col">
              {kategoriStats.map((kat, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm font-bold text-gray-900 mb-2">
                    <span>{kat.nama} <span className="text-gray-400 font-normal text-xs ml-1">({kat.jumlah} artikel)</span></span>
                    <span>{kat.persen}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div className={`${kat.warna} h-3 rounded-full transition-all duration-1000 ease-out`} style={{ width: kat.persen }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* TABEL BERITA */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">Edit Berita Terbaru</h2>
            <p className="text-sm text-gray-500 mt-1">Lacak aktivitas edit dan konten yang diterbitkan</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 text-xs font-bold text-gray-500 tracking-wider uppercase border-b border-gray-100">
                <th className="p-4">Judul Artikel</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Status</th>
                <th className="p-4">Terakhir Diperbarui</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500 font-medium">Memuat data dasbor...</td>
                </tr>
              ) : beritaTerbaru.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500 font-medium">Belum ada berita yang ditulis.</td>
                </tr>
              ) : (
                beritaTerbaru.map((berita) => (
                  <tr key={berita.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 flex items-center gap-4">
                      <div className="w-16 h-10 rounded-md bg-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
                        {berita.gambar_utama ? (
                          <img src={berita.gambar_utama} alt={berita.judul} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[10px] font-medium text-gray-400">No Img</span>
                        )}
                      </div>
                      <span className="font-bold text-gray-900 line-clamp-2 max-w-xs">{berita.judul}</span>
                    </td>
                    <td className="p-4"><span className="text-sm font-medium text-gray-700 whitespace-nowrap">{berita.kategori?.nama || 'Tanpa Kategori'}</span></td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider whitespace-nowrap ${getStatusStyle(berita.status)}`}>
                        {berita.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-500 whitespace-nowrap">{formatTanggal(berita.created_at)}</td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center items-center gap-4">
                        <Link href={`/admin/edit-berita/${berita.id}`} className="text-sm font-bold text-[#75621e] hover:underline">
                          Edit
                        </Link>
                        {/* Tombol Hapus Baru */}
                        <button 
                          onClick={() => { setBeritaToHapus(berita.id); setIsDeleteModalOpen(true); }}
                          className="text-sm font-bold text-red-600 hover:underline"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL KONFIRMASI HAPUS */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Hapus Berita?</h3>
            <p className="text-gray-500 text-sm mb-6">Tindakan ini permanen. Artikel yang dihapus tidak dapat dikembalikan lagi ke dalam sistem.</p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={confirmHapus}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
              >
                {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}