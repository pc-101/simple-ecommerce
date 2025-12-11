import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/data/products';

export async function GET(req: Request) {
  const { searchParams } = new URL(
    req.url,
    process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  );
  const q = (searchParams.get('q') || '').toLowerCase();
  const category = searchParams.get('category') || '';
  const max = Number(searchParams.get('max') || NaN);
  const sort = searchParams.get('sort') || '';

  let items = PRODUCTS.filter(p =>
    (!q || p.title.toLowerCase().includes(q)) &&
    (!category || p.category === category) &&
    (!Number.isFinite(max) || p.price <= (max as number))
  );

  if (sort === 'price-asc') items.sort((a,b)=>a.price-b.price);
  if (sort === 'price-desc') items.sort((a,b)=>b.price-a.price);
  if (sort === 'rating') items.sort((a,b)=>b.rating-a.rating);

  return NextResponse.json({ items });
}
