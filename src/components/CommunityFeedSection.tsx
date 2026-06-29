import React, { useState } from "react";
import { Post, UserProfile } from "../types";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Plus, 
  Send, 
  Sparkles, 
  Search, 
  X,
  FileText,
  Building,
  HelpCircle,
  Briefcase,
  Home
} from "lucide-react";

interface CommunityFeedSectionProps {
  posts: Post[];
  currentUser: UserProfile;
  onAddPost: (newPost: Omit<Post, "id" | "likesCount" | "likedBy" | "comments" | "sharesCount" | "savedBy" | "createdAt">) => void;
  onLikePost: (postId: string) => void;
  onSavePost: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
}

export default function CommunityFeedSection({
  posts,
  currentUser,
  onAddPost,
  onLikePost,
  onSavePost,
  onAddComment,
}: CommunityFeedSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isCreating, setIsCreating] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState<Post["category"]>("Business");
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);

  const categories: string[] = ["All", "Business", "Jobs", "Rooms", "Services", "Announcements", "Success Stories", "Questions"];

  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    onAddPost({
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorPhoto: currentUser.photoUrl,
      authorRole: currentUser.role + (currentUser.membershipStatus === "VIP" ? " VIP" : ""),
      category: newCategory,
      content: newContent,
    });

    setNewContent("");
    setIsCreating(false);
  };

  const handleShare = (post: Post) => {
    if (navigator.share) {
      navigator.share({
        title: `MYZONE CLUB Post by ${post.authorName}`,
        text: post.content,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert("Post link copied to clipboard: " + window.location.href);
    }
  };

  const toggleComments = (postId: string) => {
    setActiveCommentsPostId(activeCommentsPostId === postId ? null : postId);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Business": return "bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20";
      case "Jobs": return "bg-[#50C878]/10 text-[#50C878] border-[#50C878]/20";
      case "Rooms": return "bg-sky-500/10 text-sky-400 border-sky-500/20";
      case "Services": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Announcements": return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "Success Stories": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default: return "bg-slate-500/10 text-slate-300 border-slate-500/20";
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4" id="community-feed">
      {/* Category Horizontal Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wider whitespace-nowrap border transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-[#D4AF37] text-[#000F21] border-[#D4AF37] font-bold"
                : "bg-white/5 text-slate-300 border-white/5 hover:border-[#D4AF37]/30 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Write a Post Card */}
      {!isCreating ? (
        <div 
          onClick={() => setIsCreating(true)}
          className="bg-[#001F3F] border border-white/10 rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:border-[#D4AF37]/50 transition-all group"
        >
          <img 
            src={currentUser.photoUrl} 
            alt={currentUser.name} 
            className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
          />
          <div className="flex-1 bg-white/5 rounded-xl px-4 py-3 text-xs text-slate-400 group-hover:bg-white/10 transition-colors">
            Share a business idea, room need, or success story with UAE members...
          </div>
          <button className="p-3 bg-[#D4AF37] text-[#000F21] rounded-xl font-bold hover:scale-105 transition-transform">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <form 
          onSubmit={handleSubmitPost}
          className="bg-[#001F3F] border border-[#D4AF37]/30 rounded-2xl p-5 space-y-4 animate-slide-up"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Publish to UAE Feed
            </span>
            <button 
              type="button" 
              onClick={() => setIsCreating(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-3">
            <img 
              src={currentUser.photoUrl} 
              alt={currentUser.name} 
              className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
            />
            <div className="flex-1 space-y-3">
              {/* Category Picker */}
              <div>
                <label className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                  Post Category
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {(categories.slice(1) as Post["category"][]).map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setNewCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
                        newCategory === cat
                          ? "bg-[#D4AF37] text-[#000F21] border-[#D4AF37]"
                          : "bg-white/5 text-slate-300 border-white/5"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input */}
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="What are you working on or looking for in Dubai / Abu Dhabi?"
                rows={4}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] resize-none"
                maxLength={1000}
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-white/10">
            <span className="text-[10px] text-slate-400">
              Posting as <b className="text-white">{currentUser.name}</b>
            </span>
            <button
              type="submit"
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#000F21] px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#D4AF37]/10"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Share Post</span>
            </button>
          </div>
        </form>
      )}

      {/* Feed Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="bg-[#001F3F] border border-white/10 rounded-3xl p-12 text-center max-w-md mx-auto">
            <HelpCircle className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
            <h4 className="text-lg font-serif text-[#D4AF37] font-bold">No updates found</h4>
            <p className="text-xs text-slate-400 mt-2">
              Be the first to share an announcement, job opportunity, or roommate request in this category!
            </p>
            <button 
              onClick={() => setIsCreating(true)}
              className="mt-6 bg-[#D4AF37] text-[#000F21] font-bold uppercase tracking-wider text-xs px-4 py-2.5 rounded-xl hover:scale-105 transition-all"
            >
              Post Now
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const hasLiked = post.likedBy.includes(currentUser.id);
            const hasSaved = post.savedBy.includes(currentUser.id);

            return (
              <div 
                key={post.id} 
                className="bg-[#001F3F] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all space-y-4"
                id={`post-card-${post.id}`}
              >
                {/* Post Author info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.authorPhoto} 
                      alt={post.authorName} 
                      className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-2">
                        {post.authorName}
                      </h4>
                      <p className="text-[9px] text-[#50C878] font-mono uppercase tracking-widest font-bold">
                        {post.authorRole}
                      </p>
                    </div>
                  </div>

                  {/* Category Tag */}
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>

                {/* Post content */}
                <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                  {post.content}
                </p>

                {/* Interaction info bar */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-b border-white/5 py-2.5">
                  <div className="flex gap-4">
                    <button 
                      onClick={() => onLikePost(post.id)}
                      className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                        hasLiked ? "text-rose-500 font-bold" : "hover:text-rose-500"
                      }`}
                    >
                      <Heart className="w-4 h-4" fill={hasLiked ? "currentColor" : "none"} />
                      <span>{post.likesCount} Likes</span>
                    </button>

                    <button 
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center gap-1.5 hover:text-sky-400 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments.length} Comments</span>
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleShare(post)}
                      className="hover:text-white transition-colors cursor-pointer p-1"
                      title="Share post link"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    <button 
                      onClick={() => onSavePost(post.id)}
                      className={`transition-colors cursor-pointer p-1 ${
                        hasSaved ? "text-[#D4AF37]" : "hover:text-white"
                      }`}
                      title={hasSaved ? "Saved to profile" : "Save post"}
                    >
                      <Bookmark className="w-3.5 h-3.5" fill={hasSaved ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>

                {/* Comments box section */}
                {(activeCommentsPostId === post.id || post.comments.length > 0) && (
                  <div className="space-y-3 pt-2 bg-[#000F21]/40 p-3 rounded-xl border border-white/5">
                    {/* Comments List */}
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-2.5 text-xs text-slate-300">
                        <img 
                          src={comment.authorPhoto} 
                          alt={comment.authorName} 
                          className="w-6.5 h-6.5 rounded-full object-cover"
                        />
                        <div className="flex-1 bg-white/5 p-2 rounded-xl">
                          <div className="flex justify-between mb-0.5">
                            <span className="font-bold text-white text-[11px]">{comment.authorName}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 font-sans">{comment.content}</p>
                        </div>
                      </div>
                    ))}

                    {/* New Comment input */}
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const inputVal = commentInputs[post.id] || "";
                        if (!inputVal.trim()) return;
                        onAddComment(post.id, inputVal);
                        setCommentInputs({ ...commentInputs, [post.id]: "" });
                      }}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        value={commentInputs[post.id] || ""}
                        onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                        placeholder="Write a comment..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                      <button 
                        type="submit"
                        className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#000F21] px-3 rounded-lg font-bold"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
