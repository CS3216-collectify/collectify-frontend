import { IonContent, IonPage, IonGrid } from "@ionic/react";

import "./NotFound.scss";
import Text from "../../components/text/Text";
import NotFoundGif from "../../assets/not-found.gif";
import FlexImage from "../../components/image/FlexImage";

const NotFound = ({ category }) => {
  return (
    <IonPage className="login">
      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding">
        <IonGrid fixed className="login--grid">
          <FlexImage src={NotFoundGif} />
          <Text size="xl" className="ion-text-center">
            Oops!
            <br />
            The page was not found.
          </Text>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
