import server from "../utils/server";

const timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getFollowedCollections = async (offset, limit) => {
  const params = {
    offset,
    limit,
    followed: true
  }
  console.log("GET /collections... string-query:", params);
  const res = await server.get("/collections", { params });
  console.log(res);
  return res.data;
};

const mockItemByCollection = {
  itemName: "Shiny Charmander",
  itemDescription: "My first ever card!",
  itemCreationDate: "2021-09-23T01:22:47.541Z",
  coverImage: "https://cdn2.bulbagarden.net/upload/thumb/4/49/Ash_Pikachu.png/1200px-Ash_Pikachu.png",
};

export const getLikedItems = async (offset, limit) => {
  // TODO: UNCOMMENT below once endpoint is ready

  // if (!keywords) {
  //   return [];
  // }
  // const params = {
  //   offset,
  //   limit,
  //   liked: true,
  // };
  // console.log("GET /items... string query:", params);
  // const res = await server.get("/items", { params });
  // return res.data;

  await timeout(1500);
  return Array.from({ length: limit }, (v, idx) => ({...mockItemByCollection, itemId: idx}));
};
