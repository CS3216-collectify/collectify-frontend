import { useState } from "react";

import { IonContent, IonPage, IonGrid } from "@ionic/react";

import "./Discover.scss";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import Search from "../search/Search";
import DiscoverItems from "../../components/discover-items/DiscoverItems";

const Discover = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const searchOpenHandler = () => {
    setIsSearchActive(true);
  };

  const searchCloseHandler = () => {
    setIsSearchActive(false);
  };

  return (
    <IonPage className="discover">
      {/* Ion padding applies 16px  */}

      <HomeToolbar title="Discover" />
      <IonContent>
        <IonGrid fixed>
          <Search inactive={!isSearchActive} onFocus={searchOpenHandler} onCancel={searchCloseHandler} />

          {!isSearchActive && (
            // Ideally Discover component should have a "hidden" prop?
            <DiscoverItems />
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Discover;
