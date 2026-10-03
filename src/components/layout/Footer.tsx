import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import React from 'react';

export function Footer() {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleProtectedLink = (e: React.MouseEvent, path: string, name: string) => {
    if (!user) {
      e.preventDefault();
      let message = `Please login/signup to access ${name}.`;
      if (path.includes('/rooms')) message = 'Please login/signup to see available rooms & PGs nearby from your college.';
      if (path.includes('/roommates')) message = 'Please login/signup to find roommates at your college.';
      if (path.includes('/seniors')) message = 'Please login/signup to connect with alumni & community from your college.';
      if (path.includes('/events')) message = 'Please login/signup to discover campus events and city guide.';
      if (path.includes('/pyq')) message = 'Please login/signup to access PYQs & Notes for your courses.';
      if (path.includes('/onboarding')) message = 'Please login/signup to explore your college portal.';
      
      navigate('/auth', { state: { message, isLogin: true } });
    }
  };

  return (
    <footer className="bg-white text-slate-700 border-t border-slate-200 mt-auto pb-20 lg:pb-0 font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-3 group">
              <div className="w-9 h-9 rounded-none bg-black flex items-center justify-center shadow-xs overflow-hidden p-1.5">
                <img src="/faviconyahasekhoj.png" alt="Yaha Khoj Logo" className="w-full h-full object-contain select-none" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 leading-tight">Yaha Khoj</span>
              </div>
            </Link>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed font-normal">
              Delhi's premier student platform for college life. Verified PYQs, study notes, student rooms & PGs, roommates, and alumni network.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">Features</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link 
                  to="/pyq" 
                  onClick={(e) => handleProtectedLink(e, '/pyq', 'PYQs & Study Material')}
                  className="hover:text-black transition-colors"
                >
                  PYQs & Study Material
                </Link>
              </li>
              <li>
                <Link 
                  to="/rooms" 
                  onClick={(e) => handleProtectedLink(e, '/rooms', 'Rooms & PGs')}
                  className="hover:text-black transition-colors"
                >
                  Rooms & PGs
                </Link>
              </li>
              <li>
                <Link 
                  to="/roommates" 
                  onClick={(e) => handleProtectedLink(e, '/roommates', 'Find Roommates')}
                  className="hover:text-black transition-colors"
                >
                  Find Roommates
                </Link>
              </li>
              <li>
                <Link 
                  to="/seniors" 
                  onClick={(e) => handleProtectedLink(e, '/seniors', 'Alumni & Community')}
                  className="hover:text-black transition-colors"
                >
                  Alumni & Community
                </Link>
              </li>
              <li>
                <Link 
                  to="/events" 
                  onClick={(e) => handleProtectedLink(e, '/events', 'City Guide & Events')}
                  className="hover:text-black transition-colors"
                >
                  City Guide & Events
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link 
                  to="/onboarding" 
                  onClick={(e) => handleProtectedLink(e, '/onboarding', 'College Guide')}
                  className="hover:text-black transition-colors"
                >
                  College Guide
                </Link>
              </li>
              <li><a href="#blog" className="hover:text-black transition-colors">Campus Stories</a></li>
              <li><Link to="/support" className="hover:text-black transition-colors">Help & FAQ</Link></li>
              <li><Link to="/support" className="hover:text-black transition-colors">Contact Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">Student Portal</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3 font-normal">
              Sign in to your college account to access notes, question papers, room listings and connect with peers.
            </p>
            <Link
              to="/auth"
              className="inline-block px-5 py-2.5 bg-black hover:bg-zinc-800 text-white rounded-none font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
            >
              Sign In / Register
            </Link>
          </div>
        </div>
        
        <div className="border-t border-slate-200 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Yaha Khoj. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
