import React, { useState } from "react";
import { ServiceItem, UserProfile } from "../types";
import { 
  Sparkles, 
  MapPin, 
  PhoneCall, 
  MessageSquare, 
  Plus, 
  Star, 
  X, 
  Check, 
  Search, 
  ExternalLink,
  Info
} from "lucide-react";

interface ServicesSectionProps {
  services: ServiceItem[];
  currentUser: UserProfile;
  onAddService: (newService: Omit<ServiceItem, "id" | "rating" | "isApproved" | "providerPhoto" | "providerName">) => void;
  onBookService: (service: ServiceItem) => void;
}

export default function ServicesSection({
  services,
  currentUser,
  onAddService,
  onBookService,
}: ServicesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // New Service state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Bachelor Room Support");
  const [priceRange, setPriceRange] = useState("AED 200 - 500");
  const [contactMobile, setContactMobile] = useState("+971 50 ");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Dubai Marina, Dubai");

  const categories = [
    "All",
    "Bachelor Room Support",
    "Job Support",
    "Business Setup Guidance",
    "Visa / PRO Guidance",
    "Tailoring Services",
    "Food / Mess Services",
    "Transport",
    "Laundry",
    "Cleaning",
    "Mobile / Laptop Service",
    "Legal Support",
    "Accounting Support",
    "Marketing Support",
    "Website / App Development",
    "Freelance Work"
  ];

  const filtered = services.filter((s) => {
    const matchesCat = selectedCategory === "All" || s.category === selectedCategory;
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.providerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onAddService({
      title,
      category,
      priceRange,
      contactMobile,
      description,
      location,
      providerId: currentUser.id,
      isPopular: false
    });

    // Reset Form
    setTitle("");
    setDescription("");
    setIsAdding(false);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4" id="services-hub">
      {/* Search and Quick Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#001F3F] p-4 rounded-2xl border border-white/10">
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vetted UAE bachelors help, laundry, tailoring, business setup..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#000F21] px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/10"
        >
          <Plus className="w-4 h-4" />
          <span>Offer a Service</span>
        </button>
      </div>

      {/* Category List */}
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

      {/* New Service Modal overlay */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-fade-in">
          <div className="bg-[#001F3F] border border-[#D4AF37]/30 rounded-3xl max-w-lg w-full p-6 space-y-4 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> List Your UAE Service
              </h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Express Laundry & Deep Steam Ironing in Al Barsha"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#000F21] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {categories.slice(1).map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                    Estimated Pricing / Month or Session
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AED 350 / month"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                    Contact Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 123 4567"
                    value={contactMobile}
                    onChange={(e) => setContactMobile(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                    Primary Service Location
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Deira, Dubai"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                  Detailed Description *
                </label>
                <textarea
                  required
                  placeholder="Detail exactly what is covered in your service, turnaround times, and free trial benefits for VIP/Premium members."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] resize-none"
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
                  Submit Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-[#001F3F] border border-white/10 rounded-3xl p-12 text-center max-w-md mx-auto my-6">
            <Info className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
            <h4 className="text-lg font-serif text-[#D4AF37] font-bold">No services matching filters</h4>
            <p className="text-xs text-slate-400 mt-2">
              Try choosing another category, adjusting your search keywords, or submit your own professional listing!
            </p>
          </div>
        ) : (
          filtered.map((s) => (
            <div
              key={s.id}
              className="bg-[#001F3F] border border-white/10 rounded-3xl p-5 hover:border-[#D4AF37]/40 transition-all flex flex-col justify-between"
              id={`service-card-${s.id}`}
            >
              <div className="space-y-3">
                {/* Upper Provider & Rating Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={s.providerPhoto}
                      alt={s.providerName}
                      className="w-8 h-8 rounded-full object-cover border border-[#D4AF37]"
                    />
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        {s.providerName}
                      </p>
                      <span className="text-[9px] bg-[#50C878]/10 text-[#50C878] px-2 py-0.5 rounded uppercase font-mono font-bold">
                        Vetted Pro
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-500/10 text-[#D4AF37] px-2 py-0.5 rounded-lg text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{s.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Service Title */}
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                    {s.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1 italic">{s.category}</p>
                </div>

                {/* Location and Pricing info */}
                <div className="grid grid-cols-2 gap-2 bg-[#000F21]/60 p-2.5 rounded-xl border border-white/5">
                  <div>
                    <span className="text-[8px] uppercase font-mono text-slate-500 block">ESTIMATED PRICE</span>
                    <span className="text-xs font-bold text-[#D4AF37]">{s.priceRange}</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase font-mono text-slate-500 block">LOCATION</span>
                    <span className="text-xs font-medium text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-400" />
                      {s.location.split(",")[0]}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-3">
                  {s.description}
                </p>
              </div>

              {/* Booking Actions */}
              <div className="flex gap-2.5 pt-4 mt-4 border-t border-white/5">
                <button
                  onClick={() => onBookService(s)}
                  className="flex-1 bg-white/5 hover:bg-[#D4AF37]/10 text-slate-200 hover:text-[#D4AF37] border border-white/10 hover:border-[#D4AF37]/40 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Inquire</span>
                </button>

                <a
                  href={`https://wa.me/${s.contactMobile.replace(/\s+/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#50C878] hover:bg-[#50C878]/90 text-[#000F21] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Pro</span>
                </a>
              </div>
            </div>
          )))}
      </div>
    </div>
  );
}
