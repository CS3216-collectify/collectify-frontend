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
  const res = await server.get("/collections", { params });
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
  const res = await server.get("/items", { params });
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
  const res = await server.get("/api/user/search", { params });
  return res.data;
};

export const getDiscoverItems = async (offset, limit) => {
  const params = {
    offset,
    limit,
  };
  const res = await server.get("/items", { params });
  return res.data;
};
