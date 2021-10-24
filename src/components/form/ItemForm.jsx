import { IonGrid, IonItem, IonLabel, IonList, IonRow } from "@ionic/react";
import ImageEditList from "../gallery/ImageEditList";
import { useEffect, useState } from "react";
import TextArea from "../text-input/TextArea";
import TextInput from "../text-input/TextInput";
import UploadButton from "../button/UploadButton";
import SaveButton from "../button/SaveButton";
import DeleteButton from "../button/DeleteButton";
import useToastContext from "../../hooks/useToastContext";
import ConfirmAlert from "../alert/ConfirmAlert";

const getDefaultItemData = () => {
  return { itemData: "", itemDescription: "", images: [] };
};

const ItemForm = (props) => {
  const { itemData = getDefaultItemData(), onComplete: completeHandler, onDelete } = props;

  const [itemName, setItemName] = useState(itemData.itemName);
  const [itemDescription, setItemDescription] = useState(itemData.itemDescription);
  const [images, setImages] = useState(itemData.images);
  const [deletedImageIds, setDeletedImageIds] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const setToast = useToastContext();

  useEffect(() => {
    if (props.itemData) {
      const { itemName, itemDescription, images } = props.itemData;
      setItemName(itemName);
      setItemDescription(itemDescription);
      setImages(images);
    }
  }, [props.itemData]);

  const newImageHandler = (newFile) => {
    if (images.length > 3) {
      setToast({ message: "Cannot upload more than 4 photos", color: "danger" });
      return;
    }

    const newUrl = URL.createObjectURL(newFile);
    const newFileData = { imageUrl: newUrl, position: images.length, isNew: true };
    setImages([...images, newFileData]);
  };

  const deleteImageHandler = (selectedIndex) => {
    const deletedImage = images[selectedIndex];
    const remainingImages = images.filter((_, idx) => idx !== selectedIndex);
    if (!deletedImage.isNew) {
      // image needs to be deleted from database
      setDeletedImageIds([...deletedImageIds, deletedImage.imageId]);
    }
    setImages(remainingImages);
  };

  const validationErrorMessage = (msg) => {
    setToast({ message: msg, color: "danger" });
  };

  const saveHandler = () => {
    const trimmedItemName = itemName.trim();
    const trimmedItemDescription = itemDescription.trim();

    if (!trimmedItemName) {
      validationErrorMessage("Name cannot be empty!");
      return;
    }
    if (!trimmedItemDescription) {
      validationErrorMessage("Description cannot be empty!");
      return;
    }
    if (!images || images.length === 0) {
      validationErrorMessage("Images cannot be empty!");
      return;
    }

    const itemToSave = {
      itemName: trimmedItemName,
      itemDescription: trimmedItemDescription,
      images,
      deletedImageIds,
    };
    completeHandler(itemToSave);
  };

  const deleteHandler = () => {
    if (!onDelete) {
      return;
    }
    onDelete().then(() => setDeleteConfirm(false));
  }

  return (
    <IonList>
      <ConfirmAlert 
        title="Delete Item?"
        message="This action cannot be undone."
        isOpen={deleteConfirm}
        onCancel={() => setDeleteConfirm(false)}
        onConfirm={deleteHandler}
      />
      <IonItem>
        <TextInput label="Item Name" value={itemName} placeholder="Enter item name" onChange={setItemName} />
      </IonItem>
      <IonItem>
        <TextArea label="Description" value={itemDescription} placeholder="Enter item description" onChange={setItemDescription} />
      </IonItem>
      <IonItem>
        <IonGrid fixed>
          <IonLabel>Photos</IonLabel>
          <ImageEditList images={images} onDelete={deleteImageHandler} />
          <IonRow className="ion-justify-content-end">
            <UploadButton onChange={newImageHandler} />
          </IonRow>
        </IonGrid>
      </IonItem>
      <IonItem>
        <IonGrid fixed>
          <SaveButton onClick={saveHandler} />
          {onDelete &&
            <DeleteButton onClick={() => setDeleteConfirm(true)} />
          }
        </IonGrid>
      </IonItem>
    </IonList>
  );
};

export default ItemForm;
