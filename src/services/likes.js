import server from "../utils/server";

export const getLikesByItemId = async (itemId, offset, limit) => {
  const params = {
    item: itemId,
    offset,
    limit
  };
  const res = await server.get("/likes", { params });
  return res.data;
};

export const likeByItemId = async (itemId) => {
  const body = { itemId };
  const res = await server.post("/likes/", body);
  return res.data;
}

export const unlikeByItemId = async (itemId) => {
  const params = { item: itemId };
  const res = await server.delete("/likes/", { params });
  return res.data;
}
