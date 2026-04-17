import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface ConversationDetail {
    id: ConversationId;
    model: AiModel;
    title: string;
    messages: Array<Message>;
    userId: UserId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export interface SendMessageArgs {
    content: string;
    conversationId: ConversationId;
    attachments: Array<Attachment>;
}
export interface CreateConversationArgs {
    model: AiModel;
    title: string;
}
export type ConversationId = bigint;
export type UserId = Principal;
export type MessageId = bigint;
export interface UpdateConversationArgs {
    model?: AiModel;
    title?: string;
    conversationId: ConversationId;
}
export interface Message {
    id: MessageId;
    model?: AiModel;
    content: string;
    createdAt: Timestamp;
    role: MessageRole;
    conversationId: ConversationId;
    attachments: Array<Attachment>;
}
export interface Attachment {
    kind: AttachmentKind;
    name: string;
    mimeType: string;
    storageId: string;
}
export interface Conversation {
    id: ConversationId;
    model: AiModel;
    title: string;
    userId: UserId;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    messageCount: bigint;
}
export enum AiModel {
    claude = "claude",
    grok = "grok",
    deepseekV3 = "deepseekV3",
    gpt4o = "gpt4o"
}
export enum AttachmentKind {
    pdf = "pdf",
    generatedImage = "generatedImage",
    text = "text",
    image = "image"
}
export enum MessageRole {
    user = "user",
    assistant = "assistant",
    system = "system"
}
export interface backendInterface {
    appendAssistantMessage(conversationId: ConversationId, content: string, model: AiModel): Promise<MessageId | null>;
    createConversation(args: CreateConversationArgs): Promise<Conversation>;
    deleteConversation(conversationId: ConversationId): Promise<boolean>;
    getConversation(conversationId: ConversationId): Promise<ConversationDetail | null>;
    listConversations(): Promise<Array<Conversation>>;
    sendMessage(args: SendMessageArgs): Promise<MessageId | null>;
    updateConversation(args: UpdateConversationArgs): Promise<boolean>;
}
