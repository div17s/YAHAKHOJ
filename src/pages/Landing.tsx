import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  GraduationCap, 
  Award, 
  TrendingUp, 
  Lightbulb, 
  Building2, 
  Target, 
  BookOpen, 
  Briefcase, 
  Calendar, 
  Home, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Lock,
  ExternalLink,
  MapPin,
  FileText,
  Compass
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { MOCK_COLLEGES } from '../data';
import { cn } from '../lib/utils';
import React, { useState, useEffect, useRef } from 'react';

import { useSEO } from '../hooks/useSEO';

export function Landing() {
  useSEO({
    title: 'Yaha Khoj - Delhi\'s Premier Student Ecosystem & Startup Platform',
    description: 'Yaha Khoj is a premier Delhi-based student startup platform helping students with college PYQs, study notes, alumni networks, finding rooms, roommates, and city guides.',
  });
  const { user } = useUser();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileFeatureIndex, setMobileFeatureIndex] = useState(0);
  const [isMobileFeaturePaused, setIsMobileFeaturePaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-advance slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance Core Features in mobile view in a continuous loop every 3.5 seconds
  useEffect(() => {
    if (isMobileFeaturePaused) return;
    const timer = setInterval(() => {
      setMobileFeatureIndex((prev) => (prev + 1) % coreFeatures.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isMobileFeaturePaused]);

  const handleProtectedNavigation = (e: React.MouseEvent, path: string, name: string) => {
    if (!user || !user.onboardingCompleted) {
      e.preventDefault();
      let message = `Please log in or sign up to access ${name}.`;
      if (path.includes('/rooms')) message = 'Please log in to browse verified rooms & PGs near your college.';
      if (path.includes('/roommates')) message = 'Please log in to connect with roommates from your college.';
      if (path.includes('/seniors')) message = 'Please log in to connect with alumni mentors.';
      if (path.includes('/events')) message = 'Please log in to explore the city guide & campus events.';
      if (path.includes('/pyq')) message = 'Please log in to access semester PYQs and study material.';
      if (path.includes('/onboarding')) message = 'Please log in to view the college guide.';
      if (path.includes('/internships')) message = 'Please log in to view internships and opportunities.';
      
      navigate('/auth', { state: { message, isLogin: true } });
    }
  };

  const userCollege = user ? MOCK_COLLEGES.find((c) => c.id === user.collegeId) : null;

  // Slide data provided by the user with exact 16:9 desktop and 9:16 mobile images
  const slides = [
    {
      id: 0,
      desktopImg: 'https://res.cloudinary.com/yfmmvj6f/image/upload/v1791018411/file_000000004d888211954a373a6c00e3b1.png',
      mobileImg: 'https://res.cloudinary.com/yfmmvj6f/image/upload/v1791018411/file_000000002e508211ab0bc51cca4724c9.png',
      alt: 'Yaha Khoj - Your College Life Hub',
      link: '/auth'
    },
    {
      id: 1,
      desktopImg: 'https://res.cloudinary.com/yfmmvj6f/image/upload/v1791018801/15747.png',
      mobileImg: 'https://res.cloudinary.com/yfmmvj6f/image/upload/v1791018801/15750.png',
      alt: 'Yaha Khoj - Connect with Your Campus',
      link: '/auth'
    }
  ];

  // Core Features / Everything Students Need (Simple HTML Rectangular Cards)
  const coreFeatures = [
    {
      id: 'pyq',
      title: 'PYQs & Study Material',
      subtitle: 'Semester & Subject-wise',
      description: 'Access previous year question papers, syllabus breakdowns, handwritten notes, and solved papers for all semesters.',
      tags: ['Semester 1-8', 'Subject Notes', 'Question Papers'],
      actionLabel: 'Explore PYQs & Notes',
      link: '/pyq',
      icon: BookOpen,
    },
    {
      id: 'rooms',
      title: 'Rooms & PGs',
      subtitle: 'Near Your College Campus',
      description: 'Verified student hostels, single rooms, flat-sharing, and PGs within walking distance with zero brokerage.',
      tags: ['Hostels & PGs', 'Walking Distance', 'Zero Brokerage'],
      actionLabel: 'Browse Rooms & PGs',
      link: '/rooms',
      icon: Home,
    },
    {
      id: 'roommates',
      title: 'Find Roommates',
      subtitle: 'Same College & Branch Match',
      description: 'Find compatible flatmates from your college, same department and batch with matching habits and lifestyle.',
      tags: ['Same Branch', 'Batch Match', 'Habit Match'],
      actionLabel: 'Find Your Roommate',
      link: '/roommates',
      icon: Users,
    },
    {
      id: 'college-guide',
      title: 'College Guide',
      subtitle: 'Campus Orientation & Essentials',
      description: 'Campus orientation, administrative procedures, fee details, academic calendar, and department directories.',
      tags: ['Admission Docs', 'Fee Details', 'Campus Map'],
      actionLabel: 'Explore College Guide',
      link: '/onboarding',
      icon: GraduationCap,
    },
    {
      id: 'placement-alumni',
      title: 'Placement & Alumni',
      subtitle: 'Guidance from Placed Seniors',
      description: 'Connect 1-on-1 with alumni working in top companies for resume reviews, mock interviews, and career roadmaps.',
      tags: ['Senior Mentors', 'Resume Reviews', 'Referrals'],
      actionLabel: 'Connect with Alumni',
      link: '/seniors',
      icon: Briefcase,
    },
    {
      id: 'city-guide',
      title: 'City Guide',
      subtitle: 'Mess, Transit & Local Hangouts',
      description: 'Curated student mess, affordable cafes, metro and bus routes, stationery shops, and local hangout spots.',
      tags: ['Student Mess', 'Bus & Metro', 'Campus Essentials'],
      actionLabel: 'Explore City Guide',
      link: '/events',
      icon: MapPin,
    },
  ];

  // 4-Step Journey: How Yaha Khoj Works (3rd Section)
  const howItWorksSteps = [
    {
      step: '01',
      title: 'Choose Your College',
      description: 'Search and pick your university to unlock semester notes, question papers, and campus-specific student listings.',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80',
      link: '/onboarding',
      cta: 'Select College',
    },
    {
      step: '02',
      title: 'Explore',
      description: 'Access previous year question papers, syllabus, subject lecture notes, and essential city/campus guides.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
      link: '/pyq',
      cta: 'Explore Material',
    },
    {
      step: '03',
      title: 'Connect',
      description: 'Match with compatible flatmates from your branch and connect 1-on-1 with senior alumni for career & placement tips.',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
      link: '/roommates',
      cta: 'Find Roommates',
    },
    {
      step: '04',
      title: 'Settle In',
      description: 'Book verified student hostels, PGs, or flats near campus with zero brokerage, and start thriving in college life.',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
      link: '/rooms',
      cta: 'Find Rooms & PGs',
    },
  ];

  // Section 4: Why Students Choose Yaha Khoj (Value Pillars & Campus Community)
  const campusAdvantages = [
    {
      id: 'housing',
      title: 'Zero Brokerage Housing',
      subtitle: 'Verified Student Rooms & PGs',
      description: 'Direct owner and student listings within walking distance of campus. No middleman brokers, no inflated security deposits, and honest senior reviews.',
      highlights: ['0% Brokerage', 'Walking Distance', 'Verified Owners'],
      actionLabel: 'Browse Rooms & PGs',
      link: '/rooms',
      icon: Home,
    },
    {
      id: 'study',
      title: '100% Free PYQs & Notes',
      subtitle: 'Curated by University Toppers',
      description: 'Subject-wise previous year question papers, handwritten lecture notes, formula sheets, and lab files tailored to your university and semester.',
      highlights: ['Semesters 1 to 8', 'Free Downloads', 'Branch Syllabus'],
      actionLabel: 'Access Study Hub',
      link: '/pyq',
      icon: BookOpen,
    },
    {
      id: 'roommates',
      title: 'Verified Campus Roommates',
      subtitle: 'Same Branch & Habit Match',
      description: 'Connect with genuine peers from your college and department. Match by budget, study hours, cleanliness, and lifestyle before booking together.',
      highlights: ['College Verified', 'Same Branch', 'Habit Match'],
      actionLabel: 'Find Roommates',
      link: '/roommates',
      icon: Users,
    },
    {
      id: 'mentorship',
      title: 'Direct Senior Mentorship',
      subtitle: '1-on-1 Guidance & Referrals',
      description: 'Connect directly with alumni working in top tech and core companies for resume reviews, mock interviews, referral requests, and honest career advice.',
      highlights: ['1-on-1 Mentorship', 'Resume Reviews', 'Job Referrals'],
      actionLabel: 'Connect with Mentors',
      link: '/seniors',
      icon: Briefcase,
    },
  ];

  const popularColleges = [
    'Delhi University (DU)',
    'IIT Delhi',
    'DTU Delhi',
    'NSUT Delhi',
    'BITS Pilani',
    'VIT Vellore',
    'NIT Trichy',
    'Pune University',
    'Mumbai University',
    'Anna University',
    '+ 50 More Campuses',
  ];

  // Featured Campus Stories
  const blogPosts = [
    {
      id: 1,
      title: 'Complete Semester Exam Strategy: How to Use PYQs Effectively',
      category: 'Study Guide',
      date: 'Latest',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
      alt: 'Academic Study Strategy'
    },
    {
      id: 2,
      title: 'Student Housing Guide: What to Look for in a College PG or Flat',
      category: 'Campus Living',
      date: 'Popular',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
      alt: 'Student Housing Guide'
    },
    {
      id: 3,
      title: 'Top Placement Interview Questions and Resume Tips from Alumni',
      category: 'Placements',
      date: 'Career',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
      alt: 'Alumni Placement Tips'
    }
  ];

  return (
    <div className="w-full bg-white text-slate-800 font-body overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (FULL WIDTH BANNER - 'PURE SKIN')                        */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-black aspect-[9/16] sm:aspect-[16/9] md:min-h-[500px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full absolute inset-0"
          >
            <Link to={slides[currentSlide].link} state={{ isLogin: false }} className="block w-full h-full cursor-pointer">
              <picture className="w-full h-full block">
                {/* Mobile view (< 640px): loads exact 9:16 vertical banner */}
                <source media="(max-width: 639px)" srcSet={slides[currentSlide].mobileImg} />
                {/* Tablet/Desktop view (>= 640px): loads exact 16:9 horizontal banner */}
                <source media="(min-width: 640px)" srcSet={slides[currentSlide].desktopImg} />
                <img
                  src={slides[currentSlide].desktopImg}
                  alt={slides[currentSlide].alt}
                  className="w-full h-full block object-contain select-none bg-black"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />
              </picture>
            </Link>
          </motion.div>
        </AnimatePresence>
        
        {/* Slide Indicators - Small and Compact */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${currentSlide === idx ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/60'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. SECTION: CORE FEATURES (SIMPLE HTML RECTANGULAR CARDS, NORMAL TEXT)    */}
      {/* ========================================================================= */}
      <section className="py-4 sm:py-6 bg-black border-b border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header on Black Background */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-4 sm:mb-5"
          >
            <h2 className="font-['Inter',sans-serif] text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight mb-1 uppercase">
              Everything Students Need
            </h2>
            <p className="font-['Inter',sans-serif] text-zinc-400 text-[10px] sm:text-[11px] max-w-md mx-auto font-normal leading-tight">
              Explore semester resources, verified student housing, roommates, and alumni networks.
            </p>
          </motion.div>

          {/* Desktop/Tablet: 6 Feature Cards Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 font-['Inter',sans-serif]"
          >
            {coreFeatures.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-none border border-slate-300 p-4 flex flex-col justify-between min-h-[180px] shadow-sm hover:border-slate-500 transition-colors"
              >
                <div>
                  {/* Clean Title with Standard Icon */}
                  <div className="flex items-center gap-2 mb-1">
                    <item.icon className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                    <h3 className="font-bold text-sm lg:text-base text-slate-900 uppercase">
                      {item.title}
                    </h3>
                  </div>

                  {/* Normal Subtitle */}
                  <p className="text-[9px] text-slate-500 font-normal mb-1.5 uppercase tracking-wide">
                    {item.subtitle}
                  </p>

                  {/* Normal Description Text */}
                  <p className="text-[10px] lg:text-[11px] text-slate-600 font-normal leading-tight mb-2">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Button: Black Button with White Text */}
                <div className="pt-2 border-t border-slate-200 mt-auto">
                  <Link
                    to={item.link}
                    onClick={(e) => handleProtectedNavigation(e, item.link, item.title)}
                    className="w-full py-1.5 px-3 rounded-none bg-black hover:bg-zinc-800 text-white font-bold text-[9px] lg:text-[10px] flex items-center justify-between transition-colors uppercase"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Mobile View: 1 Horizontal Line, Auto-looping One After Another */}
          <div 
            className="md:hidden w-full relative font-['Inter',sans-serif]"
            onTouchStart={(e) => {
              setIsMobileFeaturePaused(true);
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchMove={(e) => {
              touchEndX.current = e.touches[0].clientX;
            }}
            onTouchEnd={() => {
              const diff = touchStartX.current - touchEndX.current;
              if (diff > 40) {
                // Swiped left -> next card
                setMobileFeatureIndex((prev) => (prev + 1) % coreFeatures.length);
              } else if (diff < -40) {
                // Swiped right -> prev card
                setMobileFeatureIndex((prev) => (prev - 1 + coreFeatures.length) % coreFeatures.length);
              }
              setTimeout(() => setIsMobileFeaturePaused(false), 4500);
            }}
          >
            {/* Horizontal Track of Cards in 1 Line */}
            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${mobileFeatureIndex * 100}%)` }}
              >
                {coreFeatures.map((item) => (
                  <div
                    key={item.id}
                    className="w-full shrink-0 px-1"
                  >
                    <div className="bg-white rounded-none border border-slate-300 p-5 flex flex-col justify-between min-h-[230px] shadow-sm">
                      <div>
                        {/* Clean Title with Standard Icon */}
                        <div className="flex items-center gap-2 mb-1">
                          <item.icon className="w-4 h-4 text-slate-800 shrink-0" />
                          <h3 className="font-bold text-base text-slate-900 uppercase">
                            {item.title}
                          </h3>
                        </div>

                        {/* Normal Subtitle */}
                        <p className="text-[10px] text-slate-500 font-normal mb-2 uppercase tracking-wide">
                          {item.subtitle}
                        </p>

                        {/* Normal Description Text */}
                        <p className="text-[11px] text-slate-600 font-normal leading-relaxed mb-3">
                          {item.description}
                        </p>

                        {/* Simple Rectangular Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] text-slate-700 bg-white border border-slate-300 rounded-none px-2 py-0.5 font-normal uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Action Button: Black Button with White Text */}
                      <div className="pt-3 border-t border-slate-200 mt-auto">
                        <Link
                          to={item.link}
                          onClick={(e) => handleProtectedNavigation(e, item.link, item.title)}
                          className="w-full py-2 px-3 rounded-none bg-black hover:bg-zinc-800 text-white font-bold text-[10px] flex items-center justify-between transition-colors uppercase"
                        >
                          <span>{item.actionLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Controls: Previous Button, Counter, Next Button */}
            <div className="flex items-center justify-between mt-3 px-1">
              <button
                type="button"
                onClick={() => {
                  setIsMobileFeaturePaused(true);
                  setMobileFeatureIndex((prev) => (prev - 1 + coreFeatures.length) % coreFeatures.length);
                  setTimeout(() => setIsMobileFeaturePaused(false), 5000);
                }}
                className="w-8 h-8 rounded-none border border-zinc-700 bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer shadow-xs"
                aria-label="Previous feature card"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Loop Progress Indicator: X/Y format */}
              <div className="flex items-center gap-1 text-[10px] text-zinc-300 font-bold tracking-wider">
                <span>{mobileFeatureIndex + 1}/{coreFeatures.length}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsMobileFeaturePaused(true);
                  setMobileFeatureIndex((prev) => (prev + 1) % coreFeatures.length);
                  setTimeout(() => setIsMobileFeaturePaused(false), 5000);
                }}
                className="w-8 h-8 rounded-none border border-zinc-700 bg-zinc-900 text-white flex items-center justify-center hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer shadow-xs"
                aria-label="Next feature card"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. SECTION: HOW YAHAKHOJ WORKS (BLACK BG, YELLOW RECTANGLE CARDS)          */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-6 sm:py-8 bg-black text-white border-t border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-4 sm:mb-5"
          >
            <h2 className="font-['Inter',sans-serif] text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight uppercase mb-1">
              How Yaha Khoj Works
            </h2>
          </motion.div>

          {/* 4 Connected Step Cards Grid: Yellow Rectangular Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 font-['Inter',sans-serif] relative"
          >
            {howItWorksSteps.map((item, idx) => (
              <div
                key={item.step}
                className="relative bg-yellow-400 rounded-none p-3 lg:p-4 border-2 border-black flex flex-col justify-between shadow-md text-slate-900 group"
              >
                {/* Horizontal Arrow between cards on desktop */}
                {idx < howItWorksSteps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-none bg-black border border-white text-white items-center justify-center shadow-md">
                    <ArrowRight className="w-2.5 h-2.5 stroke-[2.5]" />
                  </div>
                )}

                <div>
                  {/* Normal Step Number at Top */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-bold text-black tracking-wider uppercase">
                      Step {item.step}
                    </span>
                  </div>

                  {/* Rectangular Image Thumbnail - Simple HTML Box */}
                  <div className="w-full aspect-[16/9] rounded-none overflow-hidden mb-2.5 bg-yellow-100 border border-black/30 relative flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover select-none"
                    />
                  </div>

                  {/* Normal Title */}
                  <h3 className="font-bold text-sm lg:text-base text-black mb-1 tracking-tight uppercase">
                    {item.title}
                  </h3>

                  {/* Normal Description Text */}
                  <p className="text-[10px] lg:text-[11px] text-slate-900 leading-tight font-normal mb-3">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Link - Rectangular Button */}
                <div className="pt-2 border-t border-black/20 mt-auto">
                  <Link
                    to={item.link}
                    onClick={(e) => handleProtectedNavigation(e, item.link, item.title)}
                    className="w-full py-1.5 px-3 rounded-none bg-black hover:bg-zinc-800 text-white font-bold text-[9px] lg:text-[10px] flex items-center justify-between transition-colors uppercase"
                  >
                    <span>{item.cta}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>
      {/* ========================================================================= */}
      {/* 4. SECTION: WHY STUDENTS CHOOSE YAHAKHOJ & CAMPUS COMMUNITY (BLACK BG)     */}
      {/* ========================================================================= */}
      <section id="why-yahaseh" className="py-6 sm:py-8 bg-black text-white border-t border-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header on Black Background */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-4 sm:mb-5"
          >
            <h2 className="font-['Inter',sans-serif] text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight uppercase">
              Why Yaha Khoj
            </h2>
          </motion.div>

          {/* 4 Value Pillar Cards Grid - Simple HTML Rectangular Format */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 font-['Inter',sans-serif] mb-6"
          >
            {campusAdvantages.map((item) => (
              <div
                key={item.id}
                className="bg-[#141416] rounded-none border border-zinc-800 p-4 flex flex-col justify-between min-h-[200px] shadow-sm hover:border-zinc-600 transition-colors"
              >
                <div>
                  {/* Clean Title with Standard Icon */}
                  <div className="flex items-center gap-2 mb-1">
                    <item.icon className="w-3.5 h-3.5 text-white shrink-0" />
                    <h3 className="font-bold text-xs sm:text-sm text-white uppercase">
                      {item.title}
                    </h3>
                  </div>

                  {/* Subtitle */}
                  <p className="text-[9px] text-zinc-300 font-medium mb-1.5 uppercase">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-[10px] lg:text-[11px] text-zinc-400 font-normal leading-tight mb-2">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Button - Rectangular White Button with Black Text */}
                <div className="pt-2 border-t border-zinc-800 mt-auto">
                  <Link
                    to={item.link}
                    onClick={(e) => handleProtectedNavigation(e, item.link, item.title)}
                    className="w-full py-1.5 px-3 rounded-none bg-white hover:bg-zinc-200 text-black font-bold text-[9px] flex items-center justify-between transition-colors shadow-xs group/btn uppercase"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Campus Directory & Universities Supported Bar */}
          <div className="bg-[#121214] border border-zinc-800 p-4 sm:p-5 rounded-none font-['Inter',sans-serif] flex flex-col lg:flex-row items-center justify-between gap-3">
            <div className="flex-1 text-center lg:text-left">
              <span className="text-[9px] font-bold text-white uppercase tracking-wider block mb-0.5">
                Supported Campuses
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 uppercase">
                Find Your University Community
              </h3>
            </div>

            {/* Select College CTA Button */}
            <div className="shrink-0 w-full sm:w-auto">
              <Link
                to="/onboarding"
                className="w-full sm:w-auto px-5 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-[9px] sm:text-[10px] uppercase tracking-wider rounded-none border-2 border-black flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <span>SELECT YOUR COLLEGE</span>
                <CheckCircle className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Stats Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 font-['Inter',sans-serif]">
            {[
              { label: 'Top Colleges', value: '50+' },
              { label: 'PYQs & Notes', value: '10,000+' },
              { label: 'Verified Rooms & PGs', value: '1,200+' },
              { label: 'Brokerage Charged', value: '₹0' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#121214] border border-zinc-800 p-3 text-center rounded-none"
              >
                <div className="text-lg sm:text-xl font-bold text-white mb-0.5 uppercase">
                  {stat.value}
                </div>
                <div className="text-[9px] text-zinc-400 font-bold uppercase tracking-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. SECTION: CAMPUS STORIES & UPDATES (ORANGE BG, RECTANGLE WHITE CARDS)   */}
      {/* ========================================================================= */}
      <section id="blog" className="py-8 sm:py-10 bg-orange-500 border-t-2 border-black relative font-['Inter',sans-serif]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight uppercase">
              Featured Campus Stories
            </h2>
          </div>

          {/* 3 News Cards Grid: Simple HTML Rectangular White Cards on Orange BG */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {blogPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-none border-2 border-black shadow-md overflow-hidden flex flex-col justify-between group"
              >
                {/* Image */}
                <div className="w-full aspect-[16/9] overflow-hidden bg-slate-50 border-b-2 border-black relative flex items-center justify-center">
                  <img
                    src={post.image}
                    alt={post.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Badge */}
                    <span className="inline-block bg-black text-white text-[9px] font-bold px-2 py-0.5 rounded-none mb-2 uppercase">
                      {post.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight group-hover:text-orange-600 transition-colors line-clamp-2 mb-3 uppercase">
                      {post.title}
                    </h3>
                  </div>

                  {/* Date/Tag */}
                  <div className="text-[10px] text-slate-500 font-bold pt-3 border-t border-slate-200 flex items-center justify-between uppercase">
                    <span>{post.date}</span>
                    <span className="text-black">Yaha Khoj Hub</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Action Button: EXPLORE MORE STORIES */}
          <div className="mt-8 sm:mt-10 text-center">
            <Link
              to="/events"
              className="inline-block px-6 py-2.5 bg-black hover:bg-zinc-800 text-white rounded-none font-bold text-[10px] sm:text-[11px] uppercase tracking-widest border-2 border-black shadow-md transition-all active:scale-95"
            >
              EXPLORE MORE STORIES
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
