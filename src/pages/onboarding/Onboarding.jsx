import { useState } from "react";
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonItem, IonList, IonText } from "@ionic/react";
import { useHistory } from "react-router-dom";

import "./Onboarding.scss";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import LogoutButton from "../../components/button/LogoutButton";
import useUserContext from "../../hooks/useUserContext";
import useToastContext from "../../hooks/useToastContext";
import GoogleLoginButton from "../../components/button/GoogleLoginButton";
import GoogleAuthStatus from "../../enums/google-auth-status.enum";
import { getUserId } from "../../utils/user";
import TextInput from "../../components/text-input/TextInput";

const Onboarding = () => {
  const { currentUserId, isUserAuthenticated, setIsUserAuthenticated, setCurrentUserId } = useUserContext();
  const setToast = useToastContext();
  const history = useHistory();
  const [username, setUsername] = useState("");

  // TODO: check if the username is duplicated
  return (
    <IonPage>
      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding">
        {/* IonGrid with fixed property does not allow width to stretch in desktop */}

        <IonGrid fixed>
          <IonList lines="full">
            <IonItem>
              <TextInput label="Username" value={username} onChange={setUsername} placeholder="Type text here" />
            </IonItem>
          </IonList>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Onboarding;
