import { useState, useMemo } from 'react';
import { Users, Filter, MessageSquare, Percent, ShieldAlert } from 'lucide-react';
import { MOCK_ROOMMATES } from '../data';
import { motion } from 'motion/react';
import { useSEO } from '../hooks/useSEO';
import { useSimulateLoading } from '../hooks/useSimulateLoading';
import { useUser } from '../contexts/UserContext';

export function Roommates() {
  useSEO({
    title: 'Find College Roommates | Yaha Khoj',
    description: 'Connect with compatible roommates from your university and department. Match by budget, habits, and lifestyle on Yaha Khoj.',
  });

  const { user } = useUser();
  const isLoading = useSimulateLoading();

  const filteredRoommates = useMemo(() => {
    let roommates = MOCK_ROOMMATES;
    if (user?.collegeId) {
      roommates = roommates.filter(r => r.collegeId === user.collegeId);
      
      // Calculate dynamic compatibility boost if same department
      roommates = roommates.map(r => ({
        ...r,
        compatibility: r.departmentId === user.departmentId 
          ? Math.min(100, (r.compatibility || 0) + 15) 
          : r.compatibility
      }));
      
      // Sort by compatibility desc
      roommates.sort((a, b) => (b.compatibility || 0) - (a.compatibility || 0));
    }
    return roommates;
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black uppercase">Find Roommates</h1>
          <p className="text-black text-sm">Connect with compatible peers.</p>
        </div>
        <button 
          onClick={() => alert("Redirecting to profile...")}
          className="px-5 py-2 bg-black text-white text-xs font-bold uppercase hover:bg-gray-800 transition-colors"
        >
          Create Profile
        </button>
      </div>

      <div className="bg-black text-white p-4 mb-8 border-2 border-black">
        <h3 className="font-bold text-sm uppercase mb-1">Compatibility Matching</h3>
        <p className="text-xs">Scores based on college, department, and habits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRoommates.map((profile) => (
          <div
            key={profile.id}
            className="bg-white border-2 border-black p-5 flex flex-col hover:bg-gray-50 transition-colors relative"
          >
            <div className="absolute top-2 right-2 bg-black text-white text-[10px] font-bold px-2 py-0.5 uppercase">
              {profile.compatibility}% Match
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 border-2 border-black flex items-center justify-center text-black font-bold text-lg bg-gray-50">
                {profile.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-base text-black uppercase">{profile.name}</h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase line-clamp-1">{profile.department}</p>
              </div>
            </div>
            
            <p className="text-xs text-gray-700 mb-4 line-clamp-2 italic font-medium">"{profile.bio}"</p>
            
            <div className="bg-gray-50 border border-black p-3 mb-4 space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase">
                <span className="text-gray-500">Budget</span>
                <span className="text-black">₹{profile.budget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold uppercase">
                <span className="text-gray-500">Sleep</span>
                <span className="text-black">{profile.lifestyle.sleep.replace('_', ' ')}</span>
              </div>
            </div>
            
            <button 
              onClick={() => alert(`Request sent!`)}
              className="w-full py-2 bg-black text-white text-[10px] font-bold uppercase hover:bg-gray-800 transition-colors"
            >
              Request to Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
