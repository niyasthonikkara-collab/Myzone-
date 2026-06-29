import React, { useState, useRef, useEffect } from "react";
import { Send, Sparkles, AlertCircle, Bot, CornerDownRight, Check, Copy } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

interface MyZoneAIProps {
  onSuggestPrompt?: (prompt: string) => void;
  isPremiumUser: boolean;
}

export default function MyZoneAI({ isPremiumUser }: MyZoneAIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "ai_init",
      sender: "ai",
      text: "Marhaba! I am MYZONE AI, your premium business and lifestyle assistant in the UAE. Ask me anything about finding roommates, pitching your startup, drafting professional WhatsApp/LinkedIn updates, or exploring business setup freezones!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Suggest a small business idea in UAE.",
    "Help me write a professional WhatsApp reply.",
    "Draft a pitch for a Dubai Marina tech meetup.",
    "Suggest budget roommate transport solutions in JLT.",
    "What are DED business licensing requirements?"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `msg_${Date.now()}_u`,
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.sender === "user" ? "user" : "model",
        content: m.text,
      }));

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to connect to MYZONE AI server");
      }

      const data = await res.json();
      const aiMsg: Message = {
        id: `msg_${Date.now()}_ai`,
        sender: "ai",
        text: data.text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.error(err);
      const errorMsg: Message = {
        id: `msg_${Date.now()}_err`,
        sender: "ai",
        text: "I am having trouble accessing the server. Please check your network connection or configure your GEMINI_API_KEY. Here is a helpful tip: UAE bachelors love using Al Karama car lifts and shared flat setups to save up to 40% on overheads!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#000F21] rounded-2xl border border-white/10 overflow-hidden" id="myzone-ai-card">
      {/* Assistant Header */}
      <div className="p-4 bg-gradient-to-r from-[#001F3F] to-[#002B5B] border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#50C878] p-[1px]">
            <div className="w-full h-full rounded-[11px] bg-[#000F21] flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#D4AF37]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold tracking-wider text-white">MYZONE AI</h3>
              <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded uppercase font-bold">
                PRO ASSIST
              </span>
            </div>
            <p className="text-[10px] text-[#50C878] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#50C878] animate-pulse" />
              Ready to help you build in UAE
            </p>
          </div>
        </div>

        {!isPremiumUser && (
          <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-1 rounded">
            Free Preview Limit
          </span>
        )}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-400 font-mono">
              <span>{m.sender === "user" ? "You" : "MYZONE AI"}</span>
              <span>•</span>
              <span>{m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>

            <div
              className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                m.sender === "user"
                  ? "bg-[#D4AF37] text-[#000F21] font-medium rounded-tr-none"
                  : "bg-white/5 border border-white/5 text-slate-200 rounded-tl-none font-sans"
              }`}
            >
              <p className="whitespace-pre-line">{m.text}</p>
              
              {m.sender === "ai" && (
                <div className="mt-3 pt-2 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => copyToClipboard(m.text, m.id)}
                    className="text-xs text-[#D4AF37] hover:text-white flex items-center gap-1 transition-colors"
                  >
                    {copiedId === m.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#50C878]" />
                        <span className="text-[#50C878]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Answer</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2.5 text-xs text-slate-400 italic bg-white/5 p-3 rounded-xl animate-pulse">
            <Sparkles className="w-4 h-4 text-[#D4AF37] animate-spin" />
            <span>MYZONE AI is drafting responses for the UAE market...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="p-3 bg-[#001F3F]/40 border-t border-white/5">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Quick Suggestions
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              disabled={isLoading}
              className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs bg-[#002B5B] hover:bg-[#D4AF37]/10 text-slate-300 hover:text-[#D4AF37] border border-white/5 hover:border-[#D4AF37]/30 transition-all flex items-center gap-1 text-left"
            >
              <CornerDownRight className="w-3 h-3" />
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="p-3 bg-[#000F21] border-t border-white/10 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about jobs, business setup, roommate rules..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
          disabled={isLoading}
          maxLength={400}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#000F21] p-3 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center shadow-lg shadow-[#D4AF37]/10"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
