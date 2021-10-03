import { IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from "@ionic/react";
import {
  search,
  addCircleOutline,
  chatbubblesOutline,
  personCircleOutline,
  settingsOutline,
  ellipsisVertical,
  arrowBackOutline,
} from "ionicons/icons";

const Toolbar = ({title}) => {
  return (
    <>
      <IonToolbar className="ion-hide-sm-down">
        <IonTitle>{title} big</IonTitle>

        <IonButtons slot="end">
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

      <IonToolbar className="ion-hide-sm-up">
        <IonButtons slot="start">
          <IonButton>
            <IonIcon size="small" slot="icon-only" icon={arrowBackOutline} />
          </IonButton>
        </IonButtons>
        <IonButtons slot="end">
          <IonButton>
            <IonIcon size="small" slot="icon-only" icon={ellipsisVertical} />
          </IonButton>
        </IonButtons>
        <IonTitle>{title} small</IonTitle>
      </IonToolbar>
    </>
  );
};

export default Toolbar;
