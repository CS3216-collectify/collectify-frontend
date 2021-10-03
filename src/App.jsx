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

const App = () => {
  useEffect(() => GoogleAuth.init(), []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Remember that a user is a guest and don't show this again */}
          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/">
            <Login />
          </Route>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home">
                <Home />
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

              <IonTabButton tab="e" href="/e">
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
