import { IonCol, IonIcon, IonImg, IonItem, IonThumbnail } from "@ionic/react";
import { close } from "ionicons/icons";
import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { logChatPromiseExecution } from "stream-chat";
import { MessageInput, MessageList, Thread, useChannelActionContext, useChatContext, Window } from "stream-chat-react";
import Text from "../../../../components/text/Text";
import useToastContext from "../../../../hooks/useToastContext";
import useUserContext from "../../../../hooks/useUserContext";
import { GiphyContext } from "../../Chat";
import { MessagingChannelHeader, MessagingInput } from "../../components";

const ChatItem = ({ chatItem, onClose: closeHandler, onClick }) => {
  if (!chatItem) {
    return null;
  }

  const { imageUrl, name, link } = chatItem;
  return (
    <IonItem color="light">
      <IonCol size={2} onClick={onClick}>
        <IonThumbnail>
          <IonImg src={imageUrl} />
        </IonThumbnail>
      </IonCol>
      <IonCol onClick={onClick}>
        <Text size="l">{name}</Text>
      </IonCol>
      <IonIcon icon={close} onClick={closeHandler} />
    </IonItem>
  );
};

export const ChannelInner = (props) => {
  const history = useHistory();
  const location = useLocation();
  const setToast = useToastContext();
  const { setActiveChannel, channel } = useChatContext();
  const { theme, closeNav, openNav, isNavOpen, chatItem, setChatItem } = props;

  const { giphyState, setGiphyState } = useContext(GiphyContext);
  const { sendMessage } = useChannelActionContext();

  const overrideSubmitHandler = (message) => {
    console.log(message);
    let updatedMessage;
    let customData = {};

    if (message.attachments?.length && message.text?.startsWith("/giphy")) {
      const updatedText = message.text.replace("/giphy", "");
      updatedMessage = { ...message, text: updatedText };
    }

    if (chatItem) {
      customData.chatItem = chatItem;
      setChatItem(null);
    }

    if (giphyState) {
      const updatedText = `/giphy ${message.text}`;
      updatedMessage = { ...message, text: updatedText };
    }

    if (sendMessage) {
      const newMessage = updatedMessage || message;
      const parentMessage = newMessage.parent;

      const messageToSend = {
        ...newMessage,
        parent: parentMessage
          ? {
              ...parentMessage,
              created_at: parentMessage.created_at?.toString(),
              pinned_at: parentMessage.pinned_at?.toString(),
              updated_at: parentMessage.updated_at?.toString(),
            }
          : undefined,
      };

      const sendMessagePromise = sendMessage(messageToSend, customData);
      logChatPromiseExecution(sendMessagePromise, "send message");
    }

    setGiphyState(false);
  };

  const actions = ["delete", "edit", "flag", "mute", "react", "reply"];

  return (
    <>
      <Window>
        <MessagingChannelHeader theme={theme} openNav={openNav} disabled={channel?.data?.member_count < 2} />
        <MessageList messageActions={actions} />
        <ChatItem onClose={() => setChatItem(null)} chatItem={chatItem} onClick={() => history.push(chatItem.link)} />
        {channel?.data?.member_count >= 2 && <MessageInput focus overrideSubmitHandler={overrideSubmitHandler} />}
      </Window>
      <Thread Input={MessagingInput} />
    </>
  );
};
