"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  User, 
  ShieldCheck, 
  Layers, 
  RotateCcw 
} from "lucide-react";
import { Company, MultiYearFinancials, TutorChatMessage } from "@/types/financials";
import { useLearning } from "@/context/LearningModeContext";


interface AiFinancialTutorProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company;
  financials: MultiYearFinancials;
}

export function AiFinancialTutor({ isOpen, onClose, company, financials }: AiFinancialTutorProps) {
  const { learningMode } = useLearning();
  const [messages, setMessages] = useState<TutorChatMessage[]>([
    {
      id: "initial-msg",
      sender: "assistant",
      timestamp: "Just now",
      content: `Hello! I am your AI Financial Intelligence Tutor. I am grounded directly in verified multi-year financial statements for ${company.displayName} (${company.ticker}). Ask me about its profit margins, debt solvency, cash conversion, or any accounting metric!`,
      suggestedFollowUps: [
        `Why is ${company.displayName}'s ROE high?`,
        `Explain ${company.displayName}'s debt levels`,
        "Why can accounting profit increase while cash flow decreases?",
        "Explain EBITDA in plain terms"
      ],
      sourceDisclaimer: `Grounded in ${company.legalName} financial statements.`
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (questionText?: string) => {
    const query = (questionText || inputText).trim();
    if (!query || isLoading) return;

    const userMsg: TutorChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: query,
      sourceDisclaimer: ""
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/gemini/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: query,
          ticker: company.ticker,
          learningMode,
        }),
      });

      const json = await res.json();

      if (json.success && json.data) {
        setMessages((prev) => [...prev, json.data]);
      } else {
        throw new Error(json.error || "Tutor API failed");
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "assistant",
          timestamp: "Just now",
          content: "AI explanation temporarily unavailable. You can inspect the raw multi-year financial statements in the Statement tab.",
          sourceDisclaimer: "Educational fallback mode"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-lg h-full bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tutor Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 p-0.5 shadow-xs">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">AI Financial Tutor</h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
                  {learningMode.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Grounded in <span className="text-slate-800 font-semibold">{company.displayName}</span> financials
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors shadow-xs cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col space-y-1.5 ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-sans font-semibold">
                {msg.sender === "user" ? (
                  <span>You • {msg.timestamp}</span>
                ) : (
                  <span>Investment Lens Tutor • {msg.timestamp}</span>
                )}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[90%] shadow-xs ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white rounded-br-sm"
                    : "bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-sm space-y-2.5"
                }`}
              >
                <p>{msg.content}</p>

                {/* Grounded metrics referenced */}
                {msg.groundedMetricsReferenced && msg.groundedMetricsReferenced.length > 0 && (
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">
                      Verified Data Points Referenced:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.groundedMetricsReferenced.map((gm, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-indigo-700 border border-indigo-200"
                        >
                          {gm.metric}: {gm.value} ({gm.period})
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Follow up question buttons */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="pt-2 border-t border-slate-200 space-y-1">
                    <span className="text-[10px] text-purple-800 uppercase font-bold block">
                      Suggested Follow-Up Investigations:
                    </span>
                    <div className="space-y-1">
                      {msg.suggestedFollowUps.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(q)}
                          className="w-full text-left p-2 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 text-[11px] font-semibold text-slate-700 hover:text-indigo-700 transition-colors flex items-center justify-between shadow-xs cursor-pointer"
                        >
                          <span>{q}</span>
                          <ArrowRight className="w-3 h-3 text-slate-400 shrink-0 ml-1" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200 w-fit shadow-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-xs text-slate-500 font-semibold ml-1">Analyzing financial statements...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar & Disclaimer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`Ask about ${company.displayName}'s financials or ratios...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-xs"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white shadow-xs transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[10px] text-slate-500 text-center">
            Educational purposes only. AI does not give financial or investment advice.
          </p>
        </div>
      </div>
    </div>
  );
}
