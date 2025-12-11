import Filters from '@/components/Filters';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/data/products';

type SearchParams = Record<string, string | string[] | undefined>;

async function getProducts(searchParams: SearchParams) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams)) {
    if (!v) continue;
    if (Array.isArray(v)) v.forEach(x => qs.append(k, x));
    else qs.set(k, v);
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? process.env.NEXT_BASE_URL ?? 'http://localhost:3000';
  const url = new URL(`/api/products?${qs.toString()}`, baseUrl);
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json() as Promise<{ items: Product[] }>;
}

export default async function CatalogPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const resolvedParams = await searchParams;
  const data = await getProducts(resolvedParams);
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px,1fr]">
      <Filters />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data.items.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
