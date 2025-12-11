export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: 'clothing' | 'gadgets' | 'home' | 'accessories';
  rating: number;
};

export const PRODUCTS: Product[] = [
  { id: 'p1', title: 'Minimal Tee', price: 24, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80', category: 'clothing', rating: 4 },
  { id: 'p2', title: 'Wireless Headphones', price: 129, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80', category: 'gadgets', rating: 5 },
  { id: 'p3', title: 'Ceramic Mug', price: 18, image: 'https://images.unsplash.com/photo-1495100497150-fe209c585f50?auto=format&fit=crop&w=800&q=80', category: 'home', rating: 4 },
  { id: 'p4', title: 'Canvas Tote', price: 22, image: 'https://images.unsplash.com/photo-1590084955567-ba857f41d437?auto=format&fit=crop&w=800&q=80', category: 'accessories', rating: 3 },
  { id: 'p5', title: 'Travel Backpack', price: 89, image: 'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=800&q=80', category: 'accessories', rating: 5 },
  { id: 'p6', title: 'Smartwatch', price: 199, image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80', category: 'gadgets', rating: 4 },
  { id: 'p7', title: 'Desk Lamp', price: 39, image: 'https://images.unsplash.com/photo-1601642964568-1917224f4e4d?auto=format&fit=crop&w=800&q=80', category: 'home', rating: 4 },
  { id: 'p8', title: 'Linen Shirt', price: 44, image: 'https://images.unsplash.com/photo-1591357037205-166318b51afd?auto=format&fit=crop&w=800&q=80', category: 'clothing', rating: 5 }
];
