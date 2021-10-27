import { IonContent, IonPage, IonGrid } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import CollectionForm from "../../components/form/CollectionForm";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { getCategories } from "../../services/categories";
import { postCollection } from "../../services/collections";
import SelectCollections from "../../components/profile-collection/SelectCollections";
import useUserContext from "../../hooks/useUserContext";

const Add = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const { getCurrentUserId } = useUserContext();

  return (
    <IonPage>
      <HomeToolbar title="Add" />
      <IonContent className="ion-padding">
        <IonGrid fixed>
          <SelectCollections profileUserId={getCurrentUserId()} />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Add;
