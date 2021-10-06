import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonTabs, IonTabButton, IonIcon, IonTabBar } from "@ionic/react";
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
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>

            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/home">
                  <Home />
                </Route>
                <Switch>
                  <Route exact path="/profile/:username">
                    <Profile />
                  </Route>
                  <Route exact path="/profile">
                    <Profile />
                  </Route>
                </Switch>
              </IonRouterOutlet>

              <IonTabBar slot="bottom" className="ion-hide-sm-up">
                <IonTabButton tab="home" href="/home">
                  <IonIcon icon={homeOutline} />
                  <p>Home</p>
                </IonTabButton>

                <IonTabButton tab="b" href="/b">
                  <IonIcon icon={searchOutline} />
                  <p>Discover</p>
                </IonTabButton>

                <IonTabButton tab="c" href="/c">
                  <IonIcon icon={addCircleOutline} />
                  <p>Add</p>
                </IonTabButton>

                <IonTabButton tab="d" href="/d">
                  <IonIcon icon={chatbubblesOutline} />
                  <p>Chats</p>
                </IonTabButton>

                <IonTabButton tab="user-profile" href="/profile">
                  <IonIcon icon={personCircleOutline} />
                  <p>Profile</p>
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
