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
import {
  search,
  homeOutline,
  personCircleOutline,
  settingsOutline,
  ellipsisVertical,
  addCircleOutline,
  chatbubbleEllipsesOutline,
} from "ionicons/icons";
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
  const { isUserAuthenticated, setIsUserAuthenticated, unreadMessages } = useUserContext();

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
          <IonButton onClick={() => handleButtonClick("add")}>
            <IonIcon size="medium" slot="icon-only" icon={addCircleOutline} />
          </IonButton>
          {isUserAuthenticated && (
            <IonButton className="home-toolbar-chat-button" onClick={() => handleButtonClick("chat")}>
              <IonIcon size="medium" slot="icon-only" icon={chatbubbleEllipsesOutline} />
              {unreadMessages > 0 && <div className="chat-unread" />}
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
        <div className="toolbar--container">
          <div className="toolbar-title--container">
            <IonBackButton
              slot="start"
              className={
                location.pathname === "/home" || location.pathname === "/discover" || location.pathname === "/profile" || location.pathname === "chat"
                  ? "ion-hide"
                  : ""
              }
            />
            <IonImg className="toolbar-logo" src={Logo} />
            <Text size="xl"> {username}</Text>
          </div>

          <div className="toolbar-buttons" slot="end">
          {isUserAuthenticated && !location.pathname.startsWith("/chat") && (
            <IonButton fill="clear" className="home-toolbar-chat-button" onClick={() => handleButtonClick("chat")}>
              <IonIcon color="medium" size="medium" slot="icon-only" icon={chatbubbleEllipsesOutline} />
              {unreadMessages > 0 && <div className="chat-unread--mobile" />}
            </IonButton>
          )}

          {showMenu && (
            <IonButton
              onClick={(e) =>
                present({
                  event: e.nativeEvent,
                })
              }
              fill="clear"
              color="medium"
            >
              <IonIcon size="medium" slot="icon-only" icon={ellipsisVertical} />
            </IonButton>
          )}
          </div>
        </div>
      </IonToolbar>
    </IonHeader>
  );
};

export default ProfileToolbar;
