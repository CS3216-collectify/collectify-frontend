import server from "../utils/server";

export const getCurrentUser = async () => {
  const response = await server.get("api/user/");
  return response.data;
};

export const getChatUserInfo = async () => {
  const response = await server.post("/chat/");
  return response.data;
};

export const getUserByUsername = async (username) => {
  const response = await server.get(`api/user/${username}/`);
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

  const response = await server.patch("api/user/", body);
};

export const updateUsername = async (username) => {
  const body = {
    username,
  };
  const response = await server.patch("api/user/", body);
};

export const deleteCurrentUser = async () => {
  const response = await server.delete(`api/user/`);
  return;
}
