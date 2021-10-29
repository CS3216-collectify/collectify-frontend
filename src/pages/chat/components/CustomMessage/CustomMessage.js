import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonImg, IonItem, IonList, IonRow, IonThumbnail } from '@ionic/react';
import React from 'react';
import { MessageSimple } from 'stream-chat-react';
import Text from '../../../../components/text/Text';
import { useMessageContext, useChatContext } from 'stream-chat-react';

import './CustomMessage.css';
import useUserContext from '../../../../hooks/useUserContext';
import { useHistory } from 'react-router';

const CustomMessage = (props) => {
  const history = useHistory();
  const { message } = useMessageContext();
  const { channel } = useChatContext();
  const { isCurrentUser } = useUserContext();

  const isMessageOwner = isCurrentUser(message.user.id);

  let decodedItem = null;
  try {
    decodedItem = JSON.parse(message.text);
  } catch (e) {
  }

  if (decodedItem) {
    const { imageUrl, link, name, text } = decodedItem;
    if (imageUrl && link && name) {
      console.log(link);
      return (
        <IonRow class={`ion-justify-content-${isMessageOwner ? "end" : "start"}`}>
          <IonCol size={8}>
            <IonCard onClick={() => history.push(link)}>
              <IonImg src={imageUrl} />
              <IonCardHeader>
                <Text size="l"><b>{name}</b></Text>
                {/* <IonCardSubtitle>{name}</IonCardSubtitle> */}
              </IonCardHeader>
              <IonCardContent>
                <Text size="m">{text}</Text>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      );
    }
  }

  return (
    <>
      <MessageSimple {...props} />
    </>
  );
};

export default CustomMessage;
