'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { products } from '@/data/products';
import { Category } from '@/types';
import ProductCard, { ProductSkeleton } from '@/components/ProductCard';
import RoundCategoryFilter from '@/components/RoundCategoryFilter';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, ChevronLeft, ChevronRight, ArrowRight, SearchX } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const promoProducts = useMemo(() => products.filter((p) => p.isPromo).slice(0, 4), []);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-4 py-2 sm:py-4">
      {/* Hero Banner Section */}
      {!searchQuery && (
        <section className="mb-8 sm:mb-12 relative rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden bg-gray-900 aspect-[16/10] sm:aspect-[21/6] shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"
            alt="Banner"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-20 text-white">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full mb-4 text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
                 <Sparkles size={12} /> Terlengkap di Madura
              </div>
              <h2 className="text-3xl sm:text-6xl font-black mb-4 leading-[1.1]">
                Belanja Kebutuhan <br /> <span className="text-yellow-400 italic">24 Jam Non-Stop</span>
              </h2>
            </motion.div>
          </div>
        </section>
      )}

      {/* Round Categories Filter */}
      <section className="mb-4 sm:mb-6">
        <div className="flex items-center gap-2 mb-4 sm:mb-6">
          <div className="w-1.5 h-6 bg-red-600 rounded-full" />
          <h3 className="text-lg sm:text-xl font-black tracking-tight">
            {searchQuery ? `Hasil Pencarian: "${searchQuery}"` : 'Kategori Utama'}
          </h3>
        </div>
        <RoundCategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      {/* Promo Section - WITHOUT BACKGROUND WRAPPER */}
      {!searchQuery && selectedCategory === 'All' && (
        <section className="mb-16 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-600 text-white rounded-2xl shadow-lg"><TrendingUp size={24} /></div>
              <div>
                 <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">Promo Hari Ini</h3>
                 <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Diskon Spesial Terbatas</p>
              </div>
            </div>
            <Link 
              href="/promo" 
              className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all active:scale-95 border border-red-100"
            >
              Lihat Semua Promo <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)
            ) : (
              promoProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </section>
      )}

      {/* Main Product Catalog */}
      <section id="katalog">
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
           <div className="w-2 h-8 bg-gray-900 rounded-full" />
           <h3 className="text-2xl sm:text-3xl font-black tracking-tighter">
             {searchQuery ? 'Produk Ditemukan' : 'Katalog Terbaru'}
           </h3>
        </div>

        <div className="min-h-[400px]">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-8">
              {Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-8 mb-16">
                <AnimatePresence mode='popLayout'>
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 py-10 border-t border-gray-100">
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-3 rounded-xl bg-white border border-gray-100"><ChevronLeft size={20} /></button>
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 rounded-xl font-black text-xs ${currentPage === i + 1 ? 'bg-red-600 text-white' : 'bg-white text-gray-400'}`}>{i + 1}</button>
                    ))}
                  </div>
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-3 rounded-xl bg-white border border-gray-100"><ChevronRight size={20} /></button>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
              <SearchX size={40} className="mx-auto text-gray-300 mb-4" />
              <h4 className="text-lg font-black text-gray-400 italic">"Yah, barangnya nggak ketemu..."</h4>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
