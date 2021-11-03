import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonText } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import { addCircleOutline, bookmarkOutline, homeOutline, personCircleOutline, searchOutline } from "ionicons/icons";
import { useEffect } from "react";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import "./App.scss";
import ProtectedRoute from "./components/route/ProtectedRoute";
import useUserContext from "./hooks/useUserContext";
import AddCollection from "./pages/add-collection/AddCollection";
import AddItem from "./pages/add-item/AddItem";
import Add from "./pages/add/Add";
import Bookmarks from "./pages/bookmarks/Bookmarks";
import CollectifyChat from "./pages/chat/Chat";
import Collection from "./pages/collection/Collection";
import FollowersList from "./pages/collection/FollowersList";
import Discover from "./pages/discover/Discover";
import EditCollection from "./pages/edit-collection/EditCollection";
import EditItem from "./pages/edit-item/EditItem";
import EditProfile from "./pages/edit-profile/EditProfile";
import Home from "./pages/home/Home";
import Item from "./pages/item/Item";
import LikesList from "./pages/item/LikesList";
import Login from "./pages/login/Login";
import NotFound from "./pages/not-found/NotFound";
import Onboarding from "./pages/onboarding/Onboarding";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import { initialiseGoogleAnalytics } from "./services/react-ga";
/* Theme variables */
import "./theme/variables.css";

const App = () => {
  useEffect(() => {
    GoogleAuth.init();
    initialiseGoogleAnalytics();
  }, []);
  const { isUserAuthenticated } = useUserContext();

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/onboarding" component={Onboarding} />
          <Route>
            <IonTabs>
              <IonRouterOutlet>
                <ProtectedRoute exact path="/home" component={Home} />
                <Route exact path="/profile" component={Profile} />
                <ProtectedRoute exact path="/edit-profile" component={EditProfile} />
                <Route exact path="/profile/:username" component={Profile} />
                <ProtectedRoute exact path="/settings" component={Settings} />
                <Route exact path="/collections/:collectionId" component={Collection} />
                <ProtectedRoute exact path="/collections/:collectionId/edit" component={EditCollection} />
                <ProtectedRoute exact path="/add-collections" component={AddCollection} />
                <ProtectedRoute exact path="/collections/:collectionId/add" component={AddItem} />
                <Route exact path="/collections/:collectionId/items/:itemId" component={Item} />
                <Route exact path="/add" component={Add} />
                <Route exact path="/items/:itemId/likes" component={LikesList} />
                <Route exact path="/collections/:collectionId/followers" component={FollowersList} />
                <ProtectedRoute exact path="/collections/:collectionId/items/:itemId/edit" component={EditItem} />
                <ProtectedRoute exact path="/chat" component={CollectifyChat} />
                <Route exact path="/discover" component={Discover} />
                <Route exact path="/not-found" component={NotFound} />
                <ProtectedRoute exact path="/bookmarks" component={Bookmarks} />
                <Redirect to="/" />
              </IonRouterOutlet>

              <IonTabBar slot="bottom" className={`ion-hide-sm-up`}>
                {isUserAuthenticated && (
                  <IonTabButton tab="home" href="/home">
                    <IonIcon icon={homeOutline} />
                    <IonText>Home</IonText>
                  </IonTabButton>
                )}
                <IonTabButton tab="discover" href="/discover">
                  <IonIcon icon={searchOutline} />
                  <IonText>Discover</IonText>
                </IonTabButton>
                <IonTabButton tab="add" href="/add">
                  <IonIcon icon={addCircleOutline} />
                  <IonText>Add</IonText>
                </IonTabButton>
                {isUserAuthenticated && (
                  <IonTabButton tab="bookmarks" href="/bookmarks">
                    <IonIcon icon={bookmarkOutline} />
                    <IonText>Bookmarks</IonText>
                  </IonTabButton>
                )}
                <IonTabButton tab="user-profile" href="/profile">
                  <IonIcon icon={personCircleOutline} />
                  <IonText>Profile</IonText>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
