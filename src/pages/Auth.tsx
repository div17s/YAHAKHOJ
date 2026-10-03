import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { Mail, Key, ArrowRight, Eye, EyeOff, User, Loader2, ArrowLeft } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export function Auth() {
  useSEO({
    title: 'Sign In / Join | Yaha Khoj - India\'s Premier Student Platform',
    description: 'Join Yaha Khoj to access university PYQs, notes, and connect with your college community across 25+ top Indian universities.',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();
  const [isLogin, setIsLogin] = useState(location.state?.isLogin || false);
  const authMessage = location.state?.message;

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!email.includes('@')) newErrors.email = 'Please enter a valid email address';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (!isLogin) {
      if (!name.trim()) newErrors.name = 'Full name is required';
      if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!agreeTerms) newErrors.terms = 'You must agree to the Terms of Service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));

    const isReturningUser = isLogin;
    if (!isReturningUser) {
      // Signup: check if user exists
      const registeredUsersStr = localStorage.getItem('registeredUsers') || '[]';
      const registeredUsers = JSON.parse(registeredUsersStr);
      if (registeredUsers.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
        setErrors({ email: 'This email is already registered. Please login.' });
        setIsLoading(false);
        return;
      }
      
      // Save new user info
      const newUser = {
        name,
        email: email.toLowerCase(),
        password,
        collegeId: '',
        departmentId: '',
        onboardingCompleted: false
      };
      registeredUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

      login({
        id: 'u' + Date.now(),
        name: name,
        email: email,
        onboardingCompleted: false,
      });

      setIsLoading(false);
      navigate('/onboarding');
    } else {
      // Login: find user and check password
      const registeredUsersStr = localStorage.getItem('registeredUsers') || '[]';
      const registeredUsers = JSON.parse(registeredUsersStr);
      const userObj = registeredUsers.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
      
      if (!userObj) {
        setErrors({ email: 'No account exists with this email. Please sign up first!' });
        setIsLoading(false);
        return;
      }
      
      if (userObj.password !== password) {
        setErrors({ password: 'Incorrect password. Please try again.' });
        setIsLoading(false);
        return;
      }

      login({
        id: 'u' + Date.now(),
        name: userObj.name || email.split('@')[0],
        email: email,
        onboardingCompleted: true,
        collegeId: userObj.collegeId || 'c1',
        departmentId: userObj.departmentId || 'cs',
      });

      sessionStorage.removeItem('hasSeenWelcomeAnimation');
      setIsLoading(false);
      navigate('/dashboard');
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="relative min-h-screen w-screen flex items-center justify-center p-3 sm:p-6 bg-orange-500 font-['Inter',sans-serif] overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full max-w-4xl relative z-10"
      >
        <div className="bg-white rounded-none border-2 border-black shadow-2xl md:flex md:flex-row overflow-hidden">
          
          {/* Left Side: Branded Horizontal Panel for Web View */}
          <div className="hidden md:flex md:w-1/2 bg-black text-white p-8 flex-col justify-center border-r-2 border-black">
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3 text-white">
                {isLogin ? 'Welcome Back Student' : 'Join Your Campus Hub'}
              </h2>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                Access verified semester PYQs, room rentals with zero brokerage, and connect directly with alumni mentors from your college.
              </p>
            </div>
          </div>

          {/* Right Side / Mobile: Form Panel */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
            <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-black mb-4 transition-colors w-fit">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <div className="mb-4">
              {authMessage && (
                <div className="mb-4 p-3 bg-orange-50 border-2 border-black rounded-none flex items-start gap-2.5 text-left">
                  <div className="w-5 h-5 rounded-none bg-orange-500 text-white flex items-center justify-center shrink-0 mt-0.5 font-medium text-xs">
                    !
                  </div>
                  <p className="text-xs font-medium text-slate-900 leading-snug">{authMessage}</p>
                </div>
              )}

              <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-1 tracking-tight">
                {isLogin ? 'Welcome Back' : 'Join Your College'}
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {isLogin 
                  ? 'Enter your credentials to access your student account.' 
                  : 'Create your account to unlock notes, rooms, and campus community.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        id="fullName"
                        type="text" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Enter your full name" 
                        className={`w-full pl-10 pr-4 py-3 bg-white border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.name ? 'border-red-500' : 'border-slate-300'}`}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    id="email"
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    className={`w-full pl-10 pr-4 py-3 bg-white border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">Password</label>
                  {isLogin && (
                    <button type="button" className="text-xs font-semibold text-black hover:underline">
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password" 
                    className={`w-full pl-10 pr-10 py-3 bg-white border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.password ? 'border-red-500' : 'border-slate-300'}`}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
              </div>

              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label htmlFor="confirmPassword" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Enter your password" 
                        className={`w-full pl-10 pr-10 py-3 bg-white border rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all ${errors.confirmPassword ? 'border-red-500' : 'border-slate-300'}`}
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 font-medium">{errors.confirmPassword}</p>}
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pt-2"
                  >
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input 
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={e => setAgreeTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded-none accent-black"
                      />
                      <span className="text-xs text-slate-600 leading-normal">
                        I agree to the <Link to="/terms" className="font-semibold text-black underline">Terms of Service</Link> & <Link to="/privacy" className="font-semibold text-black underline">Privacy Policy</Link>
                      </span>
                    </label>
                    {errors.terms && <p className="text-red-500 text-xs mt-1 font-medium">{errors.terms}</p>}
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-3.5 mt-2 bg-black hover:bg-zinc-800 text-white font-bold rounded-none text-xs sm:text-sm uppercase tracking-wider border-2 border-black transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-xs sm:text-sm text-slate-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={toggleAuthMode} 
                disabled={isLoading}
                className="font-bold text-black hover:underline transition-colors focus:outline-none disabled:opacity-70"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
