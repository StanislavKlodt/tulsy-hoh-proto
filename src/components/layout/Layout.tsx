import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const WIDE_ROUTES = ['/product/sofa-1/v2'];
const WIDE_CONTAINER = "max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16";

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isWide = WIDE_ROUTES.some(route => location.pathname.startsWith(route));

  return (
    <div className="min-h-screen flex flex-col">
      <Header containerClass={isWide ? WIDE_CONTAINER : undefined} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};
