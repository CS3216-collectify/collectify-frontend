import server from "../utils/server";

export const getCategories = async () => {
  const response = await server.get(`/categories/`);
  return response.data;
};
