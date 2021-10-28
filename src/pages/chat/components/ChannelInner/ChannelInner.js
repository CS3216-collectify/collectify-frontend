import React, { useContext, useEffect, useState } from 'react';
import { logChatPromiseExecution } from 'stream-chat';
import {
  MessageList,
  MessageInput,
  Thread,
  Window,
  useChannelActionContext,
  useChatContext
} from 'stream-chat-react';

import { MessagingChannelHeader, MessagingInput } from '../../components';

import { GiphyContext } from '../../Chat';
import { useHistory, useLocation } from 'react-router';
import useUserContext from '../../../../hooks/useUserContext';
import useToastContext from '../../../../hooks/useToastContext';
import { IonCol, IonIcon, IonImg, IonItem, IonList, IonThumbnail } from '@ionic/react';
import Text from '../../../../components/text/Text';
import { close } from 'ionicons/icons';

const ChatItem = ({ chatItem, onClose: closeHandler, onClick }) => {
  if (!chatItem) {
    return null;
  }

  const { imageUrl, name, link } = chatItem;
  return (
    <IonItem color="light">
      <IonCol onClick={onClick}>
        <IonThumbnail>
          <IonImg src={imageUrl} />
        </IonThumbnail>
      </IonCol>
      <IonCol  onClick={onClick}>
        <Text size="l">
          {name}
        </Text>
      </IonCol>
      <IonIcon icon={close} onClick={closeHandler} />
    </IonItem>
  )
}

export const ChannelInner = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { chatClient } = useUserContext();
  const setToast = useToastContext();
  const { setActiveChannel } = useChatContext();
  const { theme, toggleMobile } = props;
  const [chatItem, setChatItem] = useState(null);

  const { giphyState, setGiphyState } = useContext(GiphyContext);
  const { sendMessage } = useChannelActionContext();

  useEffect(() => {
    // console.log("TEST");
    // setChatItem({
    //   name: "My Item", 
    //   link: "/profile",
    //   imageUrl: "https://us-east.stream-io-cdn.com/1148587/images/1b72a963-d3f8-4563-a427-5a218c24c890.no-profile-image.png?ro=0&Expires=1636640990&Signature=SLTzdSK3QYyNsmHEcGsjnscCNzUqrSNN9~FKIymk71ym6fKbwjhBVLhqmQk4rQZYHR1~kx9cH8VYLy~3lk3ITMKULckGWN3CQA4ImyC7yejKKLhAPjYlhoFfcc~Md7GtfdHoqEVaeuT7iG8wmSmh0GUaxDSna8UzeRPI9C~hb0qXefFk5CbsteGNpKo9h6QKimebS3KWiWwrYosyfdE14WjdKV1oxHzdqpKesLjxWH-Ga3bzqPKKplMT6quWKeBlE5U1tZ0l5GqZKPtZh0VFN7-lLtt8aXUgDT-fkaqQ~PCT9RdRKwI8fhU4h-Jm5HfSyslgGeDloQsVFCI6LBVY-A__&Key-Pair-Id=APKAIHG36VEWPDULE23Q",
    // })
    if (location.state?.chatItem) {
      const { chatItem } = location.state;
      delete location.state?.chatItem;
      console.log(chatItem);
      setChatItem(chatItem);
      delete location.state?.chatItem;
    }
  }, [location]);

  useEffect(() => {
    if (location.state?.recipient) {
      const { recipient: recipientId } = location.state;
      delete location.state?.recipient;
      console.log(recipientId);
      if (chatClient.userID === recipientId) {
        return;
      }
      const channel = chatClient.channel("messaging", {
        members: [chatClient.userID, recipientId],
      });
      channel.watch().then((res) => {
        setActiveChannel(channel);
      }).catch((e) => {
        setToast({ message: "Unable to open chat. Try again later.", color: "danger" });
      })
    }
  }, [location]);

  const overrideSubmitHandler = (message) => {
    console.log(message);
    let updatedMessage;

    if (message.attachments?.length && message.text?.startsWith('/giphy')) {
      const updatedText = message.text.replace('/giphy', '');
      updatedMessage = { ...message, text: updatedText };
    }

    if (chatItem) {
      const chatItemWithMessage = { ...chatItem, text: message?.text }
      const updatedText = JSON.stringify(chatItemWithMessage);
      updatedMessage = { ...message, text: updatedText };
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

      const sendMessagePromise = sendMessage(messageToSend);
      logChatPromiseExecution(sendMessagePromise, 'send message');
    }

    setGiphyState(false);
  };

  const actions = ['delete', 'edit', 'flag', 'mute', 'react', 'reply'];

  return (
    <>
      <Window>
        <MessagingChannelHeader theme={theme} toggleMobile={toggleMobile} />
        <MessageList messageActions={actions} />
        <ChatItem onClose={() => setChatItem(null)} chatItem={chatItem} onClick={() => history.push(chatItem.link)}/>
        <MessageInput focus overrideSubmitHandler={overrideSubmitHandler} />
      </Window>
      <Thread Input={MessagingInput} />
    </>
  );
};
