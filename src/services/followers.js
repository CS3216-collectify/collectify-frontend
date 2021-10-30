import server from "../utils/server";

export const getFollowersByCollectionId = async (collectionId, offset, limit) => {
  const params = {
    collection: collectionId,
    offset,
    limit
  };
  const res = await server.get("/followers", { params });
  return res.data;
};

export const followByCollectionId = async (collectionId) => {
  const body = {
    collectionId,
  };
  const res = await server.post("/followers/", body);
  return res.data;
}

export const unfollowByCollectionId = async (collectionId) => {
  const params = {
    collection: collectionId,
  };
  const res = await server.delete("/followers", { params });
  return res.data;
}
