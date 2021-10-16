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
import { search, personCircleOutline, settingsOutline, ellipsisVertical } from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";

const ProfileToolbar = ({ username }) => {
  const history = useHistory();
  const location = useLocation();

  // Menu with items shown when ellipsis icon is pressed
  const PopoverList: React.FC<{
    onHide: () => void,
  }> = ({ onHide }) => (
    <IonList>
      <IonListHeader>Menu</IonListHeader>
      <IonItem
        button
        onClick={() => {
          onHide();
          history.push("Settings");
        }}
      >
        Settings
      </IonItem>
      <IonItem lines="none" detail={false} button onClick={onHide}>
        <IonText color="danger">Close</IonText>
      </IonItem>
    </IonList>
  );

  const [present, dismiss] = useIonPopover(PopoverList, { onHide: () => dismiss() });

  const handleButtonClick = (path) => {
    history.push(`/${path}`);
  };

  return (
    <IonHeader>
      {/* Toolbar shown for desktop view */}
      <IonToolbar className="ion-hide-sm-down">
        <IonTitle>{username}</IonTitle>

        <IonButtons slot="end">
          <IonButton onClick={() => handleButtonClick("discover")}>
            <IonIcon size="small" slot="icon-only" icon={search} />
          </IonButton>
          {/* <IonButton onClick={() => handleButtonClick("add")}>
            <IonIcon size="small" slot="icon-only" icon={addCircleOutline} />
          </IonButton>
          <IonButton onClick={() => handleButtonClick("chat")}>
            <IonIcon size="small" slot="icon-only" icon={chatbubblesOutline} />
          </IonButton> */}
          <IonButton onClick={() => handleButtonClick("profile")}>
            <IonIcon size="small" slot="icon-only" icon={personCircleOutline} />
          </IonButton>
          <IonButton onClick={() => handleButtonClick("settings")}>
            <IonIcon size="small" slot="icon-only" icon={settingsOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>

      {/* Toolbar shown for mobile view */}
      <IonToolbar className="ion-hide-sm-up">
        <IonTitle>{username}</IonTitle>
        <IonButtons slot="start">
          {/* <IonBackButton defaultHref="home" /> */}
          <IonBackButton
            className={
              location.pathname === "/home" || location.pathname === "/discover" || location.pathname === "/profile" || location.pathname === "chat"
                ? "ion-hide"
                : ""
            }
          />{" "}
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
