'use client';

import React, { useState, useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import { 
  ArrowLeft, CheckCircle2, MapPin, Wallet, QrCode, 
  Smartphone, Banknote, ShieldCheck, Printer, Truck, 
  Clock, Copy, Hash, Store, Smartphone as EwalletIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CheckoutPage() {
  const { 
    totalPrice, cart, clearCart,
    buyNowTotalPrice, buyNowList, clearBuyNow 
  } = useCart();
  
  const searchParams = useSearchParams();
  const isBuyNow = searchParams.get('source') === 'buynow';
  const router = useRouter();

  const currentCart = isBuyNow ? buyNowList : cart;
  const currentTotal = isBuyNow ? buyNowTotalPrice : totalPrice;

  const [step, setStep] = useState('checkout'); 
  const [paymentMethod, setPaymentMethod] = useState('qris'); 
  const [subPayment, setSubPayment] = useState(''); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [finalCart, setFinalCart] = useState<any[]>([]);
  const [finalTotal, setFinalTotal] = useState(0);

  const orderNumber = useMemo(() => "TM-" + Math.random().toString(36).substr(2, 7).toUpperCase(), []);
  const vaNumber = useMemo(() => "88" + Math.floor(100000000 + Math.random() * 900000000), []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);

  const handleConfirmOrder = () => {
    if (paymentMethod === 'ewallet' && !subPayment) {
      alert("Pilih E-Wallet dulu bos!");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (paymentMethod === 'cod') {
        setFinalCart([...currentCart]);
        setFinalTotal(currentTotal);
        setStep('success');
        if (isBuyNow) clearBuyNow(); else clearCart();
      } else {
        setStep('paying');
      }
    }, 1500);
  };

  const handlePaid = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setFinalCart([...currentCart]);
      setFinalTotal(currentTotal);
      setIsProcessing(false);
      setStep('success');
      if (isBuyNow) clearBuyNow(); else clearCart();
    }, 2000);
  };

  // 1. SUCCESS VIEW (REAL SHOP RECEIPT) - OPTIMIZED RESPONSIVE
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-100 py-4 sm:py-12 px-2 sm:px-4 flex flex-col items-center justify-start sm:justify-center">
        <motion.div 
          id="receipt-content"
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="w-full max-w-[95%] sm:max-w-md bg-white p-5 sm:p-10 rounded-sm shadow-2xl border-t-[10px] border-red-600 relative overflow-hidden"
        >
           {/* Receipt Serrated Edge Simulation (Top) */}
           <div className="absolute top-0 left-0 w-full h-1.5 bg-[radial-gradient(circle,transparent_20%,white_20%)] bg-[length:8px_8px]" />
           
           <div className="text-center mb-8 border-b-2 border-dashed border-gray-200 pb-8">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Store className="text-red-600" size={32} />
              </div>
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-gray-900">Toko Madura</h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1 leading-none">Nusantara Online • Buka 24 Jam</p>
           </div>

           <div className="space-y-4 text-[11px] sm:text-[13px] font-mono mb-8 text-gray-700">
              <div className="flex justify-between gap-4">
                 <span className="text-gray-400">ORDER ID</span>
                 <span className="font-bold text-gray-900">{orderNumber}</span>
              </div>
              <div className="flex justify-between gap-4">
                 <span className="text-gray-400">TANGGAL</span>
                 <span className="font-bold text-gray-900">{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              
              <div className="border-t border-dashed border-gray-200 my-6" />
              
              <div className="space-y-3">
                {finalCart.map((item, idx) => (
                  <div key={idx} className="flex flex-col">
                     <div className="flex justify-between gap-4 font-bold text-gray-900">
                        <span className="truncate">{item.name}</span>
                        <span className="shrink-0">{formatPrice((item.isPromo ? item.promoPrice! : item.price) * item.quantity)}</span>
                     </div>
                     <div className="text-[10px] sm:text-[11px] text-gray-400">
                        {item.quantity} x {formatPrice(item.isPromo ? item.promoPrice! : item.price)}
                     </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-dashed border-gray-200 my-6 pt-4">
                 <div className="flex justify-between items-center">
                    <span className="text-base sm:text-lg font-black text-gray-900">TOTAL</span>
                    <span className="text-xl sm:text-2xl font-black text-red-600 tracking-tighter">{formatPrice(finalTotal)}</span>
                 </div>
                 <div className="flex justify-between items-center mt-2 text-[10px] uppercase font-bold text-gray-400">
                    <span>METODE BAYAR</span>
                    <span className="text-gray-900">{paymentMethod}</span>
                 </div>
              </div>
           </div>

           <div className="text-center border-t border-dashed border-gray-100 pt-8">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-900 italic">*** TERIMA KASIH ***</p>
              <p className="text-[9px] text-gray-400 mt-2 italic leading-relaxed">Barang yang sudah dibeli tidak dapat ditukar,<br/>tapi kami tetap melayani 24 jam!</p>
              
              <div className="mt-8 flex justify-center opacity-30">
                 <div className="p-2 border border-gray-100 rounded-lg">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${orderNumber}`} className="w-16 h-16 grayscale" alt="QR" />
                 </div>
              </div>
           </div>
        </motion.div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-[95%] sm:max-w-md px-2">
           <button 
             onClick={() => window.print()} 
             className="flex-1 bg-white border-2 border-gray-100 py-4 rounded-2xl font-black text-xs sm:text-sm hover:bg-gray-50 hover:border-gray-200 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
           >
              <Printer size={18} /> Simpan Struk
           </button>
           <button onClick={() => router.push('/track?id=' + orderNumber)} className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-black text-xs sm:text-sm shadow-xl shadow-red-200 hover:bg-red-700 transition-all flex items-center justify-center gap-2 active:scale-95">
              <Truck size={18} /> Lacak Kurir
           </button>
        </div>
      </div>
    );
  }

  // 2. PAYMENT VIEW - FULLY RESPONSIVE
  if (step === 'paying') {
    const isEwallet = paymentMethod === 'ewallet';
    return (
      <div className="min-h-screen bg-white py-8 sm:py-20 px-4 flex flex-col items-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm sm:max-w-md">
          <div className="text-center mb-8">
             <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full mb-4">
                <Clock size={16} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Menunggu Bayar</span>
             </div>
             <h2 className="text-2xl font-black text-gray-900">Pembayaran {subPayment ? subPayment.toUpperCase() : 'Instan'}</h2>
          </div>

          <div className="bg-gray-50 border-2 border-gray-100 p-6 sm:p-10 rounded-[2.5rem] mb-6 shadow-sm">
             {isEwallet ? (
               <div className="text-center space-y-6">
                  <div className="p-4 bg-white rounded-2xl border border-gray-200 inline-block w-full">
                     <p className="text-[9px] text-gray-400 font-black uppercase mb-1">Nomor VA / HP</p>
                     <p className="text-2xl sm:text-3xl font-black text-gray-900 tracking-wider break-all">{vaNumber}</p>
                  </div>
                  <button onClick={() => navigator.clipboard.writeText(vaNumber)} className="text-red-600 font-black text-xs flex items-center justify-center gap-2 mx-auto uppercase tracking-widest"><Copy size={14} /> Salin Nomor</button>
               </div>
             ) : (
               <div className="text-center">
                  <div className="bg-white p-4 rounded-[2rem] border border-gray-200 inline-block mb-6 shadow-xl w-full max-w-[240px]">
                     <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${orderNumber}`} className="w-full h-auto" alt="QR" />
                  </div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Silakan scan kode di atas</p>
               </div>
             )}

             <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4 text-center sm:text-left">
                <div>
                   <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Total Tagihan</p>
                   <p className="text-3xl font-black text-red-600 tracking-tighter">{formatPrice(currentTotal)}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">ID PESANAN</p>
                   <p className="text-xs font-black text-gray-900 uppercase">{orderNumber}</p>
                </div>
             </div>
          </div>

          <button onClick={handlePaid} disabled={isProcessing} className="w-full bg-red-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-red-100 hover:bg-red-700 transition-all active:scale-95">
             {isProcessing ? "Memproses..." : "Konfirmasi Pembayaran"}
          </button>
          
          <button onClick={() => setStep('checkout')} className="w-full mt-6 text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-gray-900">Kembali</button>
        </motion.div>
      </div>
    );
  }

  // 3. MAIN CHECKOUT VIEW - FULLY RESPONSIVE
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <header className="flex items-center gap-4 mb-8">
          <button onClick={() => router.back()} className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 hover:text-red-600 transition-all"><ArrowLeft size={20} /></button>
          <h1 className="text-2xl font-black text-gray-900">Checkout <span className="text-red-600 italic">{isBuyNow ? 'Instan' : 'Keranjang'}</span></h1>
        </header>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form */}
          <div className="lg:col-span-8 space-y-6">
            <section className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-gray-100">
               <h2 className="text-lg font-black mb-6 flex items-center gap-3">
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg"><MapPin size={20} /></div>
                  Alamat Kirim
               </h2>
               <div className="grid sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Nama Lengkap" className="w-full bg-gray-50 border-gray-100 rounded-xl p-4 font-bold outline-none border-2 focus:border-red-600 transition-all text-sm" />
                  <input type="tel" placeholder="Nomor WhatsApp" className="w-full bg-gray-50 border-gray-100 rounded-xl p-4 font-bold outline-none border-2 focus:border-red-600 transition-all text-sm" />
                  <textarea placeholder="Alamat Detail (No. Rumah / Patokan)" rows={3} className="w-full bg-gray-50 border-gray-100 rounded-xl p-4 font-bold outline-none border-2 focus:border-red-600 transition-all text-sm sm:col-span-2" />
               </div>
            </section>

            <section className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-gray-100">
               <h2 className="text-lg font-black mb-6 flex items-center gap-3">
                  <div className="p-2 bg-gray-50 text-gray-900 rounded-lg"><Wallet size={20} /></div>
                  Bayar Pake Apa?
               </h2>
               
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <button onClick={() => { setPaymentMethod('qris'); setSubPayment(''); }} className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'qris' ? 'border-red-600 bg-red-50 shadow-md shadow-red-600/5' : 'bg-gray-50 border-gray-50'}`}>
                    <QrCode size={24} className={paymentMethod === 'qris' ? 'text-red-600' : 'text-gray-400'} />
                    <span className="font-black text-[10px] uppercase tracking-widest">QRIS</span>
                  </button>
                  <button onClick={() => setPaymentMethod('ewallet')} className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'ewallet' ? 'border-red-600 bg-red-50 shadow-md shadow-red-600/5' : 'bg-gray-50 border-gray-50'}`}>
                    <EwalletIcon size={24} className={paymentMethod === 'ewallet' ? 'text-red-600' : 'text-gray-400'} />
                    <span className="font-black text-[10px] uppercase tracking-widest">E-WALLET</span>
                  </button>
                  <button onClick={() => { setPaymentMethod('cod'); setSubPayment(''); }} className={`p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'cod' ? 'border-red-600 bg-red-50 shadow-md shadow-red-600/5' : 'bg-gray-50 border-gray-50'}`}>
                    <Banknote size={24} className={paymentMethod === 'cod' ? 'text-red-600' : 'text-gray-400'} />
                    <span className="font-black text-[10px] uppercase tracking-widest">COD</span>
                  </button>
               </div>

               <AnimatePresence>
                  {paymentMethod === 'ewallet' && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="pt-4 border-t border-gray-100 overflow-hidden">
                       <div className="grid grid-cols-2 xs:grid-cols-4 gap-2">
                          {['dana', 'ovo', 'gopay', 'shopeepay'].map(w => (
                            <button
                              key={w}
                              onClick={() => setSubPayment(w)}
                              className={`p-3 rounded-xl border-2 transition-all text-[8px] font-black uppercase italic ${
                                subPayment === w ? 'border-gray-900 bg-gray-900 text-white shadow-md' : 'bg-white border-gray-100 text-gray-400'
                              }`}
                            >
                               {w}
                            </button>
                          ))}
                       </div>
                    </motion.div>
                  )}
               </AnimatePresence>
            </section>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 mt-6 lg:mt-0">
             <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
                <h3 className="text-lg font-black mb-6 border-b border-gray-50 pb-4 text-gray-900">Ringkasan</h3>
                <div className="space-y-4 mb-10 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                   {currentCart.map((item, idx) => (
                      <div key={idx} className="flex justify-between gap-4 text-sm font-bold">
                         <span className="text-gray-500 truncate">{item.quantity}x {item.name}</span>
                         <span className="text-gray-900 whitespace-nowrap">{formatPrice((item.isPromo ? item.promoPrice! : item.price) * item.quantity)}</span>
                      </div>
                   ))}
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-gray-100 mb-8">
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">TOTAL</span>
                   <span className="text-3xl font-black text-red-600 tracking-tighter">{formatPrice(currentTotal)}</span>
                </div>
                <button 
                  onClick={handleConfirmOrder} 
                  disabled={isProcessing}
                  className="w-full py-5 rounded-2xl font-black text-lg bg-red-600 text-white hover:bg-red-700 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                >
                   {isProcessing ? "Memproses..." : <><ShieldCheck size={20} /> Konfirmasi</>}
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
