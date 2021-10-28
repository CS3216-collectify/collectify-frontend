import React, { useContext, useEffect } from 'react';
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
import { useLocation } from 'react-router';
import useUserContext from '../../../../hooks/useUserContext';
import useToastContext from '../../../../hooks/useToastContext';

export const ChannelInner = (props) => {
  const location = useLocation();
  const { chatClient } = useUserContext();
  const setToast = useToastContext();
  const { setActiveChannel } = useChatContext();
  const { theme, toggleMobile } = props;

  const { giphyState, setGiphyState } = useContext(GiphyContext);
  const { sendMessage } = useChannelActionContext();

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
    let updatedMessage;

    if (message.attachments?.length && message.text?.startsWith('/giphy')) {
      const updatedText = message.text.replace('/giphy', '');
      updatedMessage = { ...message, text: updatedText };
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
        <MessageInput focus overrideSubmitHandler={overrideSubmitHandler} />
      </Window>
      <Thread Input={MessagingInput} />
    </>
  );
};
