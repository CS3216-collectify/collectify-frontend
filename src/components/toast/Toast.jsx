import { IonToast } from "@ionic/react";

/**
 * React Wrapper for IonToast
 */
const Toast = ({ showToast, setShowToast, toastMessage, dismissBtnHandler }) => {
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
    />
  );
};

export default Toast;
