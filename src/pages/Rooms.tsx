import { useState, useMemo, useEffect } from 'react';
import { MapPin, ExternalLink, Building2 } from 'lucide-react';
import { MOCK_ROOMS, MOCK_COLLEGES } from '../data';
import { RoomListing } from '../types';
import { useSEO } from '../hooks/useSEO';
import { useSimulateLoading } from '../hooks/useSimulateLoading';
import { useUser } from '../contexts/UserContext';

export function Rooms() {
  useSEO({
    title: 'Student Housing & PGs | Yaha Khoj',
    description: 'Discover verified student rooms, PGs, and hostels near your college campus across India.',
  });

  const { user } = useUser();
  const isLoading = useSimulateLoading();
  const userCollege = MOCK_COLLEGES.find(c => c.id === user?.collegeId);
  
  const [filterCity, setFilterCity] = useState('all');
  const [filterCollege, setFilterCollege] = useState('all');

  // Set default filters if user has a college selected
  useEffect(() => {
    if (userCollege?.id) {
      setFilterCollege(userCollege.id);
    }
  }, [userCollege]);

  const filteredRooms = useMemo(() => {
    return MOCK_ROOMS.filter(room => {
      if (filterCollege !== 'all') {
        const selCollege = MOCK_COLLEGES.find(c => c.id === filterCollege);
        const matchesCollege = room.collegeId === filterCollege;
        const matchesCityOfCollege = selCollege && room.city.toLowerCase() === selCollege.city.toLowerCase();
        if (!matchesCollege && !matchesCityOfCollege) return false;
      }
      if (filterCity !== 'all' && room.city.toLowerCase() !== filterCity.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [filterCity, filterCollege]);

  // Extract unique cities from MOCK_ROOMS
  const uniqueCities = Array.from(new Set(MOCK_ROOMS.map(r => r.city)));

  const handleRedirect = (room: RoomListing) => {
    const targetUrl = room.redirectUrl || `https://www.google.com/search?q=${encodeURIComponent(room.title + ' ' + room.city + ' student PG room booking')}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black uppercase">Rooms & PGs</h1>
          <p className="text-black text-sm">Find verified campus stays near your university.</p>
        </div>
        <button 
          onClick={() => window.open('https://www.nobroker.in/', '_blank', 'noopener,noreferrer')}
          className="px-5 py-2 bg-black text-white text-xs font-bold uppercase hover:bg-gray-800 transition-colors flex items-center gap-1.5"
        >
          <span>List property</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <select 
          className="px-4 py-2 bg-white border-2 border-black focus:outline-none text-xs font-bold uppercase cursor-pointer min-w-[160px]"
          value={filterCollege}
          onChange={(e) => {
            setFilterCollege(e.target.value);
            if (e.target.value !== 'all') {
              const selectedCol = MOCK_COLLEGES.find(c => c.id === e.target.value);
              if (selectedCol) setFilterCity(selectedCol.city.toLowerCase());
            }
          }}
        >
          <option value="all">All Colleges (25 Campus)</option>
          {MOCK_COLLEGES.map(col => (
            <option key={col.id} value={col.id}>{col.name}</option>
          ))}
        </select>

        <select 
          className="px-4 py-2 bg-white border-2 border-black focus:outline-none text-xs font-bold uppercase cursor-pointer min-w-[140px]"
          value={filterCity}
          onChange={(e) => {
            setFilterCity(e.target.value);
            if (e.target.value === 'all') setFilterCollege('all');
          }}
        >
          <option value="all">All Cities</option>
          {uniqueCities.map(city => (
            <option key={city} value={city.toLowerCase()}>{city}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading ? (
          <div className="col-span-full py-12 text-center font-bold text-xs uppercase text-slate-500">
            Searching Verified Campus Accommodations...
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="col-span-full bg-white border-2 border-black p-8 text-center my-6">
            <h3 className="font-bold text-lg uppercase text-black mb-2">FILE NOT FOUND</h3>
            <p className="text-sm text-gray-600 max-w-sm mx-auto font-medium">
              Rooms & PGs near this campus/city are currently not listed. Listings will be added soon!
            </p>
          </div>
        ) : (
          filteredRooms.map((room) => {
            const matchedCollege = MOCK_COLLEGES.find(c => c.id === room.collegeId);
            return (
              <div
                key={room.id}
                className="bg-white border-2 border-black overflow-hidden hover:bg-gray-50 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 relative bg-gray-100 flex items-center justify-center border-b-2 border-black">
                    <img 
                      src={room.imageUrls[0]} 
                      alt={room.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 flex gap-1.5">
                      <span className="bg-black text-white text-[9px] font-bold px-2 py-0.5 uppercase">
                        {room.type}
                      </span>
                      {room.verified && (
                        <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 uppercase">
                          Verified Stay
                        </span>
                      )}
                    </div>
                  </div>
                
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1.5">
                      <h3 className="font-bold text-sm sm:text-base text-black uppercase line-clamp-1">{room.title}</h3>
                      <div className="text-right shrink-0">
                        <span className="text-base sm:text-lg font-bold text-black">₹{room.rent.toLocaleString()}</span>
                        <span className="text-[10px] text-gray-500 block">/month</span>
                      </div>
                    </div>

                    {matchedCollege && (
                      <div className="text-[11px] font-bold text-slate-700 uppercase mb-2 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate">{matchedCollege.name}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 text-xs text-gray-600 mb-3 font-bold uppercase">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{room.distanceFromCampus}km to campus</span>
                      </div>
                      <span>•</span>
                      <span>{room.city}</span>
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
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="text-[10px] font-bold text-black uppercase">{room.ownerName}</div>
                    <button 
                      onClick={() => handleRedirect(room)}
                      className="px-4 py-2 bg-black text-white text-[10px] font-bold uppercase hover:bg-gray-800 transition-colors flex items-center gap-1.5"
                    >
                      <span>Direct Redirect / Book</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
