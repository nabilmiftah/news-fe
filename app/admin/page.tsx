export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      
      {/* HEADER DASBOR */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-[#75621e]">Ringkasan</h2>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Cari artikel berita" 
              className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-[#facc15] outline-none"
            />
            <svg className="w-4 h-4 text-gray-500 absolute left-4 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <div className="relative cursor-pointer">
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#f9f9f9]"></span>
          </div>
          <button className="bg-[#75621e] text-white font-bold px-5 py-2 rounded-lg text-sm hover:bg-[#5c4a11] transition-colors">
            Portal Admin
          </button>
        </div>
      </div>

      {/* KARTU RINGKASAN */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-[#facc15] rounded-lg flex items-center justify-center text-gray-900">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">+12%</span>
          </div>
          <p className="text-sm text-gray-500 font-bold mb-1">Total Artikel</p>
          <h3 className="text-3xl font-extrabold text-gray-900">1.482</h3>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-[#facc15] rounded-lg flex items-center justify-center text-gray-900">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">+24%</span>
          </div>
          <p className="text-sm text-gray-500 font-bold mb-1">Total Kunjungan</p>
          <h3 className="text-3xl font-extrabold text-gray-900">842,1K</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-[#facc15] rounded-lg flex items-center justify-center text-gray-900">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            </div>
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">-3%</span>
          </div>
          <p className="text-sm text-gray-500 font-bold mb-1">Komentar</p>
          <h3 className="text-3xl font-extrabold text-gray-900">12.302</h3>
        </div>

        <div className="bg-[#facc15] p-6 rounded-xl shadow-sm border border-[#eab308]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 bg-transparent border border-gray-900/20 rounded-lg flex items-center justify-center text-gray-900">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
            </div>
          </div>
          <p className="text-sm text-[#75621e] font-bold mb-1">Langganan Premium</p>
          <h3 className="text-3xl font-extrabold text-gray-900">4.209</h3>
        </div>
      </div>

      {/* GRAFIK & KATEGORI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-extrabold text-gray-900">Analisis Lalu Lintas</h3>
              <p className="text-sm text-gray-500">Pengunjung unik harian selama 30 hari terakhir</p>
            </div>
            <div className="bg-gray-100 rounded-full flex p-1">
              <button className="text-xs font-bold px-4 py-1.5 rounded-full text-gray-600">Mingguan</button>
              <button className="text-xs font-bold px-4 py-1.5 rounded-full bg-[#75621e] text-white shadow-sm">Bulanan</button>
            </div>
          </div>
          
          {/* Mockup Grafik Batang */}
          <div className="flex items-end justify-between h-48 border-b border-gray-200 pb-2 gap-2">
            {[40, 60, 30, 90, 50, 40, 80, 50].map((height, i) => (
              <div key={i} className="w-full bg-[#facc15] rounded-t-sm hover:opacity-80 transition-opacity" style={{ height: `${height}%` }}></div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-3 uppercase tracking-wider">
            <span>HARI 1</span>
            <span>HARI 15</span>
            <span>HARI 30</span>
          </div>
        </div>

        {/* Kategori Area */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-6">Kategori</h3>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-900 mb-2">
                  <span>Teknologi</span><span>42%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-[#75621e] h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-900 mb-2">
                  <span>Politik</span><span>28%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-gray-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-900 mb-2">
                  <span>Ekonomi</span><span>15%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-gray-400 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-900 mb-2">
                  <span>Olahraga</span><span>10%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-gray-400 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full border border-gray-300 text-gray-900 font-bold py-2.5 rounded-lg text-sm mt-6 hover:bg-gray-50 transition-colors">
            Lihat Laporan Detail
          </button>
        </div>
      </div>

      {/* TABEL BERITA TERBARU */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900">Edit Berita Terbaru</h3>
            <p className="text-sm text-gray-500">Lacak aktivitas edit dan konten yang diterbitkan</p>
          </div>
          <button className="text-gray-400 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fbfaf8] text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4">JUDUL ARTIKEL</th>
                <th className="px-6 py-4">EDITOR</th>
                <th className="px-6 py-4">STATUS</th>
                <th className="px-6 py-4">TERAKHIR DIPERBARUI</th>
                <th className="px-6 py-4 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=100&auto=format&fit=crop" alt="Thumb" className="w-12 h-8 object-cover rounded" />
                  <span className="font-bold text-sm text-gray-900">Prosesor Kuantum Baru Siap<br/>Merevolusi Industri Teknologi</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#facc15]"></span> Sarah Jenkins
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded uppercase">DITERBITKAN</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">2 menit yang lalu</td>
                <td className="px-6 py-4 text-right"></td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=100&auto=format&fit=crop" alt="Thumb" className="w-12 h-8 object-cover rounded" />
                  <span className="font-bold text-sm text-gray-900">KTT Global Membahas<br/>Perubahan Kebijakan Iklim</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gray-200"></span> Mark Henderson
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2.5 py-1 rounded uppercase">DRAF</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">15 menit yang lalu</td>
                <td className="px-6 py-4 text-right"></td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?q=80&w=100&auto=format&fit=crop" alt="Thumb" className="w-12 h-8 object-cover rounded" />
                  <span className="font-bold text-sm text-gray-900">Kemenangan Tim Kuda Hitam<br/>di Final Kejuaraan Regional</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gray-200"></span> Elena Rossi
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-[#facc15] text-gray-900 text-[10px] font-bold px-2.5 py-1 rounded uppercase">TINJAUAN</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">1 jam yang lalu</td>
                <td className="px-6 py-4 text-right"></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-[#fbfaf8] p-4 text-center border-t border-gray-100">
          <button className="text-xs font-bold text-[#75621e] hover:underline uppercase tracking-wider">
            Lihat Semua Artikel
          </button>
        </div>
      </div>

    </div>
  );
}