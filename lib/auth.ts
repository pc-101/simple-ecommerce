import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: { email: { label: 'Email', type: 'text' }, password: { label: 'Password', type: 'password' } },
      async authorize(creds) {
        const email = creds?.email?.toString().toLowerCase();
        const pw = creds?.password?.toString();
        if (email === 'demo@demo.com' && pw === 'demo123') return { id: '1', name: 'Demo User', email };
        return null;
      }
    })
  ],
  pages: { signIn: '/signin' }
};
