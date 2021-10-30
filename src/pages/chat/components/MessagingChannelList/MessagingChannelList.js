import { IonCol } from "@ionic/react";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { Avatar, useChatContext } from "stream-chat-react";
import noProfileImage from "../../../../assets/no-profile-image.png";
import useToastContext from "../../../../hooks/useToastContext";
import useUserContext from "../../../../hooks/useUserContext";
import { CreateChannelIcon } from "../../assets";
import streamLogo from "../../assets/stream.png";
import "./MessagingChannelList.css";
import { SkeletonLoader } from "./SkeletonLoader";

const MessagingChannelList = ({ children, error = false, loading, onCreateChannel, closeNav, setChatItem }) => {
  const location = useLocation();
  const history = useHistory();
  const { client, setActiveChannel } = useChatContext();
  const setToast = useToastContext();
  const { id, image = streamLogo, name = "Example User", username = "username" } = client.user || {};

  useEffect(async () => {
    if (location.state?.recipient && location.pathname.startsWith("/chat")) {
      const { recipient: recipientId } = location.state;
      if (client.userID === recipientId) {
        return;
      }
      const channel = client.channel("messaging", {
        members: [client.userID, recipientId],
      });
      await channel.watch().then((res) => {
        setActiveChannel(channel);
        if (location.state?.chatItem && location.pathname.startsWith("/chat")) {
          setChatItem(location.state?.chatItem);
        }
        closeNav();
      }).catch((e) => {
        setToast({ message: "Unable to open chat. Try again later.", color: "danger" });
      })
      history.replace({...history.location, state: {}})
    }
  }, [location]);

  // TODO: When I tested, this useEffect doesnt seem to do anything (as expected based on the code)
  // In any case, I commented out first so that we can easily revert

  // useEffect(() => {
  //   const getChannels = async (client) => {
  //     const filter = { type: "messaging", members: { $in: [client.userID] } };
  //     const sort = [{ last_message_at: -1 }];

  //     const channels = await client.queryChannels(filter, sort, {
  //       watch: true, // this is the default
  //       state: true,
  //     });

  //     channels.map((channel) => {
  //       // console.log(channel);
  //     });
  //   };

  //   if (!loading && !children?.props?.children?.length) {
  //     getChannels(client);
  //   }
  // }, [loading]); // eslint-disable-line

  const ListHeaderWrapper = ({ children }) => {
    return (
      <div className="messaging__channel-list">
        <div className="messaging__channel-list__header">
          <span className="clickable">
            <Avatar image={image || noProfileImage} name={name} size={40} onClick={() => history.push("/profile")} />
          </span>
          <IonCol className="clickable" onClick={() => history.push("/profile")}>
            <div className="messaging__channel-list__header__name">{name || id}</div>
            <div className="messaging__channel-list__header__username">@{username || id}</div>
          </IonCol>
          <button className="clickable messaging__channel-list__header__button" onClick={() => {
            onCreateChannel();
            closeNav();
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
