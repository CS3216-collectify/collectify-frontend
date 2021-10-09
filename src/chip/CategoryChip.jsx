import { IonChip, IonIcon } from "@ionic/react"
import { close } from 'ionicons/icons';

const CategoryChip = (props) => {
  const { name, id, onDelete: deleteHandler } = props;
  return (
    <IonChip>
      {name}
      <IonIcon icon={close} onClick={deleteHandler} />
    </IonChip>
  )
}

export default CategoryChip
