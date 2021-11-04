import { IonContent, IonGrid, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import DiscoverItems from "../../components/discover-items/DiscoverItems";
import AppToolbar from "../../components/toolbar/AppToolbar";
import { trackDiscoverFilterEvent, trackPageView } from "../../services/react-ga";
import { getCategoryFilterStore, setCategoryFilterStore } from "../../utils/store";
import Search from "../search/Search";
import "./Discover.scss";

const Discover = () => {
  const location = useLocation();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(getCategoryFilterStore());

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  useEffect(() => {
    if (location.pathname.startsWith("/discover")) {
      if (isSearchActive) {
        setIsSearchActive(false);
      }
      const storedFilter = getCategoryFilterStore();
      if (storedFilter === categoryFilter) {
        return;
      }
      trackDiscoverFilterEvent();
      setCategoryFilter(storedFilter);
    }
  }, [location]);

  const searchOpenHandler = () => {
    setIsSearchActive(true);
  };

  const searchCloseHandler = () => {
    setIsSearchActive(false);
  };

  const changeCategory = (val) => {
    if (val === categoryFilter) {
      return;
    }
    trackDiscoverFilterEvent();
    setCategoryFilterStore(val);
    setCategoryFilter(val);
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
            <DiscoverItems catFilter={categoryFilter} setCatFilter={changeCategory}/>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Discover;
