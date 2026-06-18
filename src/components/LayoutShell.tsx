'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main
        className={
          isAuthPage
            ? 'min-h-screen'
            : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'
        }
      >
        {children}
      </main>
    </>
  );
}
