import { useMemo } from 'react';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import { MOCK_INTERNSHIPS } from '../data';
import { motion } from 'motion/react';
import { useSEO } from '../hooks/useSEO';
import { useSimulateLoading } from '../hooks/useSimulateLoading';
import { useUser } from '../contexts/UserContext';

export function Internships() {
  useSEO({
    title: 'Student Internships & Opportunities | Yaha Khoj',
    description: 'Find internships, part-time jobs, and early-career roles curated specifically for college students.',
  });

  const { user } = useUser();
  const isLoading = useSimulateLoading();

  const sortedInternships = useMemo(() => {
    let internships = [...MOCK_INTERNSHIPS];
    if (user?.collegeId) {
      internships.sort((a, b) => {
        // Priority 1: Same department
        if (a.departmentId === user.departmentId && b.departmentId !== user.departmentId) return -1;
        if (a.departmentId !== user.departmentId && b.departmentId === user.departmentId) return 1;
        
        // Priority 2: Same college
        if (a.collegeId === user.collegeId && b.collegeId !== user.collegeId) return -1;
        if (a.collegeId !== user.collegeId && b.collegeId === user.collegeId) return 1;

        return 0;
      });
    }
    return internships;
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black uppercase">Opportunities</h1>
        <p className="text-black text-sm">Internships and early-career roles.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sortedInternships.map((job) => (
          <div
            key={job.id}
            className="bg-white border-2 border-black p-5 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 relative"
          >
            {job.collegeId === user?.collegeId && (
              <div className="absolute top-0 right-0 bg-black text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5">
                {job.departmentId === user?.departmentId ? 'Dept' : 'College'}
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-black uppercase">{job.title}</h3>
                <span className="text-[9px] font-bold px-2 py-0.5 bg-gray-100 border border-black uppercase">
                  {job.type.replace('_', ' ')}
                </span>
              </div>
              
              <p className="text-black font-bold text-sm mb-3 uppercase">{job.company}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 mb-3 uppercase font-bold">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  {job.stipend}
                </div>
              </div>

              <div className="flex gap-2">
                {job.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-bold px-2 py-0.5 bg-gray-50 border border-gray-200 text-gray-600 uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button 
              onClick={() => alert(`Redirecting to application...`)}
              className="px-6 py-2 bg-black text-white text-xs font-bold uppercase hover:bg-gray-800 transition-colors"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
