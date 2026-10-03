import { useMemo } from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { useSEO } from '../hooks/useSEO';
import { useSimulateLoading } from '../hooks/useSimulateLoading';
import { useUser } from '../contexts/UserContext';

const MOCK_EVENTS = [
  {
    id: 'e1',
    collegeId: 'c1',
    title: 'TechX 2024 - Annual Tech Fest',
    type: 'fest',
    date: 'Oct 15 - Oct 17',
    time: '09:00 AM onwards',
    location: 'Main Campus Ground',
    attendees: 1250,
    tags: ['Technology', 'Hackathon', 'Coding'],
    image: 'bg-brand-500'
  },
  {
    id: 'e2',
    collegeId: 'c1',
    title: 'Resume Review Workshop',
    type: 'workshop',
    date: 'Oct 20',
    time: '04:00 PM',
    location: 'Seminar Hall B',
    attendees: 120,
    tags: ['Career', 'Placements'],
    image: 'bg-blue-500'
  },
  {
    id: 'e3',
    collegeId: 'c2',
    title: 'Cultural Night: Symphony',
    type: 'cultural',
    date: 'Nov 05',
    time: '06:00 PM',
    location: 'Open Air Theatre',
    attendees: 3000,
    tags: ['Music', 'Dance', 'Fun'],
    image: 'bg-purple-500'
  }
];

export function Events() {
  useSEO({
    title: 'Campus Events & Fests | Yaha Khoj',
    description: 'Stay updated with upcoming college fests, workshops, and campus events.',
  });

  const { user } = useUser();
  const isLoading = useSimulateLoading();

  const sortedEvents = useMemo(() => {
    let events = [...MOCK_EVENTS];
    
    if (user?.collegeId) {
      events.sort((a, b) => {
        if (a.collegeId === user.collegeId && b.collegeId !== user.collegeId) return -1;
        if (a.collegeId !== user.collegeId && b.collegeId === user.collegeId) return 1;
        return 0;
      });
    }
    
    return events;
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink-900 mb-2">Events & Fests</h1>
          <p className="text-ink-600">Discover upcoming campus events, fests, and workshops.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-surface/40 backdrop-blur-xl border border-ink-900/5 rounded-3xl overflow-hidden animate-pulse">
              <div className="h-40 bg-ink-900/10 w-full" />
              <div className="p-6">
                <div className="w-1/3 h-4 rounded-full bg-ink-900/10 mb-4" />
                <div className="w-3/4 h-6 rounded-md bg-ink-900/10 mb-4" />
                <div className="space-y-3 mb-6">
                  <div className="w-2/3 h-4 rounded bg-ink-900/10" />
                  <div className="w-1/2 h-4 rounded bg-ink-900/10" />
                </div>
                <div className="w-full h-10 rounded-full bg-ink-900/10" />
              </div>
            </div>
          ))}
        </div>
      ) : sortedEvents.length === 0 ? (
        <div className="text-center py-16 bg-surface/40 backdrop-blur-xl border border-ink-900/5 rounded-3xl">
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-32 h-32"
            >
              <div className="absolute inset-0 bg-orange-500/20 rounded-full flex items-center justify-center">
                <Calendar className="w-12 h-12 text-orange-500" />
              </div>
            </motion.div>
          </div>
          <h3 className="font-display text-xl font-bold text-ink-900 mb-2">No events found</h3>
          <p className="text-ink-600 max-w-sm mx-auto mb-6">There are no upcoming events scheduled at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedEvents.map((event, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              key={event.id}
              className="bg-surface/40 backdrop-blur-xl border border-ink-900/5 rounded-3xl overflow-hidden hover:border-brand-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group relative"
            >
              {event.collegeId === user?.collegeId && (
                <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur text-brand-600 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full z-10 shadow-sm">
                  At Your College
                </div>
              )}
              
              <div className={`h-32 ${event.image} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-between items-end">
                    <div className="bg-surface/40 backdrop-blur-xl text-ink-900 px-3 py-1.5 rounded-xl text-center shadow-sm">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-brand-600">
                        {event.date.split(' ')[0]}
                      </div>
                      <div className="text-xl font-display font-bold leading-none mt-1">
                        {event.date.split(' ')[1]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-ink-900/5 text-ink-600">
                    {event.type}
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-xl text-ink-900 mb-4 line-clamp-2 group-hover:text-brand-600 transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-ink-600">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-ink-600">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-ink-600">
                    <Users className="w-4 h-4 shrink-0" />
                    <span>{event.attendees}+ attending</span>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {event.tags.map(tag => (
                      <span key={tag} className="text-[11px] font-medium px-2 py-1 bg-paper text-ink-600 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    onClick={() => alert(`RSVP for ${event.title}...`)}
                    className="w-full py-2.5 bg-brand-500/10 text-brand-700 font-medium rounded-xl hover:bg-brand-500/20 transition-colors"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
