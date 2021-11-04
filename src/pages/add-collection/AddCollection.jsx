import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import UploadingGif from "../../assets/uploading.gif";
import CollectionForm from "../../components/form/CollectionForm";
import FlexImage from "../../components/image/FlexImage";
import AppToolbar from "../../components/toolbar/AppToolbar";
import useToastContext from "../../hooks/useToastContext";
import { getCategories } from "../../services/categories";
import { postCollection } from "../../services/collections";
import { trackPageView } from "../../services/react-ga";

const AddCollection = () => {
  const history = useHistory();
  const location = useLocation();
  const setToast = useToastContext();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  const addCollectionHandler = async (collection) => {
    try {
      setUploading(true);
      await postCollection(collection).then((collectionId) => {
        setTimeout(() => {
          setUploading(false);
          if (location.state && location.state.redirectToAdd) {
            history.goBack();
          } else {
            history.replace(`/collections/${collectionId}`);
          }
        }, 1500);
      });
    } catch (e) {
      setUploading(false);
      setToast({ message: "Failed to add collection. Please try again later.", color: "danger" });
    }
  };

  useEffect(() => {
    // setLoading(true);
    const loadCategoryOptions = async () => {
      // setLoading(true);
      try {
        const options = await getCategories();
        setCategoryOptions(options);
      } catch (e) {
        setToast({ message: "Failed to add collection. Please try again later.", color: "danger" });
      }
    };

    loadCategoryOptions();
  }, [setToast]);

  return (
    <IonPage>
      <AppToolbar title="Add Collection" />
      <IonContent>
        {uploading ? (
          <div className="uploading--container">
            <FlexImage src={UploadingGif} />
          </div>
        ) : (
          <CollectionForm onComplete={addCollectionHandler} categoryOptions={categoryOptions} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default AddCollection;
