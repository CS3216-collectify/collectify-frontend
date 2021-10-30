import React, { useEffect } from "react";
import { Avatar, useChatContext } from "stream-chat-react";

import "./MessagingChannelList.css";
import { SkeletonLoader } from "./SkeletonLoader";
import noProfileImage from "../../../../assets/no-profile-image.png";

import { CreateChannelIcon } from "../../assets";
import streamLogo from "../../assets/stream.png";
import { useLocation } from "react-router";
import { IonCol } from "@ionic/react";

const MessagingChannelList = ({ children, error = false, loading, onCreateChannel, toggleMobile }) => {
  const location = useLocation();
  const { client, setActiveChannel } = useChatContext();
  const { id, image = streamLogo, name = "Example User", username = "username" } = client.user || {};

  useEffect(() => {
    if (location.state?.recipient) {
      toggleMobile();
    }
  }, [location]);

  useEffect(() => {
    const getChannels = async (client) => {
      const filter = { type: "messaging", members: { $in: [client.userID] } };
      const sort = [{ last_message_at: -1 }];

      const channels = await client.queryChannels(filter, sort, {
        watch: true, // this is the default
        state: true,
      });

      channels.map((channel) => {
        console.log(channel);
      });
    };

    if (!loading && !children?.props?.children?.length) {
      getChannels(client);
    }
  }, [loading]); // eslint-disable-line

  const ListHeaderWrapper = ({ children }) => {
    return (
      <div className="messaging__channel-list">
        <div className="messaging__channel-list__header">
          <Avatar image={image || noProfileImage} name={name} size={40} />
          <IonCol>
            <div className="messaging__channel-list__header__name">{name || id}</div>
            <div className="messaging__channel-list__header__username">@{username || id}</div>
          </IonCol>
          <button className="messaging__channel-list__header__button" onClick={() => {
            onCreateChannel();
            toggleMobile();
          }}>
            <CreateChannelIcon />
          </button>
        </div>
        {children}
      </div>
    );
  };

  if (error) {
    return (
      <ListHeaderWrapper>
        <div className="messaging__channel-list__message">Error loading conversations, please try again momentarily.</div>
      </ListHeaderWrapper>
    );
  }

  if (loading) {
    return (
      <ListHeaderWrapper>
        <div className="messaging__channel-list__message">
          <SkeletonLoader />
        </div>
      </ListHeaderWrapper>
    );
  }

  return <ListHeaderWrapper>{children}</ListHeaderWrapper>;
};

export default React.memo(MessagingChannelList);
