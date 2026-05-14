'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface QuantityModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuantityModal({ product, isOpen, onClose }: QuantityModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
    setQuantity(1);
  };

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format((product.isPromo && product.promoPrice ? product.promoPrice : product.price) * quantity);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl relative z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-20"
            >
              <X size={20} />
            </button>

            <div className="aspect-video overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            <div className="p-6">
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">{product.category}</span>
              <h3 className="text-xl font-black text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-6 line-clamp-2">{product.description}</p>

              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center bg-gray-100 p-1 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-white rounded-lg transition-all text-gray-600"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-12 text-center font-black text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-white rounded-lg transition-all text-gray-600"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Total Harga</p>
                  <p className="text-xl font-black text-red-600">{formattedPrice}</p>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-red-600 transition-all shadow-xl shadow-gray-200"
              >
                <ShoppingCart size={20} />
                Masukkan Keranjang
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
