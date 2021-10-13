import { IonCol, IonGrid, IonItem, IonList, IonRow } from "@ionic/react";
import { useEffect, useState } from "react";
import CategoryChip from "../../chip/CategoryChip";
import { getCategories } from "../../services/categories";
import SaveButton from "../button/SaveButton";
import SelectButton from "../button/SelectButton";
import TextArea from "../text-input/TextArea";
import TextInput from "../text-input/TextInput";

const getDefaultCollectionData = () => {
  return { collectionName: "", collectionDescription: "", categoryId: null };
};

const CollectionForm = (props) => {
  const { collectionData = getDefaultCollectionData(), onComplete: completeHandler, categoryOptions = [] } = props;

  const [collectionName, setCollectionName] = useState(collectionData.collectionName);
  const [collectionDescription, setCollectionDescription] = useState(collectionData.collectionDescription);
  const [categoryId, setCategory] = useState(null);

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

  const saveHandler = () => {
    // TODO: input validation
    if (categoryId === null) {
      console.log("Plase select one category");
      return;
    }
    const collectionToSave = {
      collectionName,
      collectionDescription,
      categoryId,
      // other data
    };
    completeHandler(collectionToSave);
  };

  return (
    <IonList>
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
        <SaveButton onClick={saveHandler} />
      </IonItem>
    </IonList>
  );
};

export default CollectionForm;
