import server from "../utils/server";

export const getFollowersByCollectionId = async (collectionId, offset, limit) => {
  console.log("Fetch followers for collection id", collectionId);
  const params = {
    collection: collectionId,
    offset,
    limit
  };
  const res = await server.get("/followers", { params });
  console.log(res);
  return res.data;
};

export const followByCollectionId = async (collectionId) => {
  console.log("Follow collection id", collectionId);
  const body = {
    collectionId,
  };
  const res = await server.post("/followers/", body);
  console.log(res);
  return res.data;
}

export const unfollowByCollectionId = async (collectionId) => {
  console.log("Follow collection id", collectionId);
  const params = {
    collection: collectionId,
  };
  const res = await server.delete("/followers", { params });
  console.log(res);
  return res.data;
}
