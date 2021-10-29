import React from 'react';
import { useHistory } from 'react-router';
import { MessageTimestamp } from 'stream-chat-react';
import ChatItemCard from './ChatItemCard';
import './CustomMessage.css';

const ItemMessageFromMe = (props) => {
  const history = useHistory();

  const { message } = props;
  const { chatItem, text = '' } = message;
  const { imageUrl = '', name = '', link = '/not-found' } = chatItem;

  return (
    <li className="str-chat__li str-chat__li--single">
      <div className="str-chat__message str-chat__message-simple str-chat__message--regular str-chat__message--received str-chat__message--has-text">
        <div className="str-chat__message str-chat__message--me">
          <div>
          <div className={`str-chat__message-text-inner str-chat__message-simple-text-inner`}> 
            {chatItem &&
              <ChatItemCard name={name} link={link} imageUrl={imageUrl} />
            }
            <p>{text}</p>
          </div>
          <div className="str-chat__message-data str-chat__message-simple-data">
            <span className="str-chat__message-simple-name">
              {message.user?.name}
            </span>
            <time className="str-chat__message-simple-timestamp">
              <MessageTimestamp calendar customClass="str-chat__message-simple-timestamp" />
            </time>
          </div> 
          </div>
        </div>
      </div>
    </li>
  );
}

export default React.memo(ItemMessageFromMe);
