import server from "../utils/server";

export const getFollowedCollections = async (offset, limit) => {
  const params = {
    offset,
    limit,
    followed: true
  }
  console.log("GET /collections... string-query:", params);
  const res = await server.get("/collections", { params });
  console.log(res);
  return res.data;
};

export const getLikedItems = async (offset, limit) => {
  const params = {
    offset,
    limit,
    liked: true,
  };
  console.log("GET /items... string query:", params);
  const res = await server.get("/items", { params });
  console.log(res);
  return res.data;
};
