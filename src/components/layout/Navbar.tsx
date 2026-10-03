import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  GraduationCap, 
  BookOpen, 
  Home as HomeIcon, 
  Users, 
  MapPin, 
  HelpCircle 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useUser } from '../../contexts/UserContext';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_COLLEGES } from '../../data';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, updateUser } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Navigation items requested by the user: Home, College, PYQs, Roommates, Rooms & PG, City Guide, Community
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'PYQs', path: '/pyq' },
    { name: 'Roadmaps', path: '/roadmaps' },
    { name: 'Roommates', path: '/roommates' },
    { name: 'Rooms & PG', path: '/rooms' },
    { name: 'City Guide', path: '/events' },
    { name: 'Community', path: '/seniors' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
    setIsDrawerOpen(false);
  };

  const handleChangeCollege = () => {
    updateUser({ onboardingCompleted: false });
    navigate('/onboarding');
    setShowDropdown(false);
    setIsDrawerOpen(false);
  };

  const handleProtectedNavigation = (e: React.MouseEvent, path: string, name: string) => {
    if (path === '/') return;
    if (!user || !user.onboardingCompleted) {
      e.preventDefault();
      let message = `Please login/signup to access ${name}.`;
      if (path.includes('/rooms')) message = 'Please login/signup to see available rooms & PGs nearby from your college.';
      if (path.includes('/roommates')) message = 'Please login/signup to find roommates at your college.';
      if (path.includes('/seniors')) message = 'Please login/signup to connect with alumni & community from your college.';
      if (path.includes('/events')) message = 'Please login/signup to discover campus events and city guide.';
      if (path.includes('/pyq')) message = 'Please login/signup to access PYQs & Notes for your courses.';
      if (path.includes('/onboarding')) message = 'Please login/signup to explore your college portal.';
      
      navigate('/auth', { state: { message, isLogin: true } });
      setIsDrawerOpen(false);
    }
  };

  const userCollege = MOCK_COLLEGES.find(c => c.id === user?.collegeId);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-[#0a1120]/90 backdrop-blur-xl border-b border-white/10 shadow-lg select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14">
            
            {/* Left Zone: Yaha Khoj Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-7 h-7 rounded-none bg-white flex items-center justify-center shadow-md overflow-hidden p-1">
                  <img src="/faviconyahasekhoj.png" alt="Yaha Khoj Logo" className="w-full h-full object-contain select-none" />
                </div>
                <span className="font-display font-extrabold text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  Yaha Khoj
                </span>
              </Link>
            </div>
            
            {/* Center Zone: Floating Pill Capsule with Links (Infosys Style Layout) */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="bg-[#e5e7eb]/95 backdrop-blur-md rounded-full px-4 py-1 shadow-md flex items-center gap-4 border border-white/50">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={(e) => handleProtectedNavigation(e, item.path, item.name)}
                      className={cn(
                        "text-[11px] font-bold transition-colors whitespace-nowrap uppercase tracking-tight",
                        isActive
                          ? "text-[#00687f]"
                          : "text-slate-800 hover:text-[#009ca6]"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            
            {/* Right Zone: Sleek Dark Pill Button (Sign In / User Profile) + Hamburger Menu */}
            <div className="flex items-center gap-2 shrink-0">
              {user ? (
                <div className="relative">
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/75 hover:bg-black text-white border border-white/20 transition-all shadow-md cursor-pointer"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#009ca6] text-white flex items-center justify-center font-bold text-[9px]">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-[10px] font-bold hidden sm:inline max-w-[80px] truncate">{user.name}</span>
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-52 bg-white border border-black py-0 z-50 text-ink-900 animate-in fade-in slide-in-from-top-2">
                      <div className="px-3 py-2 border-b border-black">
                        <p className="text-xs font-bold text-ink-900 truncate font-['Poppins',sans-serif]">{user.name}</p>
                        {userCollege && (
                          <p className="text-[10px] font-medium text-ink-600 truncate font-['Poppins',sans-serif]">{userCollege.name}</p>
                        )}
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setShowDropdown(false)}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-ink-900 hover:bg-zinc-100 flex items-center gap-2 transition-colors font-['Poppins',sans-serif]"
                      >
                        <User className="w-3.5 h-3.5 text-ink-500" />
                        Edit Profile
                      </Link>
                      <button 
                        onClick={handleChangeCollege}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-ink-900 hover:bg-zinc-100 flex items-center gap-2 transition-colors font-['Poppins',sans-serif]"
                      >
                        <Settings className="w-3.5 h-3.5 text-ink-500" />
                        Change College
                      </button>
                      <div className="h-px bg-black" />
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors font-['Poppins',sans-serif]"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/auth" 
                  state={{ isLogin: true }}
                  className="flex items-center gap-2 rounded-full bg-[#0f172a] hover:bg-black text-white px-3.5 py-1.5 text-[11px] font-bold tracking-wide border border-white/20 shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <img src="/faviconyahasekhoj.png" alt="Yaha Khoj" className="w-4 h-4 object-contain rounded-full bg-white p-0.5 select-none shrink-0" />
                  <span className="whitespace-nowrap uppercase tracking-wider">Sign In</span>
                </Link>
              )}

              {/* Hamburger Menu Button placed next to Sign In */}
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-slate-100 transition-transform active:scale-95 shadow-md cursor-pointer shrink-0"
                aria-label="Abrir menu"
              >
                <Menu className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* SIDE DRAWER (TRIGGERS FROM CIRCULAR HAMBURGER BUTTON)                    */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 cursor-pointer"
            />

            {/* Slide-out Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-none bg-black flex items-center justify-center shadow-md overflow-hidden p-1.5">
                    <img src="/faviconyahasekhoj.png" alt="Yaha Khoj Logo" className="w-full h-full object-contain select-none" />
                  </div>
                  <span className="font-display font-extrabold text-2xl tracking-tight text-[#0a1120]">
                    Yaha Khoj
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Fechar menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="p-6 space-y-2 flex-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Menu</p>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={(e) => {
                      handleProtectedNavigation(e, item.path, item.name);
                      if (user || item.path === '/') setIsDrawerOpen(false);
                    }}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 border-b border-black text-sm font-bold transition-colors",
                      location.pathname === item.path
                        ? "bg-black text-white"
                        : "text-black hover:bg-zinc-100"
                    )}
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}

                <div className="border-b border-black my-4" />

                <Link
                  to="/support"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 border-b border-black text-sm font-bold text-black hover:bg-zinc-100 transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Support & Help</span>
                </Link>
              </div>

              {/* Drawer Footer Auth Info */}
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#009ca6] text-white flex items-center justify-center font-bold text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                        {userCollege && (
                          <p className="text-xs text-[#009ca6] font-medium truncate">{userCollege.name}</p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full py-2.5 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    state={{ isLogin: true }}
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-full py-3 px-4 rounded-xl bg-[#0a1120] hover:bg-black text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all block text-center"
                  >
                    <User className="w-4 h-4 text-slate-300" />
                    <span>Sign In / Join</span>
                  </Link>
                )}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
