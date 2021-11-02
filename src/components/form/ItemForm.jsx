import { IonCol, IonGrid, IonItem, IonList, IonRow, IonToggle } from "@ionic/react";
import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router";
import useToastContext from "../../hooks/useToastContext";
import useUserContext from "../../hooks/useUserContext";
import { getCollections } from "../../services/collections";
import { trackDeleteItemEvent } from "../../services/react-ga";
import ConfirmAlert from "../alert/ConfirmAlert";
import DeleteButton from "../button/DeleteButton";
import SaveButton from "../button/SaveButton";
import SelectButton from "../button/SelectButton";
import UploadButton from "../button/UploadButton";
import CategoryChip from "../chip/CategoryChip";
import ImageEditList from "../gallery/ImageEditList";
import TextArea from "../text-input/TextArea";
import TextInput from "../text-input/TextInput";
import Text from "../text/Text";

const MEDIA_LIMIT = 4; // can tweak
const MEGABYTE = 1048576;
const MAX_FILE_SIZE = 10 * MEGABYTE;

const getDefaultItemData = () => {
  return { isNew: true, itemName: "", itemDescription: "", images: [] };
};

const ItemForm = (props) => {
  const location = useLocation();
  const { getCurrentUserId } = useUserContext();

  const { itemData = getDefaultItemData(), collectionId, onComplete: completeHandler, onDelete } = props;
  const [itemName, setItemName] = useState(itemData.itemName);
  const [itemDescription, setItemDescription] = useState(itemData.itemDescription);
  const [images, setImages] = useState(itemData.images);
  const [deletedImageIds, setDeletedImageIds] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isTradable, setIsTradable] = useState(itemData.isTradable);
  const isEdit = itemData.isNew;
  const [selectedCollectionId, setSelectedCollectionId] = useState(collectionId);
  const [collections, setCollections] = useState([]);
  const setToast = useToastContext();

  useEffect(() => {
    if (props.itemData) {
      const { itemName, itemDescription, images, isTradable } = props.itemData;
      setItemName(itemName);
      setItemDescription(itemDescription);
      setImages(images);
      setIsTradable(isTradable);
    } else {
      setItemName("");
      setItemDescription("");
      setImages([]);
      setIsTradable(false);
    }
  }, [props.itemData, location]);

  const loadUserCollections = useCallback(async () => {
    if (isEdit) {
      var collections = await getCollections(null, getCurrentUserId(), 0, null);
      setCollections(
        collections.map((collection) => {
          return { value: collection.collectionId, text: collection.collectionName };
        })
      );
    }
  }, [isEdit, getCurrentUserId]);

  useEffect(() => {
    loadUserCollections();
  }, [loadUserCollections]);

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
    if (trimmedItemName.length > 70) {
      validationErrorMessage("Name must be less than 70 characters long!");
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
      isTradable,
    };
    if (isEdit) {
      if (!selectedCollectionId) {
        setToast({ message: "Please select a collection for your item.", color: "danger" });
        return;
      }
      itemToSave.updatedCollection = selectedCollectionId;
    }

    completeHandler(itemToSave);
  };

  const deleteHandler = () => {
    if (!onDelete) {
      return;
    }
    trackDeleteItemEvent();
    onDelete().then(() => setDeleteConfirm(false));
  };

  const convertCollectionIdToName = (selectedId) =>
    collections.filter((col) => Number(col.value) === Number(selectedCollectionId))[0]?.text ?? "Unknown";

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
            <IonRow className="ion-justify-content-center">
              <UploadButton onChange={newImageHandler} />
            </IonRow>
          </div>
        </IonItem>

        <IonItem>
          <Text size="xs">Is this item tradable?</Text>
          <IonToggle slot="end" color="primary" checked={isTradable} onIonChange={(e) => setIsTradable(e.detail.checked)} />
        </IonItem>

        {!isEdit && (
          <IonRow className="ion-justify-content-start">
            <SelectButton onChange={setSelectedCollectionId} options={collections} buttonLabel="Select Collection" selectLabel="Collections" />
            <IonCol>
              {selectedCollectionId && (
                <CategoryChip name={convertCollectionIdToName(selectedCollectionId)} onDelete={() => setSelectedCollectionId(null)} />
              )}
            </IonCol>
          </IonRow>
        )}

        <IonRow className="ion-full-width"></IonRow>
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
