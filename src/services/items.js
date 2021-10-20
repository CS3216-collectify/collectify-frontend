import server from "../utils/server";

export const getItemsFromCollection = async (collectionId, offset, limit) => {
  console.log("GET items from collection", collectionId);
  const params = { offset, limit };
  const response = await server.get(`collections/${collectionId}/items/`, {
    params,
  });
  console.log(response);

  return response.data;
};

export const getItemFromCollection = async (collectionId, itemId) => {
  console.log("Get Item with collectionId", collectionId, "and itemId", itemId);
  const response = await server.get(`collections/${collectionId}/items/${itemId}/`);
  console.log(response.data);

  return response.data;
};

const blobToFile = (blob, fileName = "default-name", type = "image/png") => {
  const file = new File([blob], fileName, { type });
  return file;
};

const loadImageFile = async (url, idx) => {
  const filename = `im-${idx}`;
  const file = await fetch(url)
    .then((res) => res.blob())
    .then((blob) => blobToFile(blob, filename));
  return file;
};

export const postItem = async (collectionId, itemData) => {
  console.log("Post Item for collectionId", collectionId);
  const { itemName, itemDescription, images } = itemData;

  const body = new FormData();
  body.append("itemName", itemName);
  body.append("itemDescription", itemDescription);

  for (let i = 0; i < images.length; i++) {
    const { imageUrl } = images[i];
    const file = await loadImageFile(imageUrl, i);
    body.append("images", file);
  }
  console.log(itemData);

  console.log(...body);
  const response = await server.post(`collections/${collectionId}/items/`, body);
  console.log(response);

  return response.data.itemId;
};

export const updateItem = async (collectionId, itemId, itemData) => {
  console.log("Update Item with collectionId", collectionId, "and itemId", itemId);
  console.log(itemData);

  const body = new FormData();
  const { itemName, itemDescription, images, deletedImageIds } = itemData;
  body.append("itemName", itemName);
  body.append("itemDescription", itemDescription);

  for (let i = 0; i < images.length; i++) {
    const { imageUrl, isNew } = images[i];
    if (!isNew) {
      continue;
    }
    const file = await loadImageFile(imageUrl, i);
    body.append("newImages", file);
  }

  for (let id of deletedImageIds) {
    body.append("deletedImageIds", id);
  }

  console.log(...body);
  await server.patch(`collections/${collectionId}/items/${itemId}/`, body);
};

export const deleteItem = async (collectionId, itemId) => {
  console.log("Deleting collection with collectionId", collectionId, "and itemId", itemId);
  const response = await server.delete(`collections/${collectionId}/items/${itemId}/`);
  console.log(response);
};

const mockItems = {
  items: [
    {
      itemId: 500,
      itemName: "Shiny Charmander",
      itemDescription: "My first ever card!",
      collectionId: 123,
      itemCreationDate: "2021-09-24T01:22:47.541Z",
      coverImage:
        "https://collectify-images.s3.amazonaws.com/item_images/im-0_b3TompB",
    },
    {
      itemId: 501,
      itemName: "Rare Mew Two",
      itemDescription: "Bought for $100",
      collectionId: 123,
      itemCreationDate: "2021-09-23T01:22:47.541Z",
      coverImage:
        "https://collectify-images.s3.amazonaws.com/item_images/im-0_b3TompB",
    },
  ],
};

export const getItemsForDiscover = async () => {
  return [...mockItems.items];
};
