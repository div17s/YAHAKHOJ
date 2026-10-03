import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, Building2, MapPin, Search, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { MOCK_COLLEGES } from '../data';
import { useSEO } from '../hooks/useSEO';

export function GateScreen() {
  useSEO({
    title: 'Select College — Yaha Khoj',
    description: 'Select your college to access notes, pyqs, and more.',
  });

  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const navigate = useNavigate();

  const filteredColleges = MOCK_COLLEGES.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedId) {
      localStorage.setItem('pendingCollegeId', selectedId);
      navigate('/auth');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-slate-50 to-slate-100 overflow-hidden">
      {/* Subtle Background Blobs for depth */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" />

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-[510px] relative z-10"
      >
        <div className="bg-white border border-slate-100 rounded-[32px] shadow-[0_24px_64px_rgba(0,0,0,0.05)] p-8 sm:p-10">
          
          {/* Header section matching your image */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#e6f7f8] border border-[#b2e5e8] text-[#009ca6] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs">
              <BookOpen className="w-7 h-7" />
            </div>
            <h1 className="font-sans text-2xl sm:text-[26px] font-extrabold text-[#0a192f] tracking-tight leading-snug">
              See what's available at your college
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal mt-2.5 max-w-sm mx-auto">
              Select your college to unlock notes, rooms, roommates, and more — tailored just for you.
            </p>
          </div>

          <div className="space-y-6">
            {/* Search Input Box matching your image */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search for your college (e.g., IIT, NIT, DU)..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-[14px] focus:outline-none focus:border-[#7bc8ce] focus:ring-2 focus:ring-[#7bc8ce]/10 transition-all text-[14px] text-slate-700 placeholder-slate-400"
              />
            </div>

            {/* College List matching your image */}
            <div className="h-[250px] overflow-y-auto pr-1.5 space-y-3 custom-scrollbar">
              {filteredColleges.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <Building2 className="w-8 h-8 mx-auto mb-2 opacity-20" />
                  <p className="text-xs">No colleges found matching "{search}"</p>
                </div>
              ) : (
                filteredColleges.map((college) => {
                  const isSelected = selectedId === college.id;
                  return (
                    <button
                      key={college.id}
                      onClick={() => setSelectedId(college.id)}
                      className={`w-full flex items-center gap-4 p-3.5 rounded-2xl border transition-all text-left ${
                        isSelected 
                          ? 'border-[#009ca6] bg-[#e6f7f8]/40 shadow-xs' 
                          : 'border-slate-100 hover:bg-slate-50/70'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                        isSelected 
                          ? 'bg-[#009ca6] text-white border-transparent' 
                          : 'bg-slate-50 text-slate-500 border-slate-100'
                      }`}>
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className={`font-bold text-sm leading-tight transition-colors ${isSelected ? 'text-[#009ca6]' : 'text-slate-800'}`}>
                          {college.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-slate-300" />
                          <span>{college.city}</span>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
            
            {/* Continue Button matching your image exactly */}
            <button 
              onClick={handleContinue}
              disabled={!selectedId}
              style={{ backgroundColor: selectedId ? '#7bc8ce' : '#cbd5e1' }}
              className="w-full py-3.5 mt-4 text-white font-bold text-[15px] rounded-[14px] hover:brightness-[1.02] active:scale-[0.99] focus:outline-none transition-all flex items-center justify-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed shadow-xs"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Footer Navigation */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center flex flex-col gap-1.5 text-xs text-slate-500 font-medium">
            <div>
              Already have an account?{' '}
              <Link to="/auth" state={{ isLogin: true }} className="font-bold text-[#009ca6] hover:underline focus:outline-none">
                Sign in
              </Link>
            </div>
            <div>
              New here?{' '}
              <Link to="/auth" className="font-bold text-[#009ca6] hover:underline focus:outline-none">
                Create an account
              </Link>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
