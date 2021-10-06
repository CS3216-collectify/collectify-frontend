import { IonToast, CreateAnimation, Animation } from "@ionic/react";

/**
 * React Wrapper for IonToast
 */
const Toast = ({ showToast, setShowToast, toastMessage, dismissBtnHandler, color }) => {
  const dismissBtn = {
    text: "Okay",
    role: "cancel",
    handler: dismissBtnHandler,
  };

  return (
    <IonToast
      isOpen={showToast}
      onDidDismiss={() => setShowToast(false)}
      message={toastMessage}
      position={"bottom"}
      duration={2000}
      buttons={[dismissBtn]}
      color={color}
    />
  );
};

export default Toast;
