import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Memanggil klien yang kita buat di Langkah 1

// Fungsi GET untuk menangani permintaan HTTP GET
export async function GET() {
  try {
    // Menjalankan kueri SQL: SELECT * FROM kategori ORDER BY id ASC
    const { data, error } = await supabase
      .from('kategori')
      .select('*')
      .order('id', { ascending: true });

    // Jika terjadi kesalahan dari Supabase
    if (error) {
      return NextResponse.json({ sukses: false, pesan: error.message }, { status: 500 });
    }

    // Jika berhasil, kembalikan data dalam format JSON
    return NextResponse.json({ sukses: true, data: data }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json(
      { sukses: false, pesan: 'Terjadi kesalahan pada peladen' }, 
      { status: 500 }
    );
  }
}

// Fungsi POST untuk menambahkan kategori baru
export async function POST(request: Request) {
  try {
    // Menangkap data yang dikirim dari frontend (body request)
    const body = await request.json();
    const { nama, slug } = body;

    // Validasi sederhana
    if (!nama || !slug) {
      return NextResponse.json(
        { sukses: false, pesan: 'Nama dan slug kategori wajib diisi' },
        { status: 400 }
      );
    }

    // Melakukan operasi INSERT ke tabel kategori di Supabase
    const { data, error } = await supabase
      .from('kategori')
      .insert([{ nama: nama, slug: slug }])
      .select(); // .select() berguna untuk mengembalikan data yang baru saja dimasukkan

    if (error) {
      return NextResponse.json({ sukses: false, pesan: error.message }, { status: 500 });
    }

    return NextResponse.json({ sukses: true, data: data }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { sukses: false, pesan: 'Terjadi kesalahan saat memproses permintaan' },
      { status: 500 }
    );
  }
}