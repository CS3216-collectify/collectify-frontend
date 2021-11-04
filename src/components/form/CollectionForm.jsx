import { IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow, IonSelect, IonSelectOption } from "@ionic/react";
import { useEffect, useState } from "react";
import useToastContext from "../../hooks/useToastContext";
import { trackDeleteCollectionEvent } from "../../services/react-ga";
import ConfirmAlert from "../alert/ConfirmAlert";
import DeleteButton from "../button/DeleteButton";
import SaveButton from "../button/SaveButton";
import TextArea from "../text-input/TextArea";
import TextInput from "../text-input/TextInput";
import Text from "../text/Text";
import "./Form.scss";

const CATEGORY_COMPARATOR = (curr, compar) => {
  return curr && compar 
    ? curr.categoryId === compar.categoryId 
    : curr === compar;
}

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
      const { collectionName, collectionDescription, categoryId = null } = props.collectionData;
      setCollectionName(collectionName);
      setCollectionDescription(collectionDescription);
      setCategory(categoryId);
    }
  }, [props.collectionData]);

  const selectOptions = categoryOptions.map((cat) => ({
    value: cat.categoryId,
    text: cat.name,
  }));

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
    if (trimmedCollectionName.length > 70) {
      validationErrorMessage("Name must be less than 70 characters long!");
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
    trackDeleteCollectionEvent();
    onDelete().then(() => setDeleteConfirm(false));
  };

  const changeCategory = (val) => setCategory(val === null ? null : parseInt(val));

  return (
    <IonList className="collection-form">
      <ConfirmAlert
        title="Delete Collection?"
        message="This action cannot be undone."
        isOpen={deleteConfirm}
        onCancel={() => setDeleteConfirm(false)}
        onConfirm={deleteHandler}
      />
      <IonGrid fixed>
        <IonItem>
          <TextInput label="Collection Title" value={collectionName} placeholder="Enter a title" onChange={setCollectionName} />
        </IonItem>
        <IonItem>
          <TextArea label="Summary" value={collectionDescription} placeholder="Enter collection summary" onChange={setCollectionDescription} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Category</IonLabel>
          <IonSelect
            compareWith={CATEGORY_COMPARATOR}
            className="ion-margin-top"
            value={{ categoryId: categoryId }}
            placeholder="Select category"
            onIonChange={(e) => changeCategory(e.detail.value.categoryId)}
            interface="popover"
          >
            <IonSelectOption value={{ categoryId: null }}>None</IonSelectOption>
            {categoryOptions.map((opt, idx) => (
              <IonSelectOption key={idx} value={opt}>
                {opt.name}
              </IonSelectOption>
            ))}
            {/* <IonButton>clear</IonButton> */}
          </IonSelect>
        </IonItem>

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
