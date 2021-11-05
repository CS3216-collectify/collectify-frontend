import { IonButton, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import GoogleLoginButton from "../../components/button/GoogleLoginButton";
import LogoutButton from "../../components/button/LogoutButton";
import DeleteAccountButton from "../../components/button/DeleteAccountButton";
import Text from "../../components/text/Text";
import AppToolbar from "../../components/toolbar/AppToolbar";
import useUserContext from "../../hooks/useUserContext";
import "./Settings.scss";

// Pass user ID and load data\
// some redirect if accessed by Guest
const Settings = () => {
  const { isUserAuthenticated } = useUserContext();

  return (
    <IonPage className="settings">
      <AppToolbar title="Settings" />
      <IonContent className="ion-padding ion-text-center">
        <IonGrid fixed>
          <Text size="l">Any feedback or suggestions? Please send us an email!</Text>
          <IonRow className="mail-to-button--container ion-margin-vertical">
            <IonButton className="mail-to-button" href="mailto:cs3216collectify@gmail.com">
              Contact us
            </IonButton>
          </IonRow>
          <IonRow className="ion-margin-vertical">{isUserAuthenticated ? <LogoutButton /> : <GoogleLoginButton />}</IonRow>
          <IonRow className="ion-margin-vertical">{isUserAuthenticated && <DeleteAccountButton />}</IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
