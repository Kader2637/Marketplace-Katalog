'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowLeft, CreditCard, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const router = useRouter();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md mx-auto">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
            <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-200">
              <ShoppingBag size={48} />
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Keranjang Kosong</h1>
            <p className="text-gray-400 font-medium mb-8 leading-relaxed text-sm">
              Wah, keranjangmu masih kosong nih. Yuk, borong barang di Toko Madura dulu!
            </p>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-red-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} /> Mulai Belanja
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10 max-w-6xl">
      <div className="flex items-center gap-4 mb-8 sm:mb-10">
        <button onClick={() => router.back()} className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-red-600 transition-all"><ArrowLeft size={20} /></button>
        <h1 className="text-3xl sm:text-4xl font-black">Keranjang <span className="text-red-600">Saya</span></h1>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <AnimatePresence mode='popLayout'>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white p-4 sm:p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4 group relative"
              >
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-black text-red-600 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  <h3 className="font-black text-gray-900 truncate text-sm sm:text-lg mt-1 group-hover:text-red-600 transition-colors">{item.name}</h3>
                  <p className="text-red-600 font-black text-base mt-1">
                    {formatPrice(item.isPromo ? item.promoPrice! : item.price)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-300 hover:text-red-600 transition-all"><Trash2 size={18} /></button>
                  <div className="flex items-center bg-gray-100 rounded-xl p-1 shadow-inner">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-white rounded-lg transition-all text-gray-900"><Minus size={14} /></button>
                    <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-white rounded-lg transition-all text-gray-900"><Plus size={14} /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="bg-gray-900 text-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 blur-[80px] rounded-full" />
            <div className="relative z-10">
              <h2 className="text-xl font-black mb-8 border-b border-white/10 pb-4">Ringkasan</h2>
              <div className="space-y-4 mb-10 text-sm">
                <div className="flex justify-between text-gray-400 font-bold"><span>Total Barang</span><span>{totalItems} Item</span></div>
                <div className="flex justify-between text-gray-400 font-bold"><span>Biaya Kirim</span><span className="text-green-400 uppercase text-[10px] bg-green-400/10 px-2 py-0.5 rounded tracking-widest">Gratis</span></div>
                <div className="h-px bg-white/10 my-4" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total Harga</span>
                  <span className="text-3xl font-black text-yellow-400 tracking-tighter">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-3 bg-red-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 active:scale-[0.98]"
              >
                <CreditCard size={22} /> Checkout
              </Link>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 opacity-50">
                <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[8px] font-black italic">DANA</span>
                <span className="bg-purple-700 text-white px-2 py-0.5 rounded text-[8px] font-black italic">OVO</span>
                <span className="bg-green-600 text-white px-2 py-0.5 rounded text-[8px] font-black italic">GOPAY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
