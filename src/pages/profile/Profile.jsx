import { useState } from "react";
import { useParams } from "react-router-dom";
import { IonContent, IonPage, IonGrid, IonRow, IonCol } from "@ionic/react";

import "./Profile.scss";
import Toast from "../../components/toast/Toast";
import { ReactComponent as Logo } from "../../assets/logo.svg";

const Profile = () => {
  // TODO: conditional Toast color
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("");

  // if not username and isLoggedIn, redirect to /profile/{username_from_local_storage}
  // if not username and not isLoggedIn, prompt log in
  let { username } = useParams();

  return (
    <IonPage className="profile">
      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding">
        {`Username: ${username}`}

        <IonGrid fixed className="profile--grid">
          <IonRow>
            <IonCol>
              <Logo className="profile--img"/>
            </IonCol>
          </IonRow>
        </IonGrid>

        <Toast showToast={showToast} setShowToast={setShowToast} toastMessage={toastMessage} color={toastColor} />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
