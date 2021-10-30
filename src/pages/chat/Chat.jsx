import React, { useState, useEffect, useLayoutEffect } from "react";
import { IonContent, IonLoading, IonPage } from "@ionic/react";
import { Chat, Channel, ChannelList } from "stream-chat-react";
import useUserContext from "../../hooks/useUserContext";

import HomeToolbar from "../../components/toolbar/HomeToolbar";

import "stream-chat-react/dist/css/index.css";
import { CreateChannel, CustomMessage, MessagingChannelList, MessagingChannelPreview, MessagingInput, MessagingThreadHeader } from "./components";
import { ChannelInner } from "./components/ChannelInner/ChannelInner";
import "./Chat.scss";

const options = { state: true, watch: true, presence: true, limit: 8 };

const sort = {
  last_message_at: -1,
  updated_at: -1,
  cid: 1,
};

export const GiphyContext = React.createContext({});

const CollectifyChat = () => {
  const { chatClient } = useUserContext();
  const filters = { type: "messaging", members: { $in: [chatClient?.userID] } };

  const [giphyState, setGiphyState] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isMobileNavVisible, setMobileNav] = useState(true);
  const [loading, setLoading] = useState(false);
  const [chatItem, setChatItem] = useState(null);

  useEffect(() => {
    const mobileChannelList = document.querySelector("#mobile-channel-list");
    if (isMobileNavVisible && mobileChannelList) {
      document.body.style.overflow = "hidden";
    } else if (!isMobileNavVisible && mobileChannelList) {
      document.body.style.overflow = "auto";
    }
  }, [isMobileNavVisible]);

  const mobileChannelListClasses = isMobileNavVisible ? "show" : "";

  const toggleMobile = () => {
    setMobileNav(!isMobileNavVisible);
  }

  const giphyContextValue = { giphyState, setGiphyState };

  if (!chatClient || loading) {
    return (
      <IonPage>
        <HomeToolbar title="Chat" />
        <IonContent class="chat-content">
          <IonLoading isOpen={true} />
        </IonContent>
      </IonPage>
    );
  }

  const closeMobileNav = () => {
    console.log("closing mobile...");
    setMobileNav(false);
  }
  const openMobileNav = () => {
    console.log("opening mobile...");
    setMobileNav(true);
  }
  
  return (
    <IonPage>
      <HomeToolbar title="Chat" />
      <IonContent class="chat-content">
        <Chat client={chatClient} theme="messaging light">
          <div id="mobile-channel-list" className={mobileChannelListClasses}>
            <ChannelList
              filters={filters}
              sort={sort}
              options={options}
              List={(props) => <MessagingChannelList {...props} onCreateChannel={() => setIsCreating(true)} closeNav={closeMobileNav} setChatItem={setChatItem} />}
              Preview={(props) => <MessagingChannelPreview {...props} {...{ setIsCreating }} closeNav={closeMobileNav} />}
            />
          </div>
          {isCreating && <CreateChannel toggleMobile={toggleMobile} onClose={() => setIsCreating(false)} />}
          <Channel
            Input={MessagingInput}
            maxNumberOfFiles={10}
            Message={CustomMessage}
            multipleUploads={true}
            ThreadHeader={MessagingThreadHeader}
            TypingIndicator={() => null}
          >
            <GiphyContext.Provider value={giphyContextValue}>
              <ChannelInner theme="light" closeNav={closeMobileNav} openNav={openMobileNav} isNavOpen={isMobileNavVisible} chatItem={chatItem} setChatItem={setChatItem} />
            </GiphyContext.Provider>
          </Channel>
        </Chat>
      </IonContent>
    </IonPage>
  );
};

export default CollectifyChat;
