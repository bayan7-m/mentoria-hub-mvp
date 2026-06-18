<<<<<<< HEAD
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Language } from '@/types';

const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'kz', label: 'kz' },
  { value: 'ru', label: 'ru' },
  { value: 'eng', label: 'eng' },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();
  const [lang, setLang] = useState<Language>('kz');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login({ email: email.trim(), password });
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Қате логин немесе құпия сөз');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden flex flex-col md:flex-row min-h-[520px]">
        {/* Left illustration panel */}
        <div className="md:w-1/3 p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-700">
          <div className="w-full max-w-[200px] aspect-square mb-6 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-6xl">
              <span className="opacity-80">📚</span>
            </div>
            <div className="absolute bottom-4 left-4 text-3xl">🌍</div>
            <div className="absolute top-4 right-4 text-2xl">🍎</div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
              <span className="text-2xl">👩‍🎓</span>
              <span className="text-2xl">👨‍💻</span>
              <span className="text-2xl">👩‍🔬</span>
            </div>
          </div>
          <p className="font-bold text-lg leading-snug text-slate-800 dark:text-slate-200">
            Үлкен мақсаттар осы жерден басталады!
          </p>
        </div>

        {/* Right form panel */}
        <div className="md:w-2/3 p-8 sm:p-10 flex flex-col">
          <div className="flex justify-end gap-2 text-xs font-semibold mb-4">
            {LANGUAGES.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => setLang(l.value)}
                className={`px-2 py-1 rounded ${
                  lang === l.value ? 'text-indigo-600 font-bold' : 'text-slate-400'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            <h1 className="text-2xl font-black text-center mb-1">
              <span className="text-indigo-500">MENTORIA</span>
              <span className="text-slate-900 dark:text-white">HUB</span>
            </h1>
            <p className="text-center text-sm text-slate-500 mb-8">
              Жеке кабинетке кіру | kz/ru/eng
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1.5">Логин:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-sm bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Құпиясөз:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2.5 text-sm bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {error && <p className="text-sm text-red-500 text-center">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 bg-[#6366F1] hover:bg-indigo-600 text-white font-bold rounded-full transition-all"
              >
                КІРУ
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center">
                <Link
                  href="/register"
                  className="bg-white dark:bg-slate-900 px-4 text-sm font-semibold text-indigo-600 hover:underline"
                >
                  ТІРКЕЛУ
                </Link>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-auto">
            @Copyright All Rights Reserved 2026 | 404itu | MENTORIAHUB
          </p>
=======
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useApp();

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    login();
    router.replace("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10 text-white">
      <div className="w-full max-w-lg rounded-[28px] border border-white/10 bg-slate-950 p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">{t("loginTitle")}</h1>
          <p className="mt-4 text-sm text-slate-300 sm:text-base">{t("loginSubtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label htmlFor="login" className="mb-2 block text-sm font-medium text-slate-200">
              {t("loginLabel")}
            </label>
            <input
              id="login"
              type="text"
              placeholder={t("loginLabel")}
              className="w-full rounded-2xl border border-white/15 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
              {t("passwordLabel")}
            </label>
            <input
              id="password"
              type="password"
              placeholder={t("passwordPlaceholder")}
              className="w-full rounded-2xl border border-white/15 bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
            />
          </div>

          <p className="text-center text-slate-300">{t("loginFooter")}</p>

          <div className="space-y-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-full bg-amber-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
            >
              {t("loginButton")}
            </button>
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="inline-flex w-full justify-center rounded-full border border-slate-600 bg-transparent px-6 py-3 text-base font-semibold text-slate-100 transition hover:border-amber-400 hover:text-amber-300"
            >
              {t("registerButton")}
            </button>
          </div>
        </form>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row">
          <span>© 2026 MENTORIAHUB</span>
          <span>404itu</span>
>>>>>>> 38dd114a6663c72340115d0a845f3a735e1fc721
        </div>
      </div>
    </div>
  );
}
