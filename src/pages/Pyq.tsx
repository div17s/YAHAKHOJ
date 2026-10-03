import { useState, useMemo } from 'react';
import { Search, Filter, Download, Star, FileText, Upload, GraduationCap, X, ExternalLink } from 'lucide-react';
import { MOCK_PYQS, MOCK_DEPARTMENTS, MOCK_COLLEGES } from '../data';
import { motion } from 'motion/react';
import { useSEO } from '../hooks/useSEO';
import { useSimulateLoading } from '../hooks/useSimulateLoading';
import { useUser } from '../contexts/UserContext';

export function Pyq() {
  useSEO({
    title: 'University PYQs & Notes | Yaha Khoj',
    description: 'Download semester-wise previous year question papers, handwritten lecture notes, and subject syllabus. Curated resources for your university journey.',
  });

  const { user } = useUser();
  const isLoading = useSimulateLoading();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedCollege, setSelectedCollege] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showGlobal, setShowGlobal] = useState(false);
  const [downloadTracker, setDownloadTracker] = useState<Record<string, number>>({});

  const handleDownload = (docId: string, url?: string, title?: string) => {
    setDownloadTracker(prev => ({
      ...prev,
      [docId]: (prev[docId] || 0) + 1
    }));
    const targetUrl = url || `https://www.google.com/search?q=${encodeURIComponent((title || '') + ' PDF download official university')}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const userCollege = MOCK_COLLEGES.find(c => c.id === user?.collegeId);
  const userDepartment = MOCK_DEPARTMENTS.find(d => d.id === user?.departmentId);

  const filteredDocs = useMemo(() => {
    let docs = MOCK_PYQS;
    
    // Strict college filtering: LNCT shows ONLY LNCT, TIT shows ONLY TIT
    if (selectedCollege !== 'all') {
      docs = docs.filter(doc => doc.collegeId === selectedCollege);
    } else if (user?.collegeId && !showGlobal) {
      docs = docs.filter(doc => doc.collegeId === user.collegeId);
    }

    if (selectedCourse !== 'all') {
      docs = docs.filter(doc => doc.departmentId === selectedCourse);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      docs = docs.filter(doc => 
        doc.title.toLowerCase().includes(q) || 
        doc.subject.toLowerCase().includes(q) ||
        doc.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    
    return docs;
  }, [user?.collegeId, showGlobal, selectedCollege, selectedCourse, searchQuery]);

  // If showing global, show all departments. If scoped, show only college departments.
  const availableCourses = (user?.collegeId && !showGlobal) 
    ? MOCK_DEPARTMENTS.filter(d => d.collegeId === user.collegeId)
    : MOCK_DEPARTMENTS;

  return (
    <div className="max-w-5xl mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black uppercase">Study Resources</h1>
          <p className="text-black text-sm">Semester-wise PYQs, notes, and syllabus.</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="px-6 py-2 bg-black text-white font-bold uppercase text-xs hover:bg-gray-800 transition-colors"
        >
          Upload Document
        </button>
      </div>

      {user?.collegeId && (
        <div className="mb-6 flex items-center justify-between bg-white border-2 border-black p-4">
          <div className="flex items-center gap-2 text-black">
            <GraduationCap className="w-5 h-5" />
            <span className="font-bold text-sm uppercase">
              {showGlobal ? 'Showing all colleges' : `Showing results for ${userCollege?.name}`}
            </span>
          </div>
          <button 
            onClick={() => setShowGlobal(!showGlobal)}
            className="text-xs font-bold uppercase underline text-black hover:text-gray-600 transition-colors"
          >
            {showGlobal ? 'Scope to my college' : 'Browse other colleges'}
          </button>
        </div>
      )}

      <div className="bg-white p-4 border-2 border-black mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
          <input 
            type="text" 
            placeholder="Search subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-black focus:outline-none text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select 
            className="px-4 py-2 bg-white border border-black focus:outline-none text-xs font-bold uppercase cursor-pointer"
            value={selectedCollege}
            onChange={(e) => {
              setSelectedCollege(e.target.value);
              if (e.target.value !== 'all') {
                setShowGlobal(true);
              }
            }}
          >
            <option value="all">
              {userCollege && !showGlobal ? `My College (${userCollege.name})` : 'All Colleges'}
            </option>
            {MOCK_COLLEGES.map(col => (
              <option key={col.id} value={col.id}>{col.name}</option>
            ))}
          </select>
          <select 
            className="px-4 py-2 bg-white border border-black focus:outline-none text-xs font-bold uppercase cursor-pointer"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="all">All Courses</option>
            {availableCourses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.length === 0 ? (
          <div className="col-span-full bg-white border-2 border-black p-8 text-center my-6">
            <h3 className="font-bold text-lg uppercase text-black mb-2">FILE NOT FOUND</h3>
            <p className="text-sm text-gray-600 max-w-sm mx-auto font-medium">
              Study material for this college is currently not listed. New papers are being uploaded daily!
            </p>
          </div>
        ) : (
          filteredDocs.map((doc) => {
            const matchedCollege = MOCK_COLLEGES.find(c => c.id === doc.collegeId);
            return (
              <div
                key={doc.id}
                className="bg-white border-2 border-black p-5 flex flex-col justify-between hover:bg-gray-50 transition-colors"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2 border border-black bg-white text-black">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="bg-black text-white px-2 py-1 text-[10px] font-bold">
                      {doc.rating} ★
                    </div>
                  </div>
                
                  <div className="mb-3">
                    <span className="text-[10px] font-bold uppercase text-gray-500">{doc.subject}</span>
                    <h3 className="font-bold text-base text-black mt-1 line-clamp-2 uppercase">{doc.title}</h3>
                    {matchedCollege && (
                      <span className="text-[10px] font-bold text-slate-700 uppercase block mt-1">
                        🏛️ {matchedCollege.name}
                      </span>
                    )}
                  </div>
                
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {doc.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-bold px-2 py-0.5 bg-gray-100 border border-gray-300 text-gray-700 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-[10px] text-gray-600">
                    By <span className="font-bold text-black uppercase">{doc.authorName}</span>
                  </div>
                  <button 
                    onClick={() => handleDownload(doc.id, doc.downloadUrl, doc.title)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase rounded-none transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                    title="Open Exact Paper / PDF Page"
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    <span>Open Paper / PDF ({doc.downloadCount + (downloadTracker[doc.id] || 0)})</span>
                    <ExternalLink className="w-3 h-3 ml-0.5 shrink-0" />
                  </button>
                </div>
              </div>
            );
          }))}
      </div>

      {/* Upload Modal (Mock) */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface/40 backdrop-blur-xl rounded-3xl w-full max-w-lg p-6 shadow-xl"
          >
            <h2 className="font-display text-2xl font-bold text-ink-900 mb-2">Upload Document</h2>
            <p className="text-ink-600 text-sm mb-6">Share your notes or previous year papers with the community.</p>
            
            <div className="border-2 border-dashed border-ink-900/20 rounded-2xl p-8 text-center mb-6 bg-paper/50 hover:bg-paper transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-ink-400 mx-auto mb-3" />
              <p className="font-medium text-ink-900 text-sm">Click to upload or drag and drop</p>
              <p className="text-xs text-ink-500 mt-1">PDF, DOCX up to 10MB</p>
            </div>

            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => setShowUploadModal(false)}
                className="px-5 py-2.5 text-ink-600 font-medium text-sm hover:text-ink-900 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert("Upload submitted for moderation!");
                  setShowUploadModal(false);
                }}
                className="px-5 py-2.5 bg-brand-500 text-surface font-medium text-sm rounded-xl hover:bg-brand-600 transition-colors"
              >
                Submit
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
