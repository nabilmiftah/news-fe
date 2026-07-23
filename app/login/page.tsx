"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      // Fungsi autentikasi login Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Jika berhasil, langsung arahkan ke Dashboard Admin
      router.push('/admin');
      
    } catch (error: any) {
      setErrorMsg("Email atau kata sandi salah. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Ornamen Latar Belakang (Opsional agar tidak terlalu sepi) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#facc15]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#75621e]/10 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#75621e] tracking-tight mb-2">Kabarin</h1>
          <p className="text-sm text-gray-500 font-medium">Selamat datang kembali, Admin</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm font-bold rounded-lg border border-red-100">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Alamat Email</label>
            <input 
              type="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#facc15]"
              placeholder="admin@kabarin.com"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-bold text-gray-700">Kata Sandi</label>
              <Link href="#" className="text-xs font-bold text-[#75621e] hover:underline">Lupa sandi?</Link>
            </div>
            <input 
              type="password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#facc15]"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" disabled={isLoading}
            className="w-full bg-[#facc15] text-gray-900 font-extrabold py-3 rounded-lg hover:bg-[#eab308] transition-colors disabled:opacity-70 mt-4 shadow-sm"
          >
            {isLoading ? 'Memeriksa Kredensial...' : 'Masuk ke Dasbor'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6 font-medium">
          Belum punya akun admin? <Link href="/register" className="text-[#75621e] font-bold hover:underline">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}