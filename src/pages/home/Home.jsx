import { useEffect, useState } from "react";
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonItem } from "@ionic/react";

import "./Home.scss";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import useUserContext from "../../hooks/useUserContext";
import Feed from "../../components/feed/Feed";

const Home = () => {
  const [name, setName] = useState("");
  const x = useUserContext();

  const { userId = 1 } = x;

  return (
    <IonPage>
      <HomeToolbar title="collectify" />

      {/* Ion padding applies 16px  */}
      <IonContent>
        {/* IonGrid with fixed property does not allow width to stretch in desktop */}
        <Feed userId={userId} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
