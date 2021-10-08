const axios = require("axios");

const mockUsers = {
  userId: 12,
  username: "PokemonMaster69",
  profilePictureUrl:
    "https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg",
};

export const getUserByUserId = async (userId) => {
  //   const response = await axios
  //     .get("/users/" + userId, {
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

  return mockUsers;
};
