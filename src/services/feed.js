import server from "../utils/server";

export const getFeedItems = async (offset, limit) => {
  const params = {
    offset,
    limit,
    followed: true,
    detailed: true,
  };
  const res = await server.get("/items", { params });
  return res.data;
};
