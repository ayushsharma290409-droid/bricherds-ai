import { useActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type {
  Conversation,
  ConversationDetail,
  ConversationId,
  CreateConversationArgs,
  MessageId,
  SendMessageArgs,
  UpdateConversationArgs,
} from "../types";

/**
 * Typed wrapper around the backend actor.
 * All data operations go through these functions — never bypass via localStorage or context stores.
 */

export function useBackendClient() {
  const { actor, isFetching } = useActor(createActor);
  const isReady = !!actor && !isFetching;

  async function listConversations(): Promise<Conversation[]> {
    if (!actor) return [];
    return actor.listConversations();
  }

  async function getConversation(
    id: ConversationId,
  ): Promise<ConversationDetail | null> {
    if (!actor) return null;
    return actor.getConversation(id);
  }

  async function createConversation(
    args: CreateConversationArgs,
  ): Promise<Conversation> {
    if (!actor) throw new Error("Actor not ready");
    return actor.createConversation(args);
  }

  async function sendMessage(args: SendMessageArgs): Promise<MessageId | null> {
    if (!actor) throw new Error("Actor not ready");
    return actor.sendMessage(args);
  }

  async function updateConversation(
    args: UpdateConversationArgs,
  ): Promise<boolean> {
    if (!actor) throw new Error("Actor not ready");
    return actor.updateConversation(args);
  }

  async function deleteConversation(id: ConversationId): Promise<boolean> {
    if (!actor) throw new Error("Actor not ready");
    return actor.deleteConversation(id);
  }

  return {
    isReady,
    listConversations,
    getConversation,
    createConversation,
    sendMessage,
    updateConversation,
    deleteConversation,
  };
}
