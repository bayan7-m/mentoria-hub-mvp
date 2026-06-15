'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { translations } from '../lib/translations';

export default function LandingPage() {
  const { profile, lang } = useApp();
  const t = translations[lang];

  return (
    <div className="space-y-16 py-8 min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-6 animate-fade-in">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          {t.welcome}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {profile && profile.name ? `${profile.name}! ` : ''}
          {t.heroDesc}
        </p>
        <div className="flex justify-center space-x-4 pt-2">
          <Link href="/opportunities" className="px-6 py-3 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg transition-all">
            {t.findOpps}
          </Link>
          <Link href="/courses" className="px-6 py-3 font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl shadow-sm transition-all">
            {t.startLearning}
          </Link>
        </div>
      </div>

      {/* Value Proposition Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm transition-colors duration-200">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">{t.whyMentoria}</h2>
          <ul className="space-y-5">
            <li className="flex items-start bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold mr-3 text-lg">✓</span>
              <div>
                <strong className="block text-slate-800 dark:text-slate-200">{t.formatTitle}</strong>
                <span className="text-sm text-slate-600 dark:text-slate-400">{t.formatDesc}</span>
              </div>
            </li>
            <li className="flex items-start bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold mr-3 text-lg">✓</span>
              <div>
                <strong className="block text-slate-800 dark:text-slate-200">{t.infoTitle}</strong>
                <span className="text-sm text-slate-600 dark:text-slate-400">{t.infoDesc}</span>
              </div>
            </li>
            <li className="flex items-start bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold mr-3 text-lg">✓</span>
              <div>
                <strong className="block text-slate-800 dark:text-slate-200">{t.recTitle}</strong>
                <span className="text-sm text-slate-600 dark:text-slate-400">{t.recDesc}</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white p-8 text-center shadow-md min-h-[260px]">
          <p className="text-lg font-medium italic">{t.quote}</p>
        </div>
      </div>
    </div>
  );
}