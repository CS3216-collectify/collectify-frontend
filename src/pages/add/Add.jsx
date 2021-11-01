import { IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import { useHistory } from "react-router";
import SelectCollections from "../../components/profile-collection/SelectCollections";
import Text from "../../components/text/Text";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import useUserContext from "../../hooks/useUserContext";
import GuestLoginPrompt from "../../components/guest-login-prompt/GuestLoginPrompt";

const Add = () => {
  const history = useHistory();
  const { getCurrentUserId, isUserAuthenticated } = useUserContext();

  if (!isUserAuthenticated) {
    return (
      <IonPage>
        <HomeToolbar title="Add" />
        <IonContent className="ion-padding">
          <IonGrid fixed>
            <GuestLoginPrompt />
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <HomeToolbar title="Add" />
      <IonContent className="ion-padding">
        <IonGrid fixed>
          <SelectCollections profileUserId={getCurrentUserId()} />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Add;
