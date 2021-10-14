export const getUserId = () => {
  // TODO: Null Handling (if userId not in local storage)
  return localStorage.getItem("userId");
}
