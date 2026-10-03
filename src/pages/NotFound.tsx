import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export function NotFound() {
  useSEO({
    title: 'Page Not Found | Yaha Khoj',
    description: 'The page you are looking for does not exist.',
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="font-display text-7xl font-bold text-brand-500 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-ink-900 mb-4">Page not found</h2>
      <p className="text-ink-600 mb-8 max-w-md mx-auto">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link 
        to="/"
        className="px-6 py-3 bg-ink-900 text-surface rounded-full font-medium flex items-center gap-2 hover:bg-ink-800 transition-colors"
      >
        <Home className="w-4 h-4" />
        Back to Home
      </Link>
    </div>
  );
}
