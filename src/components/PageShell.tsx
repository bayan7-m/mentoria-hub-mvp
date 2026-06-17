'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import OnboardingModal from './OnboardingModal';

export default function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = pathname === '/login' || pathname === '/register';

  return (
    <>
      {!hideChrome && <Navbar />}
      {!hideChrome && <OnboardingModal />}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      {!hideChrome && <Footer />}
    </>
  );
}
