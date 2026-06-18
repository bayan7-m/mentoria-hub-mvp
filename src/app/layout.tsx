import type { Metadata } from 'next';
import { AppProvider } from '../context/AppContext';
import LayoutShell from '../components/LayoutShell';
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
          <LayoutShell>{children}</LayoutShell>
        </AppProvider>
      </body>
    </html>
  );
}
