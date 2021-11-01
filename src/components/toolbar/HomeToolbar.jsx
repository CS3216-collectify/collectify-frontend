import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonImg, IonToolbar, IonBadge } from "@ionic/react";
import { addCircleOutline, chatbubblesOutline, homeOutline, personCircleOutline, search, settingsOutline } from "ionicons/icons";
import { useHistory, useLocation } from "react-router";
import Logo from "../../assets/favicon.png";
import Text from "../../components/text/Text";
import useUserContext from "../../hooks/useUserContext";
import "./Toolbar.scss";

const HomeToolbar = ({ title }) => {
  const history = useHistory();
  const location = useLocation();
  const { isUserAuthenticated } = useUserContext();

  const handleButtonClick = (path) => {
    history.push(`/${path}`);
  };

  return (
    <IonHeader>
      {/* Toolbar shown for desktop view */}
      <IonToolbar className="ion-hide-sm-down">
        <div className="toolbar-title--container">
          <IonImg className="toolbar-logo" src={Logo} />
          <Text size="xl"> {title}</Text>
        </div>

        <IonButtons slot="end">
          {isUserAuthenticated && (
            <IonButton onClick={() => handleButtonClick("")}>
              <IonIcon size="medium" slot="icon-only" icon={homeOutline} />
            </IonButton>
          )}
          <IonButton onClick={() => handleButtonClick("discover")}>
            <IonIcon size="medium" slot="icon-only" icon={search} />
          </IonButton>
          <IonButton onClick={() => handleButtonClick("add")}>
            <IonIcon size="medium" slot="icon-only" icon={addCircleOutline} />
          </IonButton>
          {isUserAuthenticated && (
            <IonButton onClick={() => handleButtonClick("chat")}>
              <IonIcon size="medium" slot="icon-only" icon={chatbubblesOutline} />
              {/* <IonBadge color="primary">{Number(unreadMessages)}</IonBadge> */}
            </IonButton>
          )}
          <IonButton onClick={() => handleButtonClick("profile")}>
            <IonIcon size="medium" slot="icon-only" icon={personCircleOutline} />
          </IonButton>
          {isUserAuthenticated && (
            <IonButton onClick={() => handleButtonClick("settings")}>
              <IonIcon size="medium" slot="icon-only" icon={settingsOutline} />
            </IonButton>
          )}
        </IonButtons>
      </IonToolbar>

      {/* Toolbar shown for mobile view */}
      <IonToolbar className="ion-hide-sm-up">
        <div className="toolbar-title--container">
          <IonImg className="toolbar-logo" src={Logo} />
          <Text size="xl"> {title}</Text>
        </div>

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
      </IonToolbar>
    </IonHeader>
  );
};

export default HomeToolbar;
