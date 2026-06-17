"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useApp } from "../context/AppContext";

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
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl shadow-sm dark:border-slate-800/80 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-black tracking-[0.3em] text-slate-900 dark:text-white">
          MENTORIAHUB
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
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

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-indigo-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
