'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
  // Wadah Keranjang (Navbar)
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;

  // Wadah Beli Sekarang (Floating Bar)
  buyNowList: CartItem[];
  addToBuyNow: (product: Product, quantity: number) => void;
  updateBuyNowQuantity: (productId: string, quantity: number) => void;
  removeFromBuyNow: (productId: string) => void;
  clearBuyNow: () => void;
  buyNowTotalItems: number;
  buyNowTotalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [buyNowList, setBuyNowList] = useState<CartItem[]>([]);

  // Load from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('tm_cart');
    const savedBuyNow = localStorage.getItem('tm_buy_now');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedBuyNow) setBuyNowList(JSON.parse(savedBuyNow));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('tm_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tm_buy_now', JSON.stringify(buyNowList));
  }, [buyNowList]);

  // LOGIC KERANJANG (NAVBAR)
  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  // LOGIC BELI SEKARANG (FLOATING BAR)
  const addToBuyNow = (product: Product, quantity: number) => {
    setBuyNowList((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateBuyNowQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setBuyNowList((prev) => prev.filter((item) => item.id !== productId));
      return;
    }
    setBuyNowList((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromBuyNow = (productId: string) => {
    setBuyNowList((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearBuyNow = () => setBuyNowList([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.isPromo ? item.promoPrice! : item.price) * item.quantity,
    0
  );

  const buyNowTotalItems = buyNowList.reduce((sum, item) => sum + item.quantity, 0);
  const buyNowTotalPrice = buyNowList.reduce(
    (sum, item) => sum + (item.isPromo ? item.promoPrice! : item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        buyNowList,
        addToBuyNow,
        updateBuyNowQuantity,
        removeFromBuyNow,
        clearBuyNow,
        buyNowTotalItems,
        buyNowTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
