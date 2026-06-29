import { 
  UserProfile, 
  Post, 
  ServiceItem, 
  EventItem, 
  Course, 
  JobOpportunity, 
  BachelorItem, 
  UserRole, 
  MembershipPlan,
  NotificationItem
} from "./types";

export const initialMembers: UserProfile[] = [
  {
    id: "user_1",
    name: "Faris Al-Suwaidi",
    email: "faris@myzone.club",
    mobile: "+971 50 123 4567",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    location: "Downtown Dubai, Dubai",
    profession: "SaaS Founder & Investor",
    skills: ["Fundraising", "Product Strategy", "Growth Marketing", "AI Systems"],
    businessInterest: "Investing in early-stage UAE tech, Finding tech co-founders",
    lookingFor: "networking",
    membershipStatus: MembershipPlan.VIP,
    role: UserRole.COMMUNITY_LEADER,
    isApproved: true,
    isFeatured: true,
    createdAt: "2026-01-10T12:00:00Z"
  },
  {
    id: "user_2",
    name: "Aisha Rahal",
    email: "aisha.tech@gmail.com",
    mobile: "+971 52 888 1234",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    location: "Hub71, Abu Dhabi",
    profession: "Full-Stack Developer",
    skills: ["React", "Node.js", "Python", "Cloud Architecture"],
    businessInterest: "Co-founding a fintech startup in UAE, freelancing work",
    lookingFor: "business partner",
    membershipStatus: MembershipPlan.PREMIUM,
    role: UserRole.SERVICE_PROVIDER,
    isApproved: true,
    isFeatured: true,
    createdAt: "2026-02-15T15:30:00Z"
  },
  {
    id: "user_3",
    name: "Rahul Nair",
    email: "rahul.nair@outlook.com",
    mobile: "+971 55 456 7890",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    location: "Deira, Dubai",
    profession: "Marketing Specialist & Job Seeker",
    skills: ["Copywriting", "SEO", "Google Ads", "Content Creation"],
    businessInterest: "E-commerce, Brand consulting",
    lookingFor: "job",
    membershipStatus: MembershipPlan.FREE,
    role: UserRole.MEMBER,
    isApproved: true,
    createdAt: "2026-03-01T09:15:00Z"
  },
  {
    id: "user_4",
    name: "Sarah Jenkins",
    email: "sarah.j@myzone.club",
    mobile: "+971 58 555 7711",
    photoUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    location: "JLT, Dubai",
    profession: "PRO & Corporate Business Consultant",
    skills: ["UAE Visa Guidance", "Business Licensing", "Legal PRO", "DED Setup"],
    businessInterest: "Helping expats set up business in Dubai and Abu Dhabi",
    lookingFor: "service",
    membershipStatus: MembershipPlan.PREMIUM,
    role: UserRole.SERVICE_PROVIDER,
    isApproved: true,
    createdAt: "2026-03-12T11:45:00Z"
  },
  {
    id: "admin_1",
    name: "Zayn Al-Mansoori",
    email: "alqaser.ae@gmail.com", // Set user email from runtime as admin
    mobile: "+971 50 999 8888",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    location: "Meydan, Dubai",
    profession: "MYZONE Club Managing Director",
    skills: ["Community Management", "Event Strategy", "Business Dev"],
    businessInterest: "Expanding premium support networks across GCC",
    lookingFor: "none",
    membershipStatus: MembershipPlan.VIP,
    role: UserRole.ADMIN,
    isApproved: true,
    createdAt: "2026-01-01T08:00:00Z"
  }
];

