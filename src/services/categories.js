const axios = require("axios");

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
//   const response = await axios
//     .get("/categories/all", {
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

  return mockCategories.categories;
};
