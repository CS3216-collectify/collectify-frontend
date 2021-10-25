import { IonContent, IonLoading, IonPage } from "@ionic/react";
import { useState } from "react";
import { useLocation } from "react-router";
import { useHistory, useParams } from "react-router";
import ItemForm from "../../components/form/ItemForm";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { postItem } from "../../services/items";

const AddItem = () => {
  const history = useHistory();
  const location = useLocation();
  const { collectionId } = useParams();
  const [loading, setLoading] = useState(false);

  const addCompleteHandler = async (item) => {
    setLoading(true);
    try {
      console.log(collectionId)
      const itemId = await postItem(collectionId, item);
      setLoading(false);
      history.replace(`/collections/${collectionId}/items/${itemId}`);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonLoading isOpen={loading} spinner="crescent" />
      <HomeToolbar title="Add Item" />
      <IonContent>
        <ItemForm onComplete={addCompleteHandler} />
      </IonContent>
    </IonPage>
  );
};

export default AddItem;
