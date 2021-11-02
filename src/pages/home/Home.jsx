import { IonContent, IonPage } from "@ionic/react";
import { useEffect } from "react";
import Feed from "../../components/feed/Feed";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { trackPageView } from "../../services/react-ga";
import "./Home.scss";

const Home = () => {
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return (
    <IonPage>
      <HomeToolbar title="collectify" />
      <IonContent>
        <Feed />
      </IonContent>
    </IonPage>
  );
};

export default Home;
