import { IonCol, IonGrid, IonItem, IonList, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import CategoryChip from "../chip/CategoryChip";
import { getCategories } from "../../services/categories";
import SaveButton from "../button/SaveButton";
import SelectButton from "../button/SelectButton";
import TextArea from "../text-input/TextArea";
import TextInput from "../text-input/TextInput";
import useToastContext from "../../hooks/useToastContext";
import DeleteButton from "../button/DeleteButton";
import ConfirmAlert from "../alert/ConfirmAlert";
import "./Form.scss";

const getDefaultCollectionData = () => {
  return { collectionName: "", collectionDescription: "", categoryId: null };
};

const CollectionForm = (props) => {
  const { collectionData = getDefaultCollectionData(), onComplete: completeHandler, categoryOptions = [], onDelete } = props;

  const [collectionName, setCollectionName] = useState(collectionData.collectionName);
  const [collectionDescription, setCollectionDescription] = useState(collectionData.collectionDescription);
  const [categoryId, setCategory] = useState(collectionData.categoryId);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  useEffect(() => {
    if (props.collectionData) {
      const { collectionName, collectionDescription, categoryId } = props.collectionData;
      setCollectionName(collectionName);
      setCollectionDescription(collectionDescription);
      setCategory(categoryId);
    }
  }, [props.collectionData]);

  const selectOptions = categoryOptions.map((cat) => ({
    value: cat.categoryId,
    text: cat.name,
  }));

  const convertCategoryIdToName = (selectedId) => categoryOptions.filter((cat) => cat.categoryId === selectedId)[0]?.name ?? "Unknown";

  const setToast = useToastContext();

  const validationErrorMessage = (msg) => {
    setToast({ message: msg, color: "danger" });
  };

  const saveHandler = () => {
    const trimmedCollectionName = collectionName.trim();
    const trimmedCollectionDescription = collectionDescription.trim();
    if (!trimmedCollectionName) {
      validationErrorMessage("Name cannot be empty!");
      return;
    }
    if (categoryId === null) {
      validationErrorMessage("Please select a category!");
      return;
    }
    const collectionToSave = {
      collectionName: trimmedCollectionName,
      collectionDescription: trimmedCollectionDescription,
      categoryId,
    };
    completeHandler(collectionToSave);
  };

  const deleteHandler = () => {
    if (!onDelete) {
      return;
    }
    onDelete().then(() => setDeleteConfirm(false));
  };

  return (
    <IonList className="collection-form">
      <ConfirmAlert
        title="Delete Collection?"
        message="This action cannot be undone."
        isOpen={deleteConfirm}
        onCancel={() => setDeleteConfirm(false)}
        onConfirm={deleteHandler}
      />{" "}
      <IonGrid fixed>
        <IonItem>
          <TextInput label="Collection Title" value={collectionName} placeholder="Enter a title" onChange={setCollectionName} />
        </IonItem>
        <IonItem>
          <TextArea label="Summary" value={collectionDescription} placeholder="Enter collection summary" onChange={setCollectionDescription} />
        </IonItem>

        <IonRow className="ion-justify-content-start">
          <SelectButton onChange={setCategory} options={selectOptions} buttonLabel="Select Category" selectLabel="Categories" />
          <IonCol>{categoryId && <CategoryChip name={convertCategoryIdToName(categoryId)} onDelete={() => setCategory(null)} />}</IonCol>
        </IonRow>
        <IonRow className="ion-full-width"></IonRow>

        <IonRow className="ion-full-width save-delete-buttons--container">
          {onDelete && (
            <IonCol size={6} className="ion-full-width">
              <DeleteButton onClick={() => setDeleteConfirm(true)} />
            </IonCol>
          )}
          <IonCol size={onDelete ? 6 : 12} className="ion-full-width">
            <SaveButton onClick={saveHandler} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonList>
  );
};

export default CollectionForm;
