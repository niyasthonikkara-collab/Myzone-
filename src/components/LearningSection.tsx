import React, { useState } from "react";
import { Course, UserProfile } from "../types";
import { 
  BookOpen, 
  Clock, 
  Award, 
  Users, 
  Star, 
  Play, 
  CheckCircle, 
  X, 
  FileText, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface LearningSectionProps {
  courses: Course[];
  currentUser: UserProfile;
}

export default function LearningSection({
  courses,
  currentUser,
}: LearningSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const categories = ["All", "English", "Business", "Marketing", "AI & Tech"];

  const filtered = selectedCategory === "All"
    ? courses
    : courses.filter(c => c.category === selectedCategory);

  const handleLessonCheck = (idx: number) => {
    if (completedLessons.includes(idx)) {
      setCompletedLessons(completedLessons.filter(i => i !== idx));
    } else {
      setCompletedLessons([...completedLessons, idx]);
    }
  };

  const dummyLessonsList = [
    "Introduction to the UAE Market Dynamics & Demographics",
    "Understanding Mainland vs. Freezone Licences",
    "Evaluating Meydan & Hub71 Incubation Support",
    "Finding Vetted Corporate PRO Services",
    "Opening Corporate Bank Accounts & Visa Hurdles",
    "Hiring Early Talent and Bachelor Housing Policies"
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4" id="learning-hub">
      {/* Premium Hero Banner */}
      <div className="bg-gradient-to-r from-[#000F21] to-[#002B5B] border border-[#D4AF37]/20 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-1/2 -left-12 w-64 h-64 bg-[#50C878] blur-[120px] opacity-10 rounded-full" />
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 px-2.5 py-1 rounded-full font-mono uppercase tracking-widest font-bold inline-block">
            MYZONE UNIVERSITY
          </span>
          <h2 className="text-xl md:text-2xl font-serif text-white">
            Accelerate Your Entrepreneurship & <br /> Communication in the GCC
          </h2>
          <p className="text-xs text-slate-400 font-sans leading-relaxed">
            Gain verified tactical knowledge directly from corporate consultants, English language experts, and venture-backed founders operating on the ground in UAE.
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3 shrink-0">
          <Award className="w-10 h-10 text-[#D4AF37] animate-bounce" />
          <div className="text-left">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Verified Certificate</p>
            <p className="text-[10px] text-slate-400">Included in VIP & Premium plans</p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap border transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#D4AF37] text-[#000F21] border-[#D4AF37] font-bold"
                : "bg-white/5 text-slate-300 border-white/5 hover:border-[#D4AF37]/30 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="bg-[#001F3F] border border-white/10 rounded-3xl overflow-hidden hover:border-[#D4AF37]/30 transition-all flex flex-col justify-between"
            id={`course-card-${c.id}`}
          >
            {/* Header Image */}
            <div className="relative h-40 bg-slate-800">
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#000F21]/90 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider text-[#D4AF37] border border-[#D4AF37]/20">
                {c.category}
              </div>
            </div>

            {/* Course Content */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-400 font-mono">
                  Instructor: <b>{c.instructor}</b>
                </span>
                <h3 className="text-xs font-bold text-white line-clamp-2">
                  {c.title}
                </h3>
                <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2 font-sans">
                  {c.description}
                </p>
              </div>

              {/* Status Icons */}
              <div className="grid grid-cols-3 gap-2 py-2 border-t border-b border-white/5 text-[10px] text-slate-400 font-mono">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{c.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#50C878]" />
                  <span>{c.lessons} Lessons</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  <span>{c.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>

            {/* Play Button Action */}
            <div className="p-5 pt-0">
              <button
                onClick={() => {
                  setActiveCourse(c);
                  setActiveLessonIndex(0);
                  setCompletedLessons([]);
                }}
                className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#000F21] py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Lesson</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lesson Playback Simulator Overlay */}
      {activeCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-fade-in">
          <div className="bg-[#001F3F] border border-[#D4AF37]/30 rounded-3xl max-w-4xl w-full p-6 space-y-4 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveCourse(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Course Title and Category Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] bg-amber-500/10 text-[#D4AF37] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                {activeCourse.category} Class
              </span>
              <h3 className="text-sm font-bold text-white font-serif">{activeCourse.title}</h3>
            </div>

            {/* Live Video Simulator & Lesson Menu Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Video player screen simulator */}
              <div className="lg:col-span-7 space-y-3">
                <div className="aspect-video bg-black rounded-2xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group">
                  {/* Grid overlay for tech look */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                  <Play className="w-16 h-16 text-[#D4AF37] animate-pulse" />
                  <p className="text-xs text-slate-300 font-mono mt-3">
                    PLAYING: Lesson {activeLessonIndex + 1} of {activeCourse.lessons}
                  </p>
                  <p className="text-[10px] text-[#50C878] italic mt-1 font-mono">
                    "{dummyLessonsList[activeLessonIndex % dummyLessonsList.length]}"
                  </p>

                  {/* Video Control Bar Simulator */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent flex items-center justify-between text-[10px] text-slate-300">
                    <span className="font-mono">03:45 / 15:00</span>
                    <div className="flex-1 mx-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="w-1/4 h-full bg-[#D4AF37]" />
                    </div>
                    <span className="text-[#50C878] font-bold">HD 1080p</span>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Key Takeaways
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                    Make sure to review the downloadable PDF checklist on license applications under Dubai Mainland regulations. Freezone packages differ with investor visa counts.
                  </p>
                </div>
              </div>

              {/* Right Column: Lesson playlist selector */}
              <div className="lg:col-span-5 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center justify-between">
                  <span>Lesson Modules</span>
                  <span className="text-[10px] text-[#50C878] font-mono font-bold">
                    {completedLessons.length} / {dummyLessonsList.length} Done
                  </span>
                </h4>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {dummyLessonsList.map((lesson, idx) => {
                    const isCompleted = completedLessons.includes(idx);
                    const isSelected = activeLessonIndex === idx;

                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#D4AF37]/10 border-[#D4AF37] text-white"
                            : "bg-[#000F21]/40 border-white/5 text-slate-400 hover:border-white/10"
                        }`}
                        onClick={() => setActiveLessonIndex(idx)}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLessonCheck(idx);
                          }}
                          className="mt-0.5"
                        >
                          <CheckCircle
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              isCompleted ? "text-[#50C878] fill-[#50C878]/10" : "text-slate-500"
                            }`}
                          />
                        </button>
                        <div className="text-left">
                          <p className={`text-[11px] font-bold ${isSelected ? "text-[#D4AF37]" : "text-slate-300"}`}>
                            Module {idx + 1}: {lesson}
                          </p>
                          <span className="text-[9px] text-slate-500 font-mono">Duration: 12-15 Mins</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-white/5 flex justify-between items-center">
                  <span className="text-[10px] text-slate-400">
                    VIP Certification Checklist
                  </span>
                  <button
                    onClick={() => {
                      alert("Congratulations! You completed the course simulation. A PDF diploma request has been sent to the Admin panel for approval!");
                      setActiveCourse(null);
                    }}
                    className="bg-[#50C878] hover:bg-[#50C878]/90 text-[#000F21] px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <span>Request Certificate</span>
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
