import { server } from "../utils/server";

const mockItems = {
  items: [
    {
      itemId: 500,
      itemName: "Shiny Charmander",
      itemDescription: "My first ever card!",
      collectionId: 123,
      itemCreationDate: "2021-09-23T01:22:47.541Z",
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
  //   const response = await axios
  //     .get("/collections/" + collectionId + "/items", {
  //       params: { offset: offset, limit: limit },
  //     })
  //     .then((response) => {
  //       // handle success
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       // handle error
  //       console.log(error);
  //     });

  return mockItems;
};

export const getItemFromCollection = async (collectionId, itemId) => {
  console.log("Get Item with collectionId", collectionId, "and itemId", itemId);
  //   const response = await axios
  //     .get("/collections/" + collectionId + "/items/" + itemId, {
  //       params: {},
  //     })
  //     .then((response) => {
  //       // handle success
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       // handle error
  //       console.log(error);
  //     });

  return mockItem;
};

export const postItem = async (collectionId, itemData) => {
  console.log("Post Item for collectionId", collectionId);
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

  //   const response = await axios
  //     .post("/collections/" + collectionId + "/items", {
  //       data,
  //     })
  //     .then((response) => {
  //       // handle success
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       // handle error
  //       console.log(error);
  //     });

  return mockPostItemResponse;
};

export const updateItem = async (collectionId, itemId, itemData) => {
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

  //   const response = await axios
  //     .post("/collections/" + collectionId + "/items/" + itemId, {
  //       data,
  //     })
  //     .then((response) => {
  //       // handle success
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       // handle error
  //       console.log(error);
  //     });

  return { ...itemData };
};

// TODO: delete item?

export const deleteCollection = async (collectionId) => {
  //   const data = {
  //     collectionName: "Keyboards",
  //     collectionDescription: "My keyboards",
  //     categoryId: 123,
  //   };

  //   const response = await axios
  //     .delete("/collections/" + collectionId + "/items/" + itemId)
  //     .then((response) => {
  //       // handle success
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       // handle error
  //       console.log(error);
  //     });

  return {};
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

// TODO: This offset and should be done from server?
export const getItemsByCollectionId = async (collectionId, offset, limit) => {
  // TODO: Replace with actual
  if (offset === 18) {
    limit = 14;
  }
  return [
    ...Array.from({ length: limit }, (_, idx) => {
      return { ...mockItemByCollection, itemId: idx + offset, collectionId };
    }),
  ];
};
