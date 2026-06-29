import React from "react";
import { 
  Compass, 
  Rss, 
  Briefcase, 
  GraduationCap, 
  Bot, 
  Home, 
  Users, 
  Calendar, 
  Sliders, 
  ShieldAlert, 
  MessageSquare,
  Sparkles,
  Search,
  Bell
} from "lucide-react";
import { UserProfile, UserRole } from "../types";

interface NavigationProps {
  currentTab: string;
  setTab: (tab: string) => void;
  currentUser: UserProfile;
  notificationsCount: number;
  openNotifications: () => void;
  onSearchClick: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  highlight?: boolean;
}

export default function Navigation({ 
  currentTab, 
  setTab, 
  currentUser, 
  notificationsCount, 
  openNotifications,
  onSearchClick
}: NavigationProps) {

  const primaryNavItems: NavItem[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "feed", label: "Feed", icon: Rss },
    { id: "networking", label: "Network", icon: Users },
    { id: "services", label: "Services", icon: Compass },
    { id: "ai", label: "AI Assistant", icon: Bot, highlight: true },
  ];

  const secondaryNavItems: NavItem[] = [
    { id: "events", label: "Events", icon: Calendar },
    { id: "learning", label: "Learning", icon: GraduationCap },
    { id: "jobs", label: "Jobs", icon: Briefcase },
    { id: "bachelor", label: "Bachelors", icon: Sliders },
  ];

  return (
    <div className="w-full flex flex-col bg-[#001F3F] border-b border-white/10 sticky top-0 z-40">
      {/* Top Bar for both Mobile & Desktop */}
      <div className="h-16 px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setTab("home")} 
            className="w-9 h-9 bg-gradient-to-tr from-[#D4AF37] to-[#50C878] rounded-lg p-[1px] cursor-pointer"
          >
            <div className="w-full h-full rounded-[7px] bg-[#000F21] flex items-center justify-center font-bold text-sm text-[#D4AF37]">
              M
            </div>
          </button>
          <div>
            <span className="text-sm font-bold tracking-[0.2em] text-[#D4AF37] block">MYZONE CLUB</span>
            <span className="text-[8px] font-mono tracking-widest text-[#50C878] block uppercase">
              {currentUser.membershipStatus} MEMBER
            </span>
          </div>
        </div>

        {/* Global Search Bar (Simulated Button) & Notifications */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <button
            onClick={onSearchClick}
            className="p-2 text-slate-300 hover:text-white bg-white/5 rounded-xl border border-white/5 hover:border-[#D4AF37]/30 transition-all flex items-center gap-2"
            title="Search database"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400 hidden sm:inline">Search Club...</span>
          </button>

          {/* Notifications Button */}
          <button 
            onClick={openNotifications}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl relative text-slate-300 hover:text-[#D4AF37] transition-all cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white font-mono text-[9px] rounded-full flex items-center justify-center animate-pulse">
                {notificationsCount}
              </span>
            )}
          </button>

          {/* Admin panel navigation if user is Admin */}
          {(currentUser.role === UserRole.ADMIN) && (
            <button
              onClick={() => setTab("admin")}
              className={`p-2 rounded-xl flex items-center gap-1.5 transition-all text-xs font-bold uppercase tracking-wider cursor-pointer ${
                currentTab === "admin" 
                  ? "bg-[#D4AF37] text-[#000F21]" 
                  : "bg-amber-500/10 text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-amber-500/20"
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 animate-bounce" />
              <span className="hidden md:inline">Admin</span>
            </button>
          )}

          {/* Member mini-avatar profile */}
          <button
            onClick={() => setTab("profile")}
            className="flex items-center gap-2 pl-3 border-l border-white/10 cursor-pointer"
          >
            <div className="relative">
              <img 
                src={currentUser.photoUrl} 
                alt={currentUser.name} 
                className="w-9 h-9 rounded-full object-cover border-2 border-[#D4AF37]"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#50C878] border-2 border-[#001F3F] rounded-full" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-white leading-tight truncate max-w-[100px]">
                {currentUser.name.split(" ")[0]}
              </p>
              <p className="text-[9px] text-[#50C878] uppercase tracking-tighter">
                {currentUser.role}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Primary Horizontal Tab Bar for Medium/Large Screens */}
      <div className="hidden md:flex items-center justify-between px-6 bg-[#000F21]/80 border-t border-white/5 py-2">
        <div className="flex gap-1.5 overflow-x-auto pb-1 max-w-full">
          {[...primaryNavItems, ...secondaryNavItems].map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer ${
                  isActive 
                    ? "bg-[#D4AF37] text-[#000F21] font-bold" 
                    : item.highlight
                    ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Messaging Quick Launch */}
        <button
          onClick={() => setTab("chat")}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer ${
            currentTab === "chat"
              ? "bg-[#50C878] text-[#000F21]"
              : "bg-[#50C878]/10 text-[#50C878] hover:bg-[#50C878]/25 border border-[#50C878]/30"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>SUPPORT CHAT</span>
        </button>
      </div>

      {/* Secondary Horizontal Row for Mobile - Fast swipeable category tabs */}
      <div className="flex md:hidden items-center gap-1 overflow-x-auto px-4 py-2 bg-[#000F21]/50 border-t border-white/5 scrollbar-none">
        {secondaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium tracking-tight whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                isActive 
                  ? "bg-[#D4AF37] text-[#000F21] font-bold" 
                  : "bg-white/5 text-slate-300 border border-white/5"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
