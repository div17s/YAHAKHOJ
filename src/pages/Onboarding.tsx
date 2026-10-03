import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { MOCK_COLLEGES, MOCK_DEPARTMENTS } from '../data';
import { ChevronRight, Building2, GraduationCap, Calendar, CheckCircle2 } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export function Onboarding() {
  useSEO({
    title: 'Complete Profile | Yaha Khoj',
    description: 'Complete your profile to customize your Yaha Khoj experience.',
  });

  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [step, setStep] = useState(1);
  const [collegeId, setCollegeId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    const pendingId = localStorage.getItem('pendingCollegeId');
    if (pendingId) {
      setCollegeId(pendingId);
      localStorage.removeItem('pendingCollegeId');
      setStep(2); // Automatically skip to step 2 if college was pre-selected
    }
  }, []);

  if (!user) {
    navigate('/auth');
    return null;
  }

  if (user.onboardingCompleted) {
    navigate('/');
    return null;
  }

  const [colleges, setColleges] = useState(MOCK_COLLEGES);
  const [departments, setDepartments] = useState(MOCK_DEPARTMENTS);
  const [showAddCollegeModal, setShowAddCollegeModal] = useState(false);
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);

  const AddCollegeModal = () => {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    return (
      <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
        <div className="bg-white border-2 border-black p-6 w-full max-w-md shadow-2xl">
          <h2 className="text-xl font-bold mb-4 uppercase">Add New College</h2>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="College Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full px-4 py-2 border border-black focus:outline-none" 
            />
            <input 
              type="text" 
              placeholder="City" 
              value={city} 
              onChange={(e) => setCity(e.target.value)} 
              className="w-full px-4 py-2 border border-black focus:outline-none" 
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button onClick={() => setShowAddCollegeModal(false)} className="px-4 py-2 font-bold uppercase text-xs">Cancel</button>
            <button onClick={() => {
                if (name && city) {
                  const newCollege = { id: Date.now().toString(), name, city };
                  setColleges([...colleges, newCollege]);
                  setCollegeId(newCollege.id);
                  setShowAddCollegeModal(false);
                } else {
                  alert("Please fill in all fields.");
                }
              }} className="px-4 py-2 bg-black text-white font-bold uppercase text-xs">Add College</button>
          </div>
        </div>
      </div>
    );
  };

  const AddDeptModal = () => {
    const [name, setName] = useState('');
    return (
      <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
        <div className="bg-white border-2 border-black p-6 w-full max-w-md shadow-2xl">
          <h2 className="text-xl font-bold mb-4 uppercase">Add New Department</h2>
          <div className="space-y-4">
            <input type="text" placeholder="Department Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border border-black focus:outline-none" />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button onClick={() => setShowAddDeptModal(false)} className="px-4 py-2 font-bold uppercase text-xs">Cancel</button>
            <button onClick={() => {
                if (name) {
                  const newDept = { id: Date.now().toString(), collegeId: collegeId, name };
                  setDepartments([...departments, newDept]);
                  setDepartmentId(newDept.id);
                  setShowAddDeptModal(false);
                } else {
                  alert("Please enter a department name.");
                }
              }} className="px-4 py-2 bg-black text-white font-bold uppercase text-xs">Add Department</button>
          </div>
        </div>
      </div>
    );
  };

  const handleComplete = () => {
    updateUser({
      name,
      collegeId,
      departmentId,
      year,
      semester,
      onboardingCompleted: true
    });
    localStorage.setItem('justOnboarded', 'true');
    sessionStorage.removeItem('hasSeenWelcomeAnimation');
    navigate('/');
  };

  const COMMON_DEPARTMENTS = [
    'B.Tech Computer Science', 'B.Tech ECE', 'B.Tech Mechanical', 'B.Tech Civil',
    'B.Sc Computer Science', 'B.Com', 'BBA', 'BCA', 'MCA', 'MBA', 'MBBS', 'BA'
  ];

  const selectedCollege = MOCK_COLLEGES.find(c => c.id === collegeId);
  const collegeDepts = departments.filter(d => d.collegeId === collegeId);
  
  // Combine college specific departments and common ones
  const availableDepartments = [
    ...collegeDepts,
    ...COMMON_DEPARTMENTS.filter(name => !collegeDepts.find(d => d.name === name)).map(name => ({ id: `common-${name}`, collegeId: collegeId, name }))
  ];
  
  const selectedDept = availableDepartments.find(d => d.id === departmentId);

  return (
    <div className="max-w-2xl mx-auto my-8">
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className={`flex-1 h-1 ${step >= i ? 'bg-black' : 'bg-gray-300'} mx-1`} />
          ))}
        </div>
        <p className="text-xs font-bold text-black text-center uppercase tracking-widest">
          Step {step} of 4
        </p>
      </div>

      <div className="bg-white border-2 border-black p-8">
        {step === 1 && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-black uppercase">Which college do you study at?</h1>
            <p className="text-black text-sm">Select your college to see PYQs, rooms, and roommates from your campus.</p>
            
            <div className="space-y-3">
              <select 
                value={collegeId} 
                onChange={e => setCollegeId(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-black focus:outline-none"
              >
                <option value="">Select your college...</option>
                {colleges.map(c => (
                  <option key={c.id} value={c.id}>{c.name}, {c.city}</option>
                ))}
              </select>
              <button 
                type="button"
                onClick={() => setShowAddCollegeModal(true)}
                className="w-full text-left text-sm text-black font-bold underline cursor-pointer"
              >
                Can't find your college? Add it
              </button>
              {showAddCollegeModal && <AddCollegeModal />}
            </div>

            <button 
              onClick={() => setStep(2)}
              disabled={!collegeId}
              className="w-full py-3 bg-black text-white font-bold uppercase hover:bg-gray-800 disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-black uppercase">What's your department?</h1>
            <p className="text-black text-sm">This helps us match you with relevant alumni and specific study materials.</p>
            
            <div className="space-y-3">
              <select 
                value={departmentId} 
                onChange={e => setDepartmentId(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-black focus:outline-none"
              >
                <option value="">Select your department/course...</option>
                {availableDepartments.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              <button 
                type="button"
                onClick={() => setShowAddDeptModal(true)}
                className="w-full text-left text-sm text-black font-bold underline cursor-pointer"
              >
                Add department
              </button>
              {showAddDeptModal && <AddDeptModal />}
            </div>

            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setStep(1)}
                className="w-1/3 py-3 bg-white border border-black text-black font-bold uppercase hover:bg-gray-100"
              >
                Back
              </button>
              <button 
                onClick={() => setStep(3)}
                disabled={!departmentId}
                className="flex-1 py-3 bg-black text-white font-bold uppercase hover:bg-gray-800 disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-black uppercase">Which year & semester?</h1>
            <p className="text-black text-sm">We'll show you syllabus and notes specific to your current semester.</p>
            
            <div className="grid grid-cols-2 gap-4">
              <select 
                value={year} 
                onChange={e => setYear(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-black focus:outline-none"
              >
                <option value="">Year...</option>
                {[1, 2, 3, 4, 5].map(y => (
                  <option key={y} value={y}>{y}st Year</option>
                ))}
              </select>
              
              <select 
                value={semester} 
                onChange={e => setSemester(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-black focus:outline-none"
              >
                <option value="">Semester...</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(s => (
                  <option key={s} value={s}>Sem {s}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setStep(2)}
                className="w-1/3 py-3 bg-white border border-black text-black font-bold uppercase hover:bg-gray-100"
              >
                Back
              </button>
              <button 
                onClick={() => setStep(4)}
                disabled={!year || !semester}
                className="flex-1 py-3 bg-black text-white font-bold uppercase hover:bg-gray-800 disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 text-center">
            <h1 className="text-2xl font-bold text-black uppercase">You're all set!</h1>
            <p className="text-black text-sm max-w-sm mx-auto">Your Yaha Khoj experience is now personalized for your college.</p>
            
            <div className="bg-white border-2 border-black p-6 text-left my-8">
              <h3 className="font-bold text-black mb-4 uppercase border-b border-black pb-2">Profile Summary</h3>
              <div className="space-y-3 text-sm text-black">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Name</span>
                  {isEditingName ? (
                    <input 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => setIsEditingName(false)}
                      className="font-bold text-right bg-white border-b border-black"
                      autoFocus
                    />
                  ) : (
                    <span className="font-bold cursor-pointer underline" onClick={() => setIsEditingName(true)}>{name} (Edit)</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">College</span>
                  <span className="font-bold text-right">{selectedCollege?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Department</span>
                  <span className="font-bold text-right">{selectedDept?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Academic</span>
                  <span className="font-bold">Year {year}, Sem {semester}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setStep(3)}
                className="w-1/3 py-3 bg-white border border-black text-black font-bold uppercase hover:bg-gray-100"
              >
                Back
              </button>
              <button 
                onClick={handleComplete}
                className="flex-1 py-3 bg-black text-white font-bold uppercase hover:bg-gray-800"
              >
                Enter Yaha Khoj
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
