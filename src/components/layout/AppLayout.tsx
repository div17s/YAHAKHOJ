import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';
import { Footer } from './Footer';
import { Breadcrumbs } from './Breadcrumbs';
import { ScrollToTop } from './ScrollToTop';
import { motion, AnimatePresence } from 'motion/react';

export function AppLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  
  return (
    <div className="min-h-screen flex flex-col bg-paper overflow-x-hidden relative text-ink-900">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main 
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={isLanding 
            ? "flex-1 w-full pb-16 lg:pb-0" 
            : "flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6 pb-20 lg:pb-10"
          }
        >
          {!isLanding && <Breadcrumbs />}
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <MobileNav />
    </div>
  );
}
