import { IonCard, IonCardHeader, IonImg } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router';
import { MessageTimestamp } from 'stream-chat-react';
import Text from '../../../../components/text/Text';
import './CustomMessage.css';

const ItemMessageFromOther = (props) => {
  const history = useHistory();

  const { message } = props;
  const { chatItem, text = '' } = message;
  const { imageUrl = '', name = '', link = '/not-found' } = chatItem;

  return (
    <li className="str-chat__li str-chat__li--single">
      <div className="str-chat__message str-chat__message-simple str-chat__message--regular str-chat__message--received str-chat__message--has-text">
        <div className="str-chat__message">
          <div 
            className="str-chat__avatar str-chat__avatar--circle" 
            style={{flexBasis: "32px", fontSize: "16px", height: "32px", lineHeight: "32px", width: "32px"}}
          >
            <div className="str-chat__avatar-fallback">
              <IonImg src={message.user?.image} />
            </div>
          </div>
          <div>
          <div className={`str-chat__message-text-inner str-chat__message-simple-text-inner`}> {/*` ion-justify-content-${isMessageOwner ? "end" : "start"}`}>*/}
            <IonCard onClick={() => history.push(link)}>
              <IonImg src={imageUrl} />
              <IonCardHeader>
                <Text size="xs"><b>{name}</b></Text>
              </IonCardHeader>
            </IonCard>
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

export default React.memo(ItemMessageFromOther);
