import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function HomePage(){
  const session = await getServerSession(authOptions);
  console.log(authOptions)
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold">E‑Commerce Storefront</h1>
      <p className="text-slate-600 dark:text-slate-300">Catalog, filters, cart, and auth. Code-splitting + image lazy-load for snappy UX.</p>
      <div className="flex gap-2">
        <Link href="/catalog" className="btn">Browse Catalog</Link>
        {!session && <Link href="/signin" className="btn">Sign In</Link>}
      </div>
    </div>
  );
}
