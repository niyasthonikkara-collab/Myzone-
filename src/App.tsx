import React, { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import Navigation from "./components/Navigation";
import CommunityFeedSection from "./components/CommunityFeedSection";
import ServicesSection from "./components/ServicesSection";
import EventsSection from "./components/EventsSection";
import LearningSection from "./components/LearningSection";
import JobOpportunitySection from "./components/JobOpportunitySection";
import BachelorSection from "./components/BachelorSection";
import MyZoneAI from "./components/MyZoneAI";
import SettingsAndProfile from "./components/SettingsAndProfile";
import AdminSection from "./components/AdminSection";
import ChatAndNetworking from "./components/ChatAndNetworking";

// Types & Initial Data
import { 
  UserProfile, 
  Post, 
  ServiceItem, 
  EventItem, 
  Course, 
  JobOpportunity, 
  BachelorItem, 
  ChatMessage, 
  NotificationItem, 
  MembershipPlan, 
  UserRole,
  Comment
} from "./types";

import { 
  initialMembers, 
  initialPosts, 
  initialServices, 
  initialEvents, 
  initialCourses, 
  initialJobs, 
  initialBachelorSolutions, 
  initialNotifications 
} from "./initialData";

// Icons
import { 
  Compass, 
  Sparkles, 
  ShieldAlert, 
  Check, 
  ArrowRight, 
  PhoneCall, 
  MessageSquare, 
  MapPin, 
  Briefcase, 
  Sliders, 
  Bot, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  X, 
  QrCode, 
  CreditCard, 
  Info,
  Users,
  Search,
  CheckCircle,
  AlertTriangle,
  GraduationCap
} from "lucide-react";

export default function App() {
  // Application Stage
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  
  // Navigation
  const [currentTab, setTab] = useState("home"); // home, feed, networking, services, events, learning, jobs, bachelor, ai, profile, admin, chat
  
  // Global App States
  const [members, setMembers] = useState<UserProfile[]>(initialMembers);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [jobs, setJobs] = useState<JobOpportunity[]>(initialJobs);
  const [bachelorSolutions, setBachelorSolutions] = useState<BachelorItem[]>(initialBachelorSolutions);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  
  // Secure Chat messages between members
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "m_1",
      senderId: "user_1",
      senderName: "Faris Al-Suwaidi",
      senderPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      receiverId: "admin_1",
      message: "Zayn, when are we releasing the new VIP business mentoring calendar for Abu Dhabi?",
      timestamp: "2026-06-29T10:00:00Z"
    },
    {
      id: "m_2",
      senderId: "admin_1",
      senderName: "Zayn Al-Mansoori",
      senderPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
      receiverId: "user_1",
      message: "Hi Faris! Just finished formatting the courses. Releasing them tomorrow 10 AM GCC time.",
      timestamp: "2026-06-29T10:15:00Z"
    }
  ]);

  // Active Authenticated user (Default is Admin/Lead "Zayn Al-Mansoori" to allow preview of all boards, or can login as Faris/Aisha/Rahul)
  const [currentUser, setCurrentUser] = useState<UserProfile>(initialMembers[4]); // Zayn Al-Mansoori

  // UI Overlays & Search states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [targetPaymentPlan, setTargetPaymentPlan] = useState<MembershipPlan>(MembershipPlan.PREMIUM);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  // Payment Form simulated input state
  const [cardNumber, setCardNumber] = useState("4000 1234 5678 9010");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("123");
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Authentication Input fields
  const [loginPhone, setLoginPhone] = useState("+971 50 ");
  const [loginEmail, setLoginEmail] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupProfession, setSignupProfession] = useState("");
  const [signupLookingFor, setSignupLookingFor] = useState<UserProfile["lookingFor"]>("networking");

  // Admin and State Reducers/Handlers
  const handleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const alreadyLiked = p.likedBy.includes(currentUser.id);
      return {
        ...p,
        likesCount: alreadyLiked ? p.likesCount - 1 : p.likesCount + 1,
        likedBy: alreadyLiked ? p.likedBy.filter(id => id !== currentUser.id) : [...p.likedBy, currentUser.id]
      };
    }));
  };

  const handleSavePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const alreadySaved = p.savedBy.includes(currentUser.id);
      return {
        ...p,
        savedBy: alreadySaved ? p.savedBy.filter(id => id !== currentUser.id) : [...p.savedBy, currentUser.id]
      };
    }));
  };

  const handleAddComment = (postId: string, text: string) => {
    const newComment: Comment = {
      id: `c_${Date.now()}`,
      authorName: currentUser.name,
      authorPhoto: currentUser.photoUrl,
      content: text,
      createdAt: new Date().toISOString()
    };
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return { ...p, comments: [...p.comments, newComment] };
    }));
  };

  const handleAddPost = (payload: any) => {
    const newPost: Post = {
      ...payload,
      id: `post_${Date.now()}`,
      likesCount: 0,
      likedBy: [],
      comments: [],
      sharesCount: 0,
      savedBy: [],
      createdAt: new Date().toISOString()
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const handleAddService = (payload: any) => {
    const newService: ServiceItem = {
      ...payload,
      id: `ser_${Date.now()}`,
      providerPhoto: currentUser.photoUrl,
      providerName: currentUser.name,
      rating: 5.0,
      isApproved: currentUser.role === UserRole.ADMIN, // auto approve if admin
    };
    setServices(prev => [newService, ...prev]);
    alert(currentUser.role === UserRole.ADMIN ? "Service added instantly!" : "Service submitted successfully! Awaiting Admin approval.");
  };

  const handleAddJob = (payload: any) => {
    const newJob: JobOpportunity = {
      ...payload,
      id: `job_${Date.now()}`,
      appliesCount: 0,
      appliedBy: [],
      isApproved: currentUser.role === UserRole.ADMIN, // auto approve if admin
      createdAt: new Date().toISOString()
    };
    setJobs(prev => [newJob, ...prev]);
    alert(currentUser.role === UserRole.ADMIN ? "Job opportunity posted instantly!" : "Opportunity submitted! Awaiting Admin approval.");
  };

  const handleApplyJob = (jobId: string) => {
    setJobs(prev => prev.map(j => {
      if (j.id !== jobId) return j;
      return {
        ...j,
        appliesCount: j.appliesCount + 1,
        appliedBy: [...j.appliedBy, currentUser.id]
      };
    }));
    alert("Application submitted! Direct WhatsApp channel is active.");
  };

  const handleRSVP = (eventId: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id !== eventId) return e;
      const registered = e.rsvpList.includes(currentUser.id);
      return {
        ...e,
        rsvpCount: registered ? e.rsvpCount - 1 : e.rsvpCount + 1,
        rsvpList: registered ? e.rsvpList.filter(id => id !== currentUser.id) : [...e.rsvpList, currentUser.id]
      };
    }));
  };

  const handleBookService = (service: ServiceItem) => {
    alert(`Inquiry sent to ${service.providerName} for "${service.title}". They will reach out to you on ${currentUser.mobile} via WhatsApp.`);
  };

  const handleSendMessage = (receiverId: string, text: string) => {
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderPhoto: currentUser.photoUrl,
      receiverId,
      message: text,
      timestamp: new Date().toISOString()
    };
    setChatMessages(prev => [...prev, newMsg]);

    // Simple auto-reply simulation for interactive feel
    setTimeout(() => {
      const recipient = members.find(m => m.id === receiverId);
      const mockReply: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        senderId: receiverId,
        senderName: recipient?.name || "Member Helpdesk",
        senderPhoto: recipient?.photoUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
        receiverId: currentUser.id,
        message: `Got your note! Let's arrange a quick meetup at DIFC Creative Lounge or Hub71 this week. Let me know what time works!`,
        timestamp: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, mockReply]);
    }, 2000);
  };

  // Admin approvals
  const handleApproveMember = (memberId: string) => {
    setMembers(prev => prev.map(m => m.id === memberId ? { ...m, isApproved: true } : m));
    alert("Member successfully approved!");
  };

  const handleApproveService = (serviceId: string) => {
    setServices(prev => prev.map(s => s.id === serviceId ? { ...s, isApproved: true } : s));
    alert("Service approved for live directory!");
  };

  const handleApproveJob = (jobId: string) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, isApproved: true } : j));
    alert("Job board posting successfully approved!");
  };

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    alert("Post removed successfully.");
  };

  const handleSendAnnouncement = (title: string, body: string) => {
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title,
      content: body,
      type: "admin",
      createdAt: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Simulated Payment Gateways
  const triggerUpgradePayment = (plan: MembershipPlan) => {
    setTargetPaymentPlan(plan);
    setShowPaymentModal(true);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentLoading(true);

    setTimeout(() => {
      setPaymentLoading(false);
      setShowPaymentModal(false);
      setCurrentUser(prev => ({
        ...prev,
        membershipStatus: targetPaymentPlan
      }));
      
      // Post announcement notice
      const updateNotice: NotificationItem = {
        id: `notif_${Date.now()}`,
        title: `Plan Upgraded to ${targetPaymentPlan}! 🚀`,
        content: `Thank you! Your account has been upgraded. You now have complete access to co-founder matchmakers, MYZONE AI pro questions, and ticket discounts.`,
        type: "admin",
        createdAt: new Date().toISOString(),
        read: false
      };
      setNotifications(prev => [updateNotice, ...prev]);

      alert(`Success! Payment of AED 299 processed securely via MYZONE club gateway. You are now a ${targetPaymentPlan} member.`);
    }, 1500);
  };

  // Authentication Flows
  const handleDemoLogin = (userIndex: number) => {
    // fast login as predefined members for testing
    const chosenUser = members[userIndex];
    setCurrentUser(chosenUser);
    setIsAuthenticated(true);
    setTab("home");
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail && !loginPhone) return;

    // Simulate login
    const randomUser: UserProfile = {
      id: `user_${Date.now()}`,
      name: loginEmail ? loginEmail.split("@")[0].toUpperCase() : "Member Applet",
      email: loginEmail || "user@myzone.club",
      mobile: loginPhone || "+971 50 000 0000",
      photoUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
      location: "Dubai Marina, Dubai",
      profession: "UAE Freelancer",
      skills: ["Consulting", "Finance"],
      businessInterest: "UAE startup setup",
      lookingFor: "networking",
      membershipStatus: MembershipPlan.FREE,
      role: UserRole.MEMBER,
      isApproved: true,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(randomUser);
    setMembers(prev => [...prev, randomUser]);
    setIsAuthenticated(true);
    setTab("home");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupProfession) return;

    const registeredUser: UserProfile = {
      id: `user_${Date.now()}`,
      name: signupName,
      email: `${signupName.toLowerCase().replace(/\s+/g, "")}@myzone.club`,
      mobile: "+971 50 111 2222",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
      location: "JLT Cluster, Dubai",
      profession: signupProfession,
      skills: ["Sales", "Product Management"],
      businessInterest: "Expanding across GCC markets",
      lookingFor: signupLookingFor,
      membershipStatus: MembershipPlan.FREE,
      role: UserRole.MEMBER,
      isApproved: true,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(registeredUser);
    setMembers(prev => [...prev, registeredUser]);
    setIsAuthenticated(true);
    setTab("home");
  };

  // Search filter math
  const getGlobalSearchResults = () => {
    if (!globalSearchQuery.trim()) return [];
    const query = globalSearchQuery.toLowerCase();
    
    const results: any[] = [];
    
    // Search members
    members.forEach(m => {
      if (m.name.toLowerCase().includes(query) || m.profession.toLowerCase().includes(query)) {
        results.push({ type: "Member", title: m.name, subtitle: m.profession, tab: "networking" });
      }
    });

    // Search services
    services.forEach(s => {
      if (s.title.toLowerCase().includes(query) || s.description.toLowerCase().includes(query)) {
        results.push({ type: "Service", title: s.title, subtitle: s.category, tab: "services" });
      }
    });

    // Search events
    events.forEach(e => {
      if (e.title.toLowerCase().includes(query) || e.description.toLowerCase().includes(query)) {
        results.push({ type: "Event", title: e.title, subtitle: e.category, tab: "events" });
      }
    });

    // Search jobs
    jobs.forEach(j => {
      if (j.title.toLowerCase().includes(query) || j.company.toLowerCase().includes(query)) {
        results.push({ type: "Job", title: j.title, subtitle: `${j.company} • ${j.location}`, tab: "jobs" });
      }
    });

    return results;
  };

  // Splash screen transition
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#000F21] text-white flex flex-col font-sans" id="myzone-club-app">
      {/* 1. LANDING PAGE STAGE (if not logged in) */}
      {!isAuthenticated ? (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-20 border-b border-white/10 flex items-center justify-between px-6 md:px-12 bg-[#001F3F]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#D4AF37] rounded flex items-center justify-center font-bold text-lg text-[#001F3F]">
                M
              </div>
              <span className="text-base font-bold tracking-[0.2em] text-[#D4AF37]">MYZONE CLUB</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleDemoLogin(4)} // Fast login as Admin
                className="text-slate-300 hover:text-white text-xs uppercase tracking-wider font-bold hidden sm:inline"
              >
                Fast Preview
              </button>
              <button 
                onClick={() => setIsAuthenticated(true)}
                className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                Log In
              </button>
            </div>
          </header>

          {/* Hero Content */}
          <main className="flex-1 max-w-6xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left pitch text */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 px-3.5 py-1 rounded-full font-mono uppercase tracking-widest font-bold inline-block">
                DUBAI • ABU DHABI • SHARJAH
              </span>

              <h1 className="text-4xl md:text-6xl font-serif leading-tight font-extrabold text-white">
                Connect. <br />
                <span className="italic text-[#D4AF37]">Grow.</span> <br />
                Belong.
              </h1>

              <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-lg font-sans">
                A premium, mobile-first ecosystem and directory for entrepreneurs, bachelors, professionals, and freelancers in the United Arab Emirates. Tap into co-founder matching, corporate PRO setups, vetted meal plans, carpools, and 24/7 legal aid.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 pt-4">
                <button 
                  onClick={() => setShowSignup(true)}
                  className="bg-[#D4AF37] hover:bg-[#D4AF37]/95 text-[#000F21] px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-xs shadow-xl shadow-[#D4AF37]/15 hover:scale-105 transition-all cursor-pointer"
                >
                  Join the Club
                </button>
                <button 
                  onClick={() => setIsAuthenticated(true)}
                  className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-all cursor-pointer"
                >
                  Explore Services
                </button>
              </div>

              {/* Verified member metric */}
              <div className="pt-8 border-t border-white/10 flex items-center gap-6">
                <div>
                  <p className="text-2xl font-serif font-bold text-white">1,248+</p>
                  <p className="text-[9px] text-[#50C878] uppercase tracking-widest font-bold mt-1">Active UAE Members</p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-white">15+</p>
                  <p className="text-[9px] text-[#D4AF37] uppercase tracking-widest font-bold mt-1">Sectors Covered</p>
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-[#50C878]">24/7</p>
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-1">Emergency Help desk</p>
                </div>
              </div>
            </div>

            {/* Right Authentications panel */}
            <div className="lg:col-span-5 bg-[#001F3F] border border-white/10 p-6 sm:p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] blur-[70px] opacity-10 rounded-full" />
              
              {!showSignup ? (
                // Login Flow
                <form onSubmit={handleCustomLogin} className="space-y-4 text-xs text-left">
                  <h3 className="text-base font-serif font-bold text-[#D4AF37] pb-3 border-b border-white/5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Access Club Hub
                  </h3>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-bold">
                      UAE Mobile Phone Number
                    </label>
                    <input
                      type="tel"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      placeholder="+971 50 123 4567"
                      className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-bold">
                      Or Email Address
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="name@company.ae"
                      className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D4AF37] text-[#000F21] py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs"
                  >
                    Authenticate Securely
                  </button>

                  {/* Fast demo presets */}
                  <div className="pt-4 border-t border-white/5 space-y-2">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                      Quick Demo Accounts
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <button
                        type="button"
                        onClick={() => handleDemoLogin(4)} // Admin
                        className="p-2 bg-amber-500/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg font-bold text-center hover:bg-amber-500/20"
                      >
                        Zayn (Admin MD)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDemoLogin(0)} // Faris
                        className="p-2 bg-emerald-500/10 border border-[#50C878]/30 text-[#50C878] rounded-lg font-bold text-center hover:bg-emerald-500/20"
                      >
                        Faris (VIP Leader)
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center pt-2">
                    Don't have an account yet?{" "}
                    <button 
                      type="button" 
                      onClick={() => setShowSignup(true)}
                      className="text-[#D4AF37] font-bold underline"
                    >
                      Sign Up
                    </button>
                  </p>
                </form>
              ) : (
                // Signup Flow
                <form onSubmit={handleSignup} className="space-y-4 text-xs text-left">
                  <h3 className="text-base font-serif font-bold text-[#D4AF37] pb-3 border-b border-white/5 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Create Profile
                  </h3>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-bold">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Salim Al-Khatib"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-bold">
                      Profession / Specialty
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Financial Consultant"
                      value={signupProfession}
                      onChange={(e) => setSignupProfession(e.target.value)}
                      className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white placeholder-slate-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-bold">
                      Primary Goal in UAE
                    </label>
                    <select
                      value={signupLookingFor}
                      onChange={(e) => setSignupLookingFor(e.target.value as any)}
                      className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white focus:outline-none"
                    >
                      <option value="networking">Expand Business Networks</option>
                      <option value="business partner">Find Co-founders / Investors</option>
                      <option value="job">Find a Job</option>
                      <option value="room">Find Room or Flatmates</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D4AF37] text-[#000F21] py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs"
                  >
                    Register as Member
                  </button>

                  <p className="text-[11px] text-slate-400 text-center pt-2">
                    Already a registered member?{" "}
                    <button 
                      type="button" 
                      onClick={() => setShowSignup(false)}
                      className="text-[#D4AF37] font-bold underline"
                    >
                      Log In
                    </button>
                  </p>
                </form>
              )}
            </div>
          </main>

          {/* Luxury footer */}
          <footer className="h-16 border-t border-white/5 px-6 flex items-center justify-between text-[10px] tracking-widest uppercase text-slate-500 bg-[#000F21] mt-auto">
            <span>© 2026 MYZONE CLUB • All rights reserved</span>
            <span className="text-white/20 hidden sm:inline">Connect • Grow • Belong</span>
          </footer>
        </div>
      ) : (
        // 2. PREMIUM AUTHENTICATED WORKSPACE
        <div className="flex-1 flex flex-col">
          {/* Navigation Bar */}
          <Navigation 
            currentTab={currentTab} 
            setTab={setTab} 
            currentUser={currentUser}
            notificationsCount={notifications.filter(n => !n.read).length}
            openNotifications={() => setShowNotificationsDrawer(true)}
            onSearchClick={() => setShowSearchModal(true)}
          />

          {/* Active Content Body */}
          <div className="flex-1 pb-16 md:pb-6">
            {currentTab === "home" && (
              <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-6 text-left">
                {/* Welcome Board */}
                <div className="bg-gradient-to-br from-[#002B5B] to-[#001F3F] p-6 rounded-3xl border border-white/10 relative overflow-hidden animate-slide-up">
                  <div className="absolute top-1/2 -right-12 w-64 h-64 bg-[#D4AF37] blur-[100px] opacity-15 rounded-full" />
                  <span className="text-[9px] text-[#50C878] font-mono tracking-[0.2em] uppercase font-bold">
                    THE CORPORATE BOARD
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif text-white mt-1 leading-tight">
                    Marhaban, {currentUser.name.split(" ")[0]}! <br className="hidden sm:inline" /> Your Premium UAE Launchpad is Active.
                  </h2>
                  <p className="text-xs text-slate-400 mt-2 max-w-2xl font-sans leading-relaxed">
                    Welcome back to the premier directory matching hub. Review custom-matched co-founders, fast-track your freezone licensing guidance, search Al Barsha 1 shared bedspaces, and query <b>MYZONE AI</b> for immediate pitch writing.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-5">
                    <button 
                      onClick={() => setTab("ai")}
                      className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#000F21] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-[#D4AF37]/5"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span>Ask MYZONE AI</span>
                    </button>
                    <button 
                      onClick={() => triggerUpgradePayment(MembershipPlan.VIP)}
                      className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Upgrade Plan
                    </button>
                  </div>
                </div>

                {/* Dashboard grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column (8 cols): Announcements, Featured, popular services */}
                  <div className="lg:col-span-8 space-y-6">
                    {/* Active notices */}
                    <div className="bg-[#001F3F] border border-white/10 rounded-3xl p-5 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-[#50C878]" /> Live Club Announcements
                      </h3>
                      
                      <div className="space-y-3">
                        {notifications.slice(0, 2).map((n) => (
                          <div key={n.id} className="p-3.5 bg-[#000F21]/40 border border-white/5 rounded-2xl flex items-start gap-3">
                            <span className="p-2 bg-amber-500/10 rounded-lg text-[#D4AF37] shrink-0 font-mono text-[9px] uppercase font-bold text-center">
                              Notice
                            </span>
                            <div>
                              <h4 className="text-xs font-bold text-white leading-snug">{n.title}</h4>
                              <p className="text-[11px] text-slate-400 font-sans mt-0.5">{n.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Featured Members directory snippet */}
                    <div className="bg-[#001F3F] border border-white/10 rounded-3xl p-5 space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                          <Users className="w-4.5 h-4.5 text-[#50C878]" /> Featured UAE Innovators
                        </h3>
                        <button 
                          onClick={() => setTab("networking")}
                          className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-bold hover:underline"
                        >
                          View Directory
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {members.filter(m => m.isFeatured).slice(0, 2).map((m) => (
                          <div 
                            key={m.id} 
                            onClick={() => setTab("networking")}
                            className="bg-[#000F21]/60 p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 cursor-pointer hover:border-[#D4AF37]/40 transition-all"
                          >
                            <img src={m.photoUrl} alt={m.name} className="w-11 h-11 rounded-full object-cover border border-[#D4AF37]" />
                            <div className="text-left space-y-0.5">
                              <p className="text-xs font-bold text-white">{m.name}</p>
                              <p className="text-[10px] text-slate-400 truncate max-w-[150px] font-mono">{m.profession}</p>
                              <span className="text-[9px] bg-[#D4AF37]/10 text-[#D4AF37] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                                {m.membershipStatus}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Popular Services section */}
                    <div className="bg-[#001F3F] border border-white/10 rounded-3xl p-5 space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white flex items-center gap-2">
                          <Compass className="w-4.5 h-4.5 text-[#D4AF37]" /> In-Demand Vetted Services
                        </h3>
                        <button 
                          onClick={() => setTab("services")}
                          className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-bold hover:underline"
                        >
                          View Services
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {services.filter(s => s.isPopular).slice(0, 2).map((s) => (
                          <div 
                            key={s.id} 
                            onClick={() => setTab("services")}
                            className="bg-[#000F21]/40 p-4 rounded-2xl border border-white/5 flex flex-col justify-between cursor-pointer hover:border-[#D4AF37]/40 transition-all text-left space-y-3"
                          >
                            <div>
                              <p className="text-[9px] text-[#50C878] font-mono uppercase tracking-widest font-bold">
                                {s.category}
                              </p>
                              <h4 className="text-xs font-bold text-white mt-1 line-clamp-1">
                                {s.title}
                              </h4>
                            </div>
                            <div className="flex justify-between items-center pt-2.5 border-t border-white/5 text-[10px] text-slate-400 font-mono">
                              <span>Price: <b className="text-white">{s.priceRange.split("-")[0]}</b></span>
                              <span>Rating: <b className="text-amber-400">★ {s.rating}</b></span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (4 cols): Quick actions, pricing levels */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Club Premium Plans Info */}
                    <div className="bg-[#001F3F] border border-white/10 p-5 rounded-3xl relative overflow-hidden">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200 mb-3.5 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Membership Plans
                      </h4>

                      <div className="space-y-2.5">
                        {/* Free plan */}
                        <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold text-white">Free Plan</p>
                            <p className="text-[9px] text-slate-400">Basic profile, view posts</p>
                          </div>
                          <span className="text-[9px] text-[#50C878] font-mono uppercase">Active</span>
                        </div>

                        {/* Premium Plan */}
                        <div 
                          onClick={() => triggerUpgradePayment(MembershipPlan.PREMIUM)}
                          className="p-3 bg-gradient-to-r from-teal-950/40 to-emerald-950/40 rounded-xl border border-[#50C878]/30 flex items-center justify-between cursor-pointer hover:border-[#50C878]/70 transition-all"
                        >
                          <div>
                            <p className="text-xs font-bold text-[#50C878]">Premium Plan</p>
                            <p className="text-[9px] text-slate-300">AI Assist, Priority, Networking</p>
                          </div>
                          <span className="text-[10px] text-[#D4AF37] font-bold">AED 199/m</span>
                        </div>

                        {/* VIP Plan */}
                        <div 
                          onClick={() => triggerUpgradePayment(MembershipPlan.VIP)}
                          className="p-3 bg-gradient-to-r from-amber-950/40 to-[#001F3F]/80 rounded-xl border border-[#D4AF37]/30 flex items-center justify-between cursor-pointer hover:border-[#D4AF37]/70 transition-all"
                        >
                          <div>
                            <p className="text-xs font-bold text-[#D4AF37]">VIP Plan</p>
                            <p className="text-[9px] text-slate-300">Mentoring, Investor Meets</p>
                          </div>
                          <span className="text-[10px] text-amber-400 font-bold">AED 499/m</span>
                        </div>
                      </div>
                    </div>

                    {/* Useful contacts widget */}
                    <div className="bg-[#001F3F] border border-white/10 p-5 rounded-3xl text-left">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#50C878] mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" /> Emergency & Help Line
                      </h4>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                        Sudden lease dispute in Dubai? Need urgent carlift carpools from Rolla Sharjah to Marina? Tap to contact the desk directly.
                      </p>
                      <a 
                        href="tel:+97149990000"
                        className="mt-4 w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Call Emergency Desk</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentTab === "feed" && (
              <CommunityFeedSection 
                posts={posts} 
                currentUser={currentUser} 
                onAddPost={handleAddPost}
                onLikePost={handleLikePost}
                onSavePost={handleSavePost}
                onAddComment={handleAddComment}
              />
            )}

            {currentTab === "services" && (
              <ServicesSection 
                services={services.filter(s => s.isApproved || currentUser.role === UserRole.ADMIN)} 
                currentUser={currentUser}
                onAddService={handleAddService}
                onBookService={handleBookService}
              />
            )}

            {currentTab === "events" && (
              <EventsSection 
                events={events} 
                currentUser={currentUser}
                onRSVP={handleRSVP}
              />
            )}

            {currentTab === "learning" && (
              <LearningSection 
                courses={courses} 
                currentUser={currentUser}
              />
            )}

            {currentTab === "jobs" && (
              <JobOpportunitySection 
                jobs={jobs.filter(j => j.isApproved || currentUser.role === UserRole.ADMIN)} 
                currentUser={currentUser}
                onAddJob={handleAddJob}
                onApplyJob={handleApplyJob}
              />
            )}

            {currentTab === "bachelor" && (
              <BachelorSection 
                items={bachelorSolutions} 
                currentUser={currentUser}
              />
            )}

            {currentTab === "ai" && (
              <div className="max-w-4xl mx-auto p-4 md:p-6 h-[80vh]">
                <MyZoneAI isPremiumUser={currentUser.membershipStatus !== MembershipPlan.FREE} />
              </div>
            )}

            {currentTab === "networking" && (
              <ChatAndNetworking 
                members={members.filter(m => m.isApproved)}
                currentUser={currentUser}
                chatMessages={chatMessages}
                onSendMessage={handleSendMessage}
              />
            )}

            {currentTab === "chat" && (
              <div className="max-w-4xl mx-auto p-4 md:p-6 h-[80vh]">
                {/* Simulated Special Support Desk chat box */}
                <ChatAndNetworking 
                  members={members.filter(m => m.role === UserRole.ADMIN)}
                  currentUser={currentUser}
                  chatMessages={chatMessages}
                  onSendMessage={handleSendMessage}
                />
              </div>
            )}

            {currentTab === "profile" && (
              <SettingsAndProfile 
                currentUser={currentUser}
                savedPosts={posts.filter(p => p.savedBy.includes(currentUser.id))}
                onUpdateProfile={(payload) => setCurrentUser(prev => ({ ...prev, ...payload }))}
                onLogout={() => setIsAuthenticated(false)}
                onUpgradePlan={() => triggerUpgradePayment(MembershipPlan.VIP)}
              />
            )}

            {currentTab === "admin" && (
              <AdminSection 
                members={members}
                posts={posts}
                services={services}
                jobs={jobs}
                onApproveMember={handleApproveMember}
                onApproveService={handleApproveService}
                onApproveJob={handleApproveJob}
                onDeletePost={handleDeletePost}
                onSendAnnouncement={handleSendAnnouncement}
              />
            )}
          </div>

          {/* Luxury Floating Mobile Navigation bar (Bottom for true mobile-first feel!) */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#001F3F] border-t border-white/10 grid grid-cols-5 items-center text-center z-40">
            <button 
              onClick={() => setTab("home")}
              className={`flex flex-col items-center justify-center ${currentTab === "home" ? "text-[#D4AF37]" : "text-slate-400"}`}
            >
              <Info className="w-5 h-5" />
              <span className="text-[9px] mt-1 font-mono">Home</span>
            </button>
            <button 
              onClick={() => setTab("feed")}
              className={`flex flex-col items-center justify-center ${currentTab === "feed" ? "text-[#D4AF37]" : "text-slate-400"}`}
            >
              <Compass className="w-5 h-5" />
              <span className="text-[9px] mt-1 font-mono">Feed</span>
            </button>
            <button 
              onClick={() => setTab("ai")}
              className={`flex flex-col items-center justify-center ${currentTab === "ai" ? "text-[#D4AF37]" : "text-slate-400"}`}
            >
              <Bot className="w-5 h-5" />
              <span className="text-[9px] mt-1 font-mono">AI Assist</span>
            </button>
            <button 
              onClick={() => setTab("networking")}
              className={`flex flex-col items-center justify-center ${currentTab === "networking" ? "text-[#D4AF37]" : "text-slate-400"}`}
            >
              <Users className="w-5 h-5" />
              <span className="text-[9px] mt-1 font-mono">Network</span>
            </button>
            <button 
              onClick={() => setTab("profile")}
              className={`flex flex-col items-center justify-center ${currentTab === "profile" ? "text-[#D4AF37]" : "text-slate-400"}`}
            >
              <img src={currentUser.photoUrl} alt={currentUser.name} className="w-5.5 h-5.5 rounded-full object-cover border border-[#D4AF37]" />
              <span className="text-[9px] mt-1 font-mono">Profile</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. CORE OVERLAY DIALOGS (Payment Gateway, Global Search, Notification Drawer) */}
      
      {/* Search Overlay */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-4 pt-16 animate-fade-in">
          <div className="bg-[#001F3F] border border-[#D4AF37]/30 rounded-3xl max-w-lg w-full p-5 space-y-4 relative">
            <button 
              onClick={() => {
                setShowSearchModal(false);
                setGlobalSearchQuery("");
              }} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-2">
              <Search className="w-4 h-4 text-[#D4AF37]" /> Global Club Search
            </h3>

            <input
              type="text"
              autoFocus
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              placeholder="Search members, jobs, services, classes, events..."
              className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
            />

            {/* Results Box */}
            <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
              {getGlobalSearchResults().length === 0 ? (
                <p className="text-xs text-slate-500 italic text-center py-6">
                  {globalSearchQuery ? "No results matched your query." : "Type keywords to search entire UAE registry..."}
                </p>
              ) : (
                getGlobalSearchResults().map((res, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setTab(res.tab);
                      setShowSearchModal(false);
                      setGlobalSearchQuery("");
                    }}
                    className="p-3 bg-[#000F21]/60 rounded-xl border border-white/5 hover:border-[#D4AF37]/40 cursor-pointer transition-all flex items-center justify-between text-left"
                  >
                    <div>
                      <span className="text-[9px] uppercase font-bold text-[#50C878] bg-[#50C878]/10 px-2 py-0.5 rounded">
                        {res.type}
                      </span>
                      <h4 className="text-xs font-bold text-white mt-1">{res.title}</h4>
                      <p className="text-[10px] text-slate-400 font-sans">{res.subtitle}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Drawer */}
      {showNotificationsDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 animate-fade-in">
          <div className="bg-[#001F3F] border-l border-white/10 w-full max-w-sm h-full p-6 space-y-4 relative flex flex-col justify-between">
            <div>
              <button 
                onClick={() => setShowNotificationsDrawer(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-2 pb-3 border-b border-white/10">
                <CheckCircle className="w-4 h-4 text-[#50C878]" /> Active Notices & Alerts
              </h3>

              <div className="space-y-3 mt-4 overflow-y-auto max-h-[70vh]">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id}
                    className="p-3.5 bg-[#000F21]/60 border border-white/5 rounded-2xl text-left relative"
                  >
                    <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#50C878]" />
                    <h4 className="text-xs font-bold text-white leading-snug">{notif.title}</h4>
                    <p className="text-[10px] text-slate-400 font-sans mt-1 leading-relaxed">
                      {notif.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                setShowNotificationsDrawer(false);
              }}
              className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#000F21] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
            >
              Mark All as Read
            </button>
          </div>
        </div>
      )}

      {/* Credit Card Payment gateway popup simulator */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-fade-in">
          <form 
            onSubmit={handleProcessPayment} 
            className="bg-[#001F3F] border border-[#D4AF37]/30 rounded-3xl max-w-md w-full p-6 text-center space-y-4 relative"
          >
            <button 
              type="button"
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] bg-amber-500/10 text-[#D4AF37] px-3 py-1 rounded-full uppercase tracking-widest font-bold inline-block">
              Club Payment Terminal
            </span>

            <h3 className="text-sm font-serif font-bold text-white">
              Upgrade to Premium {targetPaymentPlan} Access
            </h3>

            {/* Price display block */}
            <div className="bg-[#000F21]/80 py-4 px-6 rounded-2xl border border-white/5 inline-block mx-auto">
              <span className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block">TOTAL AMOUNT</span>
              <span className="text-2xl font-bold text-[#D4AF37] font-mono">
                AED {targetPaymentPlan === MembershipPlan.VIP ? "499" : "199"}
              </span>
              <span className="text-[9px] text-slate-400 block mt-0.5">VAT inclusive • Securely encrypted</span>
            </div>

            {/* Mock Fields */}
            <div className="text-left space-y-3.5 text-xs">
              <div>
                <label className="block text-[9px] text-slate-400 uppercase tracking-widest mb-1 font-bold">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  required
                  placeholder={currentUser.name}
                  className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[9px] text-slate-400 uppercase tracking-widest mb-1 font-bold">
                  Card Number
                </label>
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] text-slate-400 uppercase tracking-widest mb-1 font-bold">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[9px] text-slate-400 uppercase tracking-widest mb-1 font-bold">
                    Secure CVV
                  </label>
                  <input
                    type="password"
                    required
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={paymentLoading}
                className="w-full bg-[#50C878] hover:bg-[#50C878]/90 text-[#000F21] py-3 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#50C878]/10"
              >
                {paymentLoading ? (
                  <span>Processing payment...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Process Security Payment</span>
                  </>
                )}
              </button>
              <p className="text-[9px] text-slate-500 mt-2 font-mono uppercase tracking-tighter">
                SECURED BY STRIPE & NETWORK INTERNATIONAL GCC
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
