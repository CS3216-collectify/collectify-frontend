import server from "../utils/server";

const mockUsers = {
  userId: 12,
  username: "PokemonMaster69",
  profilePictureUrl:
    "https://cdn.vox-cdn.com/thumbor/eFEHo8eygHajtwShwT9e_jf7c-c=/0x0:1920x1080/1200x800/filters:focal(722x227:1028x533)/cdn.vox-cdn.com/uploads/chorus_image/image/69323002/Screen_Shot_2021_05_21_at_9.54.00_AM.0.jpeg",
};

export const getCurrentUser = async () => {
  console.log("Get user data of user xax");
  // server.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;

  const response = await server.get(`api/user/`);

  return response.data;
};

export const getUserByUsername = async (username) => {
  console.log("Get user data of user" + username);
  const response = await server.get(`api/user/${username}/`);

  return response.data;
};

export const updateProfile = async (username, userInfo) => {
  const response = await server.patch(`api/user/${username}/`, userInfo)

  console.log(response)
};