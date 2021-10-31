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
  IonImg,
} from "@ionic/react";
import { search, homeOutline, personCircleOutline, settingsOutline, ellipsisVertical, addCircleOutline, chatbubblesOutline } from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import { logoutUser } from "../../utils/auth/actions";
import Logo from "../../assets/favicon.png";
import Text from "../text/Text";
const ProfileToolbar = ({ username, showMenu }) => {
  const history = useHistory();
  const location = useLocation();

  const setToast = useToastContext();
  const { isUserAuthenticated, setIsUserAuthenticated } = useUserContext();

  const logoutHandler = () => {
    logoutUser();
    history.replace("/");
    setToast({ message: "Logged out successfully.", color: "success" });
    setIsUserAuthenticated(false);
  };

  // Menu with items shown when ellipsis icon is pressed
  const PopoverList = ({ onHide }) => (
    <IonList>
      {/* <IonListHeader>Menu</IonListHeader> */}
      <IonItem
        button
        onClick={() => {
          onHide();
          history.push("Settings");
        }}
      >
        Settings
      </IonItem>
      <IonItem
        lines="none"
        detail={false}
        button
        onClick={() => {
          onHide();
          logoutHandler();
        }}
      >
        <IonText color="danger">Logout</IonText>
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
        <div className="toolbar-title--container">
          <IonImg className="toolbar-logo" src={Logo} />
          <Text size="xl"> {username}</Text>
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
          {isUserAuthenticated && (
            <IonButton onClick={() => handleButtonClick("add")}>
              <IonIcon size="medium" slot="icon-only" icon={addCircleOutline} />
            </IonButton>
          )}
          {isUserAuthenticated && (
            <IonButton onClick={() => handleButtonClick("chat")}>
              <IonIcon size="medium" slot="icon-only" icon={chatbubblesOutline} />
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
          <Text size="xl"> {username}</Text>
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
        {showMenu && (
          <IonButtons slot="end">
            <IonButton
              onClick={(e) =>
                present({
                  event: e.nativeEvent,
                })
              }
            >
              <IonIcon size="medium" slot="icon-only" icon={ellipsisVertical} />
            </IonButton>
          </IonButtons>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

export default ProfileToolbar;
