'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

export default function Filters(){
  const router = useRouter();
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get('q') || '');
  const [category, setCategory] = useState(sp.get('category') || '');
  const [max, setMax] = useState(sp.get('max') || '');
  const [sort, setSort] = useState(sp.get('sort') || '');

  useEffect(() => {
    setQ(sp.get('q') || '');
    setCategory(sp.get('category') || '');
    setMax(sp.get('max') || '');
    setSort(sp.get('sort') || '');
  }, [sp]);

  const apply = useCallback(() => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (category) params.set('category', category);
    if (max) params.set('max', max);
    if (sort) params.set('sort', sort);
    router.replace(`/catalog?${params.toString()}`);
  }, [q, category, max, sort, router]);

  return (
    <div className="card">
      <div className="mb-2 font-medium">Filters</div>
      <div className="space-y-2">
        <input className="input" placeholder="Search…" value={q} onChange={(e)=>setQ(e.target.value)} />
        <select className="input" value={category} onChange={(e)=>setCategory(e.target.value)}>
          <option value="">All categories</option>
          <option value="clothing">Clothing</option>
          <option value="gadgets">Gadgets</option>
          <option value="home">Home</option>
          <option value="accessories">Accessories</option>
        </select>
        <input className="input" placeholder="Max price" value={max} onChange={(e)=>setMax(e.target.value)} />
        <select className="input" value={sort} onChange={(e)=>setSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="rating">Rating</option>
        </select>
        <button className="btn w-full" onClick={apply}>Apply</button>
      </div>
    </div>
  );
}
