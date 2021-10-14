import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { IonContent, IonPage, IonGrid, IonRow } from "@ionic/react";

import "./Discover.scss";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import { ReactComponent as Logo } from "../../assets/logo.svg";

const Discover = () => {
  const history = useHistory();
  const setToast = useToastContext();
  const { isUserAuthenticated, setIsUserAuthenticated } = useUserContext();

  return (
    <IonPage className="discover">
      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding">
        <IonGrid fixed>
          <IonRow className="ion-justify-content-center">
            <Logo />
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Discover;
