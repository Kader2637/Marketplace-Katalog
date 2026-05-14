'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import CartReviewModal from './CartReviewModal';

export default function FloatingCartBar() {
  const { buyNowTotalItems, buyNowTotalPrice } = useCart();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const pathname = usePathname();

  // Hide on checkout or if empty
  if (pathname === '/checkout' || buyNowTotalItems === 0) return null;

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(buyNowTotalPrice);

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] w-[92%] max-w-lg"
        >
          <div className="bg-gray-900/95 backdrop-blur-xl text-white p-3 pr-4 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-between border border-white/10">
            <div className="flex items-center gap-4 ml-2">
              <div className="bg-gradient-to-br from-red-500 to-red-700 p-3 rounded-2xl relative shadow-lg shadow-red-600/20">
                <ShoppingBag size={20} />
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-gray-900">
                  {buyNowTotalItems}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Total Belanja</p>
                <p className="text-xl font-black text-white leading-none">{formattedPrice}</p>
              </div>
            </div>

            <button
              onClick={() => setIsReviewOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white pl-6 pr-4 py-3 rounded-2xl font-black text-sm flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-red-600/20"
            >
              <div className="sm:hidden text-left mr-2">
                <p className="text-[10px] text-red-200 font-bold uppercase leading-none mb-1">Bayar</p>
                <p className="text-sm font-black text-white leading-none">{formattedPrice}</p>
              </div>
              Beli Sekarang
              <div className="bg-white/20 p-1 rounded-lg">
                <ArrowRight size={18} />
              </div>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <CartReviewModal 
        isOpen={isReviewOpen} 
        onClose={() => setIsReviewOpen(false)} 
      />
    </>
  );
}
