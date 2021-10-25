import React, { useState, createContext, useEffect } from "react";
import { getUserId, hasAccessTokenStored, hasRefreshTokenStored } from "../utils/auth/store";
import { storeUserId } from "../utils/auth/actions";
import { getCurrentUser } from "../services/users";

const UserContext = createContext();

export default UserContext;

export const UserContextProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(hasAccessTokenStored() || hasRefreshTokenStored());
  const [currentUserId, setCurrentUserId] = useState(getUserId());

  useEffect(() => {
    if (!currentUserId && isUserAuthenticated) {
      const storedUserId = getUserId();
      if (storedUserId) {
        setCurrentUserId(storedUserId);
      } else {
        console.log("Fetching user id data...");
        getCurrentUser().then((res) => {
          setCurrentUserId(res.userId);
          console.log("Current User ID is", res.userId);
          storeUserId(res.userId);
        });
      }
    }
    if (!isUserAuthenticated) {
      setCurrentUserId(null);
    }
  }, [currentUserId, isUserAuthenticated]);

  const isCurrentUser = (userId) => {
    return parseInt(currentUserId) === parseInt(userId);
  };

  const getCurrentUserId = () => {
    return parseInt(currentUserId);
  };

  return (
    <UserContext.Provider value={{ isUserAuthenticated, isCurrentUser, setIsUserAuthenticated, getCurrentUserId }}>{children}</UserContext.Provider>
  );
};
