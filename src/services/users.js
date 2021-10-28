import server from "../utils/server";

export const getCurrentUser = async () => {
  console.log("Get user data of logged in user");
  const response = await server.get(`api/user/`);
  console.log(response);
  return response.data;
};

// TODO: CHANGE TO API TOKEN CALL
export const getChatUserInfo = async () => {
  // TODO: STILL WRONG DATA!!!
  const user = await getCurrentUser();
  const {
    userId: chatId,
    username,
    firstName,
    lastName,
    chatName = `${firstName} ${lastName} (@${username})`,
    pictureUrl,
    chatToken = process.env.REACT_APP_CHAT_API_KEY,
  } = user;

  const chatUser = { chatId, chatName, pictureUrl, chatToken };
  return chatUser;
};

export const getUserByUsername = async (username) => {
  console.log("Get user data of user" + username);
  const response = await server.get(`api/user/${username}/`);
  console.log(response);
  return response.data;
};

const blobToFile = (blob, fileName = "default-name", type = "image/png") => {
  const file = new File([blob], fileName, { type });
  return file;
};

const loadImageFile = async (url) => {
  const filename = "profile-picture.png";
  const file = await fetch(url)
    .then((res) => res.blob())
    .then((blob) => blobToFile(blob, filename));
  return file;
};

export const updateProfile = async (username, firstName, lastName, description, profilePictureUrl) => {
  const body = new FormData();
  body.append("username", username);
  body.append("firstName", firstName);
  body.append("lastName", lastName);
  body.append("description", description);

  if (profilePictureUrl) {
    const imageFile = await loadImageFile(profilePictureUrl);
    body.append("pictureUrl", imageFile);
  }

  console.log(...body);
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
