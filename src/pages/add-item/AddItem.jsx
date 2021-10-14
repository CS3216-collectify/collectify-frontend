import { IonContent, IonLoading, IonPage } from "@ionic/react";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import ItemForm from "../../components/form/ItemForm";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { postItem } from "../../services/items";

const AddItem = () => {
  const history = useHistory();
  const { collectionId } = useParams();
  const [loading, setLoading] = useState(false);

  const addCompleteHandler = async (item) => {
    setLoading(true);
    try {
      const itemId = await postItem(collectionId, item);
      setLoading(false);
      history.replace(`/collections/${collectionId}/items/${itemId}`);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <IonPage>
      <IonLoading isOpen={loading} />
      <HomeToolbar title="Add Item" />
      <IonContent>
        <ItemForm onComplete={addCompleteHandler} />
      </IonContent>
    </IonPage>
  );
};

export default AddItem;
