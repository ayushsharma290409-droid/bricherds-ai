// Re-export types from backend (interfaces only)
export type {
  Conversation,
  ConversationDetail,
  ConversationId,
  Message,
  MessageId,
  Attachment,
  Timestamp,
  UserId,
  CreateConversationArgs,
  SendMessageArgs,
  UpdateConversationArgs,
} from "../backend.d.ts";

// Re-export enums from backend implementation
export { AiModel, AttachmentKind, MessageRole } from "../backend";
import type { AiModel } from "../backend";

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  description: string;
}

export interface ModelMeta {
  id: AiModel;
  label: string;
  description: string;
  color: string;
}
