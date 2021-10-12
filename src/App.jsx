import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
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

import Home from "./pages/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/edit-profile/EditProfile";
import Item from "./pages/item/Item";
import EditItem from "./pages/edit-item/EditItem";
import AddItem from "./pages/add-item/AddItem";
import CollectionForm from "./components/form/CollectionForm";
import AddCollection from "./pages/add-collection/AddCollection";
import EditCollection from "./pages/edit-collection/EditCollection";
import Collection from "./pages/collection/Collection";

const App = () => {
  useEffect(() => GoogleAuth.init(), []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Check Auth status. 
          If user has clicked "Continue as Guest", store it in a isGuest variable
          
          if isLoggedIn, redirect to /home.
          if not isLoggedIn and isGuest, redirect to /home.
          if not isLoggedIn and not isGuest, stay here.
          */}
          <Route exact path="/">
            <Login />
          </Route>

          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/profile/:username">
                <Profile />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/profile/edit">
                <EditProfile />
              </Route>
              <Route exact path="/collections/:collectionId">
                <Collection />
              </Route>
              <Route exact path="/collections/:collectionId/edit">
                <EditCollection />
              </Route>
              <Route exact path="/collections/add">
                <AddCollection />
              </Route>
              <Route exact path="/collections/:collectionId/items/:itemId">
                <Item />
              </Route>
              <Route exact path="/collections/:collectionId/items/:itemId/edit">
                <EditItem />
              </Route>
              <Route exact path="/collections/:collectionId/items/add">
                <AddItem />
              </Route>
              {/* Test Route, DELETE */}
              <Route exact path="/test/:collectionId/:itemId">
                <AddCollection />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom" className="ion-hide-sm-up">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={homeOutline} />
                <IonText>Home</IonText>
              </IonTabButton>

              <IonTabButton tab="b" href="/b">
                <IonIcon icon={searchOutline} />
                <IonText>Discover</IonText>
              </IonTabButton>

              <IonTabButton tab="c" href="/c">
                <IonIcon icon={addCircleOutline} />
                <IonText>Add</IonText>
              </IonTabButton>

              <IonTabButton tab="d" href="/d">
                <IonIcon icon={chatbubblesOutline} />
                <IonText>Chats</IonText>
              </IonTabButton>

              <IonTabButton tab="user-profile" href="/profile">
                <IonIcon icon={personCircleOutline} />
                <IonText>Profile</IonText>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
