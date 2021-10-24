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

  const validationErrorMessage = msg => {
    setToast({ message: msg, color: "danger" });
  }

  const saveHandler = () => {
    const trimmedCollectionName = collectionName.trim();
    const trimmedCollectionDescription = collectionDescription.trim();
    if (!trimmedCollectionName) {
      validationErrorMessage("Name cannot be empty!");
      return;
    }
    if (!trimmedCollectionDescription) {
      validationErrorMessage("Description cannot be empty!");
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
  }

  return (
    <IonList>
      <ConfirmAlert 
        title="Delete Collection?"
        message="This action cannot be undone."
        isOpen={deleteConfirm}
        onCancel={() => setDeleteConfirm(false)}
        onConfirm={deleteHandler}
      />
      <IonItem>
        <TextInput label="Collection Title" value={collectionName} placeholder="Enter a title" onChange={setCollectionName} />
      </IonItem>
      <IonItem>
        <TextArea label="Summary" value={collectionDescription} placeholder="Enter collection summary" onChange={setCollectionDescription} />
      </IonItem>
      <IonItem>
        <IonRow className="ion-justify-content-start">
          <IonCol>{categoryId && <CategoryChip name={convertCategoryIdToName(categoryId)} onDelete={() => setCategory(null)} />}</IonCol>
        </IonRow>
      </IonItem>
      <IonItem>
        <IonGrid fixed>
          <IonRow className="ion-justify-content-end">
            <SelectButton onChange={setCategory} options={selectOptions} buttonLabel="Select Category" selectLabel="Categories" />
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

export default CollectionForm;
