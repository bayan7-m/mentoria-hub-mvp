import type { Metadata } from 'next';
import { AppProvider } from '../context/AppContext';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import OnboardingModal from '../components/OnboardingModal';
import Footer from '../components/Footer';
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
        <AuthProvider>
          <AppProvider>
            <Navbar />
            <OnboardingModal />
            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </main>
            <Footer />
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}