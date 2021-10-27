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
  const [isMobileNavVisible, setMobileNav] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mobileChannelList = document.querySelector("#mobile-channel-list");
    if (isMobileNavVisible && mobileChannelList) {
      mobileChannelList.classList.add("show");
      document.body.style.overflow = "hidden";
    } else if (!isMobileNavVisible && mobileChannelList) {
      mobileChannelList.classList.remove("show");
      document.body.style.overflow = "auto";
    }
  }, [isMobileNavVisible]);

  // TODO: find a better way to update the height
  useLayoutEffect(() => {
    const setAppHeight = () => {
      setLoading(true);
      var content = document.querySelector("ion-content");
      var container = document.querySelector(".str-chat");
      console.log(content, container, content?.offsetHeight);

      //   while (!content || !container) {
      // content = document.querySelector("ion-content");
      // container = document.querySelector(".str-chat__container");
      //   }

      //   if (content && container) {
      //   }
      const doc = document.documentElement;
      doc.style.setProperty("--chat-height", `${content.offsetHeight}px`);
      setLoading(false);
    };
    setTimeout(() => {
      setAppHeight();

      window.addEventListener("resize", setAppHeight);
    }, 2000);

    return () => window.removeEventListener("resize", setAppHeight);
  }, []);

  const toggleMobile = () => setMobileNav(!isMobileNavVisible);

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

  return (
    <IonPage>
      <HomeToolbar title="Chat" />
      <IonContent class="chat-content">
        <Chat client={chatClient} theme="messaging light">
          <div id="mobile-channel-list" onClick={toggleMobile}>
            <ChannelList
              filters={filters}
              sort={sort}
              options={options}
              List={(props) => <MessagingChannelList {...props} onCreateChannel={() => setIsCreating(true)} toggleMobile={() => setMobileNav(false)} />}
              Preview={(props) => <MessagingChannelPreview {...props} {...{ setIsCreating }} />}
            />
          </div>
          {/* <div> */}
            <Channel
              Input={MessagingInput}
              maxNumberOfFiles={10}
              Message={CustomMessage}
              multipleUploads={true}
              ThreadHeader={MessagingThreadHeader}
              TypingIndicator={() => null}
            >
              {isCreating && <CreateChannel toggleMobile={toggleMobile} onClose={() => setIsCreating(false)} />}
              <GiphyContext.Provider value={giphyContextValue}>
                <ChannelInner theme="light" toggleMobile={toggleMobile} />
              </GiphyContext.Provider>
            </Channel>
          {/* </div> */}
        </Chat>
      </IonContent>
    </IonPage>
  );
};

export default CollectifyChat;
