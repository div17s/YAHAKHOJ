import { useMemo } from 'react';
import { UserSquare2, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';
import { MOCK_SENIORS } from '../data';
import { motion } from 'motion/react';
import { useSEO } from '../hooks/useSEO';
import { useSimulateLoading } from '../hooks/useSimulateLoading';
import { useUser } from '../contexts/UserContext';

export function Seniors() {
  useSEO({
    title: 'Alumni Network & Mentorship | Yaha Khoj',
    description: 'Connect with verified alumni from your college for 1-on-1 mentorship, career guidance, resume reviews, and internship referrals.',
  });

  const { user } = useUser();
  const isLoading = useSimulateLoading();

  const sortedSeniors = useMemo(() => {
    let seniors = [...MOCK_SENIORS];
    if (user?.collegeId) {
      // Strictly filter to show only alumni from the user's selected college
      seniors = seniors.filter(s => s.collegeId === user.collegeId);
      
      // Sort by same department first
      seniors.sort((a, b) => {
        if (a.departmentId === user.departmentId && b.departmentId !== user.departmentId) return -1;
        if (a.departmentId !== user.departmentId && b.departmentId === user.departmentId) return 1;
        return 0;
      });
    }
    return seniors;
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink-900 mb-2">Alumni Network</h1>
          <p className="text-ink-600">Connect with alumni for guidance and mentorship.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-surface/40 backdrop-blur-xl border border-ink-900/5 rounded-3xl p-6 animate-pulse">
              <div className="flex gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-ink-900/10"></div>
                <div className="flex-1 space-y-2 mt-1">
                  <div className="w-24 h-5 rounded bg-ink-900/10"></div>
                  <div className="w-20 h-4 rounded bg-ink-900/10"></div>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <div className="w-4 h-4 rounded bg-ink-900/10"></div>
                  <div className="flex-1 space-y-2">
                    <div className="w-24 h-4 rounded bg-ink-900/10"></div>
                    <div className="w-16 h-3 rounded bg-ink-900/10"></div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-4 h-4 rounded bg-ink-900/10"></div>
                  <div className="w-32 h-4 rounded bg-ink-900/10"></div>
                </div>
              </div>
              <div className="w-full h-11 rounded-xl bg-ink-900/10"></div>
            </div>
          ))}
        </div>
      ) : sortedSeniors.length === 0 ? (
        <div className="text-center py-16 bg-surface/40 backdrop-blur-xl border border-ink-900/5 rounded-3xl">
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-32 h-32"
            >
              <div className="absolute inset-0 bg-purple-500/20 rounded-full flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <UserSquare2 className="w-12 h-12 text-purple-500" />
                </motion.div>
              </div>
              <motion.div 
                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], y: [0, -20, 0] }} 
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute right-0 top-0 w-8 h-8 bg-surface/40 backdrop-blur-xl border border-ink-900/10 rounded-full flex items-center justify-center shadow-sm"
              >
                <span className="text-[10px]">👋</span>
              </motion.div>
            </motion.div>
          </div>
          <h3 className="font-display text-xl font-bold text-ink-900 mb-2">No alumni found</h3>
          <p className="text-ink-600 max-w-sm mx-auto mb-6">We couldn't find any alumni matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSeniors.map((senior, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              key={senior.id}
              className="bg-surface/40 backdrop-blur-xl border border-ink-900/5 rounded-3xl p-6 hover:border-brand-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
            >
              {senior.collegeId === user?.collegeId && (
                <div className="absolute top-0 right-0 bg-brand-500 text-surface text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                  {senior.departmentId === user?.departmentId ? 'Your Dept' : 'Your College'}
                </div>
              )}

              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 font-display font-bold text-lg">
                    {senior.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-display font-bold text-lg text-ink-900">{senior.name}</h3>
                      {senior.verified && <CheckCircle2 className="w-4 h-4 text-blue-500" aria-label="Verified Alumni" />}
                    </div>
                    <p className="text-sm text-ink-500">Class of {senior.graduationYear}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Briefcase className="w-4 h-4 text-ink-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{senior.role}</p>
                    <p className="text-xs text-ink-500">at {senior.company}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-4 h-4 text-ink-400 mt-0.5" />
                  <p className="text-sm text-ink-700">{senior.department}</p>
                </div>
              </div>

              {senior.mentorshipAvailable ? (
                <button 
                  onClick={() => alert(`Opening booking calendar for ${senior.name}...`)}
                  className="w-full py-2.5 bg-ink-900 text-surface text-sm font-medium rounded-xl hover:bg-ink-800 transition-colors"
                >
                  Book a 15-min chat
                </button>
              ) : (
                <button 
                  disabled
                  className="w-full py-2.5 bg-paper text-ink-500 border border-ink-900/5 text-sm font-medium rounded-xl cursor-not-allowed"
                >
                  Mentorship Unavailable
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
