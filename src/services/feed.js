import server from "../utils/server";

export const getFeed = async (offset, limit) => {
  const params = {
    offset,
    limit,
    followed: true,
  };
  console.log("GET /items... string query:", params);
  const res = await server.get("/items", { params });
  console.log(res);
  return res.data;
}