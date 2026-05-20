// 客服聊天機器人角色設定與對話資料庫

export const BOT_ROLES = {
  aetheria: {
    id: 'aetheria',
    name: 'Aetheria 智能客服',
    title: '官方 AI 助理',
    avatar: '🤖',
    statusText: '在線 - 智慧服務中',
    greeting: '您好！我是 Aetheria AI 的官方智能客服。我可以協助您了解我們的雲端運算、智慧工作流與自動化解決方案。請問今天有什麼我可以幫忙的？',
    suggestions: [
      '💡 Aetheria 平台主要功能？',
      '💰 訂閱方案與價格？',
      '🔌 如何串接 API 金鑰？',
      '📞 聯絡真人客服支援'
    ],
    personality: '專業、有禮貌、回答全面'
  },
  serena: {
    id: 'serena',
    name: 'Serena 林雨晴',
    title: '銷售與帳務專員',
    avatar: '👩‍💼',
    statusText: '在線 - 隨時為您服務',
    greeting: '您好！我是銷售顧問 Serena。關於產品報價、企業方案、帳單發票或退費流程，都歡迎向我諮詢！今天想了解哪方面的付費方案呢？',
    suggestions: [
      '💎 適合中小企業的方案？',
      '💳 付款方式與開立發票？',
      '⚡ 申請企業版免費試用',
      '🔄 降級與退費政策'
    ],
    personality: '親切、熱情、業務導向'
  },
  marcus: {
    id: 'marcus',
    name: 'Marcus 趙承風',
    title: '資深技術支援工程師',
    avatar: '👨‍💻',
    statusText: '在線 - 代碼編譯中',
    greeting: 'Hey! 我是 Marcus。如果你在系統整合、API 串接、SDK 報錯或伺服器部署遇到障礙，直接把你的程式碼或問題丟給我，我們來解決它。',
    suggestions: [
      '💻 如何用 Node.js 呼叫 API？',
      '🔑 API 限制 (Rate Limits)？',
      '🛠️ 遇到了 502 錯誤怎麼辦？',
      '📦 SDK 下載與安裝'
    ],
    personality: '工程師性格、精準、多用代碼與步驟說明'
  }
};

