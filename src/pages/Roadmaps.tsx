import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ExternalLink, 
  MapPin, 
  Code, 
  Server, 
  Layers, 
  Smartphone, 
  Cloud, 
  Terminal, 
  Cpu, 
  BarChart3, 
  Briefcase, 
  Shield, 
  Palette,
  Compass,
  CheckCircle2,
  Clock,
  Zap
} from 'lucide-react';
import { CAREER_ROADMAPS, RoadmapItem } from '../data/roadmaps';
import { useSEO } from '../hooks/useSEO';
import { useSimulateLoading } from '../hooks/useSimulateLoading';

export function Roadmaps() {
  useSEO({
    title: 'Career & Tech Skill Roadmaps | Yaha Khoj',
    description: 'Step-by-step career learning paths and skill roadmaps for Web Development, App Dev, Cloud, AI/ML, Data Analyst, and Business Analyst.',
  });

  const isLoading = useSimulateLoading();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Web Dev', 'App Dev', 'Cloud & DevOps', 'AI & ML', 'Data Analytics', 'Business & Product', 'Security & Testing'];

  const filteredRoadmaps = useMemo(() => {
    return CAREER_ROADMAPS.filter(item => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.keyMilestones.some(m => m.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenRoadmap = (item: RoadmapItem) => {
    window.open(item.redirectUrl, '_blank', 'noopener,noreferrer');
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return Code;
      case 'Server': return Server;
      case 'Layers': return Layers;
      case 'Smartphone': return Smartphone;
      case 'Cloud': return Cloud;
      case 'Terminal': return Terminal;
      case 'Cpu': return Cpu;
      case 'BarChart3': return BarChart3;
      case 'Briefcase': return Briefcase;
      case 'Shield': return Shield;
      case 'Palette': return Palette;
      default: return Compass;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="bg-black text-white border-2 border-black p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-400 block mb-1">
            Career Learning Paths
          </span>
          <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight flex items-center gap-2">
            <Compass className="w-6 h-6 text-yellow-400 shrink-0" />
            <span>Developer & Career Roadmaps</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Step-by-step skill guides and official PDF learning trees for top tech and business roles.
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-700 px-4 py-2 shrink-0 w-fit">
          <span className="text-[11px] font-bold uppercase text-emerald-400 block">
            100% Free & Verified Paths
          </span>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white border-2 border-black p-4 mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
          <input 
            type="text"
            placeholder="Search role e.g. Fullstack, Data Analyst, App Dev, AI..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-black text-xs font-bold uppercase focus:outline-none focus:bg-white"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-bold uppercase whitespace-nowrap transition-all border-2 border-black cursor-pointer ${
              selectedCategory === cat 
                ? 'bg-black text-white' 
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Roadmaps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-full py-16 text-center font-bold text-xs uppercase text-slate-500">
            Loading Career Roadmaps & Visual Guides...
          </div>
        ) : filteredRoadmaps.length === 0 ? (
          <div className="col-span-full bg-white border-2 border-black p-8 text-center my-6">
            <h3 className="font-bold text-lg uppercase text-black mb-2">FILE NOT FOUND</h3>
            <p className="text-sm text-gray-600 max-w-sm mx-auto font-medium">
              No roadmaps match your search. Try searching for "Frontend", "Data Analyst" or "Cloud".
            </p>
          </div>
        ) : (
          filteredRoadmaps.map((item) => {
            const IconComponent = getIcon(item.iconName);
            return (
              <div 
                key={item.id}
                className="bg-white border-2 border-black p-6 flex flex-col justify-between hover:bg-gray-50 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-black text-white border border-black">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase text-gray-500 block leading-none">
                          {item.category}
                        </span>
                        <span className="text-[11px] font-extrabold text-black uppercase">
                          {item.level} Level
                        </span>
                      </div>
                    </div>
                    {item.popular && (
                      <span className="bg-black text-white text-[9px] font-extrabold px-2 py-0.5 border border-black uppercase flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-400" /> Popular
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-lg text-black uppercase mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-700 font-medium leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center gap-1.5 text-xs text-black font-bold uppercase mb-4 bg-gray-100 p-2 border border-gray-300 w-fit">
                    <Clock className="w-3.5 h-3.5 text-black" />
                    <span>Estimated Path: {item.duration}</span>
                  </div>

                  {/* Key Milestones */}
                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-black uppercase tracking-wider block mb-2">
                      Key Skills & Learning Steps:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.keyMilestones.map((skill, idx) => (
                        <span 
                          key={skill}
                          className="text-[9px] font-bold px-2 py-0.5 bg-white border border-black text-black uppercase flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">
                    Interactive Tree & PDF
                  </span>
                  <button
                    onClick={() => handleOpenRoadmap(item)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                  >
                    <span>Open Exact Roadmap ↗</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
