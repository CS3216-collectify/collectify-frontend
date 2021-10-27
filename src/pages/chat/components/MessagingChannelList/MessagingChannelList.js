import React, { useEffect } from "react";
import { Avatar, useChatContext } from "stream-chat-react";

import "./MessagingChannelList.css";
import { SkeletonLoader } from "./SkeletonLoader";

import { CreateChannelIcon } from "../../assets";
import streamLogo from "../../assets/stream.png";

const MessagingChannelList = ({ children, error = false, loading, onCreateChannel }) => {
  const { client, setActiveChannel } = useChatContext();
  const { id, image = streamLogo, name = "Example User" } = client.user || {};

  useEffect(() => {
    const getChannels = async (client) => {
      const filter = { type: "messaging", members: { $in: [client.userID] } };
      const sort = [{ last_message_at: -1 }];

      const channels = await client.queryChannels(filter, sort, {
        watch: true, // this is the default
        state: true,
      });

      channels.map((channel) => {
        console.log(channel.data.name, channel.cid);
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
          <Avatar image={image} name={name} size={40} />
          <div className="messaging__channel-list__header__name">{name || id}</div>
          <button className="messaging__channel-list__header__button" onClick={onCreateChannel}>
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