import { useEffect } from "react";
import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonTabs, IonTabButton, IonIcon, IonText, IonTabBar } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { homeOutline, searchOutline, addCircleOutline, chatbubblesOutline, personCircleOutline } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./App.scss";

import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

import useUserContext from "./hooks/useUserContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/edit-profile/EditProfile";
import Item from "./pages/item/Item";
import EditItem from "./pages/edit-item/EditItem";
import AddItem from "./pages/add-item/AddItem";
import AddCollection from "./pages/add-collection/AddCollection";
import EditCollection from "./pages/edit-collection/EditCollection";
import Collection from "./pages/collection/Collection";
import Settings from "./pages/settings/Settings";
import Discover from "./pages/discover/Discover";
import Onboarding from "./pages/onboarding/Onboarding";
import CollectifyChat from "./pages/chat/Chat";
import FollowersList from "./pages/collection/FollowersList";
import LikesList from "./pages/item/LikesList";
import { Redirect } from "react-router";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Add from "./pages/add/Add";
import NotFound from "./pages/not-found/NotFound";

const App = () => {
  useEffect(() => GoogleAuth.init(), []);
  const { isUserAuthenticated } = useUserContext();

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* <Switch> */}
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/onboarding" component={Onboarding} />
          <Route>
            <IonTabs>
              <IonRouterOutlet>
                {/* TODO: add redirects for guests */}
                <ProtectedRoute exact path="/home" component={Home} />
                <Route exact path="/profile" component={Profile} />
                <ProtectedRoute exact path="/edit-profile" component={EditProfile} />
                <Route exact path="/profile/:username" component={Profile} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/collections/:collectionId" component={Collection} />
                <ProtectedRoute exact path="/collections/:collectionId/edit" component={EditCollection} />
                <ProtectedRoute exact path="/add-collections" component={AddCollection} />
                <ProtectedRoute exact path="/collections/:collectionId/add" component={AddItem} />
                <Route exact path="/collections/:collectionId/items/:itemId" component={Item} />
                <Route exact path="/add" component={Add} />
                <Route exact path="/items/:itemId/likes" component={LikesList} />
                <Route exact path="/collections/:collectionId/followers" component={FollowersList} />
                <ProtectedRoute exact path="/collections/:collectionId/items/:itemId/edit" component={EditItem} />
                <Route exact path="/chat" component={CollectifyChat} />
                <Route exact path="/discover" component={Discover} />
                <Route exact path="/not-found" component={NotFound} />
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
                {isUserAuthenticated && (
                  <IonTabButton tab="add" href="/add">
                    <IonIcon icon={addCircleOutline} />
                    <IonText>Add</IonText>
                  </IonTabButton>
                )}
                {isUserAuthenticated && (
                    <IonTabButton tab="d" href="/chat">
                      <IonIcon icon={chatbubblesOutline} />
                      <IonText>Chats</IonText>
                    </IonTabButton>
                  )}
                <IonTabButton tab="user-profile" href="/profile">
                  <IonIcon icon={personCircleOutline} />
                  <IonText>Profile</IonText>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </Route>
          {/* </Switch> */}
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
