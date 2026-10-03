import { Link, useLocation } from 'react-router-dom';
import { FileText, Home as HomeIcon, Users, UserSquare2, Briefcase, Calendar, Building2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export function MobileNav() {
  const location = useLocation();
  
  
  const { user } = useUser();
  const navigate = useNavigate();

  const handleProtectedNavigation = (e, path, name) => {
    if (!user || !user.onboardingCompleted) {
      e.preventDefault();
      let message = `Please login/signup to access ${name}.`;
      if (path.includes('/rooms')) message = 'Please login/signup to see available rooms & PGs nearby from your college.';
      if (path.includes('/roommates')) message = 'Please login/signup to find roommates at your college.';
      if (path.includes('/seniors')) message = 'Please login/signup to connect with alumni from your college.';
      if (path.includes('/events')) message = 'Please login/signup to discover events happening at your college.';
      if (path.includes('/pyq')) message = 'Please login/signup to access PYQs & Notes for your courses.';
      if (path.includes('/internships')) message = 'Please login/signup to find internships for your stream.';
      
      navigate('/auth', { state: { message, isLogin: true } });
    }
  };

  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'PYQs', path: '/pyq', icon: FileText },
    { name: 'Rooms', path: '/rooms', icon: Building2 },
    { name: 'Roommates', path: '/roommates', icon: Users },
    { name: 'Alumni', path: '/seniors', icon: UserSquare2 },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#181a20] border-t border-zinc-800 shadow-2xl pb-safe pt-2 z-50">
      <div className="flex items-center justify-around px-2 pb-2 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => handleProtectedNavigation(e, item.path, item.name)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 min-w-[72px] shrink-0 rounded-xl transition-colors",
                isActive ? "text-white font-bold" : "text-zinc-400 hover:text-white"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-full transition-colors",
                isActive ? "bg-zinc-800 text-white" : "bg-transparent"
              )}>
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[10px] font-semibold whitespace-nowrap">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
