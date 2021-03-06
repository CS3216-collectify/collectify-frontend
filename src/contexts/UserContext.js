import React, { useState, createContext, useEffect, useCallback } from "react";
import { getUserId, hasAccessTokenStored, hasRefreshTokenStored } from "../utils/auth/store";
import { storeUserId } from "../utils/auth/actions";
import { getChatUserInfo, getCurrentUser } from "../services/users";
import { StreamChat } from "stream-chat";

const UserContext = createContext();

export default UserContext;

const STREAM_CHAT_TOKEN = process.env.REACT_APP_CHAT_API_KEY;
const COLLECTIFY_STREAM_CHAT_ID = "28";

export const UserContextProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(hasAccessTokenStored() || hasRefreshTokenStored());
  const [currentUserId, setCurrentUserId] = useState(getUserId());
  const [chatClient, setChatClient] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState(0);

  const initChat = useCallback(async () => {
    if (!currentUserId) {
      return;
    }
    const chatUser = await getChatUserInfo();
    const client = StreamChat.getInstance(STREAM_CHAT_TOKEN);
    const { chatId, chatToken } = chatUser;

    const res = await client.connectUser(
      {
        id: chatId.toString(),
      },
      chatToken
    );
    setChatClient(client);

    if (res) {
      setUnreadMessages(res.me.unread_count);

      // Tried to emulate (1) collectify globally, but after clearing the notification by going to chat
      // it reverts to the previous count
      // document.title = res.me.unread_count > 0 ? `(${res.me.unread_count}) collectify` : "collectify";
    }

    // Create a default chat channel with the collectify account
    if (Number(client.userID) !== Number(COLLECTIFY_STREAM_CHAT_ID)) {
      const channel = client.channel("messaging", {
        members: [client.userID, COLLECTIFY_STREAM_CHAT_ID],
      });
      // Here, 'travel' will be the channel ID
      await channel.create();
    }
  }, [currentUserId]);

  useEffect(() => {
    if (chatClient) {
      chatClient.on((event) => {
        if (event.total_unread_count !== undefined) {
          setUnreadMessages(event.total_unread_count);
          // document.title = event.total_unread_count > 0 ? `(${event.total_unread_count}) collectify` : "collectify";
        }
      });
    }
  }, [chatClient]);

  useEffect(() => {
    if (!currentUserId && isUserAuthenticated) {
      const storedUserId = getUserId();
      if (storedUserId) {
        setCurrentUserId(storedUserId);
      } else {
        getCurrentUser().then((res) => {
          setCurrentUserId(res.userId);
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
    <UserContext.Provider
      value={{
        isUserAuthenticated,
        isCurrentUser,
        setIsUserAuthenticated,
        getCurrentUserId,
        chatClient,
        setChatClient,
        unreadMessages,
        setUnreadMessages,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
