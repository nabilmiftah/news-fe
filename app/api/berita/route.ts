import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Meminta data dari tabel 'berita', dilengkapi join ke tabel kategori & penulis
    const { data, error } = await supabase
      .from('berita')
      .select(`
        *,
        kategori:kategori_id (nama),
        penulis:penulis_id (nama)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Mengembalikan data JSON ke peminta dengan status 200 (OK)
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

    // Validasi sederhana (Wajib ada judul dan slug)
    if (!body.judul || !body.slug) {
      return NextResponse.json(
        { sukses: false, pesan: 'Judul dan slug wajib diisi' },
        { status: 400 }
      );
    }

    // Melakukan operasi INSERT ke tabel 'berita'
    const { data, error } = await supabase
      .from('berita')
      .insert([{
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
      }])
      .select();

    if (error) throw error;

    // Sukses membuat data (201 Created)
    return NextResponse.json({ sukses: true, data: data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { sukses: false, pesan: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    // Menangkap parameter '?id=' dari URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { sukses: false, pesan: "Parameter ID berita wajib disertakan di URL" }, 
        { status: 400 }
      );
    }

    const body = await request.json();
    
    // Melakukan pembaruan (UPDATE) hanya pada kolom yang dikirimkan
    const { data, error } = await supabase
      .from('berita')
      .update(body)
      .eq('id', id)
      .select();
      
    if (error) throw error;
    
    return NextResponse.json({ sukses: true, pesan: "Data berhasil diperbarui", data: data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { sukses: false, pesan: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { sukses: false, pesan: "Parameter ID berita wajib disertakan di URL" }, 
        { status: 400 }
      );
    }

    // Melakukan operasi DELETE pada baris dengan id yang cocok
    const { data, error } = await supabase
      .from('berita')
      .delete()
      .eq('id', id)
      .select();
      
    if (error) throw error;
    
    return NextResponse.json({ sukses: true, pesan: "Berita berhasil dihapus", data: data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { sukses: false, pesan: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}