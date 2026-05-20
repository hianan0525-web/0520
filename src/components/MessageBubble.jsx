import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Copy, Check, User } from 'lucide-react';

// 簡易 Markdown 格式解析器，以渲染表格、代碼塊、粗體與清單
function renderFormattedContent(text) {
  if (!text) return '';

  // 1. 處理程式碼區塊 (Code Blocks)
  // 匹配 ```javascript ... ```
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
  let parts = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    const textBefore = text.substring(lastIndex, match.index);
    if (textBefore) {
      parts.push({ type: 'text', content: textBefore });
    }
    parts.push({
      type: 'code',
      language: match[1] || 'text',
      content: match[2].trim()
    });
    lastIndex = codeBlockRegex.lastIndex;
  }
  
  const remainingText = text.substring(lastIndex);
  if (remainingText) {
    parts.push({ type: 'text', content: remainingText });
  }

  if (parts.length === 0) {
    parts = [{ type: 'text', content: text }];
  }

  return parts.map((part, index) => {
    if (part.type === 'code') {
      return <CodeBlock key={index} code={part.content} language={part.language} />;
    }
    
    // 渲染普通文字中的 HTML 結構（表格、粗體、行內程式碼、連結、清單）
    return (
      <div 
        key={index} 
        className="prose-custom whitespace-pre-line text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: parseMarkdownElements(part.content) }}
      />
    );
  });
}

// 解析行內代碼、粗體、表格與列表
function parseMarkdownElements(text) {
  let html = text;

  // 1. HTML 轉義以防注入，但保留被渲染的標籤
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 2. 解析 Markdown 表格
  // 尋找包含 | 的行
  const lines = html.split('\n');
  let inTable = false;
  let tableRows = [];
  let newLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      inTable = true;
      // 分解列
      const cols = line.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
      
      // 排除表格分隔線 (e.g. :--- | :---)
      if (cols.every(c => /^:?-+:?$/.test(c))) {
        continue;
      }
      tableRows.push(cols);
    } else {
      if (inTable && tableRows.length > 0) {
        // 渲染成表格 HTML
        let tableHtml = '<div class="overflow-x-auto my-3"><table class="min-w-full divide-y divide-slate-800 border border-slate-800 rounded-lg">';
        tableRows.forEach((row, rIdx) => {
          tableHtml += '<tr>';
          row.forEach(col => {
            const cellTag = rIdx === 0 ? 'th' : 'td';
            tableHtml += `<${cellTag} class="px-3 py-2 text-xs border border-slate-800 bg-slate-900/30">${parseInlineMarkdown(col)}</${cellTag}>`;
          });
          tableHtml += '</tr>';
        });
        tableHtml += '</table></div>';
        newLines.push(tableHtml);
        tableRows = [];
        inTable = false;
      }
      newLines.push(line);
    }
  }

  if (inTable && tableRows.length > 0) {
    let tableHtml = '<div class="overflow-x-auto my-3"><table class="min-w-full divide-y divide-slate-850 border border-slate-800">';
    tableRows.forEach((row, rIdx) => {
      tableHtml += '<tr>';
      row.forEach(col => {
        const cellTag = rIdx === 0 ? 'th' : 'td';
        tableHtml += `<${cellTag} class="px-3 py-2 text-xs border border-slate-800">${parseInlineMarkdown(col)}</${cellTag}>`;
      });
      tableHtml += '</tr>';
    });
    tableHtml += '</table></div>';
    newLines.push(tableHtml);
  }

  html = newLines.join('\n');

  // 3. 解析列表
  // 無序清單
  html = html.replace(/^\s*[-*]\s+(.*)$/gm, '<li class="ml-4 list-disc">$1</li>');
  // 將連續的 li 用 ul 包裹起來 (簡化處理)
  // 有序清單
  html = html.replace(/^\s*\d+\.\s+(.*)$/gm, '<li class="ml-4 list-decimal">$1</li>');

  // 4. 解析行內 Markdown (粗體、行內程式碼、連結)
  html = parseInlineMarkdown(html);

  return html;
}

