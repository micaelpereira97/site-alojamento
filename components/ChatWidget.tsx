import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { UNITS, SERVICES, ACTIVITIES } from '../constants';

const SYSTEM_INSTRUCTION = `
És a assistente virtual "Flora" do alojamento local "Douro Valley Apartments".
O teu tom é amigável, acolhedor e prestável. Respondes sempre em Português.
Objetivo: Ajudar potenciais hóspedes com dúvidas sobre as casas, serviços e o que fazer.

Informação sobre o Alojamento:
Unidades:
${UNITS.map(u => `- ${u.name}: ${u.description} (${u.pricePerNight}€/noite). Capacidade: ${u.capacity}.`).join('\n')}

Serviços:
${SERVICES.map(s => `- ${s.title}: ${s.description}`).join('\n')}

Atividades:
${ACTIVITIES.map(a => `- ${a.title}: ${a.description} (${a.distance})`).join('\n')}

Regras:
1. Sê conciso.
2. Não inventes preços que não estão na lista.
3. Se perguntarem sobre reservas, indica que devem selecionar a aba "Onde Ficar" e escolher a casa desejada.
`;

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Olá! Sou a Flora. Como posso ajudar na sua estadia no Douro Valley Apartments?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error("VITE_GEMINI_API_KEY não está configurada. Consulte desenvolvimento/SETUP-GUIDE.md");
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Construct chat history for context
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: history
      });

      const response = await chat.sendMessage({ message: userMsg });
      
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (error) {
      console.error("Error generating response", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Desculpe, estou com dificuldades em ligar ao servidor. Por favor, tente novamente mais tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl mb-4 w-80 md:w-96 overflow-hidden border border-stone-100 flex flex-col h-[500px] animate-fade-in-up">
          {/* Header */}
          <div className="bg-brand-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1.5 rounded-full">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="font-serif font-bold">Flora</h3>
                <p className="text-xs text-brand-100">Assistente Virtual</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-brand-700 p-1 rounded transition">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 bg-stone-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed
                  ${msg.role === 'user' 
                    ? 'bg-brand-600 text-white rounded-tr-none' 
                    : 'bg-white text-stone-700 border border-stone-100 shadow-sm rounded-tl-none'}
                `}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-white border border-stone-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                   <Loader2 size={16} className="animate-spin text-brand-500" />
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-stone-100">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2"
            >
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte algo..."
                className="flex-grow bg-stone-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-stone-800"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="bg-brand-600 text-white p-2 rounded-full hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-600 hover:bg-brand-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center gap-2"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        {!isOpen && <span className="font-semibold hidden md:inline pr-1">Dúvidas?</span>}
      </button>
    </div>
  );
};