import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  Conversation,
  ConversationDetail,
  ConversationId,
  CreateConversationArgs,
  SendMessageArgs,
  UpdateConversationArgs,
} from "../types";

export function useConversations() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Conversation[]>({
    queryKey: ["conversations"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listConversations();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useConversation(id: ConversationId | null) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<ConversationDetail | null>({
    queryKey: ["conversation", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getConversation(id);
    },
    enabled: !!actor && !isFetching && id !== null,
    staleTime: 10_000,
  });
}

export function useCreateConversation() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<Conversation, Error, CreateConversationArgs>({
    mutationFn: async (args) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.createConversation(args);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}

export function useSendMessage() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<bigint | null, Error, SendMessageArgs>({
    mutationFn: async (args) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.sendMessage(args);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["conversation", variables.conversationId.toString()],
      });
    },
  });
}

export function useUpdateConversation() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, UpdateConversationArgs>({
    mutationFn: async (args) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateConversation(args);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({
        queryKey: ["conversation", variables.conversationId.toString()],
      });
    },
  });
}

export function useDeleteConversation() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, ConversationId>({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteConversation(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}
