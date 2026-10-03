import { useState, useMemo, useEffect } from 'react';
import { MapPin, Filter, Home, CheckCircle2 } from 'lucide-react';
import { MOCK_ROOMS, MOCK_COLLEGES } from '../data';
import { motion } from 'motion/react';
import { useSEO } from '../hooks/useSEO';
import { useSimulateLoading } from '../hooks/useSimulateLoading';
import { useUser } from '../contexts/UserContext';

export function Rooms() {
  useSEO({
    title: 'Student Housing & PGs | Yaha Khoj',
    description: 'Discover verified student rooms, PGs, and hostels near your college campus in Delhi and beyond. Zero brokerage housing solutions.',
  });

  const { user } = useUser();
  const isLoading = useSimulateLoading();
  const userCollege = MOCK_COLLEGES.find(c => c.id === user?.collegeId);
  
  const [filterCity, setFilterCity] = useState('all');

  // Set default city if user has a college
  useEffect(() => {
    if (userCollege?.city) {
      setFilterCity(userCollege.city.toLowerCase());
    }
  }, [userCollege]);

  const filteredRooms = useMemo(() => {
    return MOCK_ROOMS.filter(room => {
      // Strictly restrict rooms to the user's college city to enforce data containment
      if (userCollege && room.city.toLowerCase() !== userCollege.city.toLowerCase()) return false;
      if (filterCity !== 'all' && room.city.toLowerCase() !== filterCity.toLowerCase()) return false;
      return true;
    });
  }, [filterCity, userCollege]);

  // Extract unique cities from MOCK_ROOMS for the dropdown
  const uniqueCities = Array.from(new Set(MOCK_ROOMS.map(r => r.city)));

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black uppercase">Rooms & PGs</h1>
          <p className="text-black text-sm">Find your campus stay.</p>
        </div>
        <button 
          onClick={() => alert("Redirecting to property listing...")}
          className="px-5 py-2 bg-black text-white text-xs font-bold uppercase hover:bg-gray-800 transition-colors"
        >
          List property
        </button>
      </div>

      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        <select 
          className="px-4 py-2 bg-white border-2 border-black focus:outline-none text-xs font-bold uppercase cursor-pointer min-w-[120px]"
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
        >
          <option value="all">All Cities</option>
          {uniqueCities.map(city => (
            <option key={city} value={city.toLowerCase()}>{city}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white border-2 border-black overflow-hidden hover:bg-gray-50 transition-colors flex flex-col"
          >
            <div className="h-40 relative bg-gray-100 flex items-center justify-center border-b-2 border-black">
              <img 
                src={room.imageUrls[0]} 
                alt={room.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 flex gap-1.5">
                <span className="bg-black text-white text-[9px] font-bold px-2 py-0.5 uppercase">
                  {room.type}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-base text-black uppercase line-clamp-1">{room.title}</h3>
                <div className="text-right shrink-0">
                  <span className="text-lg font-bold text-black">₹{room.rent.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-gray-600 mb-4 font-bold uppercase">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{room.distanceFromCampus}km</span>
                </div>
                <span>•</span>
                <span>{room.genderPreference}</span>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mb-4">
                {room.amenities.map(amenity => (
                  <span key={amenity} className="text-[9px] font-bold px-1.5 py-0.5 bg-gray-100 border border-gray-300 text-gray-700 uppercase">
                    {amenity}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="text-[10px] font-bold text-black uppercase">{room.ownerName}</div>
                <button 
                  onClick={() => alert("Opening contact...")}
                  className="px-4 py-1.5 bg-black text-white text-[10px] font-bold uppercase hover:bg-gray-800 transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
