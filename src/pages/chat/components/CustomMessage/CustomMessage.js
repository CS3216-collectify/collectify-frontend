import React from 'react';
import { useHistory } from 'react-router';
import { MessageSimple, useChatContext, useMessageContext } from 'stream-chat-react';
import useUserContext from '../../../../hooks/useUserContext';
import './CustomMessage.css';
import ItemMessageFromOther from './ItemMessageFromOther';

const CustomMessage = (props) => {
  const history = useHistory();
  const { message } = useMessageContext();
  const { channel } = useChatContext();
  const { isCurrentUser } = useUserContext();

  const isMessageOwner = isCurrentUser(message.user.id);

  if (message?.chatItem) {
    const { imageUrl, link, name } = message?.chatItem;
    if (imageUrl && link && name) {
      if (!isMessageOwner) {
        return (
          <ItemMessageFromOther message={message} />
        );
      }
    }
  }

  console.log(message);
  return (
    <>
      <MessageSimple {...props} />
    </>
  );
};

export default React.memo(CustomMessage);

























{/* <div className="str-chat__message-inner">
            <div className="str-chat__message-text">
                
            </div>
            
            <div class="str-chat__message-text-inner str-chat__message-simple-text-inner">
              <div>
                <p>s</p>
              </div>
            </div>
            <div className="str-chat__message-data str-chat__message-simple-data">
              <time class="str-chat__message-simple-timestamp">
                Today 
              </time>
            </div> 
          </div>*/}
          {/* <IonCol size={8}>
            <IonCard onClick={() => history.push(link)}>
              <IonImg src={imageUrl} />
              <IonCardHeader>
                <Text size="l"><b>{name}</b></Text>
              </IonCardHeader>
              <IonCardContent>
                <Text size="m">{text}</Text>
              </IonCardContent>
            </IonCard>
          </IonCol> */}


