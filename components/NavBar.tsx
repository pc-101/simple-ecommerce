'use client';
import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { signIn, signOut, useSession } from 'next-auth/react';

const CartDrawer = dynamic(() => import('@/components/cart/CartDrawer'), { ssr: false });

export default function NavBar(){
  const { data: session } = useSession();
  const [open, setOpen] = React.useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container mx-auto flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold">🛍️ Storefront</Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link className="btn" href="/catalog">Catalog</Link>
          <Link className="btn" href="/checkout">Checkout</Link>
          {session ? (
            <button className="btn" onClick={() => signOut()}>Sign out</button>
          ) : (
            <button className="btn" onClick={() => signIn()}>Sign in</button>
          )}
          <button className="btn" onClick={() => setOpen(true)}>Cart</button>
        </nav>
      </div>
      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
