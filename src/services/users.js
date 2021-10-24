import server from "../utils/server";

export const getCurrentUser = async () => {
  console.log("Get user data of logged in user");
  const response = await server.get(`api/user/`);
  console.log(response);
  return response.data;
};

export const getUserByUsername = async (username) => {
  console.log("Get user data of user" + username);
  const response = await server.get(`api/user/${username}/`);
  console.log(response);
  return response.data;
};

export const updateProfile = async (username, firstName, lastName, description) => {
  const body = {
    username,
    firstName,
    lastName,
    description,
  }
  console.log("updating user info with req body...", body);
  const response = await server.patch("api/user/", body);
  console.log(response);
};

export const updateUsername = async (username) => {
  const body = {
    username,
  };
  console.log("updating user info with req body...", body);
  const response = await server.patch("api/user/", body);
  console.log(response);
};
