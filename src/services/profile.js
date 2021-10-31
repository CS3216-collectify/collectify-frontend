import server from "../utils/server";

export const getFollowedCollections = async (offset, limit) => {
  const params = {
    offset,
    limit,
    followed: true
  }
  const res = await server.get("/collections", { params });
  return res.data;
};

export const getLikedItems = async (offset, limit) => {
  const params = {
    offset,
    limit,
    liked: true,
  };
  const res = await server.get("/items", { params });
  return res.data;
};
