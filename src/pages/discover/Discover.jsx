import { IonContent, IonGrid, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import DiscoverItems from "../../components/discover-items/DiscoverItems";
import AppToolbar from "../../components/toolbar/AppToolbar";
import { trackPageView } from "../../services/react-ga";
import Search from "../search/Search";
import "./Discover.scss";

const Discover = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);


  const searchOpenHandler = () => {
    setIsSearchActive(true);
  };

  const searchCloseHandler = () => {
    setIsSearchActive(false);
  };

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return (
    <IonPage className="discover">
      <AppToolbar title="Discover" />
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
