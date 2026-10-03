import { useState } from 'react';
import { ShieldAlert, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export function Admin() {
  const [activeTab, setActiveTab] = useState<'uploads' | 'reports'>('uploads');

  const pendingUploads = [
    { id: 1, title: 'Operating Systems Mid-term 2024', user: 'Rahul K.', type: 'PYQ', date: '2 hours ago' },
    { id: 2, title: 'Fake Notes Spam', user: 'Unknown', type: 'Notes', date: '5 hours ago' },
  ];

  const pendingReports = [
    { id: 1, target: 'Spacious Single Room', reason: 'Fake listing, owner asking for advance without showing', reporter: 'Sneha P.', date: '1 day ago' },
    { id: 2, target: 'User: Rohan Desai', reason: 'Inappropriate messages in roommate chat', reporter: 'Anonymous', date: '2 days ago' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink-900 mb-2 flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-brand-500" />
            Moderation Dashboard
          </h1>
          <p className="text-ink-600">Review pending uploads and community reports to keep Yaha Khoj safe.</p>
        </div>
      </div>

      <div className="flex gap-4 mb-8 border-b border-ink-900/10">
        <button 
          onClick={() => setActiveTab('uploads')}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${activeTab === 'uploads' ? 'text-brand-600' : 'text-ink-500 hover:text-ink-900'}`}
        >
          Pending Uploads ({pendingUploads.length})
          {activeTab === 'uploads' && (
            <motion.div layoutId="admin-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-t-full" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab('reports')}
          className={`pb-4 px-2 text-sm font-medium transition-colors relative ${activeTab === 'reports' ? 'text-brand-600' : 'text-ink-500 hover:text-ink-900'}`}
        >
          Active Reports ({pendingReports.length})
          {activeTab === 'reports' && (
            <motion.div layoutId="admin-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-t-full" />
          )}
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === 'uploads' && pendingUploads.map((item, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
            key={item.id}
            className="bg-surface/40 backdrop-blur-xl border border-ink-900/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-sm transition-shadow"
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full">{item.type}</span>
                <span className="text-xs text-ink-500">{item.date}</span>
              </div>
              <h3 className="font-bold text-ink-900 text-lg">{item.title}</h3>
              <p className="text-sm text-ink-600">Uploaded by <span className="font-medium text-ink-900">{item.user}</span></p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
              <button className="flex-1 md:flex-none px-4 py-2 bg-paper border border-ink-900/10 text-ink-900 text-sm font-medium rounded-xl hover:bg-ink-900/5 transition-colors">
                Preview PDF
              </button>
              <button className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-colors tooltip-trigger" title="Approve">
                <CheckCircle className="w-5 h-5" />
              </button>
              <button className="p-2 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors tooltip-trigger" title="Reject & Delete">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}

        {activeTab === 'reports' && pendingReports.map((report, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.05 }}
            key={report.id}
            className="bg-surface/40 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start gap-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">High Priority Report</span>
                <span className="text-xs text-ink-500 ml-2">{report.date}</span>
              </div>
              <h3 className="font-bold text-ink-900 text-lg mb-1">Target: {report.target}</h3>
              <p className="text-sm text-ink-800 bg-red-500/10 p-3 rounded-xl mb-3 border border-red-500/20">
                "{report.reason}"
              </p>
              <p className="text-xs text-ink-500">Reported by <span className="font-medium text-ink-700">{report.reporter}</span></p>
            </div>
            
            <div className="flex flex-col gap-2 w-full md:w-48 shrink-0 mt-2 md:mt-0">
              <button className="w-full px-4 py-2 bg-ink-900 text-surface text-sm font-medium rounded-xl hover:bg-ink-800 transition-colors">
                Investigate
              </button>
              <button className="w-full px-4 py-2 bg-red-500/10 text-red-400 text-sm font-medium rounded-xl hover:bg-red-500/20 transition-colors">
                Suspend Target
              </button>
              <button className="w-full px-4 py-2 bg-paper border border-ink-900/10 text-ink-600 text-sm font-medium rounded-xl hover:bg-ink-900/5 transition-colors">
                Dismiss Report
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
