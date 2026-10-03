import { useState } from 'react';
import { User, Mail, GraduationCap } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { MOCK_COLLEGES, MOCK_DEPARTMENTS } from '../data';
import { useSEO } from '../hooks/useSEO';

export function Profile() {
  useSEO({
    title: 'Edit Profile | Yaha Khoj',
    description: 'Manage your Yaha Khoj account details and preferences.',
  });

  const { user, updateUser } = useUser();
  const [name, setName] = useState(user?.name || '');
  const [departmentId, setDepartmentId] = useState(user?.departmentId || '');
  const [year, setYear] = useState(user?.year || '');
  const [semester, setSemester] = useState(user?.semester || '');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const userCollege = MOCK_COLLEGES.find(c => c.id === user?.collegeId);
  const availableDepartments = MOCK_DEPARTMENTS.filter(d => d.collegeId === user?.collegeId);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      updateUser({
        name,
        departmentId,
        year,
        semester
      });
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-ink-900 mb-2">Edit Profile</h1>
        <p className="text-ink-600">Update your personal details and academic info.</p>
      </div>

      <div className="bg-surface/40 backdrop-blur-xl border border-ink-900/5 rounded-3xl p-6 md:p-8 space-y-8">
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-ink-900 flex items-center gap-2">
            <User className="w-5 h-5 text-brand-600" />
            Personal Details
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-ink-900/10 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-2.5 pl-10 rounded-xl border border-ink-900/5 bg-ink-900/5 text-ink-500 cursor-not-allowed"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
              </div>
              <p className="text-xs text-ink-500 mt-1.5">Email address cannot be changed.</p>
            </div>
          </div>
        </div>

        <hr className="border-ink-900/5" />

        {/* Academic Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-ink-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-brand-600" />
            Academic Details
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">College / University</label>
              <div className="w-full px-4 py-2.5 rounded-xl border border-ink-900/5 bg-ink-900/5 text-ink-600 font-medium">
                {userCollege?.name || 'Not selected'}
              </div>
              <p className="text-xs text-ink-500 mt-1.5">College cannot be changed after onboarding.</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">Department</label>
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-ink-900/10 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all appearance-none bg-surface/40 backdrop-blur-xl"
              >
                <option value="" disabled>Select your department</option>
                {availableDepartments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-ink-900/10 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all appearance-none bg-surface/40 backdrop-blur-xl"
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                  <option value="5">5th Year</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">Semester</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-ink-900/10 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all appearance-none bg-surface/40 backdrop-blur-xl"
                >
                  <option value="">Select Semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(sem => (
                    <option key={sem} value={String(sem)}>Semester {sem}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4">
          <button
            onClick={handleSave}
            disabled={isSaving || !name.trim() || !departmentId}
            className="flex-1 md:flex-none px-8 py-3 bg-brand-500 text-surface font-medium rounded-xl hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-surface/30 border-t-surface rounded-full animate-spin" />
            ) : (
              'Save Changes'
            )}
          </button>
          
          {showSuccess && (
            <span className="text-sm font-medium text-emerald-600 flex items-center gap-1.5 animate-in fade-in slide-in-from-left-2 duration-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Saved successfully
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
