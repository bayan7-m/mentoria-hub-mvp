'use client';

import React from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login submitted');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">MENTORIAHUB</h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300">
            Жеке кабинетке кіру {' '}
            <span className="text-white">| kz</span>
            <span className="text-slate-300">/ru/eng</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label htmlFor="login" className="block text-sm font-medium text-slate-200 mb-2">
              Логин:
            </label>
            <input
              id="login"
              name="login"
              type="text"
              placeholder="Логин"
              className="w-full rounded-2xl border border-white/15 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-2">
              Құпиясөз:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Құпиясөз"
              className="w-full rounded-2xl border border-white/15 bg-slate-950/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
          </div>

          <p className="text-center text-slate-300 italic">Үлкен мақсаттар о сы жерден басталады!</p>

          <div className="space-y-4">
            <button
              type="submit"
              className="w-full rounded-full bg-amber-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
            >
              КІРУ
            </button>
            <Link
              href="/register"
              className="inline-flex w-full justify-center rounded-full border border-slate-600 bg-transparent px-6 py-3 text-base font-semibold text-slate-100 transition hover:border-amber-400 hover:text-amber-300"
            >
              ТІРКЕЛУ
            </Link>
          </div>
        </form>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row">
          <span>©Copyright All Rights Reserved 2026</span>
          <span>| 404itu | MENTORIAHUB</span>
        </div>
      </div>
    </div>
  );
}
