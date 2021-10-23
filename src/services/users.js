import server from "../utils/server";

export const getCurrentUser = async () => {
  console.log("Get user data of logged in user");
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