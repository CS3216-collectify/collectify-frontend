import { IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { search, addCircleOutline, chatbubblesOutline, personCircleOutline, settingsOutline } from "ionicons/icons";

const Toolbar = () => {
  return (
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
  );
};

export default Toolbar;
