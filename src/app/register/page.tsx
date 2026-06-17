'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { t } = useApp();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register();
    router.replace('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">{t('registerButton')}</h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300">Create a new account to access the dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              className="w-full rounded-2xl border border-white/15 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-white/15 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-white/15 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-amber-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
          >
            {t('registerButton')}
          </button>
        </form>
      </div>
    </div>
  );
}
