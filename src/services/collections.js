import server from "../utils/server";

// categoryId and userId are optional
export const getCollections = async (categoryId, userId, offset, limit) => {
  const params = { user: userId, offset, limit };
  if (categoryId !== null || categoryId !== undefined) {
    params.category = categoryId;
  }
  const response = await server.get(`collections/`, { params });
  return response.data;
};

export const getCollectionByCollectionId = async (collectionId) => {
  const response = await server.get(`collections/${collectionId}/`);
  return response.data;
};

export const postCollection = async (data) => {
  const response = await server.post(`collections/`, data);
  return response.data.collectionId;
};

export const updateCollection = async (collectionId, data) => {
  const response = await server.put(`collections/${collectionId}/`, data);
};

export const deleteCollection = async (collectionId) => {
  const response = await server.delete(`collections/${collectionId}/`);
};