// 知識庫定義
const KNOWLEDGE_BASE = {
  features: {
    keywords: ['功能', '特色', '特色', '要做什麼', '平台', '做什麼', 'features', 'what can you do', 'aetheria'],
    aetheria: `**Aetheria AI** 是一個次世代的雲端智能與工作流自動化平台。我們的主要功能包括：

1. **智能自動化流程 (Automated Workflows)**：無需寫程式即可串接超過 500+ 種常用 SaaS 軟體。
2. **高效雲端運算 (Elastic Compute)**：按需分配算力，支援大模型推理與數據分析。
3. **即時數據儀表板 (Real-time Analytics)**：用直觀的視覺化圖表監控業務數據。
4. **企業級安全保障 (Enterprise Security)**：全傳輸加密 (TLS 1.3) 與 ISO 27001 認證。

您可以點選左側的「產品手冊」連結了解更多，或向我詢問特定功能的實作細節。`,
    serena: `Aetheria 平台的核心優勢在於**投資回報率 (ROI) 高**！透過我們的自動化工作流，企業平均能節省 **40% 的營運人力成本**。

我們有提供：
- 基礎版：適合個人創作者，解鎖基本自動化。
- 專業版：適合成長型團隊，提供無限工作流與優先運算。
- 企業版：專屬伺服器與客製化安全性。

需要我為您安排 30 分鐘的線上視訊演示 (Demo) 嗎？`,
    marcus: `技術面上，我們的架構採用了分散式微服務：
- **RESTful API**：全面採用 JSON 格式，保證高吞吐量。
- **Webhooks**：毫秒級事件觸發機制。
- **高可用性**：多區域部署，SLA 承諾達 **99.99%**。

如果你想看技術文件，可以隨時跟我說，我給你丟 API 範例。`
  },
  pricing: {
    keywords: ['價格', '價格', '收費', '方案', '付費', '多少錢', '便宜', '付費', '費用', '訂閱', 'pricing', 'cost', 'plan'],
    aetheria: `Aetheria AI 提供彈性的訂閱方案，您可以按月或按年付費（年付可享 8 折優惠）：

| 方案名稱 | 價格 (月付) | 自動化配額 | 雲端算力 | 支援服務 |
| :--- | :--- | :--- | :--- | :--- |
| **免費版 Starter** | $0 | 1,000 次/月 | 共享算力 | 社群支援 |
| **專業版 Professional** | $49 /月 | 50,000 次/月 | 獨享加速 | 24小時 Email |
| **企業版 Enterprise** | 客製化 | 無限制 | 專屬 GPU | 專屬架構師 + 電話 |

詳細定價資訊可點擊 [Aetheria 官方定價頁面](#) 進行試算。`,
    serena: `我們現在正舉辦年中慶活動！🎉 
現在訂閱**專業年費方案**，除了享受 8 折外，我還可以為您額外申請 **$100 美元的雲端算力體驗金**！

此外，如果是 5 人以上的團隊，我們有特殊的「團隊團體優惠」，您有興趣讓我們的銷售專員為您製作一份客製化報價單嗎？`,
    marcus: `關於計費點的技術說明：
- **API 呼叫**：只有成功的 Request (HTTP 2xx) 會被計入配額。
- **算力單位 (Compute Units)**：以每秒執行的記憶體/核心數計算。
- **超額費用**：如果您的專業版流量超出限制，系統預設會暫停該月自動化，或者您可以開啟「自動加購 (Auto-scaling)」避免服務中斷。`
  },
  api: {
    keywords: ['api', 'sdk', '開發者', '金鑰', '串接', 'code', '代碼', '程式碼', 'nodejs', 'python', 'developer'],
    aetheria: `要開始串接 Aetheria API，您需要先在「開發者主控台」建立一組 **API Key**。

基本連線資訊：
- **Base URL**: \`https://api.aetheria.ai/v1\`
- **認證方式**: 在 HTTP Header 中加入 \`Authorization: Bearer YOUR_API_KEY\`

請確保不要將 API 金鑰暴露於前端瀏覽器代碼中，應在後端安全伺服器中呼叫。`,
    serena: `我們的 API 串接非常容易，這也是為什麼許多企業選擇我們的原因。
購買專業版以上的客戶，均可以獲得免費的「技術對接諮詢服務」，協助您的 IT 部門在 3 天內完成系統上線！`,
    marcus: `這是最簡單的 Node.js 呼叫範例：

\`\`\`javascript
const axios = require('axios');

async function triggerWorkflow() {
  try {
    const response = await axios.post(
      'https://api.aetheria.ai/v1/workflows/trigger',
      { workflowId: 'wf_987654' },
      {
        headers: {
          'Authorization': 'Bearer acme_sec_key_xyz',
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Workflow Active:', response.data.status);
  } catch (error) {
    console.error('API Connection Failed:', error.response?.data || error.message);
  }
}

triggerWorkflow();
\`\`\`

我們也提供 Python 與 Go 的 SDK。有需要特定語言的 SDK 安裝指令嗎？`
  },
  human: {
    keywords: ['真人', '客服', '聯絡', '電話', '人類', '專人', '找人', '轉接', 'human', 'agent', 'support', 'contact'],
    aetheria: `好的，為您安排轉接。
已為您登記真人客服轉接申請。由於目前線上諮詢人數較多，真人客服預計會在 **3-5 分鐘內** 在此視窗與您交談。
您也可以撥打我們的企業服務專線：\`0800-123-456\`（服務時間：週一至週五 09:00 - 18:00）。`,
    serena: `沒問題！我可以直接幫您安排銷售經理與您進行一對一電話會議。
請告訴我您的聯絡電話或是 Email，以及您方便接聽的時間，我會立刻為您排程！`,
    marcus: `沒問題，如果您遇到了複雜的 Bug，確實需要專人介入。
我已經將您的技術諮詢單 (Ticket #ATH-9921) 送交給我們二線的 Cloud Architect 團隊，他們會直接透過您註冊的帳號信箱聯絡您。您也可以在下方留言附上您的錯誤日誌 (Log)。`
  },
  error: {
    keywords: ['錯誤', '失敗', '壞掉', '報錯', '無法', 'bug', 'error', 'failed', '502', '400', '403', '401', '404', '連不上'],
    aetheria: `很抱歉讓您遇到連線或系統問題。
請您先嘗試以下排查步驟：
1. 檢查您的 [API 金鑰] 是否過期或輸入錯誤。
2. 查看 Aetheria [服務狀態頁面](https://status.aetheria.ai) 確保服務未中斷。
3. 如果是在瀏覽器中，請清除快取或使用無痕視窗重試。

若問題持續，請提供您的錯誤代碼 (e.g. HTTP 403, 502) 給我們。`,
    serena: `非常抱歉！若是遇到付費後帳號沒有升級，或是信用卡交易被拒絕，這通常是銀行端的 3D 驗證問題。
您可以點擊右上角的「重試付款」，或提供您交易帳號的註冊信箱，我立刻請財務部門幫您人工對帳！`,
    marcus: `常見的錯誤碼排查：
- **401 Unauthorized**：API Key 填錯或被停用。
- **429 Too Many Requests**：超出 Rate Limit 限制（免費版為 60 次/分鐘）。需在程式碼中加入 Backoff 重試機制。
- **502 Bad Gateway**：通常是我們的邊緣伺服器在維護，或者你的 Payload 格式不合規範被 WAF 阻擋。請檢查 JSON 是否完整。`
  }
};

