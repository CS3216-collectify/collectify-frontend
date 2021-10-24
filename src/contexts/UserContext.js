import React, { useState, createContext, useEffect } from "react";
import { getAccessToken, getRefreshToken, getUserId, storeUserId } from "../utils/user";
import { getCurrentUser } from "../services/users";

const UserContext = createContext();

export default UserContext;

export const UserContextProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(
    getAccessToken() !== null || getRefreshToken() !== null
  );

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
  }

  return (
    <UserContext.Provider value={{ isUserAuthenticated, isCurrentUser, setIsUserAuthenticated }}>{children}</UserContext.Provider>
  );
};
