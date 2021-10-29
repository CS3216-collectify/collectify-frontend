import { IonGrid, IonItem, IonList, IonRow, IonCol } from "@ionic/react";
import ImageEditList from "../gallery/ImageEditList";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import TextArea from "../text-input/TextArea";
import TextInput from "../text-input/TextInput";
import UploadButton from "../button/UploadButton";
import SaveButton from "../button/SaveButton";
import DeleteButton from "../button/DeleteButton";
import useToastContext from "../../hooks/useToastContext";
import ConfirmAlert from "../alert/ConfirmAlert";
import Text from "../text/Text";

const MEDIA_LIMIT = 4; // can tweak
const MEGABYTE = 1048576;
const MAX_FILE_SIZE = 10 * MEGABYTE;

const getDefaultItemData = () => {
  return { itemData: "", itemDescription: "", images: [] };
};

const ItemForm = (props) => {
  const location = useLocation();

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
    } else {
      setItemName("");
      setItemDescription("");
      setImages([]);
    }
  }, [props.itemData, location]);

  const newImageHandler = (newFile) => {
    if (!newFile) {
      return;
    }
    if (images.length >= MEDIA_LIMIT) {
      setToast({ message: "Cannot upload more than 4 photos", color: "danger" });
      return;
    }
    if (newFile.size > MAX_FILE_SIZE) {
      setToast({ message: "Image file should not exceed 10MB.", color: "danger" });
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
    if (!images || images.length === 0) {
      validationErrorMessage("Images cannot be empty!");
      return;
    }
    if (trimmedItemName.length > 30) {
      validationErrorMessage("Name must be shorter 30 characters!");
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
  };

  return (
    <IonList className="item-form">
      <ConfirmAlert
        title="Delete Item?"
        message="This action cannot be undone."
        isOpen={deleteConfirm}
        onCancel={() => setDeleteConfirm(false)}
        onConfirm={deleteHandler}
      />
      <IonGrid fixed>
        <IonItem>
          <TextInput label="Item Name" value={itemName} placeholder="Enter item name" onChange={setItemName} />
        </IonItem>
        <IonItem>
          <TextArea label="Description" value={itemDescription} placeholder="Enter item description" onChange={setItemDescription} />
        </IonItem>

        <IonItem>
          <div className="add-photos--container">
            <Text size="xs">Photos</Text>
            <ImageEditList images={images} onDelete={deleteImageHandler} />
            <IonRow  className="ion-justify-content-center">
              <UploadButton onChange={newImageHandler} />
            </IonRow>
          </div>
        </IonItem>

        <IonRow className="ion-full-width save-delete-buttons--container">
          {onDelete && (
            <IonCol size={6}>
              <DeleteButton onClick={() => setDeleteConfirm(true)} />
            </IonCol>
          )}
          <IonCol size={onDelete ? 6 : 12}>
            <SaveButton onClick={saveHandler} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonList>
  );
};

export default ItemForm;
