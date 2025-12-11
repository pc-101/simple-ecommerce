'use client';
import { useSession } from 'next-auth/react';
import { useCart } from '@/store/cart';

export default function CheckoutPage(){
  const { data: session, status } = useSession();
  const { items, total } = useCart();
  if (status === 'loading') return <div>Loading…</div>;
  if (!session) return <div>Please sign in to continue to checkout.</div>;
  if (items.length === 0) return <div>Your cart is empty.</div>;

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Checkout</h1>
      <div className="text-sm text-slate-500">Signed in as {session.user?.email}</div>
      <div className="card">
        <div className="mb-2 font-medium">Order summary</div>
        <ul className="text-sm">
          {items.map(i => <li key={i.product.id} className="flex justify-between"><span>{i.product.title} × {i.qty}</span><span>${(i.product.price*i.qty).toFixed(2)}</span></li>)}
        </ul>
        <div className="mt-2 flex justify-between border-t pt-2 dark:border-slate-800">
          <span>Total</span><span className="font-semibold">${total().toFixed(2)}</span>
        </div>
        <button className="btn mt-3 w-full">Place order</button>
      </div>
    </div>
  );
}
