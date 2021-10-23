import server from "../utils/server";

export const getFollowersByCollectionId = async (collectionId, offset, limit) => {
  console.log("Fetch followers for collection id", collectionId);
  const params = {
    collection: collectionId,
    offset,
    limit
  };
  const res = await server.get("/followers", { params });
  return res.data;
};
