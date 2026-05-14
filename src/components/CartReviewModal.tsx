'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface CartReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartReviewModal({ isOpen, onClose }: CartReviewModalProps) {
  const { buyNowList, removeFromBuyNow, buyNowTotalPrice } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[3rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 pb-0 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900">Review Belanja</h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Siap untuk diproses</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8">
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {buyNowList.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white shadow-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-gray-900 text-sm truncate">{item.name}</h4>
                      <p className="text-[10px] font-bold text-gray-400">
                        {item.quantity} Unit • {formatPrice(item.isPromo ? item.promoPrice! : item.price)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-gray-900 text-sm">
                        {formatPrice((item.isPromo ? item.promoPrice! : item.price) * item.quantity)}
                      </p>
                      <button 
                        onClick={() => removeFromBuyNow(item.id)} 
                        className="text-red-400 hover:text-red-600 p-1 mt-1 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-8 pt-0">
              <div className="bg-gray-900 rounded-[2.5rem] p-6 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full" />
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Total Bayar</p>
                    <p className="text-3xl font-black text-white tracking-tighter">{formatPrice(buyNowTotalPrice)}</p>
                  </div>
                </div>
                <Link
                  href="/checkout?source=buynow"
                  onClick={onClose}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4.5 rounded-2xl font-black text-base flex items-center justify-center gap-3 transition-all shadow-xl shadow-red-600/20 active:scale-[0.98] relative z-10"
                >
                  <ShieldCheck size={20} />
                  Bayar Sekarang
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
