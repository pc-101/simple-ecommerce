'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/data/products';

type Item = { product: Product; qty: number };
type State = {
  items: Item[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
};

export const useCart = create<State>()(persist((set, get) => ({
  items: [],
  add: (p) => set((s) => {
    const existing = s.items.find(i => i.product.id === p.id);
    if (existing) return { items: s.items.map(i => i.product.id === p.id ? { ...i, qty: i.qty+1 } : i) };
    return { items: [...s.items, { product: p, qty: 1 }] };
  }),
  remove: (id) => set((s) => ({ items: s.items.filter(i => i.product.id !== id) })),
  inc: (id) => set((s) => ({ items: s.items.map(i => i.product.id === id ? { ...i, qty: i.qty+1 } : i) })),
  dec: (id) => set((s) => ({ items: s.items.map(i => i.product.id === id ? { ...i, qty: Math.max(1, i.qty-1) } : i) })),
  clear: () => set({ items: [] }),
  count: () => get().items.reduce((n,i)=>n+i.qty,0),
  total: () => get().items.reduce((sum,i)=>sum+i.qty*i.product.price,0),
}), { name: 'cart-v1' }));
