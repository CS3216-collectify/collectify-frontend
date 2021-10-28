import React, { useState, createContext, useEffect, useCallback } from "react";
import { getUserId, hasAccessTokenStored, hasRefreshTokenStored } from "../utils/auth/store";
import { storeUserId } from "../utils/auth/actions";
import { getChatUserInfo, getCurrentUser } from "../services/users";
import { StreamChat } from "stream-chat";

const UserContext = createContext();

export default UserContext;

const STREAM_CHAT_TOKEN = process.env.REACT_APP_CHAT_API_KEY;

export const UserContextProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(hasAccessTokenStored() || hasRefreshTokenStored());
  const [currentUserId, setCurrentUserId] = useState(getUserId());
  const [chatClient, setChatClient] = useState(null);

  const initChat = useCallback(async () => {
    if (!currentUserId) {
      return;
    }
    const chatUser = await getChatUserInfo();
    const client = StreamChat.getInstance(STREAM_CHAT_TOKEN);
    const { chatId, chatName, pictureUrl, chatToken, username } = chatUser;

    await client.connectUser(
      {
        id: chatId.toString(),
        name: chatName, // TODO: Remove, only backend change
        username, // TODO: REMOVE
        image: pictureUrl, // TODO: REMOVE
      },
      // TODO: Use chatToken after integration
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

    if (!isUserAuthenticated) {
      setCurrentUserId(null);
      chatClient?.disconnectUser();
      setChatClient(null);
    }

    return () => chatClient?.disconnectUser();
  }, [chatClient, currentUserId, isUserAuthenticated]);

  useEffect(() => {
    if (chatClient === null && currentUserId) {
      initChat();
    }

    return () => chatClient?.disconnectUser();
  }, [chatClient, currentUserId, initChat]);

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
