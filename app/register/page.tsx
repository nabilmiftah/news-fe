"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // Fungsi mendaftarkan pengguna baru ke Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: nama, // Menyimpan nama ke metadata Supabase
          }
        }
      });

      if (error) throw error;

      setSuccessMsg('Registrasi berhasil! Silakan login menggunakan akun Anda.');
      
      // Mengosongkan form
      setNama('');
      setEmail('');
      setPassword('');
      
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#75621e] tracking-tight mb-2">Kabarin</h1>
          <p className="text-sm text-gray-500 font-medium">Buat akun Admin Redaksi baru</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm font-bold rounded-lg border border-red-100">
            {errorMsg}
          </div>
        )}
        
        {successMsg && (
          <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm font-bold rounded-lg border border-green-100">
            {successMsg} <Link href="/login" className="underline">Ke halaman Login</Link>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
            <input 
              type="text" required
              value={nama} onChange={(e) => setNama(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#facc15]"
              placeholder="Contoh: Budi Santoso"
            />
          </div>
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
            <label className="block text-sm font-bold text-gray-700 mb-1">Kata Sandi</label>
            <input 
              type="password" required minLength={6}
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#facc15]"
              placeholder="Minimal 6 karakter"
            />
          </div>
          <button 
            type="submit" disabled={isLoading}
            className="w-full bg-[#75621e] text-white font-extrabold py-3 rounded-lg hover:bg-[#5c4a11] transition-colors disabled:opacity-70 mt-4"
          >
            {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6 font-medium">
          Sudah punya akun? <Link href="/login" className="text-[#75621e] font-bold hover:underline">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}