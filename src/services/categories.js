import server from "../utils/server";

const mockCategories = {
  categories: [
    {
      collectionId: 19,
      name: "Pokemon Cards",
    },
    {
      collectionId: 29,
      name: "Sneakers",
    },
  ],
};

export const getCategories = async () => {
  const response = await server
    .get("/categories/", {
      params: {},
    })
    .then((response) => {
      // handle success
       return response.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });

  return response;
};
