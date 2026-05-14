'use client';

import React, { useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft, Sparkles, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function PromoPage() {
  const router = useRouter();
  const promoProducts = useMemo(() => products.filter((p) => p.isPromo), []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="flex items-center gap-4 mb-10 sm:mb-12">
        <button onClick={() => router.back()} className="p-3 bg-white rounded-xl shadow-sm border border-gray-100"><ArrowLeft size={20} /></button>
        <div>
          <h1 className="text-3xl sm:text-4xl font-black">Hanya <span className="text-red-600 italic">Promo</span></h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Spesial untuk pelanggan Toko Madura Nusantara</p>
        </div>
      </header>

      {/* Hero Promo Banner */}
      <section className="mb-12 relative rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden aspect-[16/8] sm:aspect-[21/6] shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200" 
          alt="Promo Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-transparent flex flex-col justify-center p-6 sm:p-16 text-white">
           <div className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-4 py-1.5 rounded-full mb-4 text-[9px] font-black uppercase tracking-widest w-fit">
             <TrendingUp size={12} /> Diskon Up to 50%
           </div>
           <h2 className="text-3xl sm:text-5xl font-black mb-4 leading-tight">Serbu Diskon <br/> Akhir Pekan!</h2>
        </div>
      </section>

      <div className="flex items-center gap-3 mb-8">
         <div className="w-1.5 h-8 bg-red-600 rounded-full" />
         <h2 className="text-2xl font-black tracking-tight">Daftar Produk Promo</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-8">
        {promoProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {promoProducts.length === 0 && (
        <div className="py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <Sparkles className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-400 font-bold italic text-lg">Belum ada promo baru hari ini.</p>
        </div>
      )}
    </div>
  );
}
