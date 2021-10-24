import server from "../utils/server";

export const searchCollections = async (keywords, offset, limit) => {
  if (!keywords) {
    return [];
  }
  const params = {
    keywords,
    offset,
    limit,
  }
  console.log("GET /collections... string-query:", params);
  const res = await server.get("/collections", { params });
  console.log(res);
  return res.data;
};

export const searchItems = async (keywords, offset, limit) => {
  if (!keywords) {
    return [];
  }
  const params = {
    keywords,
    offset,
    limit,
  };
  console.log("GET /items... string query:", params);
  const res = await server.get("/items", { params });
  console.log(res);
  return res.data;
};

export const searchUsers = async (keywords, offset, limit) => {
  if (!keywords) {
    return [];
  }
  const params = {
    keywords,
    offset,
    limit,
  }
  console.log("GET /api/user/search... string query:", params);
  const res = await server.get("/api/user/search", { params });
  console.log(res);
  return res.data;
};

export const getDiscoverItems = async (offset, limit) => {
  const params = {
    offset,
    limit,
  };
  console.log("GET /items... string query:", params);
  const res = await server.get("/items", { params });
  console.log(res);
  return res.data;
};
