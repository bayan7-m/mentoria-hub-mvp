'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, BookOpen, Compass, LayoutDashboard, ShieldCheck, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';

const NAV_LINKS = [
  { href: '/', label: 'Home', icon: Compass },
  { href: '/catalog', label: 'Opportunities', icon: Compass },
  { href: '/courses', label: 'Courses', icon: BookOpen },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin', label: 'Admin', icon: ShieldCheck },
];

export default function Navbar() {
  const pathname = usePathname();
  const { state, dispatch } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () =>
    dispatch({ type: 'SET_THEME', payload: state.theme === 'dark' ? 'light' : 'dark' });

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <span className="text-white text-xs font-black">MH</span>
          </div>
          <span className="font-black text-lg tracking-tight text-[var(--text)]">
            Mentoria<span className="text-indigo-500">Hub</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                    : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface2)]'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-[var(--surface2)] text-[var(--text-muted)] hover:text-[var(--text)] transition-all"
            aria-label="Toggle theme"
          >
            {state.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Avatar */}
          <Link href="/dashboard">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow cursor-pointer hover:scale-105 transition-transform">
              {state.profile.avatar}
            </div>
          </Link>

          {/* Mobile menu */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-[var(--surface2)] text-[var(--text-muted)]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
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
  );
}