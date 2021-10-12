import server from "../utils/server";

const mockCollections = {
  collections: [
    {
      collectionId: 123,
      collectionName: "1st Gen Pokemon Cards",
      collectionDescription: "My collection of 1st gen cards",
      categoryId: 19,
      categoryName: "Pokemon Cards",
      userId: 12,
      collectionCreationDate: "2021-09-23T01:22:47.541Z",
      coverImages: [
        {
          url: "https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg",
        },
        { url: "https://static.wikia.nocookie.net/pokemon/images/4/49/Ash_Pikachu.png/revision/latest?cb=20200405125039" },
        { url: "https://cdn2.bulbagarden.net/upload/thumb/4/49/Ash_Pikachu.png/1200px-Ash_Pikachu.png" },
      ],
    },
  ],
};

const mockCollection = {
  collectionId: 123,
  collectionName: "1st Gen Pokemon Cards",
  collectionDescription: "My collection of 1st gen cards",
  categoryId: 19,
  categoryName: "Pokemon Cards",
  userId: 12,
  collectionCreationDate: "2021-09-23T01:22:47.541Z",
};

const mockPostCollectionResponse = {
  collectionId: 123,
};

// categoryId and userId are optional
export const getCollections = async (categoryId, userId, offset, limit) => {
  console.log("GET collection by filter");
  const params = { user: userId, offset, limit };
  if (categoryId != null) {
    params["category"] = categoryId;
  }
  const response = await server.get("collections", { params });
  console.log(response);

  // return mockCollections;
  return response.data.collections;
};

export const getCollectionByCollectionId = async (collectionId) => {
  console.log("Get Collection with id", collectionId);
  const response = await server.get(`collections/${collectionId}`);
  console.log(response);

  // return mockCollection;
  return response.data;
};

export const postCollection = async (data) => {
  console.log("creating new collection...");
  const response = await server.post("collections", data);
  console.log(response);
  //   const data = {
  //     collectionName: "Keyboards",
  //     collectionDescription: "My keyboards",
  //     categoryId: 123,
  //   };

  // return mockPostCollectionResponse;
  return response.data.collectionId;
};

export const updateCollection = async (collectionId, data) => {
  console.log("Update Collection with id", collectionId);
  const response = await server.put(`collections/${collectionId}`, data);
  console.log(response);
  //   const data = {
  //     collectionName: "Keyboards",
  //     collectionDescription: "My keyboards",
  //     categoryId: 123,
  //   };

  // return {...data};
  // return response;
};

export const deleteCollection = async (collectionId) => {
  console.log("Deleting collection with id", collectionId);
  const response = await server.delete(`collections/${collectionId}`);
  console.log(response);
  //   const data = {
  //     collectionName: "Keyboards",
  //     collectionDescription: "My keyboards",
  //     categoryId: 123,
  //   };

  // return {};
};
