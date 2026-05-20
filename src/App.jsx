import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import { BOT_ROLES, getBotResponse, getTypingDelay } from './utils/botLogic';
import { X } from 'lucide-react';

export default function App() {
  const [currentBotId, setCurrentBotId] = useState('aetheria');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getGreetingMessage = (botId) => ({
    id: `init-${botId}-${Date.now()}`,
    sender: 'bot',
    text: BOT_ROLES[botId].greeting,
    timestamp: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
  });

  const [messages, setMessages] = useState([getGreetingMessage('aetheria')]);

  // 切換客服代表
  const handleBotChange = (botId) => {
    if (botId === currentBotId) return;
    
    setCurrentBotId(botId);
    
    // 增加一條系統切換訊息，然後附上新角色的歡迎語
    const currentTimeStr = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });
    
    const systemMsg = {
      id: `sys-${Date.now()}`,
      sender: 'bot',
      text: `🔄 *系統提示：您已與「${BOT_ROLES[botId].name} (${BOT_ROLES[botId].title})」建立連線。*`,
      timestamp: currentTimeStr
    };
    
    const newGreeting = {
      id: `greet-${botId}-${Date.now()}`,
      sender: 'bot',
      text: BOT_ROLES[botId].greeting,
      timestamp: currentTimeStr
    };
    
    setMessages(prev => [...prev, systemMsg, newGreeting]);
    setSidebarOpen(false); // 在行動端切換時自動關閉側邊欄
  };

  // 發送使用者訊息
  const handleSendMessage = (forcedText = null) => {
    const textToSend = forcedText !== null ? forcedText : inputValue;
    if (!textToSend.trim()) return;

    const currentTimeStr = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });
    
    // 1. 新增使用者訊息
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: currentTimeStr
    };

    setMessages(prev => [...prev, userMsg]);
    
    if (forcedText === null) {
      setInputValue(''); // 清空輸入框
    }

    // 2. 觸發客服機器人回覆 (模擬打字狀態)
    setIsTyping(true);
    
    const botResponseText = getBotResponse(textToSend, currentBotId);
    const delay = getTypingDelay(botResponseText);

    setTimeout(() => {
      const responseTimeStr = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });
      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        timestamp: responseTimeStr
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  };

  // 清空聊天歷史
  const handleClearChat = () => {
    if (window.confirm('確定要清空與所有客服助理的對話歷史紀錄嗎？')) {
      setMessages([getGreetingMessage(currentBotId)]);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-950 text-slate-100 font-sans overflow-hidden relative">
      
      {/* 磨砂背景大漸層 */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[150px] pointer-events-none rounded-full" />

      {/* 行動端側邊欄 Backdrop 遮罩 */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-20 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 側邊欄元件 (在行動端具備滑出式定位) */}
      <div className={`
        fixed md:relative top-0 bottom-0 left-0 z-30 transition-transform duration-300 ease-in-out shrink-0 h-full
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* 行動端關閉側邊欄按鈕 */}
        {sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden absolute top-4 right-4 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850 z-40 transition-colors"
            title="關閉選單"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <Sidebar 
          currentBotId={currentBotId}
          onBotChange={handleBotChange}
          onClearChat={handleClearChat}
          chatHistoryLength={messages.length}
          onAddMessage={handleSendMessage}
        />
      </div>

      {/* 聊天主視窗元件 */}
      <ChatWindow 
        messages={messages}
        isTyping={isTyping}
        botRole={BOT_ROLES[currentBotId]}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSendMessage={() => handleSendMessage()}
        onClearChat={handleClearChat}
        onAddMessage={handleSendMessage}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
    </div>
  );
}
