import { useEffect, useState } from "react";
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonItem } from "@ionic/react";

import "./Home.scss";
import LogoutButton from "../../components/button/LogoutButton";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import TextInput from "../../components/text-input/TextInput";
import { getCollections } from "../../services/collections";
import { getCategories } from "../../services/categories";

const Home = () => {
  const [name, setName] = useState("");

  return (
    <IonPage>
      <HomeToolbar title="collectify" />

      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding">
        {/* IonGrid with fixed property does not allow width to stretch in desktop */}
        <IonGrid fixed></IonGrid>
        <LogoutButton />

        <IonItem>
          <TextInput label="Test" value={name} onChange={setName} placeholder="Type text here" />
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
