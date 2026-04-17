import Common "../types/common";
import Types "../types/conversations";
import ConvLib "../lib/conversations";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

mixin (
  conversations : Map.Map<Common.ConversationId, Types.ConversationInternal>,
  counters : Common.Counters,
) {
  // --- Conversation management ---

  public shared ({ caller }) func createConversation(args : Types.CreateConversationArgs) : async Types.Conversation {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    let now = Time.now();
    let (newId, updatedNextId) = ConvLib.create(conversations, counters.nextConvId, caller, args, now);
    counters.nextConvId := updatedNextId;
    switch (ConvLib.getDetail(conversations, caller, newId)) {
      case (?detail) {
        {
          id = detail.id;
          userId = detail.userId;
          title = detail.title;
          model = detail.model;
          messageCount = detail.messages.size();
          createdAt = detail.createdAt;
          updatedAt = detail.updatedAt;
        };
      };
      case null { Runtime.trap("Unexpected: conversation not found after creation") };
    };
  };

  public query ({ caller }) func listConversations() : async [Types.Conversation] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    ConvLib.listForUser(conversations, caller);
  };

  public query ({ caller }) func getConversation(conversationId : Common.ConversationId) : async ?Types.ConversationDetail {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    ConvLib.getDetail(conversations, caller, conversationId);
  };

  public shared ({ caller }) func deleteConversation(conversationId : Common.ConversationId) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    ConvLib.delete(conversations, caller, conversationId);
  };

  public shared ({ caller }) func updateConversation(args : Types.UpdateConversationArgs) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    let now = Time.now();
    ConvLib.update(conversations, caller, args, now);
  };

  // --- Messaging ---

  // Appends a user message to the conversation; returns the new message's id
  public shared ({ caller }) func sendMessage(args : Types.SendMessageArgs) : async ?Common.MessageId {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    let now = Time.now();
    let msgId = ConvLib.appendMessage(
      conversations,
      caller,
      args.conversationId,
      counters.nextMsgId,
      #user,
      args.content,
      args.attachments,
      null,
      now,
    );
    switch (msgId) {
      case (?id) {
        counters.nextMsgId := id + 1;
        ?id;
      };
      case null { null };
    };
  };

  // Append an assistant (AI) reply to a conversation; called after receiving AI response
  public shared ({ caller }) func appendAssistantMessage(
    conversationId : Common.ConversationId,
    content : Text,
    model : Types.AiModel,
  ) : async ?Common.MessageId {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    let now = Time.now();
    let msgId = ConvLib.appendMessage(
      conversations,
      caller,
      conversationId,
      counters.nextMsgId,
      #assistant,
      content,
      [],
      ?model,
      now,
    );
    switch (msgId) {
      case (?id) {
        counters.nextMsgId := id + 1;
        ?id;
      };
      case null { null };
    };
  };
};
