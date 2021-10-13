import server from "../utils/server";

const mockItems = {
  items: [
    {
      itemId: 500,
      itemName: "Shiny Charmander",
      itemDescription: "My first ever card!",
      collectionId: 123,
      itemCreationDate: "2021-09-24T01:22:47.541Z",
      coverImage: {
        url: "https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg",
      },
    },
    {
      itemId: 501,
      itemName: "Rare Mew Two",
      itemDescription: "Bought for $100",
      collectionId: 123,
      itemCreationDate: "2021-09-23T01:22:47.541Z",
      coverImage: {
        url: "https://static.wikia.nocookie.net/pokemon/images/4/49/Ash_Pikachu.png/revision/latest?cb=20200405125039",
      },
    },
  ],
};

const mockItem = {
  itemId: 501,
  itemName: "Rare Mew Two",
  itemDescription: "Bought for $100",
  itemCreationDate: "2021-09-23T01:22:47.541Z",
  images: [
    {
      imageId: 2,
      url: "https://static.wikia.nocookie.net/pokemon/images/4/49/Ash_Pikachu.png/revision/latest?cb=20200405125039",
      imageUploadDate: "2021-09-23T01:22:47.541Z",
    },
  ],
};

const mockPostItemResponse = {
  itemId: 123,
};

export const getItemsFromCollection = async (collectionId, offset, limit) => {
  console.log("GET items from collection", collectionId);
  const params = { offset, limit };
  const response = await server.get(`collections/${collectionId}/items`, {
    params,
  });
  console.log(response.data);

  // return mockItems;
  return response.data.items;
};

export const getItemFromCollection = async (collectionId, itemId) => {
  console.log("Get Item with collectionId", collectionId, "and itemId", itemId);
  const response = await server.get(
    `collections/${collectionId}/items/${itemId}`
  );
  console.log(response.data);

  // return mockItem;
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
  // images = { url: ____, position: ____ }
  const { itemName, itemDescription, images } = itemData;

  const body = new FormData();
  body.append("itemName", itemName);
  body.append("itemDescription", itemDescription);

  for (let i = 0; i < images.length; i++) {
    const { url } = images[i];
    const file = await loadImageFile(url, i);
    body.append("images", file);
  }

  const response = await server.post(`collections/${collectionId}`, body);
  console.log(response);

  // return mockPostItemResponse;
  return response.data.itemId;
};

export const updateItem = async (collectionId, itemId, itemData) => {
  // TODO: Use FormData
  // TODO: How images are updated?

  console.log(
    "Update Item with collectionId",
    collectionId,
    "and itemId",
    itemId
  );
  //   const data = {
  //     itemName: "A keyboard",
  //     itemDescription: "My keyboard",
  //     images: [
  //       {
  //         imageId: 2,
  //         url: "https://static.wikia.nocookie.net/pokemon/images/4/49/Ash_Pikachu.png/revision/latest?cb=20200405125039",
  //         imageUploadDate: "2021-09-23T01:22:47.541Z",
  //       },
  //     ],
  //   };

  //   const response = await server
  //     .post("/collections/" + collectionId + "/items/" + itemId, {
  //       data,
  //     })
  //     .then((response) => {
  //       // handle success
  //       console.log(response);
  // return response.data;
  //     })
  //     .catch((error) => {
  //       // handle error
  //       console.log(error);
  //     });

  // return { ...itemData };
};

export const deleteItem = async (collectionId, itemId) => {
  console.log(
    "Deleting collection with collectionId",
    collectionId,
    "and itemId",
    itemId
  );
  const response = await server.delete(
    `collections/${collectionId}/items/${itemId}`
  );
  console.log(response);

  // return {};
  // return response;
};

const sampleImage =
  "https://pbs.twimg.com/profile_images/1377854248621199360/F7S8p4xK_400x400.jpg";

const mockItemByCollection = {
  itemName: "Shiny Charmander",
  itemDescription: "My first ever card!",
  itemCreationDate: "2021-09-23T01:22:47.541Z",
  coverImage: {
    url: sampleImage,
  },
};

// TODO: For testing ImageGrid, use getItemsFromCollection instead
// export const getItemsByCollectionId = async (collectionId, offset, limit) => {
//   // TODO: Replace with actual
//   if (offset === 18) {
//     limit = 14;
//   }
//   return [
//     ...Array.from({ length: limit }, (_, idx) => {
//       return { ...mockItemByCollection, itemId: idx + offset, collectionId };
//     }),
//   ];
// };
