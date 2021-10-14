import { IonChip, IonIcon } from "@ionic/react"
import { close } from 'ionicons/icons';

const CategoryChip = (props) => {
  const { name, id, onDelete: deleteHandler = null } = props;
  return (
    <IonChip>
      {name}
      {deleteHandler &&
        <IonIcon icon={close} onClick={deleteHandler} />
      }
    </IonChip>
  )
}

export default CategoryChip
