'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Truck, Package, Clock, ArrowLeft, Search, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

function TrackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderIdInput, setOrderIdInput] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<string | null>(null);
  const [status, setStatus] = useState(0); 

  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl) {
      setTrackedOrder(idFromUrl);
      setOrderIdInput(idFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (trackedOrder) {
      const timer1 = setTimeout(() => setStatus(1), 5000);
      const timer2 = setTimeout(() => setStatus(2), 15000);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }
  }, [trackedOrder]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderIdInput.trim()) {
      setTrackedOrder(orderIdInput);
      setStatus(0);
    }
  };

  const steps = [
    { title: 'Pesanan Diterima', icon: Clock, desc: 'Admin sedang memverifikasi pesanan Anda.', time: 'Baru saja' },
    { title: 'Dalam Pengiriman', icon: Truck, desc: 'Kurir (Bang Mamat) sedang meluncur ke lokasi.', time: 'Estimasi 10 menit' },
    { title: 'Sampai di Tujuan', icon: Package, desc: 'Pesanan telah diterima oleh pelanggan.', time: '-' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10 max-w-2xl">
      <div className="flex items-center gap-4 mb-8 sm:mb-10">
        <button onClick={() => router.back()} className="p-3 bg-white rounded-xl shadow-sm border border-gray-100"><ArrowLeft size={20} /></button>
        <h1 className="text-3xl sm:text-4xl font-black">Lacak <span className="text-red-600">Pesanan</span></h1>
      </div>

      <section className="bg-white p-6 sm:p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl mb-8">
        <form onSubmit={handleTrack} className="space-y-4">
           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Masukkan Nomor Pesanan</label>
           <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                 <input 
                   type="text" 
                   value={orderIdInput}
                   onChange={(e) => setOrderIdInput(e.target.value)}
                   placeholder="TM-XXXXX" 
                   className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 pl-12 outline-none focus:border-red-600 transition-all font-bold text-sm" 
                 />
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <button type="submit" className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-red-600 transition-all active:scale-95 shadow-xl">
                 Lacak Sekarang
              </button>
           </div>
        </form>
      </section>

      <AnimatePresence mode='wait'>
        {trackedOrder ? (
          <motion.div key={trackedOrder} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-2xl mb-6 relative overflow-hidden">
               <div className="relative z-10">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Status Order: {trackedOrder}</p>
                  <h3 className="text-2xl font-black text-yellow-400">
                    {status === 0 ? 'Sedang Diproses' : status === 1 ? 'Dalam Perjalanan' : 'Telah Sampai'}
                  </h3>
               </div>
               <div className="absolute top-0 right-0 p-8 flex items-center gap-2 opacity-20">
                  <Truck size={64} className="rotate-12" />
               </div>
            </div>

            <div className="space-y-3">
               {steps.map((step, idx) => (
                  <div key={idx} className={`p-5 rounded-[2rem] border-2 transition-all flex items-center gap-4 ${status >= idx ? 'bg-white border-red-50 shadow-md ring-1 ring-red-100' : 'bg-gray-50/50 border-transparent opacity-30'}`}>
                     <div className={`p-3 rounded-xl flex-shrink-0 ${status >= idx ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                        <step.icon size={20} />
                     </div>
                     <div className="flex-1">
                        <h4 className="font-black text-gray-900 text-xs sm:text-sm uppercase tracking-tight leading-none mb-1">{step.title}</h4>
                        <p className="text-[10px] text-gray-500 font-medium leading-tight">{step.desc}</p>
                     </div>
                  </div>
               ))}
            </div>

            <button onClick={() => setTrackedOrder(null)} className="mt-10 mx-auto block text-gray-400 hover:text-red-600 font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center gap-2">
               <Trash2 size={12} /> Hapus Pelacakan
            </button>
          </motion.div>
        ) : (
          <div className="py-20 text-center opacity-30">
             <Package size={64} className="mx-auto mb-4" />
             <p className="font-bold text-sm">Nomor pesanan ada di struk belanja Anda.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center font-black">Memuat Pelacakan...</div>}>
      <TrackContent />
    </Suspense>
  );
}
