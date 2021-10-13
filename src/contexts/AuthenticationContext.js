import React, { useCallback, useState, createContext } from "react";
import { IonToast } from "@ionic/react";

const AuthenticationContext = createContext();

export default AuthenticationContext;

export const AuthenticationContextProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(
    localStorage.getItem("accessToken") !== null && localStorage.getItem("refreshToken") !== null && localStorage.getItem("userId") !== null
  );

  return <AuthenticationContext.Provider value={{ isUserAuthenticated, setIsUserAuthenticated }}>{children}</AuthenticationContext.Provider>;
};
