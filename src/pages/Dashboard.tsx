import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Home, Users, Briefcase, GraduationCap, MapPin, ArrowRight } from 'lucide-react';

export function Dashboard() {
  const dashboardFeatures = [
    { title: 'PYQs & Material', link: '/pyq', icon: BookOpen },
    { title: 'Rooms & PGs', link: '/rooms', icon: Home },
    { title: 'Find Roommates', link: '/roommates', icon: Users },
    { title: 'College Guide', link: '/onboarding', icon: GraduationCap },
    { title: 'Alumni Network', link: '/seniors', icon: Briefcase },
    { title: 'City Guide', link: '/events', icon: MapPin },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 uppercase border-b-2 border-black pb-3">Your Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dashboardFeatures.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className="bg-white border-2 border-black p-5 hover:bg-gray-50 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-6 h-6 text-black" />
              <h2 className="text-base font-bold uppercase tracking-tight">{item.title}</h2>
            </div>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>
    </div>
  );
}
