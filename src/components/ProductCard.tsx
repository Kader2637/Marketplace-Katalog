'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { Star, Plus, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import QuantityModal from './QuantityModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToBuyNow } = useCart();

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(product.isPromo && product.promoPrice ? product.promoPrice : product.price);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="group bg-white rounded-2xl sm:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full relative"
      >
        {product.isPromo && (
          <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[8px] sm:text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg">
            PROMO
          </div>
        )}

        {/* Product Image */}
        <div 
          className="relative aspect-square overflow-hidden bg-gray-50 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Product Details */}
        <div className="p-3 sm:p-5 flex flex-col flex-1">
          <div className="flex items-center gap-1 mb-1 opacity-60">
             <Star className="text-yellow-400 fill-yellow-400" size={10} />
             <span className="text-[9px] sm:text-[10px] font-black text-gray-900">{product.rating}</span>
          </div>
          
          <h3 
            className="text-[11px] sm:text-sm font-black text-gray-900 line-clamp-2 mb-2 cursor-pointer hover:text-red-600 transition-colors leading-tight min-h-[2.4em]"
            onClick={() => setIsModalOpen(true)}
          >
            {product.name}
          </h3>

          <div className="mt-auto space-y-2">
            <div className="flex items-baseline gap-1">
               <p className="text-xs sm:text-lg font-black text-red-600 tracking-tighter">{formattedPrice}</p>
               {product.isPromo && (
                 <p className="text-[8px] sm:text-[10px] text-gray-400 line-through font-bold">
                   {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price)}
                 </p>
               )}
            </div>

            <div className="flex items-center gap-1.5">
               <button
                 onClick={() => setIsModalOpen(true)}
                 className="flex-1 bg-gray-50 text-gray-900 py-2 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-all active:scale-95 flex items-center justify-center"
                 title="Tambah ke Keranjang"
               >
                 <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
               </button>
               <button
                 onClick={(e) => {
                   e.stopPropagation();
                   addToBuyNow(product, 1);
                 }}
                 className="flex-1 bg-red-600 text-white py-2 rounded-lg sm:rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-95 flex items-center justify-center"
                 title="Beli Sekarang"
               >
                 <Plus size={14} className="sm:w-4 sm:h-4" />
               </button>
            </div>
          </div>
        </div>
      </motion.div>

      <QuantityModal 
        product={product} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}

export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-0 overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-6 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}
