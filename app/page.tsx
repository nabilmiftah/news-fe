import NewsCard from "../components/NewsCard";
import Button from "../components/Button";

export default function Home() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* 1. BARIS BERITA TERKINI */}
      <div className="bg-[#eae8e1] rounded w-full h-8 mb-6 flex items-center px-1">
        <span className="bg-[#857022] text-white text-[10px] font-bold px-3 py-1 rounded-sm tracking-wide">
          BERITA TERKINI
        </span>
      </div>

      {/* 2. KONTEN UTAMA (KIRI & KANAN) */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* === KOLOM KIRI (70%) === */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          
          {/* Hero Image (Berita Utama) */}
          <div className="relative w-full h-[420px] rounded-xl overflow-hidden group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" 
              alt="Hero" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient gelap agar teks terbaca */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-8 w-full md:w-5/6">
              <div className="flex items-center gap-2 mb-3 text-xs font-bold">
                <span className="bg-[#facc15] text-gray-900 px-2 py-0.5 rounded-sm">UNGGULAN</span>
                <span className="text-gray-300">Politik • 5 mnt baca</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                Renaisans Digital: Bagaimana AI Membentuk Kembali Tata Kelola Kota di 2024
              </h1>
              <p className="text-gray-300 text-sm line-clamp-2">
                Para ahli terkemuka membahas integrasi kecerdasan buatan dalam pembuatan kebijakan lokal dan transparansi yang belum pernah ada sebelumnya bagi warga...
              </p>
            </div>
          </div>

          {/* Grid 2 Berita Sekunder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NewsCard 
              title="Silikon Berkelanjutan: Generasi Berikutnya dari Eco-Chip"
              description="Teknik manufaktur baru mengurangi jejak karbon sebesar 40% sekaligus menggandakan daya pemrosesan untuk perangkat seluler."
              category="TEKNOLOGI"
              timeAgo=""
              imageUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
              slug="eco-chip"
            />
            <NewsCard 
              title="Lonjakan Terbarukan: Adopsi Tenaga Surya Mencapai Rekor Tertinggi"
              description="Subsidi dan terobosan teknologi menyebabkan pergeseran besar dalam pola konsumsi energi rumah tangga di seluruh Eropa."
              category="LINGKUNGAN"
              timeAgo=""
              imageUrl="https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVuYWdhJTIwc3VyeWF8ZW58MHx8MHx8fDA%3D"
              slug="tenaga-surya"
            />
          </div>
        </div>


        {/* === KOLOM KANAN (30%) === */}
        <aside className="w-full lg:w-1/3 flex flex-col gap-6">
          
          {/* Topik Populer */}
          <div className="bg-[#f8f7f3] p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Topik Populer
            </h3>
            
            <div className="flex flex-col gap-6">
              {/* Item 01 */}
              <div className="flex gap-4">
                <span className="text-4xl font-bold text-transparent" style={{ WebkitTextStroke: '1px #bca873' }}>01</span>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 leading-snug">Perjanjian Perdagangan Global Siap untuk Dirombak</h4>
                  <p className="text-xs text-gray-500 mt-1">2,4rb Pembaca • 12mnt yang lalu</p>
                </div>
              </div>
              {/* Item 02 */}
              <div className="flex gap-4">
                <span className="text-4xl font-bold text-transparent" style={{ WebkitTextStroke: '1px #bca873' }}>02</span>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 leading-snug">Pencapaian Baru Komputasi Kuantum Terwujud</h4>
                  <p className="text-xs text-gray-500 mt-1">1,8rb Pembaca • 45mnt yang lalu</p>
                </div>
              </div>
              {/* Item 03 */}
              <div className="flex gap-4">
                <span className="text-4xl font-bold text-transparent" style={{ WebkitTextStroke: '1px #bca873' }}>03</span>
                <div>
                  <h4 className="font-bold text-sm text-gray-900 leading-snug">Keberhasilan Biodiversitas: Spesies Langka Kembali</h4>
                  <p className="text-xs text-gray-500 mt-1">1,1rb Pembaca • 2jam yang lalu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kotak Newsletter */}
          <div className="bg-[#857022] p-6 rounded-xl text-white shadow-md">
            <h3 className="text-xl font-bold mb-2">Tetap Terinformasi</h3>
            <p className="text-sm text-[#e5dcc3] mb-5 leading-relaxed">
              Dapatkan cerita terpenting yang dikirimkan ke kotak masuk Anda setiap pagi. Bergabunglah dengan 50.000+ pelanggan.
            </p>
            <input 
              type="email" 
              placeholder="alamat@email.com" 
              className="w-full px-4 py-2.5 rounded border border-[#a38a2e] bg-[#75621e] text-white placeholder-[#c4b587] text-sm focus:outline-none mb-4"
            />
            <Button variant="primary" className="w-full shadow-sm">Berlangganan Sekarang</Button>
            <p className="text-[9px] text-[#d6cdb4] mt-3 text-center">
              Dengan berlangganan, Anda menyetujui Ketentuan Layanan dan Kebijakan Privasi kami.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {['#EKONOMI', '#KESEHATAN', '#MARS', '#PEMILU', '#OLAHRAGA_MUSIM_DINGIN'].map(tag => (
              <span key={tag} className="bg-[#e4e2db] text-gray-600 text-[11px] font-bold px-3 py-1.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>

        </aside>
      </div>

      {/* 3. BAGIAN BAWAH: REKOMENDASI UNTUK ANDA */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Rekomendasi untuk Anda</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card Mini 1 */}
          <div className="flex gap-4 items-center group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=200&auto=format&fit=crop" alt="Thumbnail" className="w-20 h-20 rounded-md object-cover group-hover:opacity-80" />
            <div>
              <span className="text-[9px] text-[#a18c35] font-bold uppercase tracking-wider">GAYA HIDUP</span>
              <h4 className="text-sm font-bold text-gray-900 leading-snug mt-1 group-hover:text-[#a18c35]">Bagaimana Pertanian Perkotaan Mengubah Pola Makan Kota</h4>
            </div>
          </div>
          {/* Card Mini 2 */}
          <div className="flex gap-4 items-center group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=200&auto=format&fit=crop" alt="Thumbnail" className="w-20 h-20 rounded-md object-cover group-hover:opacity-80" />
            <div>
              <span className="text-[9px] text-[#a18c35] font-bold uppercase tracking-wider">OLAHRAGA</span>
              <h4 className="text-sm font-bold text-gray-900 leading-snug mt-1 group-hover:text-[#a18c35]">Atletik Generasi Berikutnya: Wearables dan Performa</h4>
            </div>
          </div>
          {/* Card Mini 3 */}
          <div className="flex gap-4 items-center group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=200&auto=format&fit=crop" alt="Thumbnail" className="w-20 h-20 rounded-md object-cover group-hover:opacity-80" />
            <div>
              <span className="text-[9px] text-[#a18c35] font-bold uppercase tracking-wider">PASAR</span>
              <h4 className="text-sm font-bold text-gray-900 leading-snug mt-1 group-hover:text-[#a18c35]">Indeks Global Naik di Tengah Pergeseran Kebijakan</h4>
            </div>
          </div>
          {/* Card Mini 4 */}
          <div className="flex gap-4 items-center group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=200&auto=format&fit=crop" alt="Thumbnail" className="w-20 h-20 rounded-md object-cover group-hover:opacity-80" />
            <div>
              <span className="text-[9px] text-[#a18c35] font-bold uppercase tracking-wider">KERJA</span>
              <h4 className="text-sm font-bold text-gray-900 leading-snug mt-1 group-hover:text-[#a18c35]">Masa Depan Kerja Jarak Jauh: Mengapa Stabilitas Penting</h4>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}