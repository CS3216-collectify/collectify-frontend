import { IonContent, IonGrid, IonItemDivider, IonList, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import FollowedCollections from "../../components/followed-collections/FollowedCollections";
import LikedItems from "../../components/liked-items/LikedItems";
import Toggle from "../../components/toggle/Toggle";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { trackPageView } from "../../services/react-ga";

const LIKED_ITEMS_MODE = 1;
const FOLLOWING_COLLECTIONS_MODE = 2;

const MODE_SELECT_OPTIONS = [
  {
    value: FOLLOWING_COLLECTIONS_MODE,
    label: "Following",
  },
  {
    value: LIKED_ITEMS_MODE,
    label: "Liked",
  },
];

const Bookmarks = () => {
  const [mode, setMode] = useState(FOLLOWING_COLLECTIONS_MODE);

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  const toggleMode = (mode) => {
    setMode(parseInt(mode));
  }

  return (
    <IonPage>
      <HomeToolbar title="Bookmarks" />
      <IonContent>
        <IonGrid fixed>
          <IonList lines="none">
            <IonItemDivider sticky>
              <Toggle value={mode} options={MODE_SELECT_OPTIONS} onChange={toggleMode} />
            </IonItemDivider>
            <div className="ion-padding">
                {mode === LIKED_ITEMS_MODE && <LikedItems />}
                {mode === FOLLOWING_COLLECTIONS_MODE && <FollowedCollections />}
            </div>
          </IonList>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Bookmarks;
