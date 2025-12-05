import { GoogleGenerativeAI } from '@google/generative-ai';
import { CONFIG } from '../config/config';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: string;
}

class GeminiChatService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private chatSession: any = null;
  private conversationHistory: ChatMessage[] = [];

  constructor() {
    this.genAI = new GoogleGenerativeAI(CONFIG.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: CONFIG.GEMINI_SYSTEM_INSTRUCTION,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });
  }

  async initializeChat(): Promise<void> {
    try {
      const formattedHistory = this.conversationHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.parts }]
      }));

      this.chatSession = this.model.startChat({
        history: formattedHistory,
      });
    } catch (error) {
      console.error('Error initializing chat:', error);
      throw new Error('Failed to initialize chat session');
    }
  }

  async sendMessage(message: string): Promise<string> {
    try {
      if (!CONFIG.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY === 'your-gemini-api-key-here') {
        throw new Error('Gemini API key not configured. Please add your API key to config.ts');
      }

      if (!this.chatSession) {
        await this.initializeChat();
      }

      const result = await this.chatSession.sendMessage(message);
      const response = await result.response;
      const text = response.text();

      this.conversationHistory.push(
        { role: 'user', parts: message },
        { role: 'model', parts: text }
      );

      if (this.conversationHistory.length > 40) {
        this.conversationHistory = this.conversationHistory.slice(-40);
      }

      return text;
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      
      this.chatSession = null;
      
      if (error.message?.includes('API key') || error.message?.includes('API_KEY')) {
        throw new Error('Invalid API key. Please check your Gemini API key in config.ts');
      } else if (error.message?.includes('SAFETY')) {
        throw new Error('Content blocked due to safety guidelines. Please try rephrasing your message.');
      } else if (error.message?.includes('QUOTA_EXCEEDED')) {
        throw new Error('API quota exceeded. Please try again later.');
      } else if (error.message?.includes('RATE_LIMIT')) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      } else if (error.message?.toLowerCase().includes('network') || error.message?.toLowerCase().includes('fetch')) {
        throw new Error('Network error. Please check your internet connection.');
      } else {
        throw new Error(`Failed to get response from AI: ${error.message}`);
      }
    }
  }

  clearHistory(): void {
    this.conversationHistory = [];
    this.chatSession = null;
  }

  getHistory(): ChatMessage[] {
    return [...this.conversationHistory];
  }

  isConfigured(): boolean {
    return !!(CONFIG.GEMINI_API_KEY && CONFIG.GEMINI_API_KEY !== 'your-gemini-api-key-here');
  }

  getStatus() {
    return {
      isConfigured: this.isConfigured(),
      hasApiKey: !!CONFIG.GEMINI_API_KEY,
      status: this.isConfigured() ? 'Online' : 'Not Configured',
      historyLength: this.conversationHistory.length,
    };
  }
}

const geminiChatService = new GeminiChatService();
export default geminiChatService;