'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, Store, Truck, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Navbar() {
  const { totalItems } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/?q=${encodeURIComponent(searchValue)}#katalog`);
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    setSearchValue(searchParams.get('q') || '');
  }, [searchParams]);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
      <div className="container mx-auto px-4 py-2 sm:py-3 flex items-center gap-3">
        
        {/* LOGO - Fixed Width to prevent shifting */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="bg-red-600 p-2 rounded-xl text-white shadow-lg shadow-red-600/20">
            <Store size={20} />
          </div>
          <h1 className="hidden sm:block text-xl font-black text-gray-900 leading-tight tracking-tighter">
            Toko <span className="text-red-600">Madura</span>
          </h1>
        </Link>

        {/* SEARCH BAR - Takes remaining space */}
        <form onSubmit={handleSearch} className="flex-1 relative group">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Cari..."
            className="w-full bg-gray-100 border-2 border-transparent rounded-xl py-2 px-10 outline-none focus:bg-white focus:border-red-600 transition-all text-sm font-bold text-gray-800"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors" size={18} />
          <AnimatePresence>
            {searchValue && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                type="button"
                onClick={() => { setSearchValue(''); router.push('/'); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                <X size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </form>

        {/* ACTIONS - Fixed Width to prevent shifting */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <Link 
            href="/track" 
            className="p-2.5 text-gray-600 hover:text-red-600 bg-gray-50 rounded-xl transition-all flex items-center gap-2"
          >
            <Truck size={20} />
            <span className="hidden lg:inline font-black text-[10px] uppercase tracking-widest">Lacak</span>
          </Link>
          
          <Link href="/cart" className="relative p-2.5 text-gray-700 hover:text-red-600 bg-gray-50 rounded-xl transition-all">
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
}
