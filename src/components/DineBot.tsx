import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, Utensils, Calendar, ShoppingBag, ArrowRight, Bot, User, Check, RefreshCw } from 'lucide-react';
import { ChatMessage, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { playChime } from '../utils/audio';
import { formatINR } from '../utils/format';

interface DineBotProps {
  onAddToCart: (item: MenuItem) => void;
  onNavigate: (tabId: string) => void;
  currentTable: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'bot',
    text: "Namaste & Welcome to ZESTORA! I am DineBot, your personal digital dining concierge and sommelier. Inquire about our Indian & global gastronomy, Satvik/Jain courses, wine cellar pairings, or tableside reservations. All prices are in ₹ (INR). How may I assist your table today?",
    timestamp: 'Just now'
  }
];

export const DineBot: React.FC<DineBotProps> = ({
  onAddToCart,
  onNavigate,
  currentTable
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = [
    "🍷 What wine pairs with Kashmiri Saffron Risotto?",
    "🥩 What is Chef Marc's signature main course?",
    "🌱 Show me Jain Satvik & pure vegetarian courses",
    "🥂 Recommend a romantic anniversary tasting in ₹",
    "📅 How do I reserve an Intimate Velvet Booth?",
    "🎁 How do I redeem my ZestPoints for ₹ credits?"
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    playChime('click');
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // AI Culinary Engine response logic
    setTimeout(() => {
      const q = query.toLowerCase();
      let replyText = "";
      let actionPayload: ChatMessage['actionPayload'] = undefined;

      if (q.includes('wine') || q.includes('pair') || q.includes('risotto')) {
        const risotto = MENU_ITEMS.find((i) => i.id === 'dish-2');
        replyText = "For our Kashmiri Saffron Scallop & Prawn Risotto (₹1,180), our Sommelier recommends Fratelli Sette Reserve White or a mineral-driven Chenin Blanc. The bright citrus and toasted almond notes gracefully elevate the organic Pampore saffron and buttery shellfish glaze.";
        if (risotto) {
          actionPayload = {
            type: 'ADD_TO_CART',
            itemId: risotto.id,
            label: `Add Saffron Risotto (${formatINR(risotto.price)})`
          };
        }
      } else if (q.includes('signature') || q.includes('ribeye') || q.includes('steak') || q.includes('wagyu') || q.includes('chef')) {
        const steak = MENU_ITEMS.find((i) => i.id === 'dish-1');
        replyText = "Executive Chef Marc Vane's crowning triumph is the 45-day dry-aged Prime Black Truffle Wagyu Ribeye (₹1,450). It is finished tableside with winter black truffle compound butter and charred bone marrow reduction. It melts effortlessly on the tongue.";
        if (steak) {
          actionPayload = {
            type: 'ADD_TO_CART',
            itemId: steak.id,
            label: `Add Prime Truffle Wagyu (${formatINR(steak.price)})`
          };
        }
      } else if (q.includes('jain') || q.includes('satvik') || q.includes('vegetarian') || q.includes('vegan') || q.includes('plant')) {
        const jainDish = MENU_ITEMS.find((i) => i.id === 'dish-5');
        replyText = "We take Jain & Satvik cuisine to fine-dining heights! I highly recommend our Truffled Malai Paneer & Fig Carpaccio (₹580), followed by the Fire-Roasted Heirloom Cauliflower Steak (₹590), and ending with our Saffron Pistachio Ghewar Mille-Feuille (₹480). All prepared without root vegetables or onion/garlic.";
        if (jainDish) {
          actionPayload = {
            type: 'ADD_TO_CART',
            itemId: jainDish.id,
            label: `Add Truffled Malai Paneer (${formatINR(jainDish.price)})`
          };
        }
      } else if (q.includes('romantic') || q.includes('anniversary') || q.includes('date')) {
        replyText = "For an unforgettable celebration, I suggest starting with the Ahi Yellowfin Tuna Tartare with Avruga Caviar (₹790), followed by the Saffron Scallop Risotto (₹1,180), and concluding with our tableside Smoked Valrhona Chocolate Dome (₹520). Shall we reserve an Intimate Velvet Booth for you?";
        actionPayload = {
          type: 'GO_TO_RESERVATION',
          partySize: 2,
          label: 'Book Intimate Velvet Booth (2 Guests)'
        };
      } else if (q.includes('reserve') || q.includes('book') || q.includes('table') || q.includes('booth')) {
        replyText = "Certainly! You can reserve your preferred seating zone right here — whether you prefer the lively Chef's Tasting Counter, the Solarium Glass Garden, or an Intimate Velvet Booth. Instant holds with zero cancellation penalty.";
        actionPayload = {
          type: 'GO_TO_RESERVATION',
          label: 'Open Table Reservations'
        };
      } else if (q.includes('reward') || q.includes('privilege') || q.includes('point') || q.includes('zestpoints')) {
        replyText = "With the ZESTORA Privilege Club, every ₹10 spent earns you 1 ZestPoint! You can redeem points for signature dessert confections, cocktail flights, or flat ₹500 and ₹1,000 dining credits. Don't forget to scratch our daily mystery bonus!";
        actionPayload = {
          type: 'VIEW_MENU',
          label: 'Explore Privilege Rewards'
        };
      } else {
        replyText = `Thank you for asking! At ${currentTable}, our culinary team is standing by. We specialize in bespoke flavor pairings, Satvik/Jain requirements, and seasonal tasting menus. Would you like to review our complete digital menu or take the flavor quiz?`;
        actionPayload = {
          type: 'VIEW_MENU',
          label: 'Browse Complete Menu'
        };
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: 'Just now',
        actionPayload
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
      playChime('bell');
    }, 600);
  };

  const handleAction = (payload: ChatMessage['actionPayload']) => {
    if (!payload) return;
    playChime('success');

    if (payload.type === 'ADD_TO_CART' && payload.itemId) {
      const item = MENU_ITEMS.find((i) => i.id === payload.itemId);
      if (item) {
        onAddToCart(item);
      }
    } else if (payload.type === 'GO_TO_RESERVATION') {
      onNavigate('reserve');
    } else if (payload.type === 'VIEW_MENU') {
      onNavigate('menu');
    } else if (payload.type === 'TRACK_ORDER') {
      onNavigate('tracking');
    }
  };

  return (
    <section className="py-12 bg-zinc-950 border-t border-amber-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Innovation Feature 03 · AI Sommelier Concierge</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl text-zinc-100 font-medium tracking-tight mb-2">
            DineBot Culinary Concierge
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Conversational dining companion fluent in sensory flavor pairings, Indian spice profiles, Satvik/Jain diets, and cellar reserves in ₹ (INR).
          </p>
        </div>

        {/* Chat Window Frame */}
        <div className="rounded-3xl bg-zinc-900/70 border border-amber-500/30 shadow-2xl flex flex-col h-[590px] overflow-hidden">
          
          {/* Top Bar inside Chat */}
          <div className="p-4 border-b border-zinc-800 bg-zinc-950/90 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 flex items-center justify-center text-zinc-950 font-bold shadow-md shadow-amber-500/20">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-zinc-100">DineBot AI Sommelier</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <span className="text-[11px] text-zinc-400 font-mono">Assisting {currentTable} · Bandra Flagship</span>
              </div>
            </div>

            <button
              onClick={() => {
                playChime('click');
                setMessages(INITIAL_MESSAGES);
              }}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 text-xs transition-colors cursor-pointer"
              title="Reset conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className={`max-w-[85%] sm:max-w-[72%] space-y-2`}>
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isBot
                          ? 'bg-zinc-800/90 text-zinc-200 border border-zinc-700/60 rounded-tl-sm shadow-sm'
                          : 'bg-gradient-to-r from-amber-500 to-amber-400 text-zinc-950 font-medium rounded-tr-sm shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Bot Action Button if provided */}
                    {isBot && msg.actionPayload && (
                      <button
                        onClick={() => handleAction(msg.actionPayload)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 border border-amber-500/50 hover:bg-amber-500 hover:text-zinc-950 text-amber-400 text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
                      >
                        <Utensils className="w-3.5 h-3.5" />
                        <span>{msg.actionPayload.label}</span>
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </button>
                    )}

                    <div className={`text-[10px] font-mono text-zinc-500 ${isBot ? 'text-left' : 'text-right'}`}>
                      {msg.timestamp}
                    </div>
                  </div>

                  {!isBot && (
                    <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono pl-10">
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.15s]" />
                <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.3s]" />
                <span className="text-[11px] text-zinc-500 ml-1">DineBot is curating pairing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-3 border-t border-zinc-800/80 bg-zinc-950/60 overflow-x-auto scrollbar-none flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-zinc-500 shrink-0">Suggestions:</span>
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-xs whitespace-nowrap transition-colors cursor-pointer border border-zinc-700/60"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask DineBot anything (e.g., wine pairing in ₹, Jain dishes, reservations)..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 disabled:opacity-40 text-zinc-950 font-bold transition-all cursor-pointer disabled:cursor-not-allowed shadow-md shadow-amber-500/20"
              aria-label="Send message to DineBot"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
