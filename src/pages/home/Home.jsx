import { useEffect, useState } from "react";
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonItem } from "@ionic/react";

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
        <IonGrid fixed>
          <Feed />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
