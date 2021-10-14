import React, { useCallback, useState, createContext } from "react";
import { IonToast } from "@ionic/react";

const UserContext = createContext();

export default UserContext;

export const UserContextProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(
    localStorage.getItem("accessToken") !== null && localStorage.getItem("refreshToken") !== null && localStorage.getItem("userId") !== null
  );

  const [currentUserId, setCurrentUserId] = useState(localStorage.getItem("userId"));

  return (
    <UserContext.Provider value={{ isUserAuthenticated, setIsUserAuthenticated, currentUserId, setCurrentUserId }}>{children}</UserContext.Provider>
  );
};
