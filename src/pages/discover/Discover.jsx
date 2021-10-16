import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { IonContent, IonPage, IonGrid, IonRow } from "@ionic/react";

import "./Discover.scss";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import DiscoverItems from "../../components/discover-items/DiscoverItems";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import Search from "../search/Search";

const Discover = () => {
  const history = useHistory();
  const setToast = useToastContext();
  const { isUserAuthenticated, setIsUserAuthenticated } = useUserContext();
  const [ isSearchActive, setIsSearchActive ] = useState(false);

  const searchOpenHandler = () => {
    setIsSearchActive(true);
  }

  const searchCloseHandler = () => {
    setIsSearchActive(false);
  }

  return (
    <IonPage className="discover">
      {/* Ion padding applies 16px  */}

      <HomeToolbar title="Discover" />
      <IonContent className="ion-padding">
        <IonGrid fixed>
          {/* <DiscoverItems /> */}
          <Search 
            inactive={!isSearchActive} 
            onFocus={searchOpenHandler} 
            onCancel={searchCloseHandler}
          />

          {!isSearchActive &&
            // Ideally Discover component should have a "hidden" prop?
            <p>Discover page should be here</p>
          }
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Discover;
