import { Product } from '@/types';

export const products: Product[] = [
  // MAKANAN BERAT & INSTAN
  { id: 'f1', name: 'Nasi Bungkus Madura Komplit', price: 15000, description: 'Nasi dengan lauk pauk khas madura, sambal mangga, dan serundeng.', category: 'Makanan Instan', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400', rating: 4.9, stock: 20, isPromo: true, promoPrice: 13500 },
  { id: 'f2', name: 'Indomie Goreng Jumbo', price: 4500, description: 'Porsi lebih besar untuk kenyang maksimal.', category: 'Makanan Instan', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=400', rating: 5.0, stock: 100, isPromo: true, promoPrice: 4000 },
  { id: 'f3', name: 'Pop Mie Rasa Ayam Bawang', price: 5500, description: 'Praktis tinggal seduh air panas.', category: 'Makanan Instan', image: 'https://images.unsplash.com/photo-1594911772125-07fc7a2d8d9f?auto=format&fit=crop&q=80&w=400', rating: 4.7, stock: 80, isPromo: true, promoPrice: 5000 },
  { id: 'f4', name: 'Samyang Hot Chicken Ramen', price: 22000, description: 'Mie instan korea super pedas.', category: 'Makanan Instan', image: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=400', rating: 4.8, stock: 40, isPromo: true, promoPrice: 19500 },
  
  // SNACK & CEMILAN
  { id: 'sn1', name: 'Keripik Singkong Madura', price: 12000, description: 'Keripik singkong renyah dengan bumbu rempah asli.', category: 'Snack', image: 'https://images.unsplash.com/photo-1621447509373-10026e626e65?auto=format&fit=crop&q=80&w=400', rating: 4.9, stock: 50, isPromo: true, promoPrice: 10000 },
  { id: 'sn2', name: 'Kacang Telur Garuda', price: 15000, description: 'Kacang berbalut tepung renyah.', category: 'Snack', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=400', rating: 4.6, stock: 60, isPromo: true, promoPrice: 13000 },
  { id: 'sn3', name: 'Oreo Sandwich Cookies', price: 9500, description: 'Biskuit cokelat dengan krim vanilla.', category: 'Snack', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400', rating: 4.8, stock: 120, isPromo: true, promoPrice: 8500 },
  { id: 'sn4', name: 'Pringles Original', price: 25000, description: 'Kentang potong tipis dalam kemasan tube.', category: 'Snack', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=400', rating: 4.7, stock: 45, isPromo: true, promoPrice: 22000 },
  
  // MINUMAN
  { id: 'm1', name: 'Kopi Kapal Api Special', price: 15000, description: 'Kopi bubuk murni kualitas premium.', category: 'Minuman', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400', rating: 4.9, stock: 200 },
  { id: 'm2', name: 'Teh Botol Sosro 450ml', price: 6000, description: 'Teh melati asli dalam kemasan botol.', category: 'Minuman', image: 'https://images.unsplash.com/photo-1544380904-c686aad2fc40?auto=format&fit=crop&q=80&w=400', rating: 4.8, stock: 150 },
  { id: 'm3', name: 'Coca-Cola 1.5L', price: 16000, description: 'Minuman berkarbonasi menyegarkan.', category: 'Minuman', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400', rating: 4.7, stock: 80 },
  { id: 'm4', name: 'Susu UHT Ultra Milk 1L', price: 19500, description: 'Susu sapi segar kualitas tinggi.', category: 'Minuman', image: 'https://images.unsplash.com/photo-1550583724-125581cc2532?auto=format&fit=crop&q=80&w=400', rating: 4.9, stock: 60 },

  // SEMBAKO
  { id: 's1', name: 'Beras Pandan Wangi 5kg', price: 85000, description: 'Beras wangi dan pulen.', category: 'Sembako', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400', rating: 4.9, stock: 30 },
  { id: 's2', name: 'Telur Ayam Negeri 1kg', price: 28000, description: 'Telur segar langsung dari peternak.', category: 'Sembako', image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=400', rating: 4.8, stock: 100 },
  { id: 's3', name: 'Minyak Goreng Sania 2L', price: 36000, description: 'Minyak goreng bening dan hemat.', category: 'Sembako', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400', rating: 4.7, stock: 90 },

  // ROKOK (Toko Madura Must Have)
  { id: 'r1', name: 'Djarum Super 12', price: 24000, description: 'Rokok kretek mesin filter.', category: 'Rokok', image: 'https://images.unsplash.com/photo-1601066532525-4509e5b38218?auto=format&fit=crop&q=80&w=400', rating: 4.6, stock: 50 },
  { id: 'r2', name: 'Marlboro Red', price: 42000, description: 'Rokok putih premium.', category: 'Rokok', image: 'https://images.unsplash.com/photo-1626245949285-38a0965954b2?auto=format&fit=crop&q=80&w=400', rating: 4.5, stock: 40 },
  
  // KEBUTUHAN LAINNYA
  { id: 'rt1', name: 'Downy Pewangi 700ml', price: 32000, description: 'Pewangi pakaian tahan lama.', category: 'Kebutuhan Rumah Tangga', image: 'https://images.unsplash.com/photo-1584622781564-1d9876a13d00?auto=format&fit=crop&q=80&w=400', rating: 4.8, stock: 50 },
  { id: 'rt2', name: 'Pepsodent 190g', price: 14000, description: 'Pasta gigi pencegah gigi berlubang.', category: 'Kebutuhan Rumah Tangga', image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=400', rating: 4.7, stock: 80 },

  // Duplicating to fill up for pagination simulation (Realistically I would add more unique ones)
  ...Array.from({ length: 30 }).map((_, i) => ({
    id: `extra-${i}`,
    name: `Barang Madura Ke-${i + 1}`,
    price: 5000 + (i * 1000),
    description: 'Kebutuhan harian berkualitas.',
    category: i % 2 === 0 ? 'Snack' : 'Minuman',
    image: `https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=400`,
    rating: 4.5,
    stock: 100
  })) as Product[]
];
