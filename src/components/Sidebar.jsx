import React from 'react';
import { 
  Bot, 
  MessageSquare, 
  Settings, 
  Sparkles, 
  Activity, 
  RefreshCw, 
  HelpCircle,
  Code2,
  BadgeDollarSign,
  Laptop
} from 'lucide-react';
import { BOT_ROLES } from '../utils/botLogic';

export default function Sidebar({ 
  currentBotId, 
  onBotChange, 
  onClearChat, 
  chatHistoryLength,
  onAddMessage 
}) {
  const bots = Object.values(BOT_ROLES);

  const mockConversations = [
    { id: 'c1', title: '自動化流程諮詢', date: '今天' },
    { id: 'c2', title: 'API 金鑰權限報錯', date: '昨天' },
    { id: 'c3', title: '專業版月付方案評估', date: '3 天前' }
  ];

  const quickFaqs = [
    { text: '如何部署 React 到 Vercel？', prompt: '如何將這個 React + Vite 客服機器人專案部署到 Vercel？' },
    { text: '忘記 API 金鑰該如何更換？', prompt: '我的 API 金鑰好像洩漏了，該如何安全地更換或撤銷金鑰？' },
    { text: '企業版專屬算力與 SLA 保證？', prompt: '企業版方案的專屬 GPU 算力是如何配置的？是否有簽署 SLA 保證合約？' }
  ];

  return (
    <aside className="w-80 glass-sidebar flex flex-col h-full border-r border-slate-800/50 text-slate-300 overflow-hidden shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/40 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center glow-indigo">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-white font-sans tracking-wide leading-none">Aetheria AI</h1>
          <span className="text-[10px] text-indigo-400 font-mono tracking-wider">SUPPORT CENTER</span>
        </div>
      </div>

      {/* Main Nav Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* 客服代表切換 */}
        <div>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2 flex items-center space-x-1.5">
            <span>專屬客服代表</span>
          </h2>
          <div className="space-y-2">
            {bots.map((bot) => {
              const isActive = bot.id === currentBotId;
              return (
                <button
                  key={bot.id}
                  onClick={() => onBotChange(bot.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-start space-x-3 group relative overflow-hidden ${
                    isActive 
                      ? 'bg-slate-800/60 border border-indigo-500/30 text-white shadow-lg' 
                      : 'hover:bg-slate-800/30 border border-transparent hover:border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {/* Active highlight background glow */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none" />
                  )}

                  {/* Avatar Sphere */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                    isActive ? 'bg-slate-700/80' : 'bg-slate-900/60'
                  }`}>
                    {bot.avatar}
                  </div>

                  {/* Representative Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm truncate">{bot.name}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 glow-indigo animate-pulse-slow" />
                      )}
                    </div>
                    <span className="text-xs opacity-80 block truncate mt-0.5">{bot.title}</span>
                    <span className="text-[10px] text-slate-500 block truncate mt-1">{bot.personality}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 歷史對話 (Mocked) */}
        <div>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5 px-2">
            歷史諮詢紀錄
          </h2>
          <div className="space-y-1">
            {mockConversations.map((conv) => (
              <div
                key={conv.id}
                className="w-full flex items-center justify-between p-2.5 rounded-lg text-sm border border-transparent hover:bg-slate-900/40 hover:border-slate-800/30 text-slate-400 hover:text-slate-300 cursor-pointer group transition-all"
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <MessageSquare className="w-4 h-4 text-slate-600 group-hover:text-slate-400 shrink-0" />
                  <span className="truncate">{conv.title}</span>
                </div>
                <span className="text-[10px] text-slate-600 shrink-0">{conv.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 快速 FAQ 問答 */}
        <div>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5 px-2 flex items-center space-x-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>熱門諮詢問題</span>
          </h2>
          <div className="space-y-2">
            {quickFaqs.map((faq, index) => (
              <button
                key={index}
                onClick={() => onAddMessage(faq.prompt)}
                className="w-full text-left p-2.5 rounded-lg text-xs bg-slate-950/40 border border-slate-900/80 hover:border-slate-800/80 text-slate-400 hover:text-slate-200 transition-all hover:bg-slate-900/20"
              >
                {faq.text}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Sidebar Footer Panel */}
      <div className="p-4 border-t border-slate-800/40 space-y-3 bg-slate-950/40">
        {/* System Status */}
        <div className="flex items-center justify-between text-xs px-2 py-1 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
          <div className="flex items-center space-x-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-medium">所有系統運作正常</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">v1.4.0</span>
        </div>

        {/* Action Controls */}
        <button
          onClick={onClearChat}
          disabled={chatHistoryLength <= 1}
          className={`w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
            chatHistoryLength <= 1
              ? 'bg-slate-800/20 text-slate-600 border border-slate-900 cursor-not-allowed'
              : 'bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/30'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>清除對話歷史</span>
        </button>
      </div>
    </aside>
  );
}
