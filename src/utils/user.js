export const getUserId = () => {
  // TODO: Null Handling (if userId not in local storage)
  return localStorage.getItem("userId");
};

export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("isGuest");
};
