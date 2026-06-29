import React, { useState } from "react";
import { UserProfile, Post, MembershipPlan } from "../types";
import { 
  User, 
  Settings, 
  MapPin, 
  Briefcase, 
  Plus, 
  Smartphone, 
  Mail, 
  Bookmark, 
  Sparkles, 
  LogOut, 
  Globe, 
  Moon, 
  Check, 
  Save, 
  HelpCircle,
  TrendingUp,
  Award
} from "lucide-react";

interface SettingsAndProfileProps {
  currentUser: UserProfile;
  savedPosts: Post[];
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onLogout: () => void;
  onUpgradePlan: () => void;
}

export default function SettingsAndProfile({
  currentUser,
  savedPosts,
  onUpdateProfile,
  onLogout,
  onUpgradePlan,
}: SettingsAndProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [mobile, setMobile] = useState(currentUser.mobile);
  const [location, setLocation] = useState(currentUser.location);
  const [profession, setProfession] = useState(currentUser.profession);
  const [businessInterest, setBusinessInterest] = useState(currentUser.businessInterest || "");
  const [lookingFor, setLookingFor] = useState(currentUser.lookingFor);
  const [lang, setLang] = useState("en");
  const [skillsText, setSkillsText] = useState(currentUser.skills.join(", "));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      mobile,
      location,
      profession,
      businessInterest,
      lookingFor,
      skills: skillsText.split(",").map(s => s.trim()).filter(s => s.length > 0)
    });
    setIsEditing(false);
  };

  const getLookingForLabel = (key: string) => {
    switch (key) {
      case "job": return "Looking for a Job";
      case "business partner": return "Looking for a Business Partner / Co-founder";
      case "room": return "Looking for shared Bedspace / Room";
      case "service": return "Looking for high-quality Services";
      case "learning": return "Looking for professional Learning / Classes";
      case "networking": return "Looking to expand Business Networks";
      default: return "Just exploring";
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4" id="member-profile-settings">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Member Card & Quick Status */}
        <div className="lg:col-span-4 space-y-6">
          {/* Luxury Card Frame */}
          <div className="bg-[#001F3F] border border-white/10 rounded-3xl p-6 relative overflow-hidden text-center flex flex-col items-center">
            {/* Top decorative glow */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#D4AF37] via-[#50C878] to-[#D4AF37]" />
            
            <div className="relative mt-4">
              <img 
                src={currentUser.photoUrl} 
                alt={currentUser.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-[#D4AF37] shadow-xl"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 bg-[#50C878] border-4 border-[#001F3F] rounded-full" />
            </div>

            <h3 className="text-base font-bold text-white mt-4">{currentUser.name}</h3>
            <p className="text-xs text-[#D4AF37] font-serif italic mt-0.5">{currentUser.profession}</p>
            
            <div className="mt-3 flex items-center gap-1 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" />
              <span>{currentUser.membershipStatus} MEMBER</span>
            </div>

            <div className="w-full mt-6 pt-4 border-t border-white/5 space-y-2 text-left text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                <span className="truncate">{currentUser.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{currentUser.mobile}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{currentUser.email}</span>
              </div>
            </div>

            {/* Upgrade button if not VIP */}
            {currentUser.membershipStatus !== MembershipPlan.VIP && (
              <button 
                onClick={onUpgradePlan}
                className="w-full mt-6 bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-[#f1cc5b] hover:to-amber-600 text-[#000F21] font-bold uppercase tracking-wider text-[11px] py-2.5 rounded-xl shadow-lg shadow-[#D4AF37]/10 transition-all cursor-pointer"
              >
                Upgrade to VIP Network
              </button>
            )}
          </div>

          {/* Quick Settings Checklist */}
          <div className="bg-[#001F3F] border border-white/10 rounded-3xl p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#D4AF37]" /> Core Preferences
            </h4>

            {/* Language Selection */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                Primary Language
              </label>
              <div className="grid grid-cols-3 gap-1 text-[11px]">
                <button 
                  onClick={() => setLang("en")}
                  className={`p-2 rounded-xl text-center border font-bold transition-all ${
                    lang === "en" ? "bg-[#D4AF37]/10 border-[#D4AF37] text-white" : "bg-[#000F21]/40 border-white/5 text-slate-400"
                  }`}
                >
                  English
                </button>
                <button 
                  onClick={() => {
                    setLang("ml");
                    alert("Malayalam localization package is loading! Full translation updates rolling out soon.");
                  }}
                  className={`p-2 rounded-xl text-center border font-bold transition-all ${
                    lang === "ml" ? "bg-[#D4AF37]/10 border-[#D4AF37] text-white" : "bg-[#000F21]/40 border-white/5 text-slate-400"
                  }`}
                >
                  Malayalam
                </button>
                <button 
                  onClick={() => {
                    setLang("ar");
                    alert("Arabic localization package is loading! RTL layout is being configured.");
                  }}
                  className={`p-2 rounded-xl text-center border font-bold transition-all ${
                    lang === "ar" ? "bg-[#D4AF37]/10 border-[#D4AF37] text-white" : "bg-[#000F21]/40 border-white/5 text-slate-400"
                  }`}
                >
                  العربية
                </button>
              </div>
            </div>

            {/* Dark Mode Visual confirmation */}
            <div className="flex items-center justify-between p-3 bg-[#000F21]/40 rounded-2xl border border-white/5 text-xs text-slate-300">
              <span className="font-medium flex items-center gap-2">
                <Moon className="w-4 h-4 text-[#D4AF37]" /> Luxury Dark Theme
              </span>
              <span className="text-[10px] bg-[#50C878]/10 text-[#50C878] px-2.5 py-0.5 rounded font-mono font-bold uppercase">
                Active
              </span>
            </div>

            {/* Logout trigger */}
            <button
              onClick={onLogout}
              className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out Securely</span>
            </button>
          </div>
        </div>

        {/* Right Column: Edit Profile & Saved Posts */}
        <div className="lg:col-span-8 space-y-6">
          {/* Profile Editor */}
          <div className="bg-[#001F3F] border border-white/10 rounded-3xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <User className="w-4.5 h-4.5 text-[#D4AF37]" /> 
                {isEditing ? "Edit Your UAE Club Profile" : "Your Member Profile Details"}
              </h4>
              
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white/5 hover:bg-[#D4AF37]/15 text-slate-300 hover:text-[#D4AF37] border border-white/10 hover:border-[#D4AF37]/40 px-4 py-1.5 rounded-xl text-xs font-bold uppercase transition-all"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {!isEditing ? (
              <div className="mt-6 space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-slate-500 font-mono block">FULL NAME</span>
                    <p className="text-sm font-bold text-white">{currentUser.name}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 font-mono block">PROFESSION & BUSINESS ROLE</span>
                    <p className="text-sm font-bold text-[#D4AF37] font-serif">{currentUser.profession}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-slate-500 font-mono block">UAE LOCATION</span>
                    <p className="text-sm font-bold text-white">{currentUser.location}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 font-mono block">MEMBERSHIP CATEGORY NEED</span>
                    <p className="text-sm font-bold text-[#50C878]">{getLookingForLabel(currentUser.lookingFor)}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-500 font-mono block">COMPETENCIES & PROFESSIONAL SKILLS</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {currentUser.skills.map((skill, idx) => (
                      <span 
                        key={idx}
                        className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 px-3 py-1 rounded-lg text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {currentUser.businessInterest && (
                  <div className="space-y-1">
                    <span className="text-slate-500 font-mono block">UAE BUSINESS INVESTMENT INTEREST</span>
                    <p className="text-xs text-slate-200 bg-[#000F21]/40 p-3 rounded-xl border border-white/5 font-sans leading-relaxed">
                      {currentUser.businessInterest}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSave} className="mt-6 space-y-4 text-xs text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                      Profession *
                    </label>
                    <input
                      type="text"
                      required
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                      Mobile Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                      Primary Location (UAE Area) *
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                      Skills (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={skillsText}
                      onChange={(e) => setSkillsText(e.target.value)}
                      className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                      placeholder="React, Fundraising, DED Legal"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                      What are you looking for?
                    </label>
                    <select
                      value={lookingFor}
                      onChange={(e) => setLookingFor(e.target.value as any)}
                      className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="networking">Expand Professional Networks</option>
                      <option value="business partner">Find Co-founders / Investors</option>
                      <option value="job">Find a Job in UAE</option>
                      <option value="room">Find Roommate or Bedspace</option>
                      <option value="service">Find Premium Services</option>
                      <option value="learning">Take Business Courses</option>
                      <option value="none">Just exploring</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                    UAE Investment & Business Goals
                  </label>
                  <textarea
                    value={businessInterest}
                    onChange={(e) => setBusinessInterest(e.target.value)}
                    rows={3}
                    className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37] resize-none"
                    placeholder="Briefly state your venture aspirations in GCC or what support structure you are trying to establish."
                  />
                </div>

                <div className="flex justify-end gap-2.5 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-white/5 hover:bg-white/10 text-slate-300 px-4 py-2 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#D4AF37] text-[#000F21] font-bold px-6 py-2 rounded-xl flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Updates</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Bookmarks Section */}
          <div className="bg-[#001F3F] border border-white/10 rounded-3xl p-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2 mb-4">
              <Bookmark className="w-4.5 h-4.5 text-[#D4AF37]" /> Your Bookmarked Community Feed Updates ({savedPosts.length})
            </h4>

            {savedPosts.length === 0 ? (
              <div className="text-center p-8 bg-[#000F21]/40 rounded-2xl border border-white/5">
                <Bookmark className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-40" />
                <p className="text-xs text-slate-400">
                  Any posts you bookmark from the **Community Feed** will appear here for fast lookup.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedPosts.map((post) => (
                  <div 
                    key={post.id}
                    className="p-3.5 bg-[#000F21]/50 border border-white/5 rounded-2xl flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] uppercase font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                          {post.category}
                        </span>
                        <span className="text-[10px] text-slate-400">by {post.authorName}</span>
                      </div>
                      <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                        {post.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
