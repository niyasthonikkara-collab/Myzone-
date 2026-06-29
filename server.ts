import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client lazily to avoid crashing on startup if the key is missing.
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY is not defined. AI Assistant features will use fallback mock mode.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. API Endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Endpoint for MYZONE AI Chat
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Check if key is available, else use a fallback helpful mocked reply
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Simulate local helper response
      const mockResponses: { [key: string]: string } = {
        "whatsapp": "Sure! Here is a professional WhatsApp reply you can use:\n\n*\"Hi [Name], hope you are well. Just following up on our discussion regarding MYZONE CLUB services. Let me know when you are free to connect this week. Thanks! - [Your Name]\"*",
        "business": "A highly profitable business idea in the UAE is a **Digital Concierge & Room-finding Service** for bachelors and newcomers. With the growing influx of startup founders and young professionals, helping them find vetted bedspaces, food mess services, and licensing advice is highly in-demand!",
        "services": "I can recommend several UAE-vetted services in MYZONE CLUB: Laundry, Meal Prep & Mess, Laptop Repair, and App Development. You can browse them on our **Services** tab!",
        "linkedin": "Here is an engaging LinkedIn post:\n\n*\"🚀 Exciting times ahead! Connected with some incredible startup founders at the latest UAE startup meetup. Growing together in the UAE's premium entrepreneurial ecosystem. Thanks to MYZONE CLUB! #Networking #DubaiStartups #UAEProfessionals\"*",
        "pitch": "A strong 1-minute elevator pitch:\n\n*\"Hello! We are MYZONE CLUB. We connect young professionals, bachelors, and startup co-founders in the UAE with critical resources—from premium affordable accommodation to marketing and business-setup guidance, all under one cohesive digital ecosystem. Let's connect!\"*"
      };

      const msgLower = message.toLowerCase();
      let selectedMock = "Welcome to MYZONE AI! I am ready to guide you on UAE startups, jobs, bachelors, networking, and writing professional messages. Feel free to ask anything!";
      for (const key of Object.keys(mockResponses)) {
        if (msgLower.includes(key)) {
          selectedMock = mockResponses[key];
          break;
        }
      }

      // Add delay for realism
      await new Promise(resolve => setTimeout(resolve, 800));
      return res.json({ text: `[Mock AI Assistant - Configure your GEMINI_API_KEY for live answers]\n\n${selectedMock}` });
    }

    const ai = getGeminiClient();
    
    // Construct system instructions
    const systemInstruction = `
You are MYZONE AI, a highly professional, premium, and sophisticated AI assistant for "MYZONE CLUB" in the UAE.
The club is a premium community platform for entrepreneurs, startup founders, bachelors, professionals, job seekers, and freelancers.
Your goal is to assist users in:
- Crafting business ideas or plans in the UAE
- Writing professional WhatsApp replies, emails, or LinkedIn posts
- Suggesting career/resume optimization strategies for the UAE job market
- Providing useful bachelors' tips (finding roommates, meal planning, transport hacks in Dubai/Abu Dhabi/Sharjah)
- Recommending club events, services, or networking directions

Adopt a premium, helpful, concise, motivational, and friendly tone. Always prioritize precise, structured answers with lists/bold text where helpful. Avoid generic corporate jargon. Keep responses highly actionable and optimized for mobile reading.
`;

    // Incorporate history into the generation context if any
    const formattedContents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((chatItem: { role: string; content: string }) => {
        formattedContents.push({
          role: chatItem.role === "user" ? "user" : "model",
          parts: [{ text: chatItem.content }]
        });
      });
    }
    
    // Append current message
    formattedContents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || "I apologize, but I am unable to generate a response at this moment. Please try again.";
    res.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    res.status(500).json({ error: error?.message || "An error occurred while contacting the AI Assistant." });
  }
});

// 2. Vite Integration for Frontend Assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
