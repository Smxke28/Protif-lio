import './globals.css';
import type { Metadata } from 'next';
import SlideMenu from '../components/SlideMenu';
import Navbar from '../components/Navbar';
import Providers from '../components/Providers';

export const metadata: Metadata = {
  title: 'Portfólio Juan Lavecchia',
  description: 'Site pessoal e profissional',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen flex 
          bg-white text-gray-900 
          dark:bg-black dark:text-gray-100 
          transition-colors duration-500"
      >
        <Providers>
          {/* Sidebar fixa */}
          <SlideMenu />

          {/* Navbar com botão de login */}
          <Navbar />

          {/* Conteúdo principal */}
          <main className="flex-1 min-h-screen p-6 md:ml-64 flex items-start justify-center mt-16">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
