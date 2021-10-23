import server from "../utils/server";

export const getLikesByItemId = async (itemId, offset, limit) => {
  const params = {
    item: itemId,
    offset,
    limit
  };
  console.log("Getting likes for item id", itemId);
  const res = await server.get("/likes", { params });
  console.log(res);
  return res.data;
};

export const likeByItemId = async (itemId) => {
  console.log("Sending like post request for item id", itemId);
  const body = { itemId };
  const res = await server.post("/likes/", body);
  console.log(res);
  return res.data;
}

export const unlikeByItemId = async (itemId) => {
  console.log("Sending UNLIKE post request for item id", itemId);
  const params = { item: itemId };
  const res = await server.delete("/likes/", { params });
  console.log(res);
  return res.data;
}
