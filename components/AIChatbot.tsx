
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const GOOGLE_GENAI_API_KEY = import.meta.env.VITE_GOOGLE_GENAI_API_KEY;

const SUGGESTED_PROMPTS = {
  [UserRole.SEEKER]: [
    "Find remote software jobs",
    "How can I improve my resume?",
    "Tips for technical interviews",
    "What are top paying industries?"
  ],
  [UserRole.EMPLOYER]: [
    "Write a job description for a React dev",
    "How to attract top talent?",
    "Screening questions for designers",
    "Pricing plans for posting jobs"
  ],
  default: [
    "How does HireHub work?",
    "Browse top companies",
    "Benefits of using this platform",
    "Contact support"
  ]
};

const AIChatbot: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Hi! I\'m your HireHub AI Assistant. Whether you\'re looking for a new role or hiring top talent, I\'m here to help. How can I assist you today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInstance = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const initChat = () => {
    if (!chatInstance.current) {
      if (!GOOGLE_GENAI_API_KEY) {
        throw new Error('Missing Google GenAI API key.');
      }
      const ai = new GoogleGenAI({ apiKey: GOOGLE_GENAI_API_KEY });
      const contextInfo = isAuthenticated ? `The user is logged in as a ${user?.role}. Their name is ${user?.name}.` : 'The user is currently a guest.';
      
      chatInstance.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are HireHub Assistant, a professional and helpful career coach and platform expert. ${contextInfo} 
          - For Job Seekers: Help them find roles, give advice on CVs/resumes, and offer interview tips.
          - For Employers: Assist in writing job descriptions, advice on candidate screening, and explaining platform pricing.
          - General: Explain HireHub features like role-based dashboards and PDF CV uploads.
          Keep responses concise (under 3 paragraphs), encouraging, and use bullet points where helpful. If asked for something outside of career/platform scope, politely steer them back.`,
        },
      });
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || input.trim();
    if (!messageText || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: messageText }]);
    setIsLoading(true);

    try {
      initChat();
      const responseStream = await chatInstance.current.sendMessageStream({ message: messageText });
      
      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of responseStream) {
        const chunkText = (chunk as GenerateContentResponse).text || '';
        fullText += chunkText;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullText;
          return newMessages;
        });
      }
    } catch (error) {
      console.error('AI Assistant Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = user?.role ? SUGGESTED_PROMPTS[user.role as keyof typeof SUGGESTED_PROMPTS] : SUGGESTED_PROMPTS.default;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[340px] md:w-[400px] h-[550px] bg-white rounded-[2rem] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
          {/* Header */}
          <div className="bg-indigo-600 p-5 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">HireHub AI Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <p className="text-[10px] text-indigo-100 font-medium">Ready to help</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-indigo-500 p-2 rounded-xl transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[85%] p-4 text-sm leading-relaxed shadow-sm
                  ${msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-none' 
                    : 'bg-white text-slate-700 border border-slate-100 rounded-2xl rounded-tl-none'
                  }
                `}>
                  {msg.text || (isLoading && idx === messages.length - 1 ? (
                    <div className="flex gap-1 py-1">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  ) : '')}
                </div>
              </div>
            ))}
            
            {/* Suggested Prompts (Only show if it's the start or bot just finished) */}
            {!isLoading && messages.length < 5 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-[11px] font-bold bg-white text-indigo-600 border border-indigo-100 px-3 py-1.5 rounded-full hover:bg-indigo-50 transition-colors flex items-center gap-1 shadow-sm"
                  >
                    {prompt} <ArrowRight size={10} />
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} 
            className="p-5 border-t border-slate-100 bg-white"
          >
            <div className="relative group">
              <input
                type="text"
                placeholder="Ask your career question..."
                className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all placeholder:text-slate-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl disabled:opacity-30 disabled:hover:bg-indigo-600 transition-all shadow-md"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-3 font-medium">
              HireHub AI provides career suggestions. Review critical details.
            </p>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 transform
          ${isOpen ? 'bg-slate-900 rotate-90 scale-90' : 'bg-indigo-600 hover:bg-indigo-700 hover:scale-110'}
          text-white relative group
        `}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        
        {!isOpen && (
          <>
            <span className="absolute -top-1 -right-1 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-indigo-500 border-2 border-white"></span>
            </span>
            <div className="absolute right-20 bg-slate-900 text-white text-xs px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
              How can I help you today?
            </div>
          </>
        )}
      </button>
    </div>
  );
};

export default AIChatbot;
