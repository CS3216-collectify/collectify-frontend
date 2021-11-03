import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonImg, IonItem, IonList, IonText, IonToolbar, useIonPopover } from "@ionic/react";
import {
  addCircleOutline,
  bookmarkOutline,
  chatbubbleEllipsesOutline,
  ellipsisVertical,
  homeOutline,
  personCircleOutline,
  search,
  settingsOutline,
} from "ionicons/icons";
import { useHistory, useLocation } from "react-router";
import Logo from "../../assets/favicon.png";
import Text from "../../components/text/Text";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import { logoutUser } from "../../utils/auth/actions";
import "./Toolbar.scss";

const AppToolbar = ({ title, showMenu = false }) => {
  const history = useHistory();
  const location = useLocation();
  const setToast = useToastContext();
  const { isUserAuthenticated, unreadMessages, setIsUserAuthenticated } = useUserContext();

  const handleButtonClick = (path) => {
    history.push(`/${path}`);
  };

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
          history.push("/settings");
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

  return (
    <IonHeader>
      {/* Toolbar shown for desktop view */}
      <IonToolbar className="ion-hide-sm-down">
        <div className="toolbar-title--container">
          <IonImg className="toolbar-logo" src={Logo} onClick={() => handleButtonClick("")} />
          <Text size="xl"> {title}</Text>
        </div>

        <IonButtons slot="end">
          {isUserAuthenticated && (
            <IonButton title="Home" onClick={() => handleButtonClick("")}>
              <IonIcon size="medium" slot="icon-only" icon={homeOutline} />
            </IonButton>
          )}
          <IonButton title="Discover" onClick={() => handleButtonClick("discover")}>
            <IonIcon size="medium" slot="icon-only" icon={search} />
          </IonButton>
          <IonButton title="Add Item" onClick={() => handleButtonClick("add")}>
            <IonIcon size="medium" slot="icon-only" icon={addCircleOutline} />
          </IonButton>
          {isUserAuthenticated && (
            <IonButton title="Chat" className="home-toolbar-chat-button" onClick={() => handleButtonClick("chat")}>
              <IonIcon size="medium" slot="icon-only" icon={chatbubbleEllipsesOutline} />
              {unreadMessages > 0 && <div className="chat-unread" />}
            </IonButton>
          )}
          {isUserAuthenticated && (
            <IonButton title="Bookmarks" onClick={() => handleButtonClick("bookmarks")}>
              <IonIcon size="medium" slot="icon-only" icon={bookmarkOutline} />
            </IonButton>
          )}
          <IonButton title="Profile" onClick={() => handleButtonClick("profile")}>
            <IonIcon size="medium" slot="icon-only" icon={personCircleOutline} />
          </IonButton>
          {isUserAuthenticated && (
            <IonButton title="Settings" onClick={() => handleButtonClick("settings")}>
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
            <Text size="l"> {title}</Text>
          </div>

          <div className={`toolbar-buttons__${showMenu ? "show-menu" : "hide-menu"}`} slot="end">
            {isUserAuthenticated && !location.pathname.startsWith("/chat") && !location.pathname.startsWith("/settings") && (
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

export default AppToolbar;
