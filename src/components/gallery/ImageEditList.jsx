import { IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import React, { useState } from "react";
import FlexImage from "../image/FlexImage";
import { trashBin } from "ionicons/icons";
import "./gallery.scss";
import useToastContext from "../../hooks/useToastContext";

const LIMIT = 4;

const groupElements = (arr, interval) => {
  var groups = [];
  for (var i = 0; i < arr.length; i += interval) {
    groups.push(arr.slice(i, i + interval));
  }
  return groups;
};

const ImageEditList = (props) => {
  const setToast = useToastContext();
  const { images = [], onDelete: deleteImageHandler } = props;

  const groupsOfFour = groupElements(images, 4);

  const safeDeleteHandler = (idx) => {
    if (images.length < 2) {
      setToast({ message: "Please upload another image before deleting this image.", color: "danger" });
      return;
    }
    deleteImageHandler(idx);
  };

  return (
    <div className="image-grid">
      {groupsOfFour.map((grp, idx) => (
        <IonRow className="ion-justify-content-left" key={idx}>
          {grp.map(({ imageUrl }, idx) => (
            <IonCol className="edit-item-images" size={3} key={idx}>
              <FlexImage src={imageUrl} />
              <IonIcon size="large" color="danger" onClick={() => safeDeleteHandler(idx)} className="delete-icon" icon={trashBin} />
            </IonCol>
          ))}
        </IonRow>
      ))}
    </div>
  );
};

export default ImageEditList;
