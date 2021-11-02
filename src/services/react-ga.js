import ReactGA from "react-ga4";

// Initialise Google Analytics tracking
export const initialiseGoogleAnalytics = () => {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_KEY, [{ siteSpeedSampleRate: 100, debug: true }]);
};

// Track page view
export const trackPageView = (pathname) => {
  ReactGA.send({ hitType: "pageview", page: pathname });
};

// Track events
export const trackGoogleSignInEvent = () => {
  ReactGA.event({
    category: "auth",
    action: "google_sign_in",
  });
};

export const trackGoogleSignOutEvent = () => {
  ReactGA.event({
    category: "auth",
    action: "google_sign_out",
  });
};

export const trackGuestSignInEvent = () => {
  ReactGA.event({
    category: "auth",
    action: "continue_as_guest",
  });
};

export const trackDeleteAccountEvent = () => {
  ReactGA.event({
    category: "auth",
    action: "delete_account",
  });
};

export const trackDismissToastEvent = () => {
  ReactGA.event({
    category: "toast",
    action: "dismiss_toast",
  });
};

// Items
export const trackItemLikeEvent = () => {
  ReactGA.event({
    category: "item",
    action: "like_item",
  });
};

export const trackItemUnlikeEvent = () => {
  ReactGA.event({
    category: "item",
    action: "unlike_item",
  });
};

export const trackViewCollectionEvent = () => {
  ReactGA.event({
    category: "item",
    action: "view_item_collection",
  });
};

export const trackViewItemLikesEvent = () => {
  ReactGA.event({
    category: "item",
    action: "view_item_likes",
  });
};

export const trackViewItemDetailsEvent = () => {
  ReactGA.event({
    category: "item",
    action: "view_item_details_from_home",
  });
};

export const trackViewItemOwnerEvent = () => {
  ReactGA.event({
    category: "item",
    action: "view_item_owner",
  });
};

export const trackItemChatEvent = () => {
  ReactGA.event({
    category: "item",
    action: "chat_item",
  });
};

export const trackEditItemEvent = () => {
  ReactGA.event({
    category: "item",
    action: "edit_item",
  });
};

export const trackDiscoverFilterEvent = () => {
  ReactGA.event({
    category: "discover",
    action: "update_discover_filter",
  });
};

export const trackDiscoverTradableEvent = () => {
  ReactGA.event({
    category: "discover",
    action: "update_discover_tradable",
  });
};

export const trackDiscoverViewItemEvent = () => {
  ReactGA.event({
    category: "discover",
    action: "view_item_details_from_discover",
  });
};

export const trackSearchViewItemEvent = () => {
  ReactGA.event({
    category: "search",
    action: "view_item_details_from_search",
  });
};

export const trackSearchViewCollectionEvent = () => {
  ReactGA.event({
    category: "search",
    action: "view_collection_details_from_search",
  });
};

export const trackViewUserEvent = () => {
  ReactGA.event({
    category: "user",
    action: "view_user_details",
  });
};

export const trackAddItemEvent = () => {
  ReactGA.event({
    category: "item",
    action: "add_item",
  });
};

export const trackDeleteItemEvent = () => {
  ReactGA.event({
    category: "item",
    action: "delete_item",
  });
};

export const trackAddCollectionEvent = () => {
  ReactGA.event({
    category: "collection",
    action: "add_collection",
  });
};

export const trackEditCollectionEvent = () => {
  ReactGA.event({
    category: "collection",
    action: "edit_collection",
  });
};

export const trackDeleteCollectionEvent = () => {
  ReactGA.event({
    category: "collection",
    action: "delete_collection",
  });
};

export const trackFollowCollectionEvent = () => {
  ReactGA.event({
    category: "collection",
    action: "follow_collection",
  });
};

export const trackUnfollowCollectionEvent = () => {
  ReactGA.event({
    category: "collection",
    action: "unfollow_collection",
  });
};

export const trackCollectionFollowersEvent = () => {
  ReactGA.event({
    category: "collection",
    action: "view_collection_followers",
  });
};

export const trackViewFollowingEvent = () => {
  ReactGA.event({
    category: "profile",
    action: "view_following",
  });
};

export const trackViewLikesEvent = () => {
  ReactGA.event({
    category: "profile",
    action: "view_likes",
  });
};
