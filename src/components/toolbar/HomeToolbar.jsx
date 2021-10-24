import { useHistory, useLocation } from "react-router";

import { IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonBackButton, IonHeader } from "@ionic/react";
import { search, addCircleOutline, chatbubblesOutline, personCircleOutline, settingsOutline, ellipsisVertical } from "ionicons/icons";

const HomeToolbar = ({ title }) => {
  const history = useHistory();
  const location = useLocation();

  const handleButtonClick = (path) => {
    history.push(`/${path}`);
  };

  return (
    <IonHeader>
      {/* Toolbar shown for desktop view */}
      <IonToolbar className="ion-hide-sm-down">
        <IonTitle>{title}</IonTitle>

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
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="start">
          {/* <IonBackButton defaultHref="home" /> */}
          <IonBackButton
            className={
              location.pathname === "/home" || location.pathname === "/discover" || location.pathname === "/profile" || location.pathname === "chat"
                ? "ion-hide"
                : ""
            }
          />
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
