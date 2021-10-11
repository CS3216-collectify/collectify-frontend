import { IonButton, IonLabel } from "@ionic/react";
import { useHistory } from "react-router-dom";

import "./button.scss";

const LogoutButton = () => {
  const history = useHistory();

  return (
    <IonButton
      onClick={() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        history.replace("/");
      }}
    >
      Log Out
    </IonButton>
  );
};

export default LogoutButton;
