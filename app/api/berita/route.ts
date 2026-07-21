import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Mengambil data berita, dan melakukan JOIN ke tabel kategori & penulis
    // menggunakan sintaks khusus Supabase
    const { data, error } = await supabase
      .from('berita')
      .select(`
        *,
        kategori:kategori_id (nama),
        penulis:penulis_id (nama)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ sukses: true, data: data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { sukses: false, pesan: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validasi sederhana
    if (!body.judul || !body.slug) {
      return NextResponse.json(
        { sukses: false, pesan: 'Judul dan slug wajib diisi' },
        { status: 400 }
      );
    }

    // Melakukan operasi INSERT ke tabel berita
    const { data, error } = await supabase
      .from('berita')
      .insert([
        {
          judul: body.judul,
          slug: body.slug,
          konten: body.konten,
          gambar_utama: body.gambar_utama,
          status: body.status || 'Draf',
          kategori_id: body.kategori_id,
          penulis_id: body.penulis_id,
          meta_deskripsi: body.meta_deskripsi,
          is_terkini: body.is_terkini || false,
          tags: body.tags || []
        }
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({ sukses: true, data: data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { sukses: false, pesan: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}