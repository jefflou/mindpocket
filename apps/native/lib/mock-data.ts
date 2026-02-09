export const mockChatHistory = [
  {
    date: "2026年02月08日",
    items: [
      { id: "chat-1", title: "如何学习 React Native" },
      { id: "chat-2", title: "TypeScript 泛型详解" },
    ],
  },
  {
    date: "2026年02月07日",
    items: [
      { id: "chat-3", title: "Expo Router 路由配置" },
      { id: "chat-4", title: "Tailwind CSS 在 RN 中的使用" },
    ],
  },
  {
    date: "2026年02月05日",
    items: [
      { id: "chat-5", title: "Zustand 状态管理最佳实践" },
      { id: "chat-6", title: "RAG 系统设计思路" },
    ],
  },
]

export const mockTrendingTopics = [
  { id: "1", title: "DeepSeek R2 发布，推理能力再次突破", views: 302_000 },
  { id: "2", title: "多家中小银行上调存款利率", views: 287_000 },
  { id: "3", title: "韩国比特币交易所巨额「手滑」", views: 275_000 },
  { id: "4", title: "AI.com 域名以 7000 万美元转手", views: 274_000 },
]

export const chatModels = [
  {
    id: "deepseek/deepseek-v3.2",
    name: "GPT-4o Mini",
    description: "快速且经济",
  },
  {
    id: "openai/gpt-4o",
    name: "GPT-4o",
    description: "最强多模态",
  },
  {
    id: "anthropic/claude-sonnet-4",
    name: "Claude Sonnet 4",
    description: "速度与智能平衡",
  },
  {
    id: "deepseek/deepseek-chat",
    name: "DeepSeek Chat",
    description: "高性价比中文",
  },
]
