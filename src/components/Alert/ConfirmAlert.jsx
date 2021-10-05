import {
  IonAlert,
} from "@ionic/react";

const ConfirmAlert = (props) => {
  const {
    title = "Mock Title",
    message = "Mock Message",
    isOpen = true,
    onCancel: cancelHandler = () => console.log("Clicked cancel"),
    onConfirm: confirmHandler = () => console.log("Clicked confirm"),
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
