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
    .get("/categories/all", {
      params: {},
    })
    .then((response) => {
      // handle success
      console.log(response);
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });

  return response;
};
