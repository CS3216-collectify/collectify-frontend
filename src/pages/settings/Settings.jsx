import { useState } from "react";
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonItem, IonList } from "@ionic/react";
import { useHistory } from "react-router-dom";

import "./Settings.scss";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import LogoutButton from "../../components/button/LogoutButton";

// Pass user ID and load data\
// some redirect if accessed by Guest
const Settings = () => {
  return (
    <IonPage>
      <HomeToolbar title="Settings" />

      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding">
        {/* IonGrid with fixed property does not allow width to stretch in desktop */}

        <IonGrid fixed>
          <IonRow>
            <LogoutButton />
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
