'use client';

import { ReactNode } from 'react';
import { useApp } from '../context/AppContext';

const languageOptions = ['kk', 'ru', 'en'] as const;

interface AuthPageShellProps {
  children: ReactNode;
  pageTitle: string;
  pageSubtitle: string;
}

export default function AuthPageShell({ children, pageTitle, pageSubtitle }: AuthPageShellProps) {
  const { lang, setLang } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-white py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.9)] sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,191,36,0.18),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(96,165,250,0.13),_transparent_30%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-8">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/90">MENTORIAHUB</span>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-100">
                {languageOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLang(option)}
                    className={`rounded-full px-3 py-1 transition ${
                      lang === option ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {option === 'kk' ? 'kz' : option === 'ru' ? 'ru' : 'eng'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-300/90">{pageTitle}</p>
                <h1 className="mt-4 text-5xl font-black tracking-tight text-white sm:text-6xl">{pageSubtitle}</h1>
                <p className="mt-6 max-w-md text-base leading-8 text-slate-300">
                  MentoriaHub платформасына кіріп, оқу, олимпиадалар мен шәкіртақылар туралы ұсыныстарды бір жерде алыңыз.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-[0_28px_70px_-45px_rgba(255,255,255,0.18)]">
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
                <p className="mt-3 text-xl font-semibold text-white">Кіру жеңіл және тез</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Қауіпсіз</p>
                <p className="mt-3 text-xl font-semibold text-white">Сіздің деректеріңіз қорғалған</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-slate-950/95 p-8 shadow-2xl shadow-black/40 sm:p-10">
          {children}
        </section>
      </div>
    </div>
  );
}
