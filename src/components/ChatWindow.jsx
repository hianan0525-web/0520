import React, { useRef, useEffect } from 'react';
import { Send, Smile, Paperclip, MoreVertical, Trash2, Download, PhoneCall, AlertCircle, Menu } from 'lucide-react';
import MessageBubble from './MessageBubble';

export default function ChatWindow({
  messages,
  isTyping,
  botRole,
  inputValue,
  onInputChange,
  onSendMessage,
  onClearChat,
  onAddMessage,
  onToggleSidebar
}) {
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // 自動滾動到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // 匯出對話紀錄為文字檔
  const handleExportChat = () => {
    if (messages.length === 0) return;
    const txtContent = messages
      .map(m => `[${m.timestamp}] ${m.sender === 'user' ? '用戶' : botRole.name}: ${m.text}`)
      .join('\n\n');
    
    const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Aetheria_Chat_${botRole.id}_export.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950/20 relative overflow-hidden">
      
      {/* Background Neon Glow Spheres */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      {/* Chat Header */}
      <header className="h-20 border-b border-slate-800/40 px-6 flex items-center justify-between shrink-0 glass-panel z-10 relative">
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Mobile Sidebar Toggle Button */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 -ml-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors shrink-0"
            title="開啟選單"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Status Dot Ring */}
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xl shadow-inner border border-slate-700/50">
              {botRole.avatar}
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950 glow-indigo" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-bold text-white tracking-wide text-xs sm:text-sm md:text-base leading-none">{botRole.name}</h2>
              <span className="text-[10px] bg-indigo-500/15 text-indigo-400 font-semibold px-2 py-0.5 rounded-full border border-indigo-500/10 hidden sm:inline-block">{botRole.title}</span>
            </div>
            <span className="text-[10px] sm:text-xs text-slate-400 mt-1 block">{botRole.statusText}</span>
          </div>
        </div>

        {/* Header Action Icons */}
        <div className="flex items-center space-x-1.5 md:space-x-2">
          {/* Quick Connect Escalation Button */}
          <button
            onClick={() => onAddMessage('聯絡真人客服')}
            className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/20 hover:bg-indigo-600/35 transition-all"
            title="轉接真人"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">轉接專人</span>
          </button>
          
          <button
            onClick={handleExportChat}
            disabled={messages.length <= 1}
            className={`p-2 rounded-lg transition-all border ${
              messages.length <= 1
                ? 'text-slate-700 border-transparent cursor-not-allowed'
                : 'text-slate-400 hover:text-white border-slate-800/40 hover:border-slate-700 hover:bg-slate-900/50'
            }`}
            title="匯出對話紀錄 (.txt)"
          >
            <Download className="w-4 h-4" />
          </button>
          
          <button
            onClick={onClearChat}
            disabled={messages.length <= 1}
            className={`p-2 rounded-lg transition-all border ${
              messages.length <= 1
                ? 'text-slate-700 border-transparent cursor-not-allowed'
                : 'text-slate-400 hover:text-rose-400 border-slate-800/40 hover:border-rose-950/20 hover:bg-rose-500/5'
            }`}
            title="清空聊天視窗"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Messages Scroll Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 md:px-8 py-6 relative z-10"
      >
        {/* Chat Welcoming Message card */}
        <div className="mb-8 p-5 rounded-2xl glass-card text-center max-w-xl mx-auto border border-slate-800/40 shadow-xl bg-slate-900/10">
          <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-2xl mx-auto mb-3">
            ✨
          </div>
          <h3 className="font-bold text-sm text-white mb-1.5">Aetheria AI 客服聊天視窗</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            已開啟安全性加密通道。您可以直接輸入日常問答，或選用下方常見的推薦標籤，客服機器人會即刻進行回覆。
          </p>
          <div className="text-[10px] text-slate-500 font-mono flex items-center justify-center space-x-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>對話將受 Aetheria 隱私條款保障</span>
          </div>
        </div>

        {/* Map Chat Message Bubbles */}
        {messages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            message={msg} 
            botRole={botRole} 
          />
        ))}

        {/* Bot Typing Simulator dot animation */}
        {isTyping && (
          <div className="flex w-full space-x-3 md:space-x-4 mb-6 animate-slide-up justify-start">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl shrink-0 flex items-center justify-center text-lg bg-slate-800 border border-slate-700/50 shadow-md">
              {botRole.avatar}
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-semibold text-slate-300">{botRole.name}</span>
                <span className="text-[10px] text-slate-500 italic">正在輸入...</span>
              </div>
              <div className="glass-bubble-bot px-6 py-4 rounded-2xl rounded-tl-none shadow-md flex items-center justify-center min-w-[60px] h-10">
                <div className="dot-typing" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips & Message Input Panel */}
      <footer className="p-4 border-t border-slate-800/40 glass-panel z-10 shrink-0">
        
        {/* Suggestion Tags */}
        <div className="max-w-4xl mx-auto flex items-center space-x-2 overflow-x-auto pb-3 scrollbar-none scroll-smooth">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide shrink-0">常見問題：</span>
          <div className="flex space-x-2 shrink-0">
            {botRole.suggestions.map((sugg, index) => (
              <button
                key={index}
                onClick={() => onAddMessage(sugg.replace(/^[💡💎💳💻⚡🔄🔑🛠️📦💡]+/g, '').trim())}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800/60 text-slate-400 hover:text-white hover:border-slate-600 transition-all shadow-md shrink-0 hover:bg-slate-850"
              >
                {sugg}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar Form */}
        <form 
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto relative flex items-center"
        >
          {/* File attachment simulation button */}
          <button
            type="button"
            className="absolute left-4 p-1.5 text-slate-500 hover:text-slate-300 transition-all hover:bg-slate-850 rounded-lg"
            title="附加檔案 (模擬)"
            onClick={() => alert('此功能為模擬演示，檔案上傳系統已鎖定。')}
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Core Input Field */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`輸入訊息詢問 ${botRole.name}... (按下 Enter 傳送)`}
            className="w-full pl-12 pr-28 py-3.5 rounded-xl text-sm text-slate-100 placeholder-slate-500 glass-input font-normal focus:outline-none"
            maxLength={1000}
          />

          {/* Action Tools (Emoji + Send Button) */}
          <div className="absolute right-2.5 flex items-center space-x-1">
            <button
              type="button"
              className="p-1.5 text-slate-500 hover:text-slate-300 transition-all hover:bg-slate-850 rounded-lg"
              title="插入 Emoji (模擬)"
              onClick={() => onInputChange(inputValue + ' 🤖')}
            >
              <Smile className="w-4.5 h-4.5" />
            </button>
            
            {/* Submit Send Button */}
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={`p-2 rounded-lg font-medium transition-all ${
                inputValue.trim()
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 active:scale-95'
                  : 'bg-slate-800/40 text-slate-600 cursor-not-allowed border border-slate-900'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Word Length Count & Tips */}
        <div className="max-w-4xl mx-auto flex justify-between items-center mt-2 px-1 text-[10px] text-slate-500 font-mono">
          <span>對齊：繁體中文介面模式 (UTF-8)</span>
          <span>{inputValue.length} / 1000 字</span>
        </div>
      </footer>
    </div>
  );
}