// 根據輸入內容與角色返回回答
export function getBotResponse(userMessage, botRoleId) {
  const normalizedMsg = userMessage.toLowerCase().trim();
  const bot = BOT_ROLES[botRoleId] || BOT_ROLES.aetheria;

  // 1. 檢查關鍵字匹配
  for (const key in KNOWLEDGE_BASE) {
    const entry = KNOWLEDGE_BASE[key];
    if (entry.keywords.some(keyword => normalizedMsg.includes(keyword))) {
      return entry[botRoleId] || entry.aetheria;
    }
  }

  // 2. 預設無匹配回答
  const defaultResponses = {
    aetheria: `謝謝您的提問。關於「\${userMessage}」，我了解您可能有一些特定疑問。
為了能給您最精準的答覆，您可以嘗試點擊下方的常見推薦問題，或者輸入「價格」、「功能」、「串接 API」等關鍵字。
我也隨時可以為您「轉接真人客服」！`,
    serena: `這是一個很好的問題！關於這點，我建議可以根據您的具體團隊規模來評估。
您目前是在為個人尋求解決方案，還是代表公司進行評估呢？我很樂意為您提供最適合的商業建議。`,
    marcus: `對於你提到的「\${userMessage}」，從底層技術架構上來看，它可能涉及到核心資料庫讀取或網路路由配置。
你可以把具體的 Error Stack 或者實作目標更詳細地描述一下嗎？這樣我才能幫你分析 Debug。`
  };

  const responseTemplate = defaultResponses[botRoleId] || defaultResponses.aetheria;
  return responseTemplate.replace('\${userMessage}', userMessage);
}

// 模擬打字延遲時間（毫秒）
export function getTypingDelay(message) {
  // 字數越長，打字時間越長，介於 800ms 到 2000ms 之間
  const baseDelay = 600;
  const lengthFactor = Math.min(message.length * 8, 1400);
  return baseDelay + lengthFactor;
}
