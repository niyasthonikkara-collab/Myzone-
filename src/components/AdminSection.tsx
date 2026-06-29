import React, { useState } from "react";
import { UserProfile, Post, ServiceItem, JobOpportunity, UserRole } from "../types";
import { 
  Users, 
  Check, 
  X, 
  ShieldCheck, 
  TrendingUp, 
  Bell, 
  FileText, 
  Layers, 
  Sparkles, 
  CheckCircle,
  Clock,
  Heart,
  ChevronRight,
  Send,
  Trash
} from "lucide-react";

interface AdminSectionProps {
  members: UserProfile[];
  posts: Post[];
  services: ServiceItem[];
  jobs: JobOpportunity[];
  onApproveMember: (memberId: string) => void;
  onApproveService: (serviceId: string) => void;
  onApproveJob: (jobId: string) => void;
  onDeletePost: (postId: string) => void;
  onSendAnnouncement: (title: string, body: string) => void;
}

export default function AdminSection({
  members,
  posts,
  services,
  jobs,
  onApproveMember,
  onApproveService,
  onApproveJob,
  onDeletePost,
  onSendAnnouncement,
}: AdminSectionProps) {
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementBody, setAnnouncementBody] = useState("");

  const pendingMembers = members.filter(m => !m.isApproved);
  const pendingServices = services.filter(s => !s.isApproved);
  const pendingJobs = jobs.filter(j => !j.isApproved);

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementTitle.trim() || !announcementBody.trim()) return;

    onSendAnnouncement(announcementTitle, announcementBody);
    alert("Global Announcement successfully broadcasted to all active MYZONE CLUB members!");
    setAnnouncementTitle("");
    setAnnouncementBody("");
  };

  // Math metrics for summary
  const totalPremiumAndVip = members.filter(m => m.membershipStatus !== "Free").length;
  const simulatedMonthlyRevenue = (totalPremiumAndVip * 299) + 1200; // Mock AED setup

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4" id="admin-analytics-dashboard">
      {/* Upper Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-[#001F3F] border border-[#D4AF37]/30 p-5 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37] blur-[40px] opacity-15" />
          <p className="text-[10px] text-[#D4AF37] font-mono tracking-widest uppercase">
            Total UAE Club Members
          </p>
          <p className="text-3xl font-bold text-white font-serif mt-2">{members.length}</p>
          <span className="text-[9px] text-[#50C878] font-mono block mt-1">
            +14% increase this week
          </span>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#001F3F] border border-white/10 p-5 rounded-3xl relative overflow-hidden">
          <p className="text-[10px] text-[#50C878] font-mono tracking-widest uppercase">
            Est. Monthly Revenue
          </p>
          <p className="text-3xl font-bold text-white font-serif mt-2">
            AED {simulatedMonthlyRevenue.toLocaleString()}
          </p>
          <span className="text-[9px] text-slate-400 block mt-1">
            From VIP and Premium memberships
          </span>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#001F3F] border border-white/10 p-5 rounded-3xl relative overflow-hidden">
          <p className="text-[10px] text-sky-400 font-mono tracking-widest uppercase">
            Total Active Postings
          </p>
          <p className="text-3xl font-bold text-white font-serif mt-2">
            {posts.length + services.length + jobs.length}
          </p>
          <span className="text-[9px] text-[#50C878] font-mono block mt-1">
            Across feed, directory & jobs
          </span>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#001F3F] border border-[#50C878]/30 p-5 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#50C878] blur-[40px] opacity-15" />
          <p className="text-[10px] text-[#50C878] font-mono tracking-widest uppercase">
            Pending Approvings
          </p>
          <p className="text-3xl font-bold text-[#50C878] font-serif mt-2">
            {pendingMembers.length + pendingServices.length + pendingJobs.length}
          </p>
          <span className="text-[9px] text-slate-400 block mt-1">
            Requires your manual green light
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pending Approvals Queue */}
        <div className="lg:col-span-7 space-y-6">
          {/* Members approval queue */}
          <div className="bg-[#001F3F] border border-white/10 rounded-3xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-2">
              <Users className="w-4.5 h-4.5" /> Pending UAE Member Profiles ({pendingMembers.length})
            </h3>

            {pendingMembers.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-4">
                No profiles awaiting approval. All active users verified!
              </p>
            ) : (
              <div className="space-y-3">
                {pendingMembers.map((m) => (
                  <div key={m.id} className="p-3 bg-[#000F21]/60 rounded-2xl border border-white/5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={m.photoUrl} alt={m.name} className="w-9 h-9 rounded-full object-cover border border-[#D4AF37]" />
                      <div className="text-left">
                        <p className="text-xs font-bold text-white">{m.name}</p>
                        <p className="text-[10px] text-[#D4AF37] italic truncate max-w-[150px]">{m.profession}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => onApproveMember(m.id)}
                        className="bg-[#50C878] text-[#000F21] p-1.5 rounded-lg font-bold hover:scale-105 transition-all text-[11px]"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Jobs approval queue */}
          <div className="bg-[#001F3F] border border-white/10 rounded-3xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#50C878] flex items-center gap-2">
              <Layers className="w-4.5 h-4.5" /> Pending Job Board Submissions ({pendingJobs.length})
            </h3>

            {pendingJobs.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-4">
                No corporate listings waiting in queue.
              </p>
            ) : (
              <div className="space-y-3">
                {pendingJobs.map((j) => (
                  <div key={j.id} className="p-3 bg-[#000F21]/60 rounded-2xl border border-white/5 flex items-center justify-between gap-4">
                    <div className="text-left space-y-1">
                      <p className="text-xs font-bold text-white">{j.title}</p>
                      <p className="text-[10px] text-slate-400">At {j.company} ({j.salary})</p>
                    </div>
                    <button 
                      onClick={() => onApproveJob(j.id)}
                      className="bg-[#50C878] text-[#000F21] px-3 py-1.5 rounded-lg text-[10px] font-bold"
                    >
                      Approve Job
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Delete Posts helper list */}
          <div className="bg-[#001F3F] border border-white/10 rounded-3xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
              <FileText className="w-4.5 h-4.5 text-rose-400" /> Community Post Moderation ({posts.length})
            </h3>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {posts.map((post) => (
                <div key={post.id} className="p-3 bg-[#000F21]/40 rounded-xl border border-white/5 flex items-start justify-between gap-4">
                  <div className="text-left space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-slate-400 font-bold">{post.authorName}</span>
                      <span className="text-[9px] bg-[#D4AF37]/10 text-[#D4AF37] px-1.5 py-0.2 rounded font-mono uppercase">{post.category}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-sans line-clamp-1">{post.content}</p>
                  </div>
                  <button 
                    onClick={() => onDeletePost(post.id)}
                    className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded"
                    title="Remove post"
                  >
                    <Trash className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Broadcast announcements */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#001F3F] border border-white/10 rounded-3xl p-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/5">
              <div className="p-2 bg-amber-500/10 rounded-xl text-[#D4AF37]">
                <Bell className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Send Global Announcement</h4>
                <p className="text-[10px] text-slate-400">Pushes notification and alert banner instantly</p>
              </div>
            </div>

            <form onSubmit={handleSendAnnouncement} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                  Announcement Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Mentoring with Al-Suwaidi Tomorrow!"
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                  className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                  Announcement Body (Message details)
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Details on venue timings, zoom links, or crucial regulatory changes for UAE business licenses."
                  value={announcementBody}
                  onChange={(e) => setAnnouncementBody(e.target.value)}
                  className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#000F21] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/10"
              >
                <Send className="w-4 h-4" />
                <span>Broadcast Announcement</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
