import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Meminta seluruh data dari tabel 'kategori'
    // Diurutkan berdasarkan nama abjad (ascending)
    const { data, error } = await supabase
      .from('kategori')
      .select('*')
      .order('nama', { ascending: true });

    if (error) throw error;

    // Mengembalikan data berformat JSON ke peminta (200 OK)
    return NextResponse.json({ sukses: true, data: data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { sukses: false, pesan: error.message || 'Terjadi kesalahan saat memuat kategori' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validasi input: Nama dan slug kategori wajib ada
    if (!body.nama || !body.slug) {
      return NextResponse.json(
        { sukses: false, pesan: 'Nama dan slug kategori wajib diisi' },
        { status: 400 }
      );
    }

    // Melakukan operasi INSERT ke tabel 'kategori'
    // Menghapus 'deskripsi' dan menyesuaikan dengan kolom yang ada (nama, slug)
    const { data, error } = await supabase
      .from('kategori')
      .insert([
        {
          nama: body.nama,
          slug: body.slug
        }
      ])
      .select();

    if (error) throw error;

    // Sukses menyimpan kategori baru (201 Created)
    return NextResponse.json({ sukses: true, data: data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { sukses: false, pesan: error.message || 'Terjadi kesalahan saat menambah kategori' },
      { status: 500 }
    );
  }
}