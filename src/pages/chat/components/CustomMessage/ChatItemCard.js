import { IonCard, IonCardHeader, IonImg } from '@ionic/react';
import React from 'react';
import { useHistory } from 'react-router';
import Text from '../../../../components/text/Text';

const ChatItemCard = (props) => {
  const history = useHistory();
  const { name, imageUrl, link } = props;

  return (
    <IonCard onClick={() => history.push(link ? link : '/not-found' )}>
      <IonImg src={imageUrl} />
      <IonCardHeader>
        <Text size="xs"><b>{name}</b></Text>
      </IonCardHeader>
    </IonCard>
  );
}

export default React.memo(ChatItemCard);