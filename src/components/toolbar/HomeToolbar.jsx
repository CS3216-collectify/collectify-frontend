import { useState } from "react";
import {
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonItem,
  IonListHeader,
  IonList,
  IonBackButton,
  IonHeader,
  useIonPopover,
} from "@ionic/react";
import { search, addCircleOutline, chatbubblesOutline, personCircleOutline, settingsOutline, ellipsisVertical } from "ionicons/icons";

const HomeToolbar = ({ title }) => {
  // Menu with items shown when ellipsis icon is pressed
  // const PopoverList: React.FC<{
  //   onHide: () => void,
  // }> = ({ onHide }) => (
  //   <IonList>
  //     <IonListHeader>Popover Content</IonListHeader>
  //     <IonItem button>Learn Ionic</IonItem>
  //     <IonItem button>Documentation</IonItem>
  //     <IonItem button>Showcase</IonItem>
  //     <IonItem button>GitHub Repo</IonItem>
  //     <IonItem lines="none" detail={false} button onClick={onHide}>
  //       Close
  //     </IonItem>
  //   </IonList>
  // );

  // const [present, dismiss] = useIonPopover(PopoverList, { onHide: () => dismiss() });

  return (
    <IonHeader>
      {/* Toolbar shown for desktop view */}
      <IonToolbar className="ion-hide-sm-down">
        <IonTitle>{title}</IonTitle>

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

      {/* Toolbar shown for mobile view */}
      <IonToolbar className="ion-hide-sm-up">
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="start">
          {/* <IonBackButton defaultHref="home" /> */}
          <IonBackButton />
        </IonButtons>
        {/* <IonButtons slot="end">
          <IonButton
            onClick={(e) =>
              present({
                event: e.nativeEvent,
              })
            }
          >
            <IonIcon size="small" slot="icon-only" icon={ellipsisVertical} />
          </IonButton>
        </IonButtons> */}
      </IonToolbar>
    </IonHeader>
  );
};

export default HomeToolbar;