function parseInlineMarkdown(text) {
  let res = text;
  // 粗體 **text**
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
  // 行內代碼 `code`
  res = res.replace(/`(.*?)`/g, '<code class="bg-slate-950/60 text-pink-400 px-1.5 py-0.5 rounded font-mono text-xs border border-slate-800/40">$1</code>');
  // Markdown 連結 [text](url)
  res = res.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-indigo-400 hover:text-indigo-300 underline font-medium">$1</a>');
  return res;
}

// 支援程式碼複製的程式碼區塊組件
function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('複製失敗: ', err);
    }
  };

  return (
    <div className="my-3 rounded-lg overflow-hidden border border-slate-800 bg-slate-950 font-mono text-xs leading-relaxed text-slate-300">
      {/* Code Header */}
      <div className="flex justify-between items-center px-4 py-1.5 bg-slate-900 border-b border-slate-850">
        <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1.5 text-slate-500 hover:text-slate-200 transition-colors py-1 px-2 rounded-md hover:bg-slate-800"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] text-emerald-400">已複製</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span className="text-[10px]">複製代碼</span>
            </>
          )}
        </button>
      </div>
      {/* Code Content */}
      <pre className="p-4 overflow-x-auto text-left select-text">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function MessageBubble({ message, botRole }) {
  const isBot = message.sender === 'bot';
  const [feedback, setFeedback] = useState(null); // 'like', 'dislike', or null

  const handleFeedback = (type) => {
    if (feedback === type) {
      setFeedback(null); // 取消
    } else {
      setFeedback(type);
    }
  };

  return (
    <div className={`flex w-full space-x-3 md:space-x-4 mb-6 animate-slide-up ${
      isBot ? 'justify-start' : 'justify-end flex-row-reverse space-x-reverse'
    }`}>
      {/* Avatar Sphere */}
      <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl shrink-0 flex items-center justify-center text-lg select-none shadow-md ${
        isBot 
          ? 'bg-slate-800 border border-slate-700/50' 
          : 'bg-indigo-600 border border-indigo-500 text-white glow-indigo'
      }`}>
        {isBot ? (
          botRole?.avatar || '🤖'
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Info + Bubble */}
      <div className={`flex flex-col max-w-[75%] md:max-w-[70%] ${
        isBot ? 'items-start' : 'items-end'
      }`}>
        {/* Name Header */}
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-xs font-semibold text-slate-300">
            {isBot ? botRole?.name : '您'}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            {message.timestamp}
          </span>
        </div>

        {/* Message Content Bubble */}
        <div className={`relative px-4 py-3 rounded-2xl select-text text-left leading-relaxed shadow-lg ${
          isBot 
            ? 'glass-bubble-bot text-slate-200 rounded-tl-none' 
            : 'glass-bubble-user text-white rounded-tr-none'
        }`}>
          {isBot ? renderFormattedContent(message.text) : <div className="text-sm font-normal whitespace-pre-wrap">{message.text}</div>}
        </div>

        {/* Bot Response Actions (Feedback) */}
        {isBot && (
          <div className="flex items-center space-x-2 mt-1.5 px-1">
            <button
              onClick={() => handleFeedback('like')}
              className={`p-1 rounded-md transition-all ${
                feedback === 'like' 
                  ? 'text-emerald-400 bg-emerald-500/10' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
              title="這則回覆很有幫助"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleFeedback('dislike')}
              className={`p-1 rounded-md transition-all ${
                feedback === 'dislike' 
                  ? 'text-rose-400 bg-rose-500/10' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
              title="這則回覆沒有幫助"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
            {feedback && (
              <span className="text-[10px] text-indigo-400 font-medium animate-fade-in pl-1">
                感謝您的回饋！
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
