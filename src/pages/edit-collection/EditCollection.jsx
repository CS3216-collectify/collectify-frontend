import { IonContent, IonPage } from "@ionic/react";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import DeletingGif from "../../assets/deleting.gif";
import SavingGif from "../../assets/saving.gif";
import CollectionForm from "../../components/form/CollectionForm";
import FlexImage from "../../components/image/FlexImage";
import AppToolbar from "../../components/toolbar/AppToolbar";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import { getCategories } from "../../services/categories";
import { deleteCollection, getCollectionByCollectionId, updateCollection } from "../../services/collections";
import { trackPageView } from "../../services/react-ga";

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

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

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
      setToast({ message: "Failed to load collection information. Please try again later.", color: "danger" });
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
      setToast({ message: "Failed to load categories. Please try again later.", color: "danger" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (location.state) {
      setCollection({ ...location.state.collection });
    } else if (collectionId && location.pathname.startsWith(`/collections/${collectionId}/edit`)) {
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
          history.replace("/my-profile");
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
      <AppToolbar title="Edit Collection" />
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
