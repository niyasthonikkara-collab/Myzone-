import React, { useState } from "react";
import { BachelorItem, UserProfile } from "../types";
import { 
  Home, 
  Users, 
  Utensils, 
  Car, 
  Zap, 
  PhoneCall, 
  AlertTriangle, 
  MapPin, 
  Search, 
  Sparkles,
  Info
} from "lucide-react";

interface BachelorSectionProps {
  items: BachelorItem[];
  currentUser: UserProfile;
}

export default function BachelorSection({
  items,
  currentUser,
}: BachelorSectionProps) {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const typesList = [
    { id: "All", label: "All Solutions", icon: Info },
    { id: "room", label: "Find Rooms", icon: Home },
    { id: "roommate", label: "Roommates", icon: Users },
    { id: "mess", label: "Food Mess", icon: Utensils },
    { id: "transport", label: "Transport / Rides", icon: Car },
    { id: "emergency", label: "Emergency Help", icon: AlertTriangle },
  ];

  const filtered = items.filter((item) => {
    const matchesType = selectedType === "All" || item.type === selectedType;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getCardIcon = (type: string) => {
    switch (type) {
      case "room": return <Home className="w-5 h-5 text-sky-400" />;
      case "roommate": return <Users className="w-5 h-5 text-amber-400" />;
      case "mess": return <Utensils className="w-5 h-5 text-[#50C878]" />;
      case "transport": return <Car className="w-5 h-5 text-purple-400" />;
      default: return <AlertTriangle className="w-5 h-5 text-rose-500" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "room": return "bg-sky-500/10 text-sky-400 border-sky-500/20";
      case "roommate": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "mess": return "bg-[#50C878]/10 text-[#50C878] border-[#50C878]/20";
      case "transport": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default: return "bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse";
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4" id="bachelors-solutions">
      {/* UAE Bachelor Lifestyle Header */}
      <div className="bg-gradient-to-br from-[#002B5B] to-[#000F21] p-6 rounded-3xl border border-[#D4AF37]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#50C878] blur-[120px] opacity-10 rounded-full" />
        <span className="text-[10px] text-[#D4AF37] font-mono tracking-[0.2em] uppercase font-bold">
          BACHELOR SOLUTIONS MODULE
        </span>
        <h2 className="text-xl md:text-2xl font-serif text-white mt-1">
          Streamlining Budget, Accommodation, & Transit for UAE Expatriates
        </h2>
        <p className="text-xs text-slate-400 mt-2 max-w-xl leading-relaxed font-sans">
          Find vetted flatshares near metro links, co-living startup hubs, affordable healthy monthly meal deliveries, carpool lines, and 24/7 landlord legal backup.
        </p>
      </div>

      {/* Filter Category Grid / Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {typesList.map((t) => {
          const Icon = t.icon;
          const isSelected = selectedType === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`p-3 rounded-2xl border text-xs font-bold uppercase tracking-wider flex flex-col items-center justify-center text-center gap-2 transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#D4AF37] text-[#000F21] border-[#D4AF37]"
                  : "bg-[#001F3F] text-slate-300 border-white/5 hover:border-[#D4AF37]/30 hover:bg-white/5"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-[10px] font-mono">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search rooms in JLT, flatmates in Barsha, Karama mess prices..."
          className="w-full bg-[#001F3F] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
        />
      </div>

      {/* Solutions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-[#001F3F] border border-white/10 rounded-3xl p-5 hover:border-[#D4AF37]/30 transition-all flex flex-col justify-between space-y-4"
            id={`bachelor-solution-card-${item.id}`}
          >
            <div className="space-y-3">
              {/* Type Badge & Price Title */}
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${getBadgeColor(item.type)}`}>
                  {getCardIcon(item.type)}
                  <span>{item.type}</span>
                </span>
                <span className="text-xs font-bold text-[#D4AF37] font-mono bg-[#D4AF37]/10 px-2.5 py-1 rounded-xl border border-[#D4AF37]/20">
                  {item.price}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-sm font-bold text-white leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 font-sans mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Details List */}
              <div className="bg-[#000F21]/80 p-3.5 rounded-2xl border border-white/5 space-y-2">
                <span className="block text-[8px] uppercase tracking-wider font-mono text-slate-500">
                  UTILITIES & PROVISIONS INCLUDED
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px] text-slate-300">
                  {item.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#50C878] shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                <span>{item.location}</span>
              </div>
            </div>

            {/* Direct Contact Button */}
            <div className="pt-3 border-t border-white/5">
              <a
                href={`tel:${item.contact}`}
                className="w-full bg-[#50C878] hover:bg-[#50C878]/90 text-[#000F21] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Direct Contact Host</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
