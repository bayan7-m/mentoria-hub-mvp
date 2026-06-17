import type { Metadata } from 'next';
import { AppProvider } from '../context/AppContext';
import { AuthProvider } from '../context/AuthContext';
import PageShell from '../components/PageShell';
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
        <AuthProvider>
          <AppProvider>
            <PageShell>
              <OnboardingModal />
              {children}
            </PageShell>
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}