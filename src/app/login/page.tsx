'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

const languageOptions = ['kk', 'ru', 'en'] as const;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { t, lang, setLang } = useApp();
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
    router.replace('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        {/* Left illustration and brand panel */}
        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.9)] sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,191,36,0.18),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(96,165,250,0.13),_transparent_30%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/90">MENTORIAHUB</span>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-100">
                {languageOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLang(option)}
                    className={`rounded-full px-3 py-1 transition ${lang === option ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:bg-white/10 hover:text-white'}`}
                  >
                    {option === 'kk' ? 'kz' : option === 'ru' ? 'ru' : 'eng'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300/90">Жеке кабинет</p>
                <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">Білім әлеміне кіру</h1>
                <p className="mt-6 max-w-md text-base leading-8 text-slate-300">
                  MentoriaHub-пен оқу, олимпиадалар мен шәкіртақылар туралы ақпаратты бір платформада табыңыз.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_28px_70px_-45px_rgba(255,255,255,0.18)]">
                <div className="flex h-72 items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-white/5 text-center text-slate-400">
                  <div>
                    <p className="mb-3 text-sm uppercase tracking-[0.3em] text-slate-500">TODO</p>
                    <p className="text-lg font-semibold">Placeholder illustration</p>
                    <p className="mt-2 text-sm text-slate-500">Replace with Figma asset</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Жылдам</p>
                <p className="mt-3 text-xl font-semibold text-white">Деректер тез кіреді</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Қауіпсіз</p>
                <p className="mt-3 text-xl font-semibold text-white">Сіздің деректеріңіз қорғалған</p>
              </div>
            </div>
          </div>
        </section>

        {/* Right authentication panel */}
        <section className="flex flex-col justify-between rounded-[32px] border border-white/10 bg-slate-950/95 p-8 shadow-2xl shadow-black/40 sm:p-10">
          <div>
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300/90">Кіру</p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white">Есептік жазбаңызға кіріңіз</h2>
              <p className="mt-3 text-sm text-slate-400">{t('loginSubtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div>
                <label htmlFor="login" className="block text-sm font-semibold text-slate-200">
                  {t('loginLabel')}
                </label>
                <input
                  id="login"
                  name="login"
                  type="text"
                  value={loginValue}
                  onChange={(event) => setLoginValue(event.target.value)}
                  placeholder={t('loginLabel')}
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-slate-200">
                  {t('passwordLabel')}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={passwordValue}
                  onChange={(event) => setPasswordValue(event.target.value)}
                  placeholder={t('passwordLabel')}
                  className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-white placeholder:text-slate-500 transition focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-full bg-amber-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-300"
              >
                {t('loginButton')}
              </button>
            </form>
          </div>

          <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-6 text-sm text-slate-400 sm:mt-10">
            <div className="flex items-center justify-between gap-4 sm:flex-row sm:items-center">
              <p>{t('loginFooter')}</p>
              <button
                type="button"
                onClick={() => router.push('/register')}
                className="font-semibold text-amber-300 transition hover:text-white"
              >
                {t('registerButton')}
              </button>
            </div>
            <div className="flex flex-col gap-2 text-center text-[0.85rem] sm:flex-row sm:justify-between sm:text-left">
              <span>© 2026 MENTORIAHUB</span>
              <span>All rights reserved</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
