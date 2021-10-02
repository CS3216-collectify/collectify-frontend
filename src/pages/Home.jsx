import { IonContent, IonPage, IonText, IonTitle, IonHeader, IonToolbar, IonGrid, IonRow, IonCol, IonButtons, IonButton, IonIcon } from "@ionic/react";
import "./Home.scss";
import { personCircle, search, helpCircle, star, create, ellipsisHorizontal, ellipsisVertical } from "ionicons/icons";
import { homeOutline, searchOutline, addCircleOutline, chatbubblesOutline, personCircleOutline, settingsOutline} from "ionicons/icons";

const Home = () => {
  return (
    <IonPage>
      <IonToolbar className="ion-hide-sm-down">
        <IonTitle>collectify</IonTitle>

        <IonButtons slot="secondary">
          <IonButton>
            <IonIcon size="small" slot="icon-only" icon={search} />
          </IonButton>
          <IonButton>
            <IonIcon size="small" slot="icon-only" icon={addCircleOutline} />
          </IonButton>
          <IonButton>
            <IonIcon size="small" slot="icon-only" icon={chatbubblesOutline} />
          </IonButton>
          <IonButton>
            <IonIcon size="small" slot="icon-only" icon={personCircleOutline} />
          </IonButton>
          <IonButton>
            <IonIcon size="small" slot="icon-only" icon={settingsOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>

      {/* Ion padding applies 16px  */}
      <IonContent className="ion-padding">
        {/* IonGrid with fixed property does not allow width to stretch in desktop */}
        <IonGrid fixed>
          <IonRow>
            <IonCol>ion-col</IonCol>
            <IonCol>ion-col</IonCol>
            <IonCol>ion-col</IonCol>
            <IonCol>ion-col</IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
