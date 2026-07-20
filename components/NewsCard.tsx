import Link from 'next/link';

interface NewsCardProps {
  title: string;
  description: string;
  category: string;
  timeAgo: string;
  imageUrl: string;
  slug: string; // Untuk URL detail berita nanti
}

export default function NewsCard({ 
  title, 
  description, 
  category, 
  timeAgo, 
  imageUrl, 
  slug 
}: NewsCardProps) {
  return (
    <div className="flex flex-col group">
      {/* Gambar Berita */}
      <div className="relative w-full h-52 mb-4 overflow-hidden rounded-lg bg-gray-200">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Meta Info (Kategori & Waktu) */}
      <div className="flex items-center text-[11px] font-bold tracking-wider mb-2 uppercase">
        <span className="text-[#d9a01e]">{category}</span>
        <span className="mx-2 text-gray-400">•</span>
        <span className="text-gray-500">{timeAgo}</span>
      </div>

      {/* Judul */}
      <Link href={`/berita/${slug}`}>
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#d9a01e] transition-colors cursor-pointer">
          {title}
        </h3>
      </Link>

      {/* Deskripsi (Dibatasi maksimal 3 baris menggunakan Tailwind 'line-clamp') */}
      <p className="text-sm text-gray-600 line-clamp-3">
        {description}
      </p>
    </div>
  );
}