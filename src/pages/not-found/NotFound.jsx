import { IonContent, IonPage, IonGrid, IonButton, IonRow } from "@ionic/react";

import "./NotFound.scss";
import Text from "../../components/text/Text";
import NotFoundGif from "../../assets/not-found.gif";
import FlexImage from "../../components/image/FlexImage";
import { useHistory } from "react-router";
import { trackPageView } from "../../services/react-ga";
import { useEffect } from "react";

const NotFound = ({ category }) => {
  const history = useHistory();

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return (
    <IonPage className="not-found login">
      <IonContent className="ion-padding">
        <IonGrid fixed className="login--grid">
          <FlexImage className="not-found--img" src={NotFoundGif} />
          <Text size="xl" className="ion-text-center">
            Oops!
            <br />
            The page was not found.
          </Text>
          <IonRow className="ion-margin-top">
            <IonButton onClick={() => history.push("/")}>Back to Home</IonButton>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
