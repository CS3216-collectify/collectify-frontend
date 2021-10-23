import server from "../utils/server";

// categoryId and userId are optional
export const getCollections = async (categoryId, userId, offset, limit) => {
  console.log("GET collection by filter", userId);
  const params = { user: userId, offset, limit };
  if (categoryId != null || categoryId != undefined) {
    params.category = categoryId;
  }
  const response = await server.get(`collections/`, { params });
  console.log(response);
  return response.data;
};

export const getCollectionByCollectionId = async (collectionId) => {
  console.log("Get Collection with id", collectionId);
  const response = await server.get(`collections/${collectionId}/`);
  console.log(response);
  return response.data;
};

export const postCollection = async (data) => {
  console.log("creating new collection...");
  const response = await server.post(`collections/`, data);
  console.log(response);
  return response.data.collectionId;
};

export const updateCollection = async (collectionId, data) => {
  console.log("Update Collection with id", collectionId);
  const response = await server.put(`collections/${collectionId}/`, data);
  console.log(response);
};

export const deleteCollection = async (collectionId) => {
  console.log("Deleting collection with id", collectionId);
  const response = await server.delete(`collections/${collectionId}/`);
  console.log(response);
};
