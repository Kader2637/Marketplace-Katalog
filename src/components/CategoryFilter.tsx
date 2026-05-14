'use client';

import React from 'react';
import { Category } from '@/types';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
      <button
        onClick={() => onSelectCategory('All')}
        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
          selectedCategory === 'All'
            ? 'bg-red-600 text-white shadow-lg shadow-red-200'
            : 'bg-white text-gray-600 border border-gray-200 hover:border-red-600 hover:text-red-600'
        }`}
      >
        Semua Barang
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            selectedCategory === cat
              ? 'bg-red-600 text-white shadow-lg shadow-red-200'
              : 'bg-white text-gray-600 border border-gray-200 hover:border-red-600 hover:text-red-600'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