export const initialPosts: Post[] = [
  {
    id: "post_1",
    authorId: "user_1",
    authorName: "Faris Al-Suwaidi",
    authorPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    authorRole: "VIP Community Leader",
    category: "Business",
    content: "Looking to invest up to 200k AED in an early-stage B2B SaaS startup founded by a solid technical co-founder. Hit me up directly with your deck or drop a pitch in my DMs!",
    likesCount: 15,
    likedBy: ["user_2", "user_3"],
    comments: [
      {
        id: "c_1",
        authorName: "Aisha Rahal",
        authorPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        content: "Highly interested! I am building a micro-billing system for UAE freelancers. Sending you our deck now.",
        createdAt: "2026-06-28T14:20:00Z"
      }
    ],
    sharesCount: 4,
    savedBy: ["user_2"],
    createdAt: "2026-06-28T10:00:00Z"
  },
  {
    id: "post_2",
    authorId: "user_3",
    authorName: "Rahul Nair",
    authorPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    authorRole: "Member",
    category: "Jobs",
    content: "Hi everyone! I recently relocated to Dubai Deira. I have 4+ years of experience in Digital Marketing (SEO, Google Ads, TikTok growth). I am looking for full-time or freelance marketing positions. If any agency or founder is hiring, please let me know!",
    likesCount: 8,
    likedBy: ["user_1"],
    comments: [
      {
        id: "c_2",
        authorName: "Sarah Jenkins",
        authorPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        content: "Hey Rahul, let's connect. I have two clients who need SEO work on a freelance basis.",
        createdAt: "2026-06-29T08:30:00Z"
      }
    ],
    sharesCount: 2,
    savedBy: [],
    createdAt: "2026-06-28T18:45:00Z"
  },
  {
    id: "post_3",
    authorId: "user_2",
    authorName: "Aisha Rahal",
    authorPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    authorRole: "Service Provider",
    category: "Rooms",
    content: "URGENT Roommate Wanted! I have a shared master room in a modern cluster near Dubai Internet City Metro Station. Fully furnished, high-speed Wi-Fi, laundry included. Looking for a neat, business-minded female professional. Rent is 1,800 AED/month inclusive.",
    likesCount: 12,
    likedBy: ["user_3", "user_4"],
    comments: [],
    sharesCount: 1,
    savedBy: ["user_3"],
    createdAt: "2026-06-29T11:00:00Z"
  }
];

export const initialServices: ServiceItem[] = [
  {
    id: "ser_1",
    title: "Instant UAE Business Setup & Freezone Licensing",
    providerId: "user_4",
    providerName: "Sarah Jenkins (PRO)",
    providerPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    category: "Business Setup Guidance",
    priceRange: "AED 4,500 - 15,000",
    contactMobile: "+971 58 555 7711",
    rating: 4.9,
    description: "Get completely licensed in Dubai, Meydan, or Sharjah Freezones within 3 days. Includes corporate bank account guidance and golden visa applications assistance.",
    location: "Meydan Grandstand, Dubai",
    isPopular: true,
    isApproved: true
  },
  {
    id: "ser_2",
    title: "Premium Mobile & Laptop Diagnostics & Repair",
    providerId: "user_2",
    providerName: "Aisha Rahal",
    providerPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    category: "Mobile / Laptop Service",
    priceRange: "AED 100 - 600",
    contactMobile: "+971 52 888 1234",
    rating: 4.8,
    description: "Affordable and fast hardware repair for MacBooks, iPhones, and Windows laptops. Free pickup and delivery across Dubai Internet City, Marina, and JLT.",
    location: "JLT Cluster T, Dubai",
    isPopular: false,
    isApproved: true
  },
  {
    id: "ser_3",
    title: "Daily Healthy Food Mess & Tiffin (Indian/Arab fusion)",
    providerId: "user_1",
    providerName: "Faris Al-Suwaidi (Invested Mess)",
    providerPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    category: "Food / Mess Services",
    priceRange: "AED 450 - 750 /month",
    contactMobile: "+971 50 123 4567",
    rating: 4.7,
    description: "Delicious, customized, nutrient-dense daily meals delivered twice a day. Tailored for bachelors and active professionals. Nutritious ingredients, hygienic kitchen in Al Barsha.",
    location: "Al Barsha 1, Dubai",
    isPopular: true,
    isApproved: true
  },
  {
    id: "ser_4",
    title: "Expert Web & Mobile App Development",
    providerId: "user_2",
    providerName: "Aisha Tech Labs",
    providerPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    category: "Website / App Development",
    priceRange: "AED 5,000 - 25,000",
    contactMobile: "+971 52 888 1234",
    rating: 5.0,
    description: "Launch your custom web or mobile app in weeks. We specialize in modern tech stacks: React Native, Tailwind CSS, Node.js, and high-performance server deployments.",
    location: "Downtown Dubai",
    isPopular: true,
    isApproved: true
  }
];

