import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary'; // Pilihan warna tombol
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: ButtonProps) {
  // Gaya dasar yang selalu dipakai
  const baseStyle = "font-semibold px-5 py-2 rounded-md text-sm transition-colors text-center";
  
  // Gaya spesifik berdasarkan varian
  const variants = {
    primary: "bg-[#facc15] hover:bg-[#eab308] text-gray-900", // Tombol Kuning
    secondary: "bg-[#5b5b5b] hover:bg-[#404040] text-white",   // Tombol Abu-abu Gelap
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}