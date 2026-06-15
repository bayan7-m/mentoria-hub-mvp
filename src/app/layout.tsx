import type { Metadata } from 'next';
import { AppProvider } from '../context/AppContext';
import Navbar from '../components/Navbar';
import OnboardingModal from '../components/OnboardingModal';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mentoria Hub - Асинхронды Білім Платформасы',
  description: 'Мектеп оқушыларына арналған білім беру мүмкіндіктері мен курстар',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kk">
      <body>
        <AppProvider>
          <Navbar />
          <OnboardingModal />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}