export const initialEvents: EventItem[] = [
  {
    id: "evt_1",
    title: "Dubai Tech Founders Mixer & Pitching",
    description: "Present your early-stage startup ideas to UAE-based angel investors and seasoned mentors. Get crucial pitch deck reviews, enjoy gourmet snacks, and connect with technical co-founders.",
    dateTime: "2026-07-15T18:30:00Z",
    location: "Hub71 Lounge, Abu Dhabi / Dubai Metro Link",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop",
    cost: "150 AED",
    rsvpCount: 42,
    rsvpList: ["user_1", "user_2"],
    category: "Startup Discussion",
    isFeatured: true
  },
  {
    id: "evt_2",
    title: "Mastering Public Speaking & Elevator Pitches",
    description: "Learn to captivate your audience, handle networking stage anxiety, and present a winning elevator pitch. Lead by certified toastmasters and Hub71 trainers.",
    dateTime: "2026-07-22T19:00:00Z",
    location: "DIFC Creative Hub, Dubai",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop",
    cost: "Free",
    rsvpCount: 68,
    rsvpList: ["user_3"],
    category: "Public Speaking",
    isFeatured: true
  },
  {
    id: "evt_3",
    title: "Bachelors & Newcomers Weekly Community Dinner",
    description: "An informal dinner meetup to connect with fellow expatriates, share accommodation leads, transport secrets, and build lifetime friendships in Dubai. Free meal for VIP members.",
    dateTime: "2026-07-10T20:00:00Z",
    location: "Al Karama Food Street, Dubai",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
    cost: "50 AED",
    rsvpCount: 29,
    rsvpList: ["user_3", "user_4"],
    category: "Community Gathering"
  }
];

export const initialCourses: Course[] = [
  {
    id: "crs_1",
    title: "Mastering UAE Business Setup & Golden Visas",
    instructor: "Sarah Jenkins (PRO Experts)",
    duration: "4.5 Hours",
    lessons: 12,
    students: 312,
    rating: 4.9,
    description: "Step-by-step masterclass explaining DED licensing, virtual licenses, capital requirements, and Golden Visa eligibility for entrepreneurs.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop"
  },
  {
    id: "crs_2",
    title: "Advanced English & Public Speaking for Pitching",
    instructor: "David Coleman",
    duration: "6 Hours",
    lessons: 15,
    students: 540,
    rating: 4.8,
    description: "Hone your business communication. Write crisp emails, master voice modulation, present confidently on stage to VCs.",
    category: "English",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop"
  },
  {
    id: "crs_3",
    title: "Leveraging AI Tools to Scale Your Freelance Career",
    instructor: "Aisha Rahal",
    duration: "3.5 Hours",
    lessons: 8,
    students: 180,
    rating: 4.7,
    description: "Use Gemini and other advanced AI engines to double your output. Write faster code, design beautiful banners, and write stellar copy.",
    category: "AI & Tech",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop"
  }
];

export const initialJobs: JobOpportunity[] = [
  {
    id: "job_1",
    title: "Social Media Manager & Brand Specialist",
    company: "Meydan Luxury Realty",
    type: "Full-time",
    description: "We are seeking a vibrant marketing expert to handle our high-profile Instagram, LinkedIn, and TikTok channels. Must be experienced in real estate copywriting and UAE trending style.",
    skillsRequired: ["Video Editing", "Content Strategy", "SEO", "Instagram Analytics"],
    salary: "7,000 - 10,000 AED /month",
    location: "Meydan Heights, Dubai",
    whatsappContact: "+971501234567",
    appliesCount: 14,
    appliedBy: [],
    isApproved: true,
    createdAt: "2026-06-25T11:00:00Z"
  },
  {
    id: "job_2",
    title: "React Native App Developer (Contract)",
    company: "Aisha Tech Labs",
    type: "Freelance",
    description: "Urgent contract to build 4 custom views for a tourism app. Fast payment upon delivery of solid TypeScript modules. Opportunity for full-time conversion.",
    skillsRequired: ["React Native", "TypeScript", "TailwindCSS (NativeWind)", "Git"],
    salary: "4,000 AED flat fee",
    location: "Remote (UAE based preferred)",
    whatsappContact: "+971528881234",
    appliesCount: 22,
    appliedBy: [],
    isApproved: true,
    createdAt: "2026-06-27T09:00:00Z"
  },
  {
    id: "job_3",
    title: "Business Development & Sales Executive",
    company: "Apex PRO Services",
    type: "Full-time",
    description: "Looking for a high-energy salesperson who can onboard foreign investors and guide them through virtual office structures. Commission-based incentives included.",
    skillsRequired: ["Sales Closing", "Cold Calling", "DED Knowledge", "CRM Tools"],
    salary: "6,000 + Commissions AED",
    location: "DIFC, Dubai",
    whatsappContact: "+971585557711",
    appliesCount: 7,
    appliedBy: [],
    isApproved: true,
    createdAt: "2026-06-28T14:00:00Z"
  }
];

