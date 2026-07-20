import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Fungsi utama middleware
export function middleware(request: NextRequest) {
  // 1. Ambil URL yang sedang ingin diakses pengguna
  const url = request.nextUrl.clone();

  // 2. Cek apakah ada token sesi/login dari Supabase (atau cookie otentikasi)
  // Catatan: Nama cookie ini bisa disesuaikan nanti saat integrasi Supabase Auth selesai
  const isAuthenticated = request.cookies.has('sb-access-token');

  // 3. Logika Proteksi:
  // Jika pengguna mencoba masuk ke rute yang diawali dengan "/admin" TAPI belum login
  if (request.nextUrl.pathname.startsWith('/admin') && !isAuthenticated) {
    
    // Alihkan (redirect) mereka secara paksa ke halaman login
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Jika aman, biarkan pengguna melanjutkan perjalanan ke halaman yang dituju
  return NextResponse.next();
}

// 4. Konfigurasi Matcher:
// Tentukan di rute mana saja satpam (middleware) ini harus berjaga.
// Di sini kita perintahkan untuk berjaga di semua halaman di dalam /admin
export const config = {
  matcher: ['/admin/:path*'],
};