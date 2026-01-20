'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCart } from '@/store/cart';
import { useToast } from '@/components/ToastProvider';
import type { Product } from '@/data/products';

export default function ProductCard({ p }: { p: Product }){
  const { add } = useCart();
  const { success, error } = useToast();
  const cooldownRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (cooldownRef.current) window.clearTimeout(cooldownRef.current);
  }, []);

  const handleAdd = () => {
    if (cooldownRef.current) return;
    cooldownRef.current = window.setTimeout(() => {
      cooldownRef.current = null;
    }, 500);
    try {
      add(p);
      success(`Added "${p.title}" to cart`);
    } catch {
      error('Could not add to cart');
    }
  };

  return (
    <div className="card p-0 overflow-hidden">
      <Image src={p.image} alt={p.title} width={600} height={600} className="h-56 w-full object-cover" />
      <div className="p-3">
        <div className="line-clamp-2 text-sm font-medium">{p.title}</div>
        <div className="mt-1 text-sm text-slate-500">${p.price.toFixed(2)}</div>
        <button className="btn mt-2 w-full" onClick={handleAdd}>Add to Cart</button>
      </div>
    </div>
  );
}
