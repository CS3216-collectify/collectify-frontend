import { IonContent, IonPage } from "@ionic/react";
import { useEffect } from "react";
import Feed from "../../components/feed/Feed";
import AppToolbar from "../../components/toolbar/AppToolbar";
import { trackPageView } from "../../services/react-ga";
import "./Home.scss";

const Home = () => {
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return (
    <IonPage>
      <AppToolbar title="collectify" />
      <IonContent>
        <Feed />
      </IonContent>
    </IonPage>
  );
};

export default Home;
