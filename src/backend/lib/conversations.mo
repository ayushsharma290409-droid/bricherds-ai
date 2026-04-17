import Common "../types/common";
import Types "../types/conversations";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Time "mo:core/Time";

module {
  // Create a new conversation for a user; returns (newId, nextId)
  public func create(
    conversations : Map.Map<Common.ConversationId, Types.ConversationInternal>,
    nextId : Nat,
    userId : Common.UserId,
    args : Types.CreateConversationArgs,
    now : Common.Timestamp,
  ) : (Common.ConversationId, Nat) {
    let id = nextId;
    let conv : Types.ConversationInternal = {
      id;
      userId;
      var title = args.title;
      var model = args.model;
      var messages = [];
      createdAt = now;
      var updatedAt = now;
    };
    conversations.add(id, conv);
    (id, nextId + 1);
  };

  // List all conversations for a user (summary view, no messages)
  public func listForUser(
    conversations : Map.Map<Common.ConversationId, Types.ConversationInternal>,
    userId : Common.UserId,
  ) : [Types.Conversation] {
    let matching = conversations.entries()
      .filter(func((_, conv) : (Common.ConversationId, Types.ConversationInternal)) : Bool {
        conv.userId == userId
      })
      .map(func((_, conv) : (Common.ConversationId, Types.ConversationInternal)) : Types.Conversation {
        toPublic(conv)
      })
      .toArray();
    matching;
  };

  // Get full conversation detail with messages for a user
  public func getDetail(
    conversations : Map.Map<Common.ConversationId, Types.ConversationInternal>,
    userId : Common.UserId,
    conversationId : Common.ConversationId,
  ) : ?Types.ConversationDetail {
    switch (conversations.get(conversationId)) {
      case (?conv) {
        if (conv.userId == userId) {
          ?toDetail(conv);
        } else {
          null;
        };
      };
      case null { null };
    };
  };

  // Delete a conversation owned by a user
  public func delete(
    conversations : Map.Map<Common.ConversationId, Types.ConversationInternal>,
    userId : Common.UserId,
    conversationId : Common.ConversationId,
  ) : Bool {
    switch (conversations.get(conversationId)) {
      case (?conv) {
        if (conv.userId == userId) {
          conversations.remove(conversationId);
          true;
        } else {
          false;
        };
      };
      case null { false };
    };
  };

  // Update metadata (title, model) of a conversation
  public func update(
    conversations : Map.Map<Common.ConversationId, Types.ConversationInternal>,
    userId : Common.UserId,
    args : Types.UpdateConversationArgs,
    now : Common.Timestamp,
  ) : Bool {
    switch (conversations.get(args.conversationId)) {
      case (?conv) {
        if (conv.userId == userId) {
          switch (args.title) {
            case (?t) { conv.title := t };
            case null {};
          };
          switch (args.model) {
            case (?m) { conv.model := m };
            case null {};
          };
          conv.updatedAt := now;
          true;
        } else {
          false;
        };
      };
      case null { false };
    };
  };

  // Append a message to a conversation; returns new message id or null if not found/unauthorized
  public func appendMessage(
    conversations : Map.Map<Common.ConversationId, Types.ConversationInternal>,
    userId : Common.UserId,
    conversationId : Common.ConversationId,
    nextMsgId : Common.MessageId,
    role : Types.MessageRole,
    content : Text,
    attachments : [Types.Attachment],
    model : ?Types.AiModel,
    now : Common.Timestamp,
  ) : ?Common.MessageId {
    switch (conversations.get(conversationId)) {
      case (?conv) {
        if (conv.userId == userId) {
          let msg : Types.Message = {
            id = nextMsgId;
            conversationId;
            role;
            content;
            attachments;
            model;
            createdAt = now;
          };
          conv.messages := conv.messages.concat([msg] : [Types.Message]);
          conv.updatedAt := now;
          ?nextMsgId;
        } else {
          null;
        };
      };
      case null { null };
    };
  };

  // Convert internal conversation to shared summary type
  public func toPublic(self : Types.ConversationInternal) : Types.Conversation {
    {
      id = self.id;
      userId = self.userId;
      title = self.title;
      model = self.model;
      messageCount = self.messages.size();
      createdAt = self.createdAt;
      updatedAt = self.updatedAt;
    };
  };

  // Convert internal conversation to shared detail type
  public func toDetail(self : Types.ConversationInternal) : Types.ConversationDetail {
    {
      id = self.id;
      userId = self.userId;
      title = self.title;
      model = self.model;
      messages = self.messages;
      createdAt = self.createdAt;
      updatedAt = self.updatedAt;
    };
  };
};
