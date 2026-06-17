'use client';

import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';

export default function HomePage() {
  return (
    <div className="space-y-14 pb-16 pt-8">
      <Hero />

      <FeaturesSection />

      <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-indigo-600">Контактілер</p>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">Бізбен байланысыңыз</h2>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
              Қосымша ақпарат немесе қолдау алу үшін біздің командаға хабарласыңыз.
            </p>
          </div>

          <div className="space-y-4 rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Телефон</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">+7 (777) 777 77 77</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Email</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">mentoriaorganization@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
