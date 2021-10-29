import { IonButton, IonContent, IonGrid, IonPage, IonRow } from "@ionic/react";
import GoogleLoginButton from "../../components/button/GoogleLoginButton";
import LogoutButton from "../../components/button/LogoutButton";
import DeleteAccountButton from "../../components/button/DeleteAccountButton";
import Text from "../../components/text/Text";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import useUserContext from "../../hooks/useUserContext";
import "./Settings.scss";

// Pass user ID and load data\
// some redirect if accessed by Guest
const Settings = () => {
  const { isUserAuthenticated } = useUserContext();

  return (
    <IonPage className="settings">
      <HomeToolbar title="Settings" />
      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding ion-text-center">
        {/* IonGrid with fixed property does not allow width to stretch in desktop */}

        <IonGrid fixed>
          <Text size="l">Any feedback or suggestions? Please send us an email!</Text>
          <IonRow className="mail-to-button--container ion-margin-top">
            <IonButton className="mail-to-button" href="mailto:cs3216collectify@gmail.com">
              Contact us
            </IonButton>
          </IonRow>

          {!isUserAuthenticated && (
            <Text>
              <h1>Log in to collectify to begin showcasing your collectables to the world!</h1>
            </Text>
          )}
          <IonRow>{isUserAuthenticated ? <LogoutButton /> : <GoogleLoginButton />}</IonRow>
          <IonRow>{isUserAuthenticated && <DeleteAccountButton />}</IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
