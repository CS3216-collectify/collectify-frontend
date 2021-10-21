import React, { useState, useEffect, useLayoutEffect } from "react";
import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonItem, IonList } from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { StreamChat } from "stream-chat";
import { Chat, Channel, ChannelList } from "stream-chat-react";

import HomeToolbar from "../../components/toolbar/HomeToolbar";

import "stream-chat-react/dist/css/index.css";
import { CreateChannel, CustomMessage, MessagingChannelList, MessagingChannelPreview, MessagingInput, MessagingThreadHeader } from "./components";
import { ChannelInner } from "./components/ChannelInner/ChannelInner";
import "./Chat.scss";

const urlParams = new URLSearchParams(window.location.search);

const apiKey = urlParams.get("apikey") || "8yw2v8gyt57c";
const user = urlParams.get("user") || process.env.REACT_APP_USER_ID;
const userToken = urlParams.get("user_token") || process.env.REACT_APP_USER_TOKEN;
const targetOrigin = urlParams.get("target_origin") || process.env.REACT_APP_TARGET_ORIGIN;

const noChannelNameFilter = urlParams.get("no_channel_name_filter") || false;
const skipNameImageSet = urlParams.get("skip_name_image_set") || false;

const filters = noChannelNameFilter ? { type: "messaging", members: { $in: [user] } } : { type: "messaging", name: "Social Demo", demo: "social" };

const options = { state: true, watch: true, presence: true, limit: 8 };

const sort = {
  last_message_at: -1,
  updated_at: -1,
  cid: 1,
};

const userToConnect = { id: user, name: user, image: "https://cdn2.bulbagarden.net/upload/thumb/4/49/Ash_Pikachu.png/1200px-Ash_Pikachu.png" };

if (skipNameImageSet) {
  delete userToConnect.name;
  delete userToConnect.image;
}
export const GiphyContext = React.createContext({});

const CollectifyChat = () => {
  const [chatClient, setChatClient] = useState(null);
  const [giphyState, setGiphyState] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isMobileNavVisible, setMobileNav] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance(apiKey);
      const num = Math.floor(Math.random() * 10) + 1;
      await client.connectUser(
        {
          id: "john" + num,
          name: "John Doe" + num,
          image: "https://getstream.io/random_svg/?name=John",
        },
        client.devToken("john" + num)
      );

      setChatClient(client);
    };

    initChat();

    return () => chatClient?.disconnectUser();
  }, []); // eslint-disable-line

  useEffect(() => {
    const handleThemeChange = ({ data, origin }) => {
      // handle events only from trusted origin
      if (origin === targetOrigin) {
        if (data === "light" || data === "dark") {
          setTheme(data);
        }
      }
    };

    window.addEventListener("message", handleThemeChange);
    return () => window.removeEventListener("message", handleThemeChange);
  }, []);
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
    };
    setTimeout(() => {
      setAppHeight();

      window.addEventListener("resize", setAppHeight);
    }, 2000);

    return () => window.removeEventListener("resize", setAppHeight);
  }, []);

  const toggleMobile = () => setMobileNav(!isMobileNavVisible);

  const giphyContextValue = { giphyState, setGiphyState };

  if (!chatClient) return null;

  return (
    <IonPage>
      <HomeToolbar title="Chat" />

      <IonContent>
        <Chat client={chatClient} theme={`messaging ${theme}`}>
          <div id="mobile-channel-list" onClick={toggleMobile}>
            <ChannelList
              filters={filters}
              sort={sort}
              options={options}
              List={(props) => <MessagingChannelList {...props} onCreateChannel={() => setIsCreating(!isCreating)} />}
              Preview={(props) => <MessagingChannelPreview {...props} {...{ setIsCreating }} />}
            />
          </div>
          <div>
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
                <ChannelInner theme={theme} toggleMobile={toggleMobile} />
              </GiphyContext.Provider>
            </Channel>
          </div>
        </Chat>
      </IonContent>
    </IonPage>
  );
};

export default CollectifyChat;
