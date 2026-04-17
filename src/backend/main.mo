import Common "types/common";
import ConvTypes "types/conversations";
import ConvMixin "mixins/conversations-api";
import Map "mo:core/Map";

actor {
  let conversations = Map.empty<Common.ConversationId, ConvTypes.ConversationInternal>();
  let counters : Common.Counters = { var nextConvId = 0; var nextMsgId = 0 };

  include ConvMixin(conversations, counters);
};