export const initialBachelorSolutions: BachelorItem[] = [
  {
    id: "bac_1",
    type: "room",
    title: "Affordable Shared Room in Al Barsha 1",
    description: "Clean, spacious shared bedroom, quiet apartment. Strictly non-smokers. Next to Mall of the Emirates and metro station.",
    price: "1,100 AED /month inclusive",
    location: "Al Barsha 1, Behind MOE, Dubai",
    contact: "+971 55 456 7890",
    details: ["High-speed Wi-Fi included", "Bi-weekly deep cleaning", "Fully equipped shared kitchen", "No deposit needed"]
  },
  {
    id: "bac_2",
    type: "roommate",
    title: "Vibrant Tech-Founder Roommate Search",
    description: "Looking for an entrepreneur or software engineer to share a huge 2BHK in JLT. Let's exchange ideas and split rent!",
    price: "2,200 AED /month split",
    location: "JLT Cluster O, Dubai",
    contact: "+971 52 888 1234",
    details: ["Private washroom", "Balcony with Lake View", "Gym & Pool access", "Shared office/desk space setup"]
  },
  {
    id: "bac_3",
    type: "mess",
    title: "Al Nahda Premium Monthly Bachelor Mess",
    description: "Daily breakfast, lunch box, and home-cooked dinner delivered straight to your apartment or office. UAE standard food hygiene.",
    price: "500 AED /month",
    location: "Al Nahda 2, Dubai / Sharjah Border",
    contact: "+971 50 123 4567",
    details: ["Veg & Non-Veg options", "Strict hygiene standards", "Delivery included in price", "Pause service anytime"]
  },
  {
    id: "bac_4",
    type: "transport",
    title: "Car Lift: Sharjah Rolla to JLT/Dubai Internet City",
    description: "Safe, punctual, air-conditioned daily carpool service. Skip the crowded metro and buses. 4 seats available.",
    price: "450 AED /month",
    location: "Rolla, Sharjah to JLT, Dubai",
    contact: "+971 58 555 7711",
    details: ["Timings: Departs 7:30 AM, Returns 6:15 PM", "Air-conditioned SUV", "Wi-Fi onboard", "Friendly professional group"]
  },
  {
    id: "emergency",
    type: "emergency",
    title: "MYZONE Emergency Support Line",
    description: "For rapid help with sudden lease issues, landlord disputes, or emergency medical guidance in Dubai/Abu Dhabi.",
    price: "Free for Members",
    location: "UAE Wide",
    contact: "+971 4 999 0000",
    details: ["24/7 Helpline Support", "Legal dispute advice", "Urgent accommodation replacement", "Free ambulance guide"]
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: "notif_1",
    title: "Welcome to MYZONE CLUB! 🎉",
    content: "Your premium profile has been successfully approved. Start exploring co-founders and events today!",
    type: "admin",
    createdAt: "2026-06-29T10:00:00Z",
    read: false
  },
  {
    id: "notif_2",
    title: "New Startup Mixer RSVP 🚀",
    content: "Faris Al-Suwaidi and 4 others are attending DIFC Tech Mixer. Tap to RSVP!",
    type: "event",
    createdAt: "2026-06-29T12:00:00Z",
    read: false
  }
];
