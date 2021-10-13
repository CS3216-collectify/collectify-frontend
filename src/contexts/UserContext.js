import React, { useCallback, useState, createContext } from "react";
import { IonToast } from "@ionic/react";

const UserContext = createContext();

export default UserContext;

export const UserContextProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(
    localStorage.getItem("accessToken") !== null && localStorage.getItem("refreshToken") !== null && localStorage.getItem("userId") !== null
  );

  return <UserContext.Provider value={{ isUserAuthenticated, setIsUserAuthenticated }}>{children}</UserContext.Provider>;
};
