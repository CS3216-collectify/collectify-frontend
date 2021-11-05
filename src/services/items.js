import { convertImageUrlToFile } from "../utils/image";
import server from "../utils/server";

export const getItemsFromCollection = async (collectionId, offset, limit) => {
  const params = { offset, limit };
  const response = await server.get(`collections/${collectionId}/items/`, {
    params,
  });

  return response.data;
};

export const getItemFromCollection = async (collectionId, itemId) => {
  const response = await server.get(`collections/${collectionId}/items/${itemId}/`);
  return response.data;
};

export const postItem = async (collectionId, itemData) => {
  const { itemName, itemDescription, images, isTradable } = itemData;

  const body = new FormData();
  body.append("itemName", itemName);
  body.append("itemDescription", itemDescription);
  body.append("isTradable", isTradable);

  for (let i = 0; i < images.length; i++) {
    const { imageUrl } = images[i];
    const file = await convertImageUrlToFile(imageUrl, i);
    body.append("images", file);
  }

  const response = await server.post(`collections/${collectionId}/items/`, body);
  return response.data.itemId;
};

export const updateItem = async (collectionId, itemId, itemData) => {
  const body = new FormData();
  const { itemName, itemDescription, images, deletedImageIds, isTradable, updatedCollection } = itemData;
  body.append("itemName", itemName);
  body.append("itemDescription", itemDescription);
  body.append("isTradable", isTradable);
  body.append("updatedCollection", updatedCollection);

  for (let i = 0; i < images.length; i++) {
    const { imageUrl, isNew } = images[i];
    if (!isNew) {
      continue;
    }
    const file = await convertImageUrlToFile(imageUrl, i);
    body.append("newImages", file);
  }

  for (let id of deletedImageIds) {
    body.append("deletedImageIds", id);
  }

  await server.patch(`collections/${collectionId}/items/${itemId}/`, body);
};

export const deleteItem = async (collectionId, itemId) => {
  const response = await server.delete(`collections/${collectionId}/items/${itemId}/`);
};
