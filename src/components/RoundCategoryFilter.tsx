'use client';

import React from 'react';
import { Category } from '@/types';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Beer, Candy, Cigarette, Home, Pill, LayoutGrid } from 'lucide-react';

interface RoundCategoryFilterProps {
  selectedCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
}

export default function RoundCategoryFilter({
  selectedCategory,
  onSelectCategory,
}: RoundCategoryFilterProps) {
  const categories = [
    { name: 'All', label: 'Semua', icon: LayoutGrid, color: 'bg-gray-100 text-gray-600' },
    { name: 'Sembako', label: 'Sembako', icon: Home, color: 'bg-blue-50 text-blue-600' },
    { name: 'Makanan Instan', label: 'Makanan', icon: UtensilsCrossed, color: 'bg-red-50 text-red-600' },
    { name: 'Snack', label: 'Camilan', icon: Candy, color: 'bg-yellow-50 text-yellow-600' },
    { name: 'Minuman', label: 'Minuman', icon: Beer, color: 'bg-green-50 text-green-600' },
    { name: 'Rokok', label: 'Rokok', icon: Cigarette, color: 'bg-orange-50 text-orange-600' },
    { name: 'Obat', label: 'Obat', icon: Pill, color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="w-full flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto pb-6 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onSelectCategory(cat.name as any)}
          className="flex flex-col items-center gap-2.5 min-w-[75px] sm:flex-1 group transition-all"
        >
          <div className={`
            w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all shadow-sm
            ${selectedCategory === cat.name 
              ? 'bg-red-600 text-white shadow-lg shadow-red-200 scale-95 ring-4 ring-red-100' 
              : 'bg-gray-50 text-gray-500 hover:bg-white hover:text-red-600 hover:shadow-md'
            }
          `}>
            <cat.icon size={selectedCategory === cat.name ? 20 : 22} />
          </div>
          <span className={`
            text-[10px] font-black uppercase tracking-tighter text-center whitespace-nowrap
            ${selectedCategory === cat.name ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-900'}
          `}>
            {cat.label}
          </span>
        </button>
      ))}
    </div>
  );
}
