import React, { useState, useRef, useEffect } from "react";
import { UserProfile, ChatMessage, UserRole } from "../types";
import { 
  Users, 
  Search, 
  MessageSquare, 
  Send, 
  Sparkles, 
  PhoneCall, 
  MapPin, 
  Briefcase, 
  Filter, 
  Bot, 
  Award,
  CheckCheck
} from "lucide-react";

interface ChatAndNetworkingProps {
  members: UserProfile[];
  currentUser: UserProfile;
  chatMessages: ChatMessage[];
  onSendMessage: (receiverId: string, text: string) => void;
}

export default function ChatAndNetworking({
  members,
  currentUser,
  chatMessages,
  onSendMessage,
}: ChatAndNetworkingProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLookingFor, setSelectedLookingFor] = useState<string>("All");
  const [activePeer, setActivePeer] = useState<UserProfile | null>(null);
  const [textInput, setTextInput] = useState("");
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Filter peers out (excluding self)
  const peers = members.filter(m => m.id !== currentUser.id);

  const filteredPeers = peers.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLookingFor = selectedLookingFor === "All" || p.lookingFor === selectedLookingFor;
    return matchesSearch && matchesLookingFor;
  });

  // Filter messages for active peer conversation
  const peerConversation = chatMessages.filter((msg) => {
    if (!activePeer) return false;
    return (msg.senderId === currentUser.id && msg.receiverId === activePeer.id) ||
           (msg.senderId === activePeer.id && msg.receiverId === currentUser.id);
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim() || !activePeer) return;

    onSendMessage(activePeer.id, textInput);
    setTextInput("");
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [peerConversation]);

  // Set default active peer to first one found if none selected
  useEffect(() => {
    if (!activePeer && filteredPeers.length > 0) {
      setActivePeer(filteredPeers[0]);
    }
  }, [filteredPeers, activePeer]);

  const getLookingForBadgeText = (key: string) => {
    switch (key) {
      case "job": return "Hiring Needs / Job";
      case "business partner": return "Co-founder / Partner";
      case "room": return "Shared Bedspaces";
      case "service": return "Vetted Services";
      case "learning": return "Classes / Learning";
      default: return "Networking";
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4" id="business-directory-chats">
      {/* Editorial Header */}
      <div className="bg-[#001F3F] border border-white/10 p-5 rounded-3xl text-left relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-[#D4AF37] font-mono tracking-widest uppercase font-bold">
            UAE BUSINESS DIRECTORY & SECURE PEER MESSAGES
          </span>
          <h2 className="text-xl font-serif text-white mt-1">
            Connect Instantly with Hub71 Co-Founders, Dubai Investors & Freelancers
          </h2>
        </div>
        <div className="flex gap-2 shrink-0">
          <span className="bg-[#50C878]/10 text-[#50C878] border border-[#50C878]/30 px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold uppercase">
            {filteredPeers.length} Peers Online
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Peer Directory list with filter filters */}
        <div className="lg:col-span-5 space-y-4 flex flex-col h-[75vh] bg-[#001F3F] border border-white/10 rounded-3xl p-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#D4AF37]" /> Directory Matchmaker
          </h3>

          <div className="space-y-2.5">
            {/* Filter tags */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {["All", "networking", "business partner", "job", "room"].map((lf) => (
                <button
                  key={lf}
                  onClick={() => setSelectedLookingFor(lf)}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider whitespace-nowrap border transition-all ${
                    selectedLookingFor === lf
                      ? "bg-[#D4AF37] text-[#000F21] border-[#D4AF37]"
                      : "bg-[#000F21] text-slate-300 border-white/5 hover:border-[#D4AF37]/30"
                  }`}
                >
                  {lf === "All" ? "All Needs" : lf}
                </button>
              ))}
            </div>

            {/* Search inputs */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-slate-400 w-3.5 h-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by name, skills or tech..."
                className="w-full bg-[#000F21] border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Peers List container */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredPeers.length === 0 ? (
              <p className="text-xs text-slate-500 italic text-center py-8">
                No matching directory profiles found.
              </p>
            ) : (
              filteredPeers.map((p) => {
                const isActive = activePeer?.id === p.id;

                return (
                  <div
                    key={p.id}
                    onClick={() => setActivePeer(p)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left flex items-center justify-between gap-3 ${
                      isActive
                        ? "bg-[#D4AF37]/10 border-[#D4AF37]"
                        : "bg-[#000F21]/40 border-white/5 hover:bg-[#000F21]/80 hover:border-[#D4AF37]/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={p.photoUrl} 
                          alt={p.name} 
                          className="w-10 h-10 rounded-full object-cover border-2 border-[#D4AF37]"
                        />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#50C878] border-2 border-[#001F3F] rounded-full animate-pulse" />
                      </div>

                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-white">{p.name}</p>
                        <p className="text-[10px] text-[#D4AF37] truncate max-w-[150px] font-mono">{p.profession}</p>
                        <span className="text-[9px] text-[#50C878] uppercase tracking-wider font-bold">
                          {getLookingForBadgeText(p.lookingFor)}
                        </span>
                      </div>
                    </div>

                    <MessageSquare className={`w-4 h-4 ${isActive ? "text-[#D4AF37]" : "text-slate-500"}`} />
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Active secure conversation box */}
        <div className="lg:col-span-7 flex flex-col h-[75vh] bg-[#001F3F] border border-white/10 rounded-3xl overflow-hidden">
          {activePeer ? (
            <>
              {/* Box Header */}
              <div className="p-4 bg-[#000F21]/60 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img 
                    src={activePeer.photoUrl} 
                    alt={activePeer.name} 
                    className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                  />
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-white">{activePeer.name}</h4>
                    <p className="text-[10px] text-[#50C878] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#50C878] animate-pulse" />
                      {activePeer.location}
                    </p>
                  </div>
                </div>

                <a
                  href={`tel:${activePeer.mobile}`}
                  className="p-2.5 bg-white/5 hover:bg-[#D4AF37]/15 rounded-xl border border-white/10 hover:border-[#D4AF37]/30 text-slate-300 hover:text-[#D4AF37] transition-all"
                  title="Call Partner"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>
              </div>

              {/* Box Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {peerConversation.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                    <MessageSquare className="w-10 h-10 text-slate-600 opacity-40 animate-pulse" />
                    <p className="text-xs text-slate-400 font-sans">
                      This is the beginning of your premium encrypted chat history with <b className="text-[#D4AF37]">{activePeer.name}</b>.
                    </p>
                    <p className="text-[10px] text-slate-500 max-w-xs">
                      Introduce your venture ideas, find freezone setup hacks, or discuss bedroom leasing details.
                    </p>
                  </div>
                ) : (
                  peerConversation.map((m) => {
                    const isSelf = m.senderId === currentUser.id;

                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col ${
                          isSelf ? "items-end" : "items-start"
                        }`}
                      >
                        <span className="text-[9px] text-slate-500 mb-0.5">
                          {isSelf ? "You" : activePeer.name}
                        </span>

                        <div
                          className={`p-3 rounded-2xl text-xs leading-relaxed max-w-[80%] ${
                            isSelf
                              ? "bg-[#D4AF37] text-[#000F21] font-semibold rounded-tr-none"
                              : "bg-[#000F21] text-slate-200 border border-white/5 rounded-tl-none font-sans"
                          }`}
                        >
                          <p>{m.message}</p>
                          
                          {isSelf && (
                            <div className="flex justify-end mt-1 text-[9px] opacity-75">
                              <CheckCheck className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Box Send Input */}
              <form onSubmit={handleSend} className="p-3 bg-[#000F21]/60 border-t border-white/10 flex gap-2">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={`Write a professional pitch or proposal to ${activePeer.name.split(" ")[0]}...`}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  disabled={!textInput.trim()}
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#000F21] p-3 rounded-xl transition-all font-bold disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <MessageSquare className="w-12 h-12 text-[#D4AF37] opacity-20" />
              <p className="text-xs text-slate-400 mt-2">
                Select a UAE professional from the directory column to launch instant encrypted messenger support.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
