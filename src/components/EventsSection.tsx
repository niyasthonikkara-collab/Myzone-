import React, { useState } from "react";
import { EventItem, UserProfile } from "../types";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Sparkles, 
  Ticket, 
  QrCode, 
  Check, 
  X, 
  DollarSign, 
  ChevronRight,
  Bookmark
} from "lucide-react";

interface EventsSectionProps {
  events: EventItem[];
  currentUser: UserProfile;
  onRSVP: (eventId: string) => void;
}

export default function EventsSection({
  events,
  currentUser,
  onRSVP,
}: EventsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeTicket, setActiveTicket] = useState<EventItem | null>(null);

  const categories = ["All", "Business Meetup", "Public Speaking", "Startup Discussion", "Learning Session", "Community Gathering"];

  const filtered = selectedCategory === "All"
    ? events
    : events.filter(e => e.category === selectedCategory);

  const formatEventDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleRSVPAction = (evt: EventItem) => {
    onRSVP(evt.id);
    // Open dynamic ticket modal to reveal QR code
    setActiveTicket(evt);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4" id="events-hub">
      {/* Editorial Header Card */}
      <div className="bg-gradient-to-r from-[#002B5B] to-[#001F3F] p-6 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] blur-[80px] opacity-20" />
        <span className="text-[10px] text-[#50C878] font-mono tracking-widest uppercase font-bold">
          CURATED CLUB MEETS
        </span>
        <h2 className="text-2xl font-serif text-white mt-1 leading-tight">
          High-Profile Business Discussions <br className="hidden sm:inline" /> & Community Gatherings in UAE
        </h2>
        <p className="text-slate-400 text-xs mt-2 max-w-xl font-sans leading-relaxed">
          Unlock exclusive masterminds, investor pitchings, public speaking bootcamps, and friendly bachelor community dinners across Dubai, Sharjah, and Abu Dhabi.
        </p>
      </div>

      {/* Categories Filter Tabs */}
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

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((evt) => {
          const isRSVPed = evt.rsvpList.includes(currentUser.id);

          return (
            <div
              key={evt.id}
              className="bg-[#001F3F] border border-white/10 rounded-3xl overflow-hidden hover:border-[#D4AF37]/30 transition-all flex flex-col justify-between"
              id={`event-card-${evt.id}`}
            >
              {/* Event Image & Badges */}
              <div className="relative h-44 w-full bg-slate-800">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-3 left-3 bg-[#000F21]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>{evt.category}</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-slate-900/90 text-white font-mono text-[10px] px-2.5 py-1 rounded-md border border-white/15">
                  Cost: <b className="text-[#50C878] font-bold">{evt.cost}</b>
                </div>
              </div>

              {/* Event Content Details */}
              <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] text-[#D4AF37] font-mono uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatEventDate(evt.dateTime)}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-2">
                    {evt.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-[#50C878]" />
                      <span>{evt.rsvpCount} members attending</span>
                    </div>

                    {isRSVPed && (
                      <span className="text-[10px] bg-[#50C878]/10 text-[#50C878] px-2.5 py-0.5 rounded uppercase font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Registered
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0">
                {isRSVPed ? (
                  <button
                    onClick={() => setActiveTicket(evt)}
                    className="w-full bg-[#50C878]/10 hover:bg-[#50C878]/20 text-[#50C878] border border-[#50C878]/40 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Show Event Ticket QR</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleRSVPAction(evt)}
                    className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#000F21] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/5"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>RSVP & Get QR Ticket</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* QR Ticket Modal overlay */}
      {activeTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-fade-in">
          <div className="bg-[#001F3F] border border-[#D4AF37]/30 rounded-3xl max-w-sm w-full p-6 text-center space-y-5 relative">
            <button
              onClick={() => setActiveTicket(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] bg-amber-500/10 text-[#D4AF37] px-3 py-1 rounded-full uppercase tracking-widest font-bold inline-block">
              Confirmed Event Ticket
            </span>

            {/* Simulated Luxury Boarding Pass Ticket */}
            <div className="bg-[#000F21] p-5 rounded-2xl border border-white/5 space-y-4">
              <div className="pb-3 border-b border-white/10">
                <h4 className="text-sm font-serif font-bold text-white leading-snug">
                  {activeTicket.title}
                </h4>
                <p className="text-[10px] text-[#50C878] font-mono mt-1 uppercase tracking-wider">
                  {formatEventDate(activeTicket.dateTime)}
                </p>
              </div>

              {/* Animated/Glowing QR Code placeholder */}
              <div className="bg-white p-3 rounded-xl inline-block mx-auto shadow-2xl relative">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                    `MYZONE_CLUB_EVENT_${activeTicket.id}_USER_${currentUser.id}`
                  )}`}
                  alt="Verified Ticket QR"
                  className="w-36 h-36"
                />
                <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-xl pointer-events-none animate-pulse" />
              </div>

              <div className="text-left text-[11px] space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Attendee:</span>
                  <span className="font-bold text-white">{currentUser.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tier Status:</span>
                  <span className="font-bold text-[#D4AF37] uppercase">{currentUser.membershipStatus} Member</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Venue:</span>
                  <span className="font-bold text-white truncate max-w-[150px]">{activeTicket.location}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] text-[#50C878] flex items-center justify-center gap-1">
                <Check className="w-4 h-4" /> Entry QR Verified & Active
              </p>
              <p className="text-[9px] text-slate-500">
                Please present this screen at the entrance check-in counter. Contact support if you need to modify your RSVP.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
