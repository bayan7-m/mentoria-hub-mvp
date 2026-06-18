"use client";

<<<<<<< HEAD
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, BookOpen, Compass, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';

const NAV_LINKS = [
  { href: '/', label: 'Басты бет', icon: Compass },
  { href: '/opportunities', label: 'Мүмкіндіктер', icon: Compass },
  { href: '/courses', label: 'Курстар', icon: BookOpen },
  { href: '/dashboard', label: 'Кабинет', icon: LayoutDashboard },
];
=======
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useApp } from "../context/AppContext";
>>>>>>> 38dd114a6663c72340115d0a845f3a735e1fc721

export default function Navbar() {
  const { t, lang, setLang, theme, toggleTheme } = useApp();
  const pathname = usePathname();

  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("opps"), href: "/opportunities" },
    { name: t("courses"), href: "/courses" },
    { name: t("dashboard"), href: "/dashboard" },
  ];

  return (
<<<<<<< HEAD
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-white text-xs font-black">MH</span>
          </div>
          <span className="font-black text-lg tracking-tight text-[var(--text)]">
            Mentoria<span className="text-indigo-500">Hub</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
=======
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-sm dark:border-slate-800/80 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-black tracking-[0.3em] text-slate-900 dark:text-white">
          MENTORIAHUB
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
>>>>>>> 38dd114a6663c72340115d0a845f3a735e1fc721
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition ${
                  isActive ? "font-semibold text-indigo-600" : "text-slate-600 hover:text-indigo-600 dark:text-slate-300"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as "kk" | "ru" | "en")}
            className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            aria-label="Language"
          >
            <option value="kk">ҚАЗ</option>
            <option value="ru">РУС</option>
            <option value="en">ENG</option>
          </select>

<<<<<<< HEAD
        <div className="flex items-center gap-2">
=======
>>>>>>> 38dd114a6663c72340115d0a845f3a735e1fc721
          <button
            type="button"
            onClick={toggleTheme}
<<<<<<< HEAD
            className="p-2 rounded-xl hover:bg-[var(--surface2)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all"
            aria-label="Тақырыпты ауыстыру"
          >
            {state.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {state.isAuthenticated ? (
            <Link href="/dashboard">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow cursor-pointer hover:scale-105 transition-transform">
                {state.profile.avatar || 'MH'}
              </div>
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded-full transition-all"
            >
              Кіру
            </Link>
          )}

          <button
            className="md:hidden p-2 rounded-xl hover:bg-[var(--surface2)] text-[var(--text-muted)]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--surface)] px-4 pb-4">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium mt-1 transition-all ${
                  active
                    ? 'bg-indigo-500/10 text-indigo-600'
                    : 'text-[var(--text-muted)] hover:bg-[var(--surface2)]'
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
=======
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </header>
>>>>>>> 38dd114a6663c72340115d0a845f3a735e1fc721
  );
}
