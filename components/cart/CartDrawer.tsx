'use client';
import * as React from 'react';
import { useCart } from '@/store/cart';
import Image from 'next/image';

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }){
  const { items, inc, dec, remove, total, clear } = useCart();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid grid-cols-[1fr,360px] bg-black/40" onClick={onClose}>
      <div />
      <div className="h-full overflow-auto bg-white p-4 dark:bg-slate-900" onClick={(e)=>e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between">
          <div className="text-lg font-semibold">Your Cart</div>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
        {items.length === 0 ? <div className="text-sm text-slate-500">Cart is empty.</div> : (
          <div className="space-y-3">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="flex gap-3 rounded-md border p-2 dark:border-slate-800">
                <Image src={product.image} alt={product.title} width={64} height={64} className="h-16 w-16 rounded object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{product.title}</div>
                  <div className="text-xs text-slate-500">${product.price.toFixed(2)}</div>
                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <button className="btn" onClick={()=>dec(product.id)}>-</button>
                    <span>{qty}</span>
                    <button className="btn" onClick={()=>inc(product.id)}>+</button>
                    <button className="btn" onClick={()=>remove(product.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between border-t pt-3 dark:border-slate-800">
              <div className="font-medium">Total</div>
              <div className="font-semibold">${total().toFixed(2)}</div>
            </div>
            <button className="btn w-full">Proceed to Checkout</button>
            <button className="btn w-full" onClick={clear}>Clear Cart</button>
          </div>
        )}
      </div>
    </div>
  );
}
