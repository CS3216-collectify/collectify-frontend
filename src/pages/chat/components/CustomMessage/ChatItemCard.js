import { IonCard, IonCardHeader, IonCardSubtitle, IonImg } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router';
import Text from '../../../../components/text/Text';

const ChatItemCard = (props) => {
  const history = useHistory();
  const { chatItem } = props;

  if (!chatItem) {
    return null;
  }

  const { imageUrl, link, name } = chatItem;

  return (
    <IonCard className="clickable" onClick={() => history.push(link ? link : '/not-found' )}>
      <IonImg src={imageUrl} />
      <IonCardHeader>
        <Text size="s">{name}</Text>
      </IonCardHeader>
    </IonCard>
  );
}

export default React.memo(ChatItemCard);