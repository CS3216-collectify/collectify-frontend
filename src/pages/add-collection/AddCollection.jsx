import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router";
import CollectionForm from "../../components/form/CollectionForm";
import HomeToolbar from "../../components/toolbar/HomeToolbar";
import { getCategories } from "../../services/categories";
import { postCollection } from "../../services/collections";
import UploadingGif from "../../assets/uploading.gif";
import FlexImage from "../../components/image/FlexImage";

const AddCollection = () => {
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [uploading, setUploading] = useState(false);

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
      console.log(e);
    } finally {
    }
  };

  useEffect(() => {
    // setLoading(true);
    loadCategoryOptions();
  }, []);

  const loadCategoryOptions = async () => {
    // setLoading(true);
    try {
      const options = await getCategories();
      setCategoryOptions(options);
    } catch (e) {
      console.log(e);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <IonPage>
      <HomeToolbar title="Add Collection" />
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
