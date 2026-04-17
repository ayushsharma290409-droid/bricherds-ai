import Common "common";

module {
  public type AiModel = {
    #gpt4o;
    #claude;
    #deepseekV3;
    #grok;
  };

  public type MessageRole = {
    #user;
    #assistant;
    #system_;
  };

  public type AttachmentKind = {
    #image;
    #pdf;
    #text;
    #generatedImage;
  };

  public type Attachment = {
    storageId : Text;
    name : Text;
    kind : AttachmentKind;
    mimeType : Text;
  };

  public type Message = {
    id : Common.MessageId;
    conversationId : Common.ConversationId;
    role : MessageRole;
    content : Text;
    attachments : [Attachment];
    model : ?AiModel;
    createdAt : Common.Timestamp;
  };

  // Internal: mutable fields allowed
  public type ConversationInternal = {
    id : Common.ConversationId;
    userId : Common.UserId;
    var title : Text;
    var model : AiModel;
    var messages : [Message];
    createdAt : Common.Timestamp;
    var updatedAt : Common.Timestamp;
  };

  // Shared: returned over API boundary
  public type Conversation = {
    id : Common.ConversationId;
    userId : Common.UserId;
    title : Text;
    model : AiModel;
    messageCount : Nat;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type ConversationDetail = {
    id : Common.ConversationId;
    userId : Common.UserId;
    title : Text;
    model : AiModel;
    messages : [Message];
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type CreateConversationArgs = {
    title : Text;
    model : AiModel;
  };

  public type SendMessageArgs = {
    conversationId : Common.ConversationId;
    content : Text;
    attachments : [Attachment];
  };

  public type UpdateConversationArgs = {
    conversationId : Common.ConversationId;
    title : ?Text;
    model : ?AiModel;
  };
};
