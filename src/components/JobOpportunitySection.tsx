import React, { useState } from "react";
import { JobOpportunity, UserProfile } from "../types";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  PhoneCall, 
  Plus, 
  X, 
  Check, 
  HelpCircle, 
  Search, 
  ArrowRight,
  MessageSquare,
  Sparkles
} from "lucide-react";

interface JobOpportunitySectionProps {
  jobs: JobOpportunity[];
  currentUser: UserProfile;
  onAddJob: (newJob: Omit<JobOpportunity, "id" | "appliesCount" | "appliedBy" | "isApproved" | "createdAt">) => void;
  onApplyJob: (jobId: string) => void;
}

export default function JobOpportunitySection({
  jobs,
  currentUser,
  onAddJob,
  onApplyJob,
}: JobOpportunitySectionProps) {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // New Job state
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState<JobOpportunity["type"]>("Full-time");
  const [salary, setSalary] = useState("AED 8,000 - 12,000 /month");
  const [location, setLocation] = useState("Downtown Dubai");
  const [whatsappContact, setWhatsappContact] = useState("+971 50 ");
  const [description, setDescription] = useState("");
  const [skillsStr, setSkillsStr] = useState("SEO, Copywriting, Social Media");

  const jobTypes = ["All", "Full-time", "Part-time", "Freelance", "Internship"];

  const filtered = jobs.filter((j) => {
    const matchesType = selectedType === "All" || j.type === selectedType;
    const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          j.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim()) return;

    onAddJob({
      title,
      company,
      type,
      salary,
      location,
      whatsappContact,
      description,
      skillsRequired: skillsStr.split(",").map(s => s.trim()),
    });

    // Reset fields
    setTitle("");
    setCompany("");
    setDescription("");
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4" id="jobs-hub">
      {/* Editorial Search and action panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#001F3F] p-4 rounded-2xl border border-white/10">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search premium corporate jobs, freelance work, and partnerships in UAE..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#000F21] px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/10"
        >
          <Plus className="w-4 h-4" />
          <span>Post an Opportunity</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {jobTypes.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap border transition-all cursor-pointer ${
              selectedType === t
                ? "bg-[#D4AF37] text-[#000F21] border-[#D4AF37] font-bold"
                : "bg-white/5 text-slate-300 border-white/5 hover:border-[#D4AF37]/30 hover:bg-white/10"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Add Job Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-fade-in">
          <div className="bg-[#001F3F] border border-[#D4AF37]/30 rounded-3xl max-w-lg w-full p-6 space-y-4 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Post New Job & Opportunity
              </h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                    Opportunity Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Copywriter"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hub71 Tech Group"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                    Job Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as JobOpportunity["type"])}
                    className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white focus:outline-none"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                    Compensation (AED / Month or Project)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AED 8,500 / month"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Downtown Dubai"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                    WhatsApp Contact Mobile *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+971501234567"
                    value={whatsappContact}
                    onChange={(e) => setWhatsappContact(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                  Required Skills (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. SEO, TikTok Growth, Excel"
                  value={skillsStr}
                  onChange={(e) => setSkillsStr(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                  Detailed Description *
                </label>
                <textarea
                  required
                  placeholder="Summarize the core roles, project deliverable, and work schedule."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2.5 bg-white/5 text-slate-300 hover:text-white rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#D4AF37] text-[#000F21] px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider"
                >
                  Post Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((j) => {
          const hasApplied = j.appliedBy.includes(currentUser.id);

          return (
            <div
              key={j.id}
              className="bg-[#001F3F] border border-white/10 rounded-3xl p-5 hover:border-[#D4AF37]/30 transition-all flex flex-col justify-between"
              id={`job-card-${j.id}`}
            >
              <div className="space-y-4">
                {/* Header info */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      {j.title}
                    </h3>
                    <p className="text-[11px] text-[#D4AF37] font-serif mt-0.5">{j.company}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border ${
                    j.type === "Freelance" 
                      ? "bg-purple-500/10 text-purple-400 border-purple-500/20" 
                      : "bg-[#50C878]/10 text-[#50C878] border-[#50C878]/20"
                  }`}>
                    {j.type}
                  </span>
                </div>

                {/* Salary, Location specs */}
                <div className="grid grid-cols-2 gap-2.5 bg-[#000F21]/80 p-3 rounded-2xl border border-white/5 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-[#50C878] shrink-0" />
                    <span>{j.salary}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                    <span className="truncate">{j.location}</span>
                  </div>
                </div>

                {/* Requirements Pills */}
                <div className="space-y-1.5">
                  <span className="block text-[9px] uppercase font-mono text-slate-500">REQUIRED COMPETENCES</span>
                  <div className="flex flex-wrap gap-1.5">
                    {j.skillsRequired.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg text-[10px] text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Job description */}
                <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                  {j.description}
                </p>
              </div>

              {/* Apply/WhatsApp call to actions */}
              <div className="flex gap-3 pt-4 mt-4 border-t border-white/5">
                {hasApplied ? (
                  <div className="flex-1 bg-emerald-500/10 border border-emerald-500/30 text-[#50C878] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>Applied ({j.appliesCount} total)</span>
                  </div>
                ) : (
                  <button
                    onClick={() => onApplyJob(j.id)}
                    className="flex-1 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#000F21] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply Instantly</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <a
                  href={`https://wa.me/${j.whatsappContact.replace(/\s+/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#50C878]/10 hover:bg-[#50C878]/25 text-[#50C878] border border-[#50C878]/30 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                  title="Connect via WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
