import { IonContent, IonPage } from "@ionic/react";

import "./Home.scss";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import Feed from "../../components/feed/Feed";

const Home = () => {
  return (
    <IonPage>
      <HomeToolbar title="collectify" />

      {/* Ion padding applies 16px  */}
      <IonContent>
        {/* IonGrid with fixed property does not allow width to stretch in desktop */}
        <Feed />
      </IonContent>
    </IonPage>
  );
};

export default Home;
