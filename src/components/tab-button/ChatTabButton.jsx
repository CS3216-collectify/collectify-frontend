import { IonBadge, IonIcon, IonTabButton, IonText } from "@ionic/react";
import { chatbubblesOutline } from "ionicons/icons";
import useUserContext from "../../hooks/useUserContext";

const ChatTabButton = () => {
  const { unreadMessages } = useUserContext();

  return (
    <IonTabButton tab="d" href="/chat">
      <IonIcon icon={chatbubblesOutline} />
      <IonBadge color="primary">{Number(unreadMessages)}</IonBadge>
      <IonText>Chats</IonText>
    </IonTabButton>
  );
};

export default ChatTabButton;
