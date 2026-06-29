/**
 * MYZONE CLUB - Unified Data Schema & TypeScript Types
 */

export enum MembershipPlan {
  FREE = "Free",
  PREMIUM = "Premium",
  VIP = "VIP"
}

export enum UserRole {
  MEMBER = "Member",
  ADMIN = "Admin",
  SERVICE_PROVIDER = "Service Provider",
  COMMUNITY_LEADER = "Community Leader"
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  photoUrl: string;
  location: string; // e.g. "Dubai Marina, Dubai", "Downtown Dubai", "Abu Dhabi"
  profession: string;
  skills: string[];
  businessInterest: string;
  lookingFor: "job" | "business partner" | "room" | "service" | "learning" | "networking" | "investor" | "none";
  membershipStatus: MembershipPlan;
  role: UserRole;
  isApproved: boolean;
  createdAt: string;
  isFeatured?: boolean;
}

export interface Comment {
  id: string;
  authorName: string;
  authorPhoto: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto: string;
  authorRole: string;
  category: "Business" | "Jobs" | "Rooms" | "Services" | "Announcements" | "Success Stories" | "Questions";
  content: string;
  likesCount: number;
  likedBy: string[]; // List of user IDs who liked it
  comments: Comment[];
  sharesCount: number;
  savedBy: string[]; // List of user IDs who saved it
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  providerId: string;
  providerName: string;
  providerPhoto: string;
  category: string;
  priceRange: string;
  contactMobile: string;
  rating: number;
  description: string;
  location: string;
  isPopular: boolean;
  isApproved: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  image: string;
  cost: string; // "Free" or price e.g., "150 AED"
  rsvpCount: number;
  rsvpList: string[]; // User IDs who RSVPed
  category: "Business Meetup" | "Public Speaking" | "Startup Discussion" | "Learning Session" | "Community Gathering";
  isFeatured?: boolean;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  description: string;
  category: "English" | "Business" | "Marketing" | "AI & Tech" | "Sales";
  image: string;
}

export interface JobOpportunity {
  id: string;
  title: string;
  company: string;
  type: "Full-time" | "Part-time" | "Freelance" | "Internship";
  description: string;
  skillsRequired: string[];
  salary: string; // e.g. "8,000 - 12,000 AED"
  location: string;
  whatsappContact: string;
  appliesCount: number;
  appliedBy: string[]; // User IDs who applied
  isApproved: boolean;
  createdAt: string;
}

export interface BachelorItem {
  id: string;
  type: "room" | "roommate" | "mess" | "transport" | "laundry" | "emergency";
  title: string;
  description: string;
  price: string; // e.g., "1,200 AED/month" or "Free"
  location: string;
  contact: string;
  details: string[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderPhoto: string;
  receiverId: string; // Use "admin" or "support" for admin chats
  message: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  content: string;
  type: "event" | "job" | "service" | "community" | "admin";
  createdAt: string;
  read: boolean;
}
