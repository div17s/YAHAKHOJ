import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Home, Users, Briefcase, GraduationCap, MapPin, ArrowRight, ArrowLeft, AlertCircle, Compass } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { MOCK_PYQS, MOCK_ROOMS, MOCK_COLLEGES, MOCK_ROOMMATES, MOCK_SENIORS } from '../data';
import { CAREER_ROADMAPS } from '../data/roadmaps';

export function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();
  const collegeObj = MOCK_COLLEGES.find(c => c.id === user?.collegeId);

  // Dynamic Availability Calculations for the Selected College & City
  const pyqCount = MOCK_PYQS.filter(p => p.collegeId === user?.collegeId).length;
  const roomCount = collegeObj ? MOCK_ROOMS.filter(r => r.city.toLowerCase() === collegeObj.city.toLowerCase()).length : 0;
  const roommateCount = MOCK_ROOMMATES.filter(rm => rm.collegeId === user?.collegeId).length;
  const seniorCount = MOCK_SENIORS.filter(s => s.collegeId === user?.collegeId).length;

  const dashboardFeatures = [
    { 
      title: 'PYQs & Study Hub', 
      link: '/pyq', 
      icon: BookOpen,
      count: pyqCount,
      type: 'pyqs'
    },
    { 
      title: 'Career Roadmaps', 
      link: '/roadmaps', 
      icon: Compass,
      count: CAREER_ROADMAPS.length,
      type: 'roadmaps'
    },
    { 
      title: 'Rooms & PGs', 
      link: '/rooms', 
      icon: Home,
      count: roomCount,
      type: 'rooms'
    },
    { 
      title: 'Find Roommates', 
      link: '/roommates', 
      icon: Users,
      count: roommateCount,
      type: 'roommates'
    },
    { 
      title: 'Alumni Network', 
      link: '/seniors', 
      icon: Briefcase,
      count: seniorCount,
      type: 'seniors'
    },
    { 
      title: 'City Guide', 
      link: '/events', 
      icon: MapPin,
      count: collegeObj ? 1 : 0,
      type: 'city'
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* College Info Header */}
      <div className="bg-black text-white border-2 border-black p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-400 block mb-1">
            Student Account Dashboard
          </span>
          <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">
            Welcome back, {user?.name || 'Student'}!
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Current College: <span className="text-white font-bold uppercase">{collegeObj ? `${collegeObj.name}, ${collegeObj.city}` : 'Not Selected'}</span>
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-4 py-2 shrink-0 w-fit text-xs font-bold uppercase text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-yellow-400" />
          <span>Back</span>
        </button>
      </div>

      <h2 className="text-lg font-bold mb-4 uppercase text-black">Your Campus Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dashboardFeatures.map((item) => {
          const isAvailable = item.count > 0;
          return (
            <Link
              key={item.title}
              to={item.link}
              className="bg-white border-2 border-black p-5 hover:bg-gray-50 transition-colors flex flex-col justify-between min-h-[140px] group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <item.icon className="w-5 h-5 text-black shrink-0" />
                    <h3 className="text-sm font-bold uppercase tracking-tight text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform shrink-0" />
                </div>

                {/* Subtitle / Description */}
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mb-3">
                  {item.type === 'pyqs' && 'Semester past papers'}
                  {item.type === 'rooms' && `Flats & PGs in ${collegeObj?.city || 'campus'}`}
                  {item.type === 'roommates' && 'Peer compatibility match'}
                  {item.type === 'guide' && 'College orientation guide'}
                  {item.type === 'seniors' && 'Seniors & job referrals'}
                  {item.type === 'city' && 'Mess, metro & local guides'}
                </p>
              </div>

              {/* Status Badge: Available or Not Available Soon */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                {isAvailable ? (
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 uppercase border border-emerald-200">
                    <span>Available ({item.count})</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 uppercase border border-amber-200">
                    <AlertCircle className="w-2.5 h-2.5 shrink-0" />
                    <span>Available Soon</span>
                  </div>
                )}
                <span className="text-[9px] font-bold text-black group-hover:underline uppercase">
                  Open →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
