export const getUserId = () => {
  return localStorage.getItem("userId");
};

export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("isGuest");
};
