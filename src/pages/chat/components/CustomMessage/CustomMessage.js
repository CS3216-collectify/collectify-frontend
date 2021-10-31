import React from 'react';
import { useChatContext, useMessageContext } from 'stream-chat-react';
import './CustomMessage.css';
import ItemMessageFromMe from './ItemMessageFromMe';
import ItemMessageFromOther from './ItemMessageFromOther';

const CustomMessage = (props) => {
  const { message } = useMessageContext();
  const { client } = useChatContext();

  const isMessageOwner = client.userID === message.user.id;

  if (!isMessageOwner) {
    return (
      <ItemMessageFromOther message={message} />
    );
  } 

  return (
    <ItemMessageFromMe message={message} />
  )
};

export default React.memo(CustomMessage);
