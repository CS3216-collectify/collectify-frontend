import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
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
import Search from "./pages/search/Search";

const App = () => {
  useEffect(() => GoogleAuth.init(), []);
  const { isUserAuthenticated } = useUserContext();

  useEffect(() => {
    console.log(isUserAuthenticated);
  });

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <IonTabs>
              <IonRouterOutlet>
                {/* TODO: add redirects for guests */}
                <Route exact path="/home" component={Home} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/profile/:username" component={Profile} />
                <Route exact path="/profile/edit" component={EditProfile} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/collections/:collectionId" component={Collection} />
                <Route exact path="/collections/:collectionId/edit" component={EditCollection} />
                <Route exact path="/collections/add" component={AddCollection} />
                <Route exact path="/collections/:collectionId/add" component={AddItem} />
                <Route exact path="/collections/:collectionId/items/:itemId" component={Item} />
                <Route exact path="/collections/:collectionId/items/:itemId/edit" component={EditItem} />
                <Route exact path="/discover" component={Discover} />
              </IonRouterOutlet>

              <IonTabBar slot="bottom" className={`ion-hide-sm-up`}>
                {isUserAuthenticated && (
                  <IonTabButton tab="home" href="/home">
                    <IonIcon icon={homeOutline} />
                    <IonText>Home</IonText>
                  </IonTabButton>
                )}
                <IonTabButton tab="b" href="/discover">
                  <IonIcon icon={searchOutline} />
                  <IonText>Discover</IonText>
                </IonTabButton>
                {/* {isUserAuthenticated && (
                  <IonTabButton tab="c" href="/home">
                    <IonIcon icon={addCircleOutline} />
                    <IonText>Add</IonText>
                  </IonTabButton>
                )}
                {isUserAuthenticated && (
                  <IonTabButton tab="d" href="/d">
                    <IonIcon icon={chatbubblesOutline} />
                    <IonText>Chats</IonText>
                  </IonTabButton>
                )} */}
                <IonTabButton tab="user-profile" href="/profile">
                  <IonIcon icon={personCircleOutline} />
                  <IonText>Profile</IonText>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
