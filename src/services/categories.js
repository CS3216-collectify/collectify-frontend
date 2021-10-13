import server from "../utils/server";

const mockCategories = {
  categories: [
    {
      categoryId: 19,
      name: "Pokemon Cards",
    },
    {
      categoryId: 29,
      name: "Sneakers",
    },
  ],
};

export const getCategories = async () => {
  const response = await server.get(`/categories/`);
  console.log(response);

  // return mockCategories.categories;
  return response.data;
};
