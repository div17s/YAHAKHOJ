import React, { useState } from 'react';
import { HelpCircle, MessageCircle, FileQuestion, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useSEO } from '../hooks/useSEO';

export function Support() {
  useSEO({
    title: 'Help & Support | Yaha Khoj',
    description: 'Get help with Yaha Khoj. Read FAQs, start a live chat, or submit a support ticket.',
  });

  const faqs = [
    {
      q: "How does roommate matching work?",
      a: "We use a compatibility algorithm based on your lifestyle choices (sleep schedule, cleanliness, diet) and budget to suggest the best potential flatmates."
    },
    {
      q: "Is the chat secure?",
      a: "Yes, our roommate chat uses end-to-end encryption. Your messages are only visible to you and the person you are messaging."
    },
    {
      q: "How do I report a fake room listing?",
      a: "Click the 'Report' button on any room listing. Our admin team reviews all reports within 24 hours to maintain platform quality."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 font-['Inter',sans-serif]">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">How can we help?</h1>
        <p className="text-sm sm:text-base text-slate-600 font-normal">Find answers or reach out to our student support team.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-none border-2 border-black p-8 text-center shadow-sm">
          <div className="w-12 h-12 bg-black text-white rounded-none flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">Live Chat</h3>
          <p className="text-slate-600 text-xs sm:text-sm mb-6 font-normal">Chat with our moderation team.</p>
          <button 
            onClick={() => alert("Connecting to a moderation agent...")}
            className="w-full py-2.5 bg-black hover:bg-zinc-800 text-white font-bold rounded-none text-xs uppercase tracking-wider transition-colors border border-black flex items-center justify-center gap-2"
          >
            <span>Start Chat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        
        <div className="bg-white rounded-none border-2 border-black p-8 text-center shadow-sm">
          <div className="w-12 h-12 bg-black text-white rounded-none flex items-center justify-center mx-auto mb-4">
            <FileQuestion className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">Submit a Ticket</h3>
          <p className="text-slate-600 text-xs sm:text-sm mb-6 font-normal">Detailed issue? Send us a ticket.</p>
          <button 
            onClick={() => alert("Opening support ticket form...")}
            className="w-full py-2.5 bg-black hover:bg-zinc-800 text-white font-bold rounded-none text-xs uppercase tracking-wider transition-colors border border-black flex items-center justify-center gap-2"
          >
            <span>Open Form</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-none border-2 border-black p-8 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-8 tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              key={idx} 
              className="border-b border-slate-200 pb-6 last:border-0 last:pb-0"
            >
              <h4 className="font-bold text-slate-900 mb-2 text-sm sm:text-base">{faq.q}</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
