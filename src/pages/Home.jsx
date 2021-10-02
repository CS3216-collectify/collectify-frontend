import { useState } from "react";
import { IonContent, IonPage, IonGrid, IonRow, IonCol } from "@ionic/react";

import "./Home.scss";
import DeleteButton from "../components/button/DeleteButton";
import FollowButton from "../components/button/FollowButton";
import UnfollowButton from "../components/button/UnfollowButton";
import Toast from "../components/toast/Toast";
import Toolbar from "../components/toolbar/Toolbar";
import TextInput from "../components/text-input/TextInput";
import { googleLogin } from "../services/google-auth";

const Home = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [name, setName] = useState("");

  const handleLogin = () => {
    googleLogin();
  };

  return (
    <IonPage>
      <Toolbar />

      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding">
        {/* IonGrid with fixed property does not allow width to stretch in desktop */}
        <IonGrid fixed>
          <IonRow>
            <IonCol>ion-col</IonCol>
            <IonCol>ion-col</IonCol>
            <IonCol>ion-col</IonCol>
            <IonCol>ion-col</IonCol>
            <IonCol>ion-col</IonCol>
            <IonCol>ion-col</IonCol>
            <IonCol>ion-col</IonCol>
            <IonCol>ion-col</IonCol>
          </IonRow>
        </IonGrid>
        <FollowButton onClick={() => setShowToast(true)} />
        <UnfollowButton onClick={() => handleLogin()} />
        <DeleteButton />

        <Toast showToast={showToast} setShowToast={setShowToast} toastMessage={toastMessage} color="danger" />

        <TextInput value={name} onChange={setName} type="text" />
      </IonContent>
    </IonPage>
  );
};

export default Home;
