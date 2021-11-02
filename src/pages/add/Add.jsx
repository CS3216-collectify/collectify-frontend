import { IonContent, IonGrid, IonPage } from "@ionic/react";
import { useEffect } from "react";
import GuestLoginPrompt from "../../components/guest-login-prompt/GuestLoginPrompt";
import SelectCollections from "../../components/profile-collection/SelectCollections";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import useUserContext from "../../hooks/useUserContext";
import { trackPageView } from "../../services/react-ga";

const Add = () => {
  const { getCurrentUserId, isUserAuthenticated } = useUserContext();
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  if (!isUserAuthenticated) {
    return (
      <IonPage>
        <HomeToolbar title="Add" />
        <IonContent className="ion-padding">
          <GuestLoginPrompt />
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
