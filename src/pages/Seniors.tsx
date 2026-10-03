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
    <div className="max-w-5xl mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black uppercase">Alumni Network</h1>
          <p className="text-black text-sm">Connect with alumni for guidance and mentorship.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white border-2 border-black p-5 animate-pulse">
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 rounded-none bg-gray-200 border-2 border-black"></div>
                <div className="flex-1 space-y-2 mt-1">
                  <div className="w-24 h-5 bg-gray-200"></div>
                  <div className="w-20 h-4 bg-gray-200"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-full h-4 bg-gray-200"></div>
                <div className="w-2/3 h-4 bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      ) : sortedSeniors.length === 0 ? (
        <div className="bg-white border-2 border-black p-8 text-center my-6">
          <h3 className="font-bold text-lg text-black uppercase mb-2">FILE NOT FOUND</h3>
          <p className="text-sm text-gray-600 max-w-sm mx-auto font-medium">
            Alumni mentors for this college are currently not registered. Available soon!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedSeniors.map((senior, idx) => (
            <div
              key={senior.id}
              className="bg-white border-2 border-black p-5 flex flex-col hover:bg-gray-50 transition-colors relative"
            >
              {senior.collegeId === user?.collegeId && (
                <div className="absolute top-2 right-2 bg-black text-white text-[9px] font-bold uppercase px-2 py-0.5">
                  {senior.departmentId === user?.departmentId ? 'Your Dept' : 'Your College'}
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 border-2 border-black flex items-center justify-center text-black font-bold text-lg bg-gray-50">
                  {senior.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-bold text-base text-black uppercase">{senior.name}</h3>
                    {senior.verified && <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Class of {senior.graduationYear}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-xs">
                  <Briefcase className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-black uppercase">{senior.role}</p>
                    <p className="text-gray-500">at {senior.company}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <GraduationCap className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <p className="text-gray-600 font-medium">{senior.department}</p>
                </div>
              </div>

              {senior.mentorshipAvailable ? (
                <button 
                  onClick={() => alert(`Opening booking calendar for ${senior.name}...`)}
                  className="w-full py-2 bg-black text-white text-[10px] font-bold uppercase hover:bg-gray-800 transition-colors"
                >
                  Book a 15-min chat
                </button>
              ) : (
                <button 
                  disabled
                  className="w-full py-2 bg-gray-100 text-gray-400 border border-gray-200 text-[10px] font-bold uppercase cursor-not-allowed"
                >
                  Mentorship Unavailable
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
