import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navigation from '@/components/Navigation';
import ToastContainer from '@/components/ToastContainer';

export const metadata = {
  title: 'Treinando com Will — Treinos Guiados',
  description: 'Plataforma de treinos guiados com exercícios demonstrados em GIF. Monte seus treinos personalizados e acompanhe seu progresso.',
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#07070d',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppProvider>
          <Navigation />
          <main className="main-content">{children}</main>
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
