import { IonCol, IonIcon, IonRow } from "@ionic/react";
import { trashBin } from "ionicons/icons";
import React from "react";
import FlexImage from "../image/FlexImage";
import "./gallery.scss";

const groupElements = (arr, interval) => {
  var groups = [];
  for (var i = 0; i < arr.length; i += interval) {
    groups.push(arr.slice(i, i + interval));
  }
  return groups;
};

const ImageEditList = (props) => {
  const { images = [], onDelete: deleteImageHandler } = props;

  const groupsOfFour = groupElements(images, 4);

  const safeDeleteHandler = (idx) => {
    deleteImageHandler(idx);
  };

  return (
    <div className="image-grid">
      {groupsOfFour.map((grp, idx) => (
        <IonRow className="ion-justify-content-left" key={idx}>
          {grp.map(({ imageUrl }, idx) => (
            <IonCol className="edit-item-images" size={3} key={idx}>
              <FlexImage src={imageUrl} />
              <IonIcon size="large" color="danger" onClick={() => safeDeleteHandler(idx)} className="delete-icon clickable" icon={trashBin} />
            </IonCol>
          ))}
        </IonRow>
      ))}
    </div>
  );
};

export default ImageEditList;
