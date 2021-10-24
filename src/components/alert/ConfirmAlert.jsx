import {
  IonAlert,
} from "@ionic/react";

const ConfirmAlert = (props) => {
  const {
    title,
    message,
    isOpen = false,
    onCancel: cancelHandler,
    onConfirm: confirmHandler,
  } = props;

  return (
    <IonAlert
      showBackdrop={true}
      isOpen={isOpen}
      header={title}
      message={message}
      buttons={[
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: cancelHandler,
        },
        {
          text: "Confirm",
          handler: confirmHandler,
        },
      ]}
    />
  );
};

export default ConfirmAlert;
