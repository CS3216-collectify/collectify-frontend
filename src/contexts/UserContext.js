import React, { useCallback, useState, createContext, useEffect } from "react";
import { IonToast } from "@ionic/react";
import { getAccessToken, getRefreshToken, getUserId } from "../utils/user";

const UserContext = createContext();

export default UserContext;

export const UserContextProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(
    (getAccessToken() !== null || getRefreshToken() !== null) && getUserId() !== null
  );

  const [currentUserId, setCurrentUserId] = useState(getUserId());

  return (
    <UserContext.Provider value={{ isUserAuthenticated, setIsUserAuthenticated, currentUserId, setCurrentUserId }}>{children}</UserContext.Provider>
  );
};
