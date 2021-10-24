import { IonGrid, IonItem, IonLabel, IonList, IonRow } from "@ionic/react";
import ImageEditList from "../gallery/ImageEditList";
import { useEffect, useState } from "react";
import TextArea from "../text-input/TextArea";
import TextInput from "../text-input/TextInput";
import UploadButton from "../button/UploadButton";
import SaveButton from "../button/SaveButton";
import useToastContext from "../../hooks/useToastContext";

const getDefaultItemData = () => {
  return { itemData: "", itemDescription: "", images: [] };
};

const ItemForm = (props) => {
  const { itemData = getDefaultItemData(), onComplete: completeHandler } =
    props;

  const [itemName, setItemName] = useState(itemData.itemName);
  const [itemDescription, setItemDescription] = useState(itemData.itemDescription);
  const [images, setImages] = useState(itemData.images);
  const [deletedImageIds, setDeletedImageIds] = useState([]);

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
      console.log("Cannot upload more than 4 photos");
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
  }

  const validationErrorMessage = msg => {
    setToast({ message: msg, color: "danger" });
  }

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
      deletedImageIds
    };
    completeHandler(itemToSave);
  };

  return (
    <IonList>
      <IonItem>
        <TextInput
          label="Item Name"
          value={itemName}
          placeholder="Enter item name"
          onChange={setItemName}
        />
      </IonItem>
      <IonItem>
        <TextArea
          label="Description"
          value={itemDescription}
          placeholder="Enter item description"
          onChange={setItemDescription}
        />
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
        <SaveButton onClick={saveHandler} />
      </IonItem>
    </IonList>
  );
};

export default ItemForm;
