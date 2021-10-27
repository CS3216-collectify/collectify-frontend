import React, { useState, createContext, useEffect, useCallback } from "react";
import { getUserId, hasAccessTokenStored, hasRefreshTokenStored } from "../utils/auth/store";
import { storeUserId } from "../utils/auth/actions";
import { getCurrentUser } from "../services/users";
import { StreamChat } from "stream-chat";

const UserContext = createContext();

export default UserContext;

export const UserContextProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(hasAccessTokenStored() || hasRefreshTokenStored());
  const [currentUserId, setCurrentUserId] = useState(getUserId());
  const [chatClient, setChatClient] = useState(null);

  const initChat = useCallback(async () => {
    const client = StreamChat.getInstance("8yw2v8gyt57c");

    // API call to backend to get token and image
    await client.connectUser(
      {
        id: `${currentUserId}`,
        name: "John Doe" + currentUserId,
        image: "https://getstream.io/random_svg/?name=John",
      },
      client.devToken(`${currentUserId}`)
    );

    setChatClient(client);
  }, [currentUserId]);

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

    if (currentUserId && isUserAuthenticated) {
      initChat();
    }

    if (!isUserAuthenticated) {
      setCurrentUserId(null);
      chatClient?.disconnectUser();
      setChatClient(null);
    }

    return () => chatClient?.disconnectUser();
  }, [chatClient, currentUserId, initChat, isUserAuthenticated]);

  // useEffect(() => {
  //   if (chatClient === null && currentUserId) {
  //     initChat();
  //   }
  // }, [chatClient, currentUserId, initChat]);

  const isCurrentUser = (userId) => {
    return parseInt(currentUserId) === parseInt(userId);
  };

  const getCurrentUserId = () => {
    return parseInt(currentUserId);
  };

  return (
    <UserContext.Provider value={{ isUserAuthenticated, isCurrentUser, setIsUserAuthenticated, getCurrentUserId, chatClient, setChatClient }}>
      {children}
    </UserContext.Provider>
  );
};
