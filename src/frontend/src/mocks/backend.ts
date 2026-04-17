import type { backendInterface, AiModel, Conversation, ConversationDetail, Message, MessageRole, AttachmentKind } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleMessages: Message[] = [
  {
    id: BigInt(1),
    role: "user" as unknown as MessageRole,
    content: "Hello! What can you help me with today?",
    createdAt: now - BigInt(60_000_000_000),
    conversationId: BigInt(1),
    attachments: [],
  },
  {
    id: BigInt(2),
    role: "assistant" as unknown as MessageRole,
    model: "gpt4o" as unknown as AiModel,
    content: "Hi there! I'm Bricherds AI — your all-in-one assistant. I can chat, summarize docs, generate images, write code, and build websites. What would you like to do?",
    createdAt: now - BigInt(55_000_000_000),
    conversationId: BigInt(1),
    attachments: [],
  },
];

const sampleConversations: Conversation[] = [
  {
    id: BigInt(1),
    model: "gpt4o" as unknown as AiModel,
    title: "Getting Started with Bricherds",
    userId: { toText: () => "user-1" } as any,
    createdAt: now - BigInt(60_000_000_000),
    updatedAt: now - BigInt(55_000_000_000),
    messageCount: BigInt(2),
  },
  {
    id: BigInt(2),
    model: "claude" as unknown as AiModel,
    title: "Image Generation Ideas",
    userId: { toText: () => "user-1" } as any,
    createdAt: now - BigInt(120_000_000_000),
    updatedAt: now - BigInt(100_000_000_000),
    messageCount: BigInt(5),
  },
];

export const mockBackend: backendInterface = {
  appendAssistantMessage: async (_conversationId, _content, _model) => BigInt(3),
  createConversation: async (args) => ({
    id: BigInt(Date.now()),
    model: args.model,
    title: args.title,
    userId: { toText: () => "user-1" } as any,
    createdAt: BigInt(Date.now()) * BigInt(1_000_000),
    updatedAt: BigInt(Date.now()) * BigInt(1_000_000),
    messageCount: BigInt(0),
  }),
  deleteConversation: async (_id) => true,
  getConversation: async (_id) => ({
    id: BigInt(1),
    model: "gpt4o" as unknown as AiModel,
    title: "Getting Started with Bricherds",
    userId: { toText: () => "user-1" } as any,
    createdAt: now - BigInt(60_000_000_000),
    updatedAt: now - BigInt(55_000_000_000),
    messages: sampleMessages,
  }),
  listConversations: async () => sampleConversations,
  sendMessage: async (_args) => BigInt(4),
  updateConversation: async (_args) => true,
};
