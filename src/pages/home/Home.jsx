import { IonContent, IonPage } from "@ionic/react";

import "./Home.scss";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import Feed from "../../components/feed/Feed";

const Home = () => {
  return (
    <IonPage>
      <HomeToolbar title="collectify" />
      <IonContent>
        <Feed />
      </IonContent>
    </IonPage>
  );
};

export default Home;
