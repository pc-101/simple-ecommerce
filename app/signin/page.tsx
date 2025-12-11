'use client';
import { signIn } from 'next-auth/react';
import { useState, FormEvent } from 'react';

export default function SignInPage(){
  const [email, setEmail] = useState('demo@demo.com');
  const [password, setPassword] = useState('demo123');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn('credentials', { email, password, callbackUrl: '/' });
    } finally { setLoading(false); }
  };

  return (
    <div className="mx-auto max-w-sm">
      <h1 className="mb-4 text-xl font-semibold">Sign In</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button className="btn w-full" disabled={loading}>{loading ? 'Signing in…' : 'Sign In'}</button>
        <p className="text-xs text-slate-500">Demo creds: demo@demo.com / demo123</p>
      </form>
    </div>
  );
}
