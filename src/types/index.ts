export type Category = 'Sembako' | 'Makanan Instan' | 'Snack' | 'Minuman' | 'Rokok' | 'Kebutuhan Rumah Tangga' | 'Obat';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  rating: number;
  stock: number;
  isPromo?: boolean;
  promoPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}
