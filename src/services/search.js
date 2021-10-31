import server from "../utils/server";

export const searchCollections = async (keywords, offset, limit) => {
  if (!keywords) {
    return [];
  }
  const params = {
    keywords,
    offset,
    limit,
  };
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
  };
  const res = await server.get("/api/user/search", { params });
  return res.data;
};

export const getDiscoverItems = async (offset, limit, category, viewTradable) => {
  const params = {
    offset,
    limit,
  };

  if (category) {
    params.category = category;
  }

  if (viewTradable) {
    params.is_tradable = viewTradable;
  }
  const res = await server.get("/items", { params });
  return res.data;
};
