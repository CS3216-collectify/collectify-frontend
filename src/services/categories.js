import server from "../utils/server";

export const getCategories = async () => {
  const response = await server.get(`/categories/`);
  return response.data;
};

export const getFilterCategories = async () => {
  const params = {
    indicateEmpty: true
  }
  const response = await server.get(`/categories/`, { params });
  return response.data;
}
