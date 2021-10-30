import React from 'react';
import { useHistory } from 'react-router';
import { MessageSimple, useChatContext, useMessageContext } from 'stream-chat-react';
import useUserContext from '../../../../hooks/useUserContext';
import './CustomMessage.css';
import ItemMessageFromMe from './ItemMessageFromMe';
import ItemMessageFromOther from './ItemMessageFromOther';

const CustomMessage = (props) => {
  const { message } = useMessageContext();
  const { isCurrentUser } = useUserContext();

  const isMessageOwner = isCurrentUser(message.user.id);

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
