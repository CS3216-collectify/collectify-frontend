import { IonContent, IonLoading, IonPage, IonGrid } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useHistory, useParams } from "react-router";
import CollectionForm from "../../components/form/CollectionForm";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import useToastContext from "../../hooks/useToastContext";
import { getCategories } from "../../services/categories";
import { deleteCollection, getCollectionByCollectionId, updateCollection } from "../../services/collections";
import FlexImage from "../../components/image/FlexImage";
import SavingGif from "../../assets/saving.gif";
import DeletingGif from "../../assets/deleting.gif";
import useUserContext from "../../hooks/useUserContext";

const getDefaultCollectionData = () => {
  return { collectionName: "", collectionDescription: "", categoryId: null };
};

const EditCollection = (props) => {
  const setToast = useToastContext();
  const location = useLocation();
  const { isCurrentUser } = useUserContext();
  const history = useHistory();
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(getDefaultCollectionData());
  const [loading, setLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const loadExistingData = useCallback(async () => {
    setLoading(true);
    try {
      const currentCollection = await getCollectionByCollectionId(collectionId);
      if (!isCurrentUser(currentCollection.ownerId)) {
        history.push(`/collections/${collectionId}`);
        return;
      }
      setCollection(currentCollection);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [collectionId]);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    try {
      const options = await getCategories();
      setCategoryOptions(options);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (location.state) {
      console.log("Loading form data from state...");
      setCollection({ ...location.state.collection });
    } else if (collectionId && location.pathname.startsWith(`/collections/${collectionId}/edit`)) {
      console.log("Fetching form data from server...");
      loadExistingData();
    }
    loadCategories();
  }, [loadExistingData, location]);

  const editCompleteHandler = async (collection) => {
    try {
      setUploading(true);
      await updateCollection(collectionId, collection).then((itemId) => {
        setTimeout(() => {
          setUploading(false);
          setToast({ message: "Collection updated successfully", color: "success" });
          history.goBack();
        }, 1500);
      });
    } catch (e) {
      setUploading(false);
      setToast({ message: "Failed to update collection.", color: "danger" });
    } finally {
    }
  };

  const deleteHandler = async () => {
    try {
      setDeleting(true);
      await deleteCollection(collectionId).then(() => {
        setTimeout(() => {
          setDeleting(false);
          setToast({ message: "Successfully deleted collection.", color: "success" });
          history.replace("/profile");
        }, 2400);
      });
    } catch (e) {
      setDeleting(false);
      setToast({ message: "Failed to delete collection.", color: "danger" });
    } finally {
    }
  };

  return (
    <IonPage>

      <HomeToolbar title="Edit Collection" />
      <IonContent>
        {uploading ? (
          <div className="uploading--container">
            <FlexImage src={SavingGif} />
          </div>
        ) : deleting ? (
          <div className="uploading--container">
            <FlexImage src={DeletingGif} />
          </div>
        ) : (
          <CollectionForm categoryOptions={categoryOptions} onComplete={editCompleteHandler} collectionData={collection} onDelete={deleteHandler} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default EditCollection;
