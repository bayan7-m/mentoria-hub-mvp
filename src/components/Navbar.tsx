'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp, Language } from '../context/AppContext';
import { translations } from '../lib/translations';

export default function Navbar() {
  const { theme, toggleTheme, favorites, lang, setLang } = useApp();
  const pathname = usePathname();
  const t = translations[lang];

  const navItems = [
    { name: t.home, href: '/' },
    { name: t.opps, href: '/opportunities' },
    { name: t.courses, href: '/courses' },
    { name: t.dashboard, href: '/dashboard' },
    { name: t.admin, href: '/admin' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
              MENTORIA<span className="text-slate-800 dark:text-slate-200 font-medium">HUB</span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-indigo-500'
                  }`}
                >
                  {item.name}
                  {item.href === '/opportunities' && favorites.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-pink-500 text-white rounded-full">{favorites.length}</span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-3">
            {/* Тіл ауыстырғыш селект */}
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-slate-100 dark:bg-slate-800 text-xs font-semibold px-2 py-1.5 rounded-xl cursor-pointer outline-none border-none"
            >
              <option value="kk">🇰🇿 ҚАЗ</option>
              <option value="ru">🇷🇺 РУС</option>
              <option value="en">🇺🇸 ENG</option>
            </select>

            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <Link href="/dashboard" className="hidden sm:inline-flex px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 rounded-xl">
              {t.start}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
