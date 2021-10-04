import { useState } from "react";
import { IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonItem, IonListHeader, IonList, useIonPopover } from "@ionic/react";
import {
  search,
  addCircleOutline,
  chatbubblesOutline,
  personCircleOutline,
  settingsOutline,
  ellipsisVertical,
  arrowBackOutline,
} from "ionicons/icons";

// Can create copies for different screen or pass in different content
const Toolbar = ({ title }) => {
  const PopoverList: React.FC<{
    onHide: () => void,
  }> = ({ onHide }) => (
    <IonList>
      <IonListHeader>Popover Content</IonListHeader>
      <IonItem button>Learn Ionic</IonItem>
      <IonItem button>Documentation</IonItem>
      <IonItem button>Showcase</IonItem>
      <IonItem button>GitHub Repo</IonItem>
      <IonItem lines="none" detail={false} button onClick={onHide}>
        Close
      </IonItem>
    </IonList>
  );

  const [present, dismiss] = useIonPopover(PopoverList, { onHide: () => dismiss() });

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
          <IonButton
            onClick={(e) =>
              present({
                event: e.nativeEvent,
              })
            }
          >
            <IonIcon size="small" slot="icon-only" icon={ellipsisVertical} />
          </IonButton>
        </IonButtons>
        <IonTitle>{title} small</IonTitle>
      </IonToolbar>
    </>
  );
};

export default Toolbar;
