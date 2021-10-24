import server from "../utils/server";

export const getFeedItems = async (offset, limit) => {
  const params = {
    offset,
    limit,
    followed: true,
    detailed: true,
  };
  console.log("GET /items... string query:", params);
  const res = await server.get("/items", { params });
  console.log(res);
  return res.data;
};
