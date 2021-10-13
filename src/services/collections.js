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
  const response = await server
    .get("/collections/", {
      params: { categoryId: categoryId, userId: userId, offset: offset, limit: limit },
    })
    .then((response) => {
      // handle success
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });

  return response;
};

export const getCollectionByCollectionId = async (collectionId) => {
  const response = await server
    .get("/collections" + collectionId, {
      params: {},
    })
    .then((response) => {
      // handle success
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });

  return response;
};

export const postCollection = async (data) => {
  const response = await server
    .post("/collections", {
      data,
    })
    .then((response) => {
      // handle success
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });

  return response;
};

export const updateCollection = async (data, collectionId) => {
  const response = await server
    .put("/collections/" + collectionId, {
      data,
    })
    .then((response) => {
      // handle success
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });

  return {};
};

export const deleteCollection = async (collectionId) => {
  //   const data = {
  //     collectionName: "Keyboards",
  //     collectionDescription: "My keyboards",
  //     categoryId: 123,
  //   };

  //   const response = await axios
  //     .delete("/collections/" + collectionId)
  //     .then((response) => {
  //       // handle success
  //       console.log(response);
  // return response.data;

  //     })
  //     .catch((error) => {
  //       // handle error
  //       console.log(error);
  //     });

  return {};
};
