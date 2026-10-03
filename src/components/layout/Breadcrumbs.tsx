import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) {
    return null; // Don't show on home page
  }

  const routeNames: Record<string, string> = {
    pyq: 'Study Resources',
    rooms: 'Rooms & PGs',
    roommates: 'Find Roommates',
    seniors: 'Alumni Network',
    internships: 'Opportunities',
    events: 'Events & Fests',
    support: 'Support',
    admin: 'Admin',
    auth: 'Authentication',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy'
  };

  return (
    <nav className="flex items-center text-sm text-ink-500 mb-6 font-medium" aria-label="Breadcrumb">
      <Link to="/" className="flex items-center hover:text-brand-600 transition-colors">
        <Home className="w-4 h-4" aria-label="Home" />
      </Link>
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const name = routeNames[value] || value.charAt(0).toUpperCase() + value.slice(1);

        return (
          <div key={to} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-2 text-ink-400" />
            {last ? (
              <span className="text-ink-900" aria-current="page">{name}</span>
            ) : (
              <Link to={to} className="hover:text-brand-600 transition-colors">
                {name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
