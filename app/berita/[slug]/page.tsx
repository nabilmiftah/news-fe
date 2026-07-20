import Link from 'next/link';

export default function DetailBerita({ params }: { params: { slug: string } }) {
  // Data simulasi disesuaikan dengan desain "Kabarin - Detail Berita"
  const article = {
    title: "Kebangkitan Kota Pintar Tenaga Surya: Visi Indonesia 2030",
    category: "TEKNOLOGI BERKELANJUTAN",
    author: "Adeline Wijaya",
    date: "Diterbitkan 2 jam yang lalu",
    readTime: "6 menit baca",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    caption: "Render seniman dari Inti Pintar Nusantara, direncanakan selesai pada 2030.",
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* KONTEN UTAMA & SIDEBAR */}
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* === KOLOM KIRI (ARTIKEL) - 70% === */}
        <article className="w-full lg:w-2/3">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase mb-6">
            <Link href="/" className="text-gray-500 hover:text-gray-900">BERANDA</Link>
            <span className="text-gray-400">{'>'}</span>
            <Link href="/berita" className="text-gray-500 hover:text-gray-900">BERITA</Link>
            <span className="text-gray-400">{'>'}</span>
            <span className="text-[#a18c35]">{article.category}</span>
          </div>

          {/* Judul Artikel */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8">
            {article.title}
          </h1>

          {/* Meta Penulis & Interaksi */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" 
                alt={article.author} 
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-bold text-gray-900">{article.author}</p>
                <p className="text-xs text-gray-500">{article.date} • {article.readTime}</p>
              </div>
            </div>
            
            {/* Tombol Interaksi (Share, Bookmark, Comment) */}
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </button>
            </div>
          </div>

          {/* Gambar Artikel & Caption */}
          <div className="mb-8">
            <img 
              src={article.imageUrl} 
              alt="Ilustrasi Kota Pintar" 
              className="w-full h-[450px] object-cover rounded-xl mb-3"
            />
            <p className="text-center text-xs text-gray-500">{article.caption}</p>
          </div>

          {/* Teks Konten */}
          <div className="prose prose-lg max-w-none text-gray-800">
            <p className="mb-6 leading-relaxed">
              Dalam era yang ditentukan oleh kebutuhan mendesak akan transisi berkelanjutan, Indonesia memposisikan dirinya sebagai pemimpin global dalam integrasi energi terbarukan perkotaan. Buku putih pemerintah terbaru mengungkapkan rencana ambisius untuk mengkonversi lebih dari 60% infrastruktur perkotaan ke sistem energi berbasis tenaga surya pada akhir dekade ini.
            </p>
            <p className="mb-6 leading-relaxed">
              Inisiatif ini, yang dijuluki "Jalur Optimis yang Terinformasi," berfokus pada jaringan energi terdesentralisasi di mana setiap bangunan bertindak sebagai konsumen sekaligus penghasil energi. "Kami tidak hanya membangun kota; kami sedang membangun ekosistem," kata Dr. Aris Pratama, arsitek utama proyek tersebut.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Revolusi Jaringan Listrik</h2>
            <p className="mb-6 leading-relaxed">
              Jaringan terpusat tradisional sering menderita kerugian transmisi dan kerentanan terhadap kegagalan lokal. Sistem "Smart Mesh" yang baru menggunakan penyeimbangan beban berbasis AI untuk mendistribusikan daya secara real-time, memastikan lingkungan perumahan dapat mendukung sektor industri selama jam-jam produksi puncak.
            </p>

            {/* Blockquote / Sorotan */}
            <blockquote className="bg-[#facc15] p-6 rounded-lg text-xl font-bold text-[#5c4a11] italic my-8 leading-snug">
              "Peralihan ke tenaga surya bukan sekadar masalah lingkungan; ini adalah pembebasan sosio-ekonomi dari biaya impor bahan bakar fosil yang fluktuatif."
            </blockquote>

            <p className="mb-6 leading-relaxed">
              Lebih lanjut, integrasi 'Green Sprints'—hutan vertikal yang berfungsi ganda sebagai pusat pemurnian udara—akan bekerja bersama panel surya untuk mengurangi efek pulau panas perkotaan, yang saat ini melanda kota-kota seperti Jakarta dan Surabaya. Para ahli memprediksi penurunan suhu sebesar 4 derajat di zona percontohan dalam tiga tahun pertama.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mt-10 border-t border-gray-200 pt-8">
            {['ENERGI SURYA', 'PERENCANAAN KOTA', 'INDONESIA 2030', 'KOTA PINTAR'].map((tag) => (
              <span key={tag} className="bg-gray-200 text-gray-600 text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

        </article>

        {/* === KOLOM KANAN (SIDEBAR) - 30% === */}
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
              <div>
                <span className="text-[9px] font-bold text-[#a18c35] uppercase tracking-widest">GAYA HIDUP</span>
                <h4 className="font-bold text-sm text-gray-900 mt-1 hover:text-[#a18c35] cursor-pointer">Eksodus kerja jarak jauh: Mengapa Bali tetap jadi pilihan utama</h4>
                <p className="text-xs text-gray-500 mt-1">28rb pembaca</p>
              </div>
            </div>
          </div>

          {/* Newsletter / Tetap Terinformasi */}
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

          {/* Topik Terkait */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900">Topik Terkait</h3>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-center group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1509391366360-1f95096eb20f?q=80&w=150&auto=format&fit=crop" alt="Thumbnail" className="w-16 h-16 rounded object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-snug group-hover:text-[#a18c35]">Bedah Teknologi: Panel Kaca Surya Baru</h4>
                  <p className="text-[10px] text-gray-500 mt-1">5 menit baca</p>
                </div>
              </div>
              <div className="flex gap-3 items-center group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=150&auto=format&fit=crop" alt="Thumbnail" className="w-16 h-16 rounded object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 leading-snug group-hover:text-[#a18c35]">Infrastruktur Kendaraan Listrik: Mengisi Masa Depan</h4>
                  <p className="text-[10px] text-gray-500 mt-1">3 menit baca</p>
                </div>
              </div>
            </div>
          </div>

        </aside>
      </div>

      {/* ================= BAGIAN BAWAH: REKOMENDASI UNTUK ANDA ================= */}
      <div className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Rekomendasi untuk Anda</h2>
          <Link href="/berita" className="text-sm font-bold text-[#a18c35] hover:underline">
            Lihat semua berita
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card Besar (Kiri) */}
          <div className="lg:col-span-1 bg-white border border-gray-100 rounded-xl overflow-hidden group cursor-pointer shadow-sm">
            <div className="relative h-56 w-full">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop" alt="Nomad Digital" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <span className="absolute top-4 left-4 bg-[#857022] text-white text-[9px] font-bold px-2 py-1 rounded uppercase">GAYA HIDUP</span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#a18c35]">Mengapa Indonesia Menjadi Episentrum bagi Nomad Digital</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">Di luar Bali, pusat baru di Yogyakarta dan Bandung menawarkan konektivitas tinggi dengan biaya hidup yang lebih rendah, menarik bakat global generasi baru.</p>
              <p className="text-[10px] text-gray-500">Kemarin • 12 menit baca</p>
            </div>
          </div>

          {/* Grid Kanan (4 Card Kecil) */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Sub Card 1 */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden group cursor-pointer shadow-sm">
              <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400&auto=format&fit=crop" alt="Thumb" className="w-full h-32 object-cover group-hover:opacity-90" />
              <div className="p-4">
                <span className="text-[9px] font-bold text-[#a18c35] uppercase tracking-widest block mb-1">TEKNO HIJAU</span>
                <h4 className="font-bold text-sm text-gray-900 mb-1 leading-snug">Prototipe Baterai Biodegradable Lolos Uji Keselamatan Awal</h4>
                <p className="text-xs text-gray-500 line-clamp-2">Terobosan dalam kimia organik dapat menyelesaikan krisis pembuangan ion-litium.</p>
              </div>
            </div>

            {/* Sub Card 2 */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden group cursor-pointer shadow-sm">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop" alt="Thumb" className="w-full h-32 object-cover group-hover:opacity-90" />
              <div className="p-4">
                <span className="text-[9px] font-bold text-[#a18c35] uppercase tracking-widest block mb-1">EKONOMI</span>
                <h4 className="font-bold text-sm text-gray-900 mb-1 leading-snug">Unicorn ke Decacorn: Lanskap Teknologi 2024</h4>
                <p className="text-xs text-gray-500 line-clamp-2">Startup lokal menantang tren global dengan putaran pendanaan seri-C yang kuat.</p>
              </div>
            </div>

            {/* Sub Card 3 */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden group cursor-pointer shadow-sm">
              <img src="https://images.unsplash.com/photo-1473042904451-00171c69419d?q=80&w=400&auto=format&fit=crop" alt="Thumb" className="w-full h-32 object-cover group-hover:opacity-90" />
              <div className="p-4">
                <span className="text-[9px] font-bold text-[#a18c35] uppercase tracking-widest block mb-1">INFRASTRUKTUR</span>
                <h4 className="font-bold text-sm text-gray-900 mb-1 leading-snug">Ekstensi MRT Baru: Menghubungkan yang Terputus</h4>
                <p className="text-xs text-gray-500 line-clamp-2">Waktu tempuh diprediksi turun 40% bagi pekerja di pinggiran kota.</p>
              </div>
            </div>

            {/* Sub Card 4 */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden group cursor-pointer shadow-sm">
              <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop" alt="Thumb" className="w-full h-32 object-cover group-hover:opacity-90" />
              <div className="p-4">
                <span className="text-[9px] font-bold text-[#a18c35] uppercase tracking-widest block mb-1">OPINI</span>
                <h4 className="font-bold text-sm text-gray-900 mb-1 leading-snug">Kekuatan Optimisme Kolektif dalam Jurnalisme Modern</h4>
                <p className="text-xs text-gray-500 line-clamp-2">Bagaimana Kabarin News bertujuan mengalihkan narasi dari pesimisme ke pelaporan yang berorientasi solusi.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      
    </div>
  );
}