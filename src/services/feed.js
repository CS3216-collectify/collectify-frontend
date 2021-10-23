import server from "../utils/server";

export const getFeed = async (offset, limit, followed = false) => {
  const params = {
    offset,
    limit,
  };
  if (followed) {
    params.followed = true;
  }
  console.log("GET /items... string query:", params);
  const res = await server.get("/items", { params });
  console.log(res);
  return res.data;
}