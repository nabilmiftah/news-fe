"use client";
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex w-full bg-white">
      
      {/* ================= SISI KIRI (GAMBAR & BRANDING) ================= */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gray-900 flex-col justify-between overflow-hidden">
        {/* Latar Belakang Gambar */}
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" 
          alt="Office Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        {/* Gradient Overlay bawah agar teks terbaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

        {/* Lencana Atas (Akses Jaringan Langsung) */}
        <div className="relative z-10 w-full flex justify-end p-8">
          <div className="flex items-center gap-2 bg-gray-900/80 border border-gray-700 backdrop-blur-sm px-4 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#facc15]"></span>
            <span className="text-white text-[10px] font-bold tracking-widest uppercase">
              Akses Jaringan Langsung
            </span>
          </div>
        </div>

        {/* Branding Bawah */}
        <div className="relative z-10 p-12 w-full max-w-xl">
          <h1 className="text-5xl font-extrabold text-[#facc15] tracking-tight mb-4">
            Kabarin
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            The Informed Optimist. Akses inti dari operasi editorial kami dan bentuk berita masa depan.
          </p>
        </div>
      </div>


      {/* ================= SISI KANAN (FORMULIR LOGIN) ================= */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 md:p-24 bg-[#fafafa]">
        <div className="w-full max-w-md">
          
          {/* Header Form */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
              Selamat datang kembali
            </h2>
            <p className="text-gray-500 text-sm">
              Silakan masukkan kredensial editor Anda untuk melanjutkan.
            </p>
          </div>

          {/* Form Utama */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            {/* Input Email */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Email Karyawan
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  {/* Ikon @ */}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                  </svg>
                </div>
                <input 
                  type="email" 
                  placeholder="editor@kabarin.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#facc15] focus:border-transparent transition-shadow"
                />
              </div>
            </div>

            {/* Input Kata Sandi */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-gray-700">
                  Kata Sandi
                </label>
                <a href="#" className="text-xs font-bold text-[#bca873] hover:text-[#857022] transition-colors">
                  Lupa?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  {/* Ikon Gembok */}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#facc15] focus:border-transparent transition-shadow"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700">
                  {/* Ikon Mata (Show Password) */}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Checkbox Tetap Masuk */}
            <div className="flex items-center mt-2">
              <input 
                type="checkbox" 
                className="w-4 h-4 text-[#facc15] bg-white border-gray-300 rounded focus:ring-[#facc15]"
              />
              <label className="ml-2 text-xs text-gray-600 font-medium">
                Tetap masuk selama 24 jam
              </label>
            </div>

            {/* Tombol Submit */}
            <button className="w-full mt-4 bg-[#facc15] hover:bg-[#eab308] text-gray-900 font-bold py-3 rounded-lg text-sm transition-colors flex justify-center items-center gap-2 shadow-sm">
              Masuk ke Dasbor
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          {/* Garis Pemisah (Divider) */}
          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink-0 mx-4 text-[10px] text-gray-500">Atau masuk dengan akun korporat</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Tombol SSO */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex justify-center items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 py-2.5 rounded-lg text-xs font-bold text-gray-700 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
              Okta
            </button>
            <button className="flex justify-center items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 py-2.5 rounded-lg text-xs font-bold text-gray-700 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
              Azure AD
            </button>
          </div>

          {/* Footer Form Keamanan */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-1.5 text-gray-500 mb-3">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
              </svg>
              <span className="text-[10px] font-bold">Diamankan oleh Sistem Internal Kabarin</span>
            </div>
            <div className="flex justify-center gap-4 text-[10px] font-bold text-gray-500">
              <a href="#" className="hover:text-gray-900 transition-colors">Kebijakan Keamanan</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Pusat Bantuan</a>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}