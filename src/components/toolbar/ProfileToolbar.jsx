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
  IonText,
} from "@ionic/react";
import {
  search,
  addCircleOutline,
  chatbubblesOutline,
  personCircleOutline,
  settingsOutline,
  ellipsisVertical,
  arrowBackOutline,
} from "ionicons/icons";

const ProfileToolbar = ({ username }) => {
  // Menu with items shown when ellipsis icon is pressed
  const PopoverList: React.FC<{
    onHide: () => void,
  }> = ({ onHide }) => (
    <IonList>
      <IonListHeader>Menu</IonListHeader>
      <IonItem button>Edit Profile</IonItem>
      <IonItem button>Settings</IonItem>
      <IonItem lines="none" detail={false} button onClick={onHide}>
        <IonText color="danger">Close</IonText>
      </IonItem>
    </IonList>
  );

  const [present, dismiss] = useIonPopover(PopoverList, { onHide: () => dismiss() });

  return (
    <IonHeader>
      {/* Toolbar shown for desktop view */}
      <IonToolbar className="ion-hide-sm-down">
        <IonTitle>collectify</IonTitle>

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
        <IonTitle>{username}</IonTitle>
        <IonButtons slot="start">
          {/* <IonBackButton defaultHref="home" /> */}
          <IonBackButton />
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
      </IonToolbar>
    </IonHeader>
  );
};

export default ProfileToolbar;
