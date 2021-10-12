import React, { useCallback, useEffect, useState, createContext } from "react";
import { IonToast, CreateAnimation, Animation } from "@ionic/react";

const ToastContext = createContext();

export default ToastContext;

export const ToastContextProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState("This is a Toast message.");
  const [showToast, setShowToast] = useState(false);
  const [toastColor, setToastColor] = useState("");

  const setToast = useCallback(
    ({ message, color }) => {
      setToastMessage(message);
      setToastColor(color);
      setShowToast(true);
    },
    [setToastMessage]
  );

  const dismissBtn = {
    text: "Okay",
    role: "cancel",
  };

  return (
    <ToastContext.Provider value={setToast}>
      {children}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        position={"bottom"}
        duration={2000}
        buttons={[dismissBtn]}
        color={toastColor}
      />
    </ToastContext.Provider>
  );
};